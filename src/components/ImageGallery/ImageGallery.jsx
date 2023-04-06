import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import Notiflix from 'notiflix';
import { getImages } from 'services/fetch';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default class ImageGallery extends Component {
  state = {
    images: [],
    status: STATUS.IDLE,
  };

  componentDidUpdate(prevProps) {
    const searchText = this.props.searchText.trim();
    if (prevProps.searchText !== searchText && searchText) {
      this.setState({ status: STATUS.PENDING });
      getImages(searchText)
        .then(data => {
          if (data.status === 'error') {
            return Promise.reject(data.message);
          }
          this.setState({
            images: data.hits,
            status: STATUS.RESOLVED,
          });
        })
        .catch(error => {
          this.setState({ error, status: STATUS.REJECTED });
        });
    }
  }
  render() {
    const { images, status } = this.state;
    if (status === STATUS.PENDING) return <Loader />;
    else if (status === STATUS.RESOLVED)
      return (
        <ImageGalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
            />
          ))}
        </ImageGalleryList>
      );
    else if (status === STATUS.REJECTED)
      return Notiflix.Notify.failure('Что-то пошло не так ...');
  }
}
