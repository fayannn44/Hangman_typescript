import { useCallback, useEffect, useState } from "react";
import HangmanDraw from "./commponents/HangmanDraw";
import HangmanWord from "./commponents/HangmanWord";
import Keyboard from "./commponents/Keyboard";
import words from "../worldList.json";

const MAX_ATTEMPTS = 6;

function App() {
  const [currentWord, setCurrentWord] = useState(() => {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  });

  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const incorrectLetters = selectedLetters.filter(
    (letter) => !currentWord.includes(letter)
  );

  const isLoser = incorrectLetters.length >= MAX_ATTEMPTS;
  const isWinner = currentWord
    .split("")
    .every((letter) => selectedLetters.includes(letter));

  const isGameOver = isLoser || isWinner;

  const addLatter = useCallback(
    (letter: string) => {
      if (isGameOver || selectedLetters.includes(letter)) return;

      setSelectedLetters((prev) => [...prev, letter]);
    },
    [selectedLetters, isGameOver]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (!key.match(/^[A-Z]$/)) return;

      if (isGameOver) return;

      e.preventDefault();
      addLatter(key);
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [addLatter, isGameOver]);

  return (
    <section className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-2xl font-bold">
        {isLoser
          ? "miskir ksid"
          : isWinner
          ? "gacor wak"
          : "Hangman Game"}
      </h1>

      <HangmanDraw attempt={incorrectLetters.length} />

      <HangmanWord
        word={currentWord}
        selectedLetters={selectedLetters}
        isLoser={isLoser}
        isWinner={isWinner}
      />

      <Keyboard
        onKeyboardPress={addLatter}
        incorrectLetters={incorrectLetters}
        activeLetters={selectedLetters}
        disabled={isGameOver}
      />

      <p className="text-lg font-semibold">
        Kesalahan: {incorrectLetters.length}/{MAX_ATTEMPTS}
      </p>
    </section>
  );
}

export default App;