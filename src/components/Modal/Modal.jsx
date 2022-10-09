import PropTypes from 'prop-types';
import { Component } from 'react';

class Modal extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ).isRequired,
    modal: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    (e.key === 'Escape' || e.target === e.currentTarget) &&
      this.props.closeModal();
  };

  render() {
    const { modal, images } = this.props;
    return (
      <div class="Overlay" onClick={this.closeModal}>
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
}

export default Modal;

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  modals: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
