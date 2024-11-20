import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { IcTickCircle } from '@/components/icons/IcTickCircle';
import { Toast as IToast } from 'react-hot-toast';

export const Toast = ({
  t,
  type,
  children,
}: {
  t?: IToast;
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
      animate={
        t?.visible ? { scale: 1, y: 0 } : { scale: 0.8, y: -40, opacity: 0 }
      }
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={clsx(
        'flex h-10 w-[90vw] min-w-[90vw] items-center gap-2 text-nowrap rounded-xl border-2 p-3 px-3 text-xs font-bold',
        toastTypeStyle,
      )}
    >
      {typeIcon[type]}
      {children}
    </motion.div>
  );
};
