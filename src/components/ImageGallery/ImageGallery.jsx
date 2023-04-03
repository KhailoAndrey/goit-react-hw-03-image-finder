import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'services/fetch';
import { ImageGalleryList } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const searchText = this.props.searchText.trim();
    if (prevProps.searchText !== searchText && searchText) {
      getImages(searchText).then(({ hits }) => {
        this.setState({ images: hits });
      });
    }
  }
  render() {
    const { images } = this.state;
    return (
      images && (
        <ImageGalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
            />
          ))}
        </ImageGalleryList>
      )
    );
  }
}
