import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center p-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-6"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="35" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
          <circle cx="40" cy="40" r="30" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
          <circle cx="40" cy="40" r="25" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <circle cx="40" cy="40" r="20" fill="#3b82f6" opacity="0.8" />
          <line x1="20" y1="40" x2="60" y2="40" stroke="white" strokeWidth="2" />
          <line x1="40" y1="20" x2="40" y2="60" stroke="white" strokeWidth="2" />
        </svg>
      </motion.div>
      
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-blue-600 text-sm"
        style={{ fontWeight: 500 }}
      >
        運命のワードを選んでいます...
      </motion.p>
    </motion.div>
  );
}
