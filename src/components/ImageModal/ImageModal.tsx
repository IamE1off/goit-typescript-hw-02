import ReactModal from 'react-modal';
import css from "./ImageModal.module.css"

interface PhotoModal {
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  img: PhotoModal | null;
}

export default function ImageModal({ isOpen, onRequestClose, img }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={200}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      {img && <img src={img.urls.regular} alt={img.alt_description} className={css.modalImage} />}
    </ReactModal>
  );
}
