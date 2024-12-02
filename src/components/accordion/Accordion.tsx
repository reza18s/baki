import clsx from 'clsx';
import React from 'react';
import Card from './Card';
import { AnimatePresence, motion } from 'framer-motion';
import { IcArrowRight } from '../icons/IcArrowRight';

interface AccordionProps {
  title: string;
  open: boolean;
  content: string;
  onToggle: (open: boolean) => void;
  className?: string;
  arrowClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  open,
  content,
  onToggle,
  className,
  arrowClassName = 'text-warning-100 h-4 w-4 transition-transform',
}) => {
  return (
    <Card className="rounded-xl border border-gray-300 bg-white px-4 py-3">
      <div
        className={className || 'flex items-center justify-between gap-1'}
        onClick={() => onToggle(!open)}
      >
        <h1 className="text-sm font-medium">{title}</h1>
        <IcArrowRight
          className={clsx(
            arrowClassName,
            'flex-shrink-0 transition-transform duration-500',
            open ? '-rotate-90' : 'rotate-90',
          )}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <h2 className="mt-4 text-justify text-sm text-gray-500">
              {content}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
export default Accordion;
