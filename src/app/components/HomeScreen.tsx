import { motion } from 'motion/react';
import coverImg from '../assets/cover-img.jpg';

interface HomeScreenProps {
  onDrawOmikuji: () => void;
}

export function HomeScreen({ onDrawOmikuji }: HomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex flex-col items-center justify-between p-6 relative overflow-hidden"
    >
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#3b82f6" />
              <circle cx="90" cy="90" r="2" fill="#3b82f6" />
              <line x1="10" y1="10" x2="50" y2="10" stroke="#3b82f6" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="50" stroke="#3b82f6" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="90" y2="90" stroke="#3b82f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Header */}
      <div className="w-full max-w-md pt-8 z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-gray-900 mb-2" style={{ fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.3 }}>
            理工系文学少女、
          </h1>
          <h1 className="text-blue-600 mb-3" style={{ fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 }}>
            アーキテクト<span className="text-gray-900">になる。</span>
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full my-4" />
          <p className="text-gray-600 text-sm px-4" style={{ lineHeight: 1.6 }}>
            〜不確実な時代を漂うエンジニア(仮)のためのサバイバル術〜
          </p>
        </motion.div>
      </div>

      {/* Main content with illustration */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex-1 flex items-center justify-center w-full max-w-md z-10"
      >
        <div className="w-full aspect-square max-w-sm relative">
          <img
            src={coverImg}
            alt="カフェで対話する二人の少女"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Bottom section with button */}
      <div className="w-full max-w-md pb-8 z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-center text-gray-700 text-sm mb-6">
            今のあなたにぴったりの
            <br />
            <span className="text-blue-600" style={{ fontWeight: 500 }}>パワーワード</span>を受け取りましょう
          </p>

          <button
            onClick={onDrawOmikuji}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontWeight: 600 }}
            aria-label="おみくじを引いて、あなたへのパワーワードを受け取る"
          >
            おみくじを引く
          </button>

          <p className="text-center text-gray-400 text-xs mt-4">
            技術書典20にて新刊として頒布します
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}