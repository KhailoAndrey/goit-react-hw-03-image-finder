import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li key={this.props.id} className="gallery-item">
        <img src={this.props.webformatURL} alt="" />
      </li>
    );
  }
}
