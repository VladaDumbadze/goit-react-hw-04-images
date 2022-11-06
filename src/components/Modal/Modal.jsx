import PropTypes from 'prop-types';
import { useEffect } from 'react';
export default function Modal({ images, modal, toggleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = event => {
    (event.key === 'Escape' || event.target === event.currentTarget) &&
      toggleModal();
  };
  return (
    <div class="Overlay" onClick={closeModal}>
      <div class="Modal">
        {images.map(image =>
          modal === `${image.id}` ? (
            <img src={image.largeImageURL} alt={image.tags} key={image.id} />
          ) : null
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  modalId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
