import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <GalleryItem>
        <GalleryItemImage
          src={this.props.webformatURL}
          id={this.props.id}
          alt={this.props.tags}
        />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
