import { motion } from "motion/react";
import { Share2, ShoppingBag, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface PowerWord {
  id: number;
  rank: string;
  word: string;
  source: string;
  isRare: boolean;
}

interface ResultScreenProps {
  powerWord: PowerWord;
  onDrawAgain: () => void;
}

export function ResultScreen({
  powerWord,
  onDrawAgain,
}: ResultScreenProps) {
  const isGodLevel = powerWord.isRare;

  useEffect(() => {
    if (isGodLevel) {
      // Trigger confetti for god-level draws
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ["#FFD700", "#FFA500", "#FF8C00"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isGodLevel]);

  const handleShare = () => {
    const text = `【${powerWord.rank}】\n${powerWord.word}\n\n#理工系文学少女 #技術書典`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePurchase = () => {
    // Placeholder URL - replace with actual purchase link
    window.open(
      "https://techbookfest.org/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center justify-between p-6 relative overflow-hidden ${
        isGodLevel
          ? "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"
          : "bg-white"
      }`}
    >
      {/* Background effects */}
      {isGodLevel ? (
        <>
          {/* Golden rays animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-radial from-yellow-300/40 via-transparent to-transparent" />
          </motion.div>

          {/* Sparkle effects */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -100],
                x: Math.random() * 40 - 20,
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            </motion.div>
          ))}
        </>
      ) : (
        <div className="absolute inset-0 opacity-5">
          <img
            src="figma:asset/26e4aecf4823c5a874c889aa1fb2e2ea46e03136.png"
            alt="背景"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="w-full max-w-md flex flex-col items-center justify-center flex-1 z-10 space-y-8 py-12">
        {/* Rank badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            type: "spring",
            bounce: 0.5,
          }}
        >
          <div
            className={`px-8 py-3 rounded-full shadow-lg relative ${
              isGodLevel
                ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-amber-900"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            }`}
          >
            {isGodLevel && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-full opacity-75 blur-sm"
              />
            )}
            <span
              className="relative z-10"
              style={{ fontWeight: 700, fontSize: "1.25rem" }}
            >
              {powerWord.rank}
            </span>
          </div>
        </motion.div>

        {/* Power word */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full"
        >
          <div
            className={`p-8 rounded-2xl shadow-xl relative ${
              isGodLevel
                ? "bg-white/90 backdrop-blur-sm border-2 border-yellow-400/50"
                : "bg-gradient-to-br from-gray-50 to-white border border-gray-200"
            }`}
          >
            {isGodLevel && (
              <div className="absolute -top-2 -right-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-4xl">✨</span>
                </motion.div>
              </div>
            )}

            <p
              className={`text-center leading-relaxed ${
                isGodLevel ? "text-gray-900" : "text-gray-800"
              }`}
              style={{
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.8,
              }}
            >
              {powerWord.word}
            </p>
          </div>
        </motion.div>

        {/* Source */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-500 text-sm text-center">
            出典：{powerWord.source}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-full space-y-3 pt-4"
        >
          <button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
            aria-label="このパワーワードをXでシェアする"
          >
            <Share2 size={20} />
            Xでシェアする
          </button>

          <button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
            aria-label="書籍「理工系文学少女、アーキテクトになる。」を購入する"
          >
            <ShoppingBag size={20} />
            書籍を購入する
          </button>

          <button
            onClick={onDrawAgain}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
            aria-label="もう一度おみくじを引く"
          >
            <RotateCcw size={20} />
            もう一度引く
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}