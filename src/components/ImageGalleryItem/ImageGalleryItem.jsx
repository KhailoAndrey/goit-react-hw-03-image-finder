import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <GalleryItem>
        <GalleryItemImage
          src={this.props.webformatURL}
          id={this.props.id}
          alt="image"
        />
      </GalleryItem>
    );
  }
}
