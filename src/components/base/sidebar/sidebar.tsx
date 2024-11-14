import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import useScreenSize from '../../../hooks/useScreenSize';
import { ModalProps } from '../Modal/Modal.type';

export interface SidebarProps extends ModalProps {
  disableDrag?: boolean;
  rounded?: string;
  scroll?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen,
  onRequestClose,
  onCloseEnd,
  closeOnClickOverlay = true,
  scroll = true,
  disableDrag = false,
  className,
  id,
}) => {
  const animationDuration = 300; // in seconds
  const controls = useAnimation();
  const screenWidth = useScreenSize().width;
  const childRef = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    controls.start('hidden').then(() => {
      setModalIsOpen(false);
      onCloseEnd?.();
    });
  };

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
      setTimeout(() => {
        controls.start('visible');
      }, 50);
    } else if (modalIsOpen) {
      handleClose();
    }
  }, [isOpen, controls, modalIsOpen]);

  const draggable =
    !disableDrag && screenWidth * 0.95 > (childRef.current?.clientWidth ?? 0);

  return (
    <ReactModal
      id={id}
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={closeOnClickOverlay}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      className="fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-md outline-none"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 flex justify-start"
        onClick={closeOnClickOverlay ? onRequestClose : undefined}
      >
        {/* Sidebar Content */}
        <motion.div
          ref={childRef}
          initial={{ x: '100%' }}
          animate={controls}
          variants={{
            visible: { x: 0 },
            hidden: { x: '100%' },
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400,
            duration: animationDuration,
          }}
          drag={draggable ? 'x' : false}
          dragElastic={0}
          dragConstraints={{ left: 0 }}
          onDragEnd={(_, info) => {
            const shouldClose =
              info.offset.x > 0 &&
              (info.velocity.x > 150 || info.point.x > window.innerWidth * 0.8);

            if (shouldClose) {
              onRequestClose();
            } else {
              controls.start('visible');
            }
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks within sidebar from closing it
          className={clsx(
            className,
            'max-w-[90%] bg-white p-4 shadow-lg',
            scroll && 'overflow-y-auto',
          )}
        >
          {children}
        </motion.div>
      </div>
    </ReactModal>
  );
};

export default Sidebar;
