import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import Notiflix from 'notiflix';
import { getImages } from 'services/fetch';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

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
    isShowModal: false,
    largeImgURL: '',
    currentPage: 1,
  };

  // showModal = () => {
  //   this.setState({ isShowModal: true });
  // };
  closeModal = () => {
    this.setState({ isShowModal: false });
  };
  componentDidUpdate(prevProps) {
    const searchText = this.props.searchText.trim();
    const { currentPage } = this.state;
    if (prevProps.searchText !== searchText && searchText) {
      this.setState({ status: STATUS.PENDING });
      getImages(searchText, currentPage)
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
  imageClick = e => {
    const imageId = e.target.id;
    const { images } = this.state;
    const index = images.findIndex(
      image => Number(image.id) === Number(imageId)
    );
    const largeImage = images[index].largeImageURL;
    this.setState({ largeImgURL: largeImage, isShowModal: true });
  };
  // toggleModal = () => {
  //   this.setState(state => ({ isShowModal: !state.isShowModal }));
  // };
  render() {
    const { isShowModal, largeImgURL, images, status } = this.state;
    if (status === STATUS.PENDING) return <Loader />;
    else if (status === STATUS.RESOLVED)
      return (
        <>
          {isShowModal && (
            <Modal largeImageURL={largeImgURL} closeModal={this.closeModal} />
          )}
          {
            <ImageGalleryList onClick={e => console.log(e)}>
              {images.map(image => (
                <ImageGalleryItem
                webformatURL={image.webformatURL}
                key={image.id}
                />
              ))}
            </ImageGalleryList>
          }
        </>
      );
    else if (status === STATUS.REJECTED)
      return Notiflix.Notify.failure('Что-то пошло не так ...');
  }
}
