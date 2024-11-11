import { ModalProps } from "./Modal.type";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import React from "react";
import ReactModal from "react-modal";

const Modal: React.FC<ModalProps> = ({
  id = undefined,
  isOpen,
  closeOnClickOverlay = true,
  onRequestClose,
  className,
  onCloseEnd,
  children,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const animationDuration = 200; //millis
  const controls = useAnimation();
  const initialState = { transform: "translateY(20px)", opacity: 0 };

  const handleClose = () => {
    controls.start("hidden");
    setTimeout(() => {
      setModalIsOpen(false);
      onCloseEnd?.();
    }, animationDuration);
  };

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
      setTimeout(() => {
        controls.start("visible");
      }, 50);
    } else if (modalIsOpen) {
      handleClose();
    }
  }, [controls, isOpen, modalIsOpen]);

  return (
    <ReactModal
      id={id}
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={closeOnClickOverlay}
      className={"noClass"}
      appElement={document.getElementById("root") as HTMLElement}
      overlayClassName={"noClass"}
    >
      <motion.div
        animate={controls}
        variants={{
          visible: { backgroundColor: "rgba(0,0,0,0.5)" },
          hidden: { backgroundColor: "rgba(0,0,0,0)" },
        }}
        transition={{
          duration: animationDuration / 1000,
        }}
        className="fixed inset-0 flex items-center justify-center"
        onClick={closeOnClickOverlay ? onRequestClose : undefined}
      >
        <motion.div
          className={clsx("max-h-[90vh] overflow-y-auto", className)}
          initial={initialState}
          variants={{
            visible: { transform: "translateY(0px)", opacity: 1 },
            hidden: initialState,
          }}
          transition={{ duration: animationDuration / 1000 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </ReactModal>
  );
};

export default Modal;
