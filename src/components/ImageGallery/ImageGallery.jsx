import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/fetch';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { LoadMoreBtn } from 'components/Button/Button';

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
    isLoadMore: true,
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };
  componentDidUpdate(prevProps, prevState) {
    const searchText = this.props.searchText.trim();
    const { currentPage } = this.state;

    if (prevProps.searchText !== searchText && searchText) {
      this.setState({
        status: STATUS.PENDING,
        currentPage: 1,
        images: [],
        isLoadMore: true,
      });
      getImages(searchText, 1)
        .then(data => {
          if (data.totalHits === 0) {
            this.setState({ status: STATUS.RESOLVED, isLoadMore: false });
            return Notiflix.Notify.info(
              'Ничего не найдено. Попробуйте изменить запрос.'
            );
          }
          if (data.totalHits <= 12) {
            this.setState({ status: STATUS.RESOLVED, isLoadMore: false });
            Notiflix.Notify.info('<Больше картинок не найдено.>');
          }
          if (data.status === 'error') {
            return Promise.reject(data.message);
          }
          const imageArr = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          this.setState({
            images: imageArr,
            status: STATUS.RESOLVED,
          });
        })
        .catch(error => {
          this.setState({ error, status: STATUS.REJECTED });
        });
    }

    if (prevState.currentPage !== currentPage && currentPage !== 1) {
      this.setState({ status: STATUS.PENDING });
      getImages(searchText, currentPage)
        .then(data => {
          if (Math.floor(data.totalHits / currentPage) < 12) {
            this.setState({ status: STATUS.RESOLVED, isLoadMore: false });
            Notiflix.Notify.info('<Больше картинок не найдено.>');
          }
          if (data.totalHits === 0) {
            return Notiflix.Notify.info(
              'Ничего не найдено. Попробуйте изменить запрос.'
            );
          }
          const imageArr = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          this.setState(prevState => ({
            images: [...prevState.images, ...imageArr],
            status: STATUS.RESOLVED,
          }));
        })
        .catch(error => {
          this.setState({ error, status: STATUS.REJECTED });
        });
    }
  }

  loadMoreBtn = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  imageClick = e => {
    const imageId = e.target.id;
    const { images } = this.state;
    const index = images.findIndex(
      image => Number(image.id) === Number(imageId)
    );
    const largeImage = images[index].largeImageURL;
    this.setState({ largeImgURL: largeImage, isShowModal: true });
  };

  render() {
    const {
      isShowModal,
      largeImgURL,
      images,
      status,
      currentPage,
      isLoadMore,
    } = this.state;
    return (
      <>
        {status === STATUS.PENDING && currentPage === 1 && <Loader />}
        {isShowModal && (
          <Modal largeImageURL={largeImgURL} closeModal={this.closeModal} />
        )}
        {images.length > 0 && (
          <>
            <ImageGalleryList onClick={e => this.imageClick(e)}>
              {images.map(image => {
                return (
                  <ImageGalleryItem
                    webformatURL={image.webformatURL}
                    key={image.id}
                    id={image.id}
                    tags={image.tags}
                  />
                );
              })}
            </ImageGalleryList>
            {status === STATUS.RESOLVED && isLoadMore && (
              <LoadMoreBtn onClick={this.loadMoreBtn} />
            )}
            {status === STATUS.PENDING && <Loader />}
          </>
        )}
        {status === STATUS.REJECTED &&
          Notiflix.Notify.failure('Что-то пошло не так ...')}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};
