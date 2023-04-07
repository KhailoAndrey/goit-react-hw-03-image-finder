import PropTypes from 'prop-types';
import { Component } from 'react';
import { DivModal, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }
  handlePressESC = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }
  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <DivModal>
          <img src={this.props.largeImageURL} alt="" />
        </DivModal>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
