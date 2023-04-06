import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import Notiflix from 'notiflix';
import { getImages } from 'services/fetch';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const searchText = this.props.searchText.trim();
    if (prevProps.searchText !== searchText && searchText) {
      this.setState({ isLoading: true });
      getImages(searchText)
        .then(({ hits }) => {
          this.setState({ images: hits });
        })
        .catch(error) {
          console.log(error);
          this.setState({ error });
        }
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  render() {
    const { images, error, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {error && Notiflix.Notify.failure(error.message)}
        {images && (
          <ImageGalleryList>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
              />
            ))}
          </ImageGalleryList>
        )}
      </>
    );
  }
}
