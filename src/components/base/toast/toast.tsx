import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { IcTickCircle } from '@/components/icons/IcTickCircle';

export const Toast = ({
  type,
  children,
}: {
  type: 'error' | 'success' | 'warning';
  children: React.ReactNode;
}) => {
  // Define type-specific styles
  const typeStyles = {
    warning: 'border-brand-yellow bg-white',
    error: 'border-red-500 bg-red-100 text-red-600',
    success: 'border-green-500 bg-green-100 text-green-600',
  };
  const typeIcon = {
    warning: <IcExclamationMarkInCircle className="fill-none" />,
    error: <IcXCircle></IcXCircle>,
    success: <IcTickCircle></IcTickCircle>,
  };

  // Ensure a valid type and fall back to 'warning' if needed
  const toastTypeStyle = typeStyles[type] || typeStyles.warning;

  return (
    <motion.div
      initial={{ scale: 0.9, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: -20 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={clsx(
        'flex h-10 items-center gap-2 text-nowrap rounded-xl border-2 p-3 px-7 text-sm font-bold',
        toastTypeStyle,
      )}
    >
      {typeIcon[type]}
      {children}
    </motion.div>
  );
};
