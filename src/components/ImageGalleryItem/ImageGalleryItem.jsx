import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClick,
}) => {
  return (
    <GalleryItem onClick={() => onClick(largeImageURL)}>
      <GalleryImg src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
