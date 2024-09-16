

export interface ModalProps {
  isOpen: boolean;
  closeOnClickOverlay?: boolean;
  disableDrag?: boolean;
  background?: string;
  width?: string;
  margin?: string;
  rounded?: string;

  onRequestClose: () => void;
  onCloseEnd?: () => void;
  

  id?: string;
  children?: React.ReactNode;
}
