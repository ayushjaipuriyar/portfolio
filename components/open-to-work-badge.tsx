'use client';

import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';
import { motion } from 'framer-motion';

export function OpenToWorkBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed top-4 right-4 z-40 sm:top-6 sm:right-6"
        >
            <Status variant="success" className="shadow-lg hover:shadow-xl transition-shadow cursor-default">
                <StatusIndicator variant="success" pulse={true} />
                <StatusLabel>Open to Work</StatusLabel>
            </Status>
        </motion.div>
    );
}
