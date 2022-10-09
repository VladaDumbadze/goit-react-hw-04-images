import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, tags, openModal }) => {
  return (
    <li className="ImageGalleryItem" onClick={openModal}>
      <img src={url} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
