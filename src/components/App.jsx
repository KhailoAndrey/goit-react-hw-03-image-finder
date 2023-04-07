import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppMain } from './App.styled';

export class App extends Component {
  state = {
    searchText: '',
  };
  createSearchText = searchText => {
    this.setState({ searchText });
  };
  render() {
    return (
      <AppMain>
        <Searchbar createSearchText={this.createSearchText} />
        <ImageGallery searchText={this.state.searchText} />
      </AppMain>
    );
  }
}
