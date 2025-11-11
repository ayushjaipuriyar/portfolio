'use client';

import { motion } from 'framer-motion';
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';

export function OpenToWorkBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6"
    >
      <Status
        variant="success"
        className="cursor-default shadow-lg transition-shadow hover:shadow-xl"
      >
        <StatusIndicator variant="success" pulse={true} />
        <StatusLabel>Open to Work</StatusLabel>
      </Status>
    </motion.div>
  );
}
