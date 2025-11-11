'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppleHelloEnglishEffect from '@/components/ui/shadcn-io/apple-hello-effect';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAnimationComplete = () => {
    // Wait a bit after animation completes, then fade out
    setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after fade out animation
      setTimeout(onComplete, 800);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="flex items-center justify-center">
            <AppleHelloEnglishEffect speed={0.3} onAnimationComplete={handleAnimationComplete} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
