import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { motion, useAnimation } from 'framer-motion';

import { ModalProps } from './Modal.type';
import clsx from 'clsx';
import useScreenSize from '../../../hooks/useScreenSize';

export interface BottomSheetModalProps extends ModalProps {
  disableDrag?: boolean;
  rounded?: string;
  fullScreen?: boolean;
  scroll?: boolean;
  show?: boolean;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  children,
  isOpen,
  show = true,
  onRequestClose,
  onCloseEnd,
  rounded = 'rounded-t-3xl',
  closeOnClickOverlay = true,
  fullScreen,
  className,
  scroll = true,
  disableDrag = false,
  id,
}) => {
  const animationDuration = 200; //millis
  const childRef = React.useRef<HTMLDivElement>(null);
  const screenHeight = useScreenSize().height;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    controls.start('hidden');
    setTimeout(() => {
      setModalIsOpen(false);
      onCloseEnd?.();
    }, animationDuration);
  };

  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
      setTimeout(() => {
        controls.start('visible');
      }, 50);
    } else if (modalIsOpen) {
      handleClose();
    }
  }, [controls, isOpen, modalIsOpen]);

  const [draggable, setDraggable] = useState(!disableDrag);

  useEffect(() => {
    if (!disableDrag) {
      setDraggable(screenHeight * 0.95 > (childRef.current?.clientHeight ?? 0));
    }
  }, [screenHeight, disableDrag]);

  return (
    <ReactModal
      id={id}
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={closeOnClickOverlay}
      className={'noClass'}
      appElement={document.getElementById('root') as HTMLElement}
      overlayClassName={'noclass'}
    >
      <motion.div
        animate={controls}
        variants={{
          visible: { backgroundColor: 'rgba(0,0,0,0.5)' },
          hidden: { backgroundColor: 'rgba(0,0,0,0)' },
        }}
        transition={{
          duration: animationDuration / 1000,
        }}
        className="fixed inset-0 flex items-end justify-center"
        onClick={closeOnClickOverlay ? onRequestClose : undefined}
      >
        <motion.div
          className={clsx(
            className,
            'flex w-[100vw] flex-col bg-white',
            scroll && 'overflow-y-auto',
            fullScreen ? 'max-h-[100vh]' : 'max-h-[90vh]',
            rounded,
          )}
          drag={draggable ? 'y' : false}
          initial="hidden"
          onClick={(e) => e.stopPropagation()}
          dragElastic={0}
          ref={childRef}
          dragConstraints={{ top: 0 }}
          onDragEnd={(_, info) => {
            const shouldClose =
              info.offset.y > 0 &&
              (info.velocity.y > 150 ||
                info.point.y > (window.innerHeight * 80) / 100);

            if (shouldClose) {
              onRequestClose();
            } else {
              controls.start('visible');
            }
          }}
          animate={controls}
          variants={{
            visible: { y: 0 },
            hidden: { y: '100%' },
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400,
            duration: animationDuration / 1000,
          }}
        >
          {show && (
            <div className="mx-auto my-2 h-1 w-12 rounded-3xl bg-gray-400"></div>
          )}
          {children}
        </motion.div>
      </motion.div>
    </ReactModal>
  );
};

export default BottomSheetModal;
