export interface ModalProps {
  isOpen: boolean;
  closeOnClickOverlay?: boolean;
  disableDrag?: boolean;
  className?: string;
  positionY?: 'center' | 'start' | 'end';
  positionX?: 'center' | 'start' | 'end';
  onRequestClose: () => void;
  onCloseEnd?: () => void;

  id?: string;
  children?: React.ReactNode;
}
