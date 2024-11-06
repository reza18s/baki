export interface ModalProps {
  isOpen: boolean;
  closeOnClickOverlay?: boolean;
  disableDrag?: boolean;
  className: string;

  onRequestClose: () => void;
  onCloseEnd?: () => void;

  id?: string;
  children?: React.ReactNode;
}
