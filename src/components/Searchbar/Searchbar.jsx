import { Component } from 'react';
import { SearchHeader, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    value: '',
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createSearchText(this.state.value);
  };
  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit"></SearchFormButton>

          <SearchFormInput
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
