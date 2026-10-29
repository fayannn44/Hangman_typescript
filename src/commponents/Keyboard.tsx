const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface KeyboardProps {
  onKeyboardPress: (letter: string) => void;
  incorrectLetters: string[];
  activeLetters: string[];
  disabled: boolean;
}

function Keyboard({
  onKeyboardPress,
  incorrectLetters,
  activeLetters,
  disabled,
}: KeyboardProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {KEYS.map((letter) => {
        const isActive = activeLetters.includes(letter);
        const isInactive = incorrectLetters.includes(letter);

        return (
          <button
            key={letter}
            disabled={disabled || isActive}
            onClick={() => onKeyboardPress(letter)}
            className={`h-12 w-12 rounded-lg border-2 border-black text-xl font-bold ${
              isActive ? "bg-black text-white" : ""
            } ${
              isInactive ? "opacity-20" : "hover:bg-black hover:text-white"
            } ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;