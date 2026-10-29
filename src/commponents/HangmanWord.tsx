interface HangmanWordProps {
  word: string;
  selectedLetters: string[];
  isLoser: boolean;
  isWinner: boolean;
}

function HangmanWord({
  word,
  selectedLetters,
  isLoser,
  isWinner,
}: HangmanWordProps) {
  return (
    <section>
      {word.split("").map((letter, index) => {
        const isRevealed = selectedLetters.includes(letter);
        const isVisible = isRevealed || isLoser;
        let letterColor = "text-black";

        if (isWinner) {
          letterColor = "text-green-500";
        } else if (isLoser && !isRevealed) {
          letterColor = "text-red-500";
        }

        return (
          <span
            key={index}
            className="mx-2 inline-block h-14 w-12 border-b-4 border-black text-center text-4xl font-bold"
          >
            <span className={`${isVisible ? "visible" : "invisible"} ${letterColor}`}>
              {letter}
            </span>
          </span>
        );
      })}
    </section>
  );
}

export default HangmanWord;