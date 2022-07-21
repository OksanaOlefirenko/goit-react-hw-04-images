import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  Searchbox,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Please, enter search query');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Searchbox>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FaSearch size={20}></FaSearch>
          </SearchButton>

          <SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </Searchbox>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
