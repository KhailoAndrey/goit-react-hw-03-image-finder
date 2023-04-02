import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    searchText: '',
  };
  createSearchText = searchText => {
    this.setState({ searchText });
  };
  render() {
    return (
      <div>
        <Searchbar createSearchText={this.createSearchText} />
        <ImageGallery searchText={this.state.searchText} />
        <ImageGalleryItem />
        <Loader />
      </div>
    );
  }
}
