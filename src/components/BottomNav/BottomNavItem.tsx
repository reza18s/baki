import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  Icon: ReactNode;
  isActive: boolean;
}
export const BottomNavItem: FC<Props> = ({ Icon, isActive }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={clsx(
        'relative flex flex-col items-center justify-center gap-1 py-3 text-center',
        isActive ? 'text-brand-yellow opacity-100' : 'text-gray-800 opacity-75',
      )}
    >
      {isActive && (
        <motion.div
          layoutId="bottom-navigator-indicator"
          layout="position"
          className="bg absolute top-0 h-[2px] w-10 rounded-b-lg bg-brand-yellow"
        />
      )}
      <div className="">{Icon}</div>
    </motion.div>
  );
};
