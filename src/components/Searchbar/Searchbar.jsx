import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  Searchbox,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.warn('Please, enter search query');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Searchbox>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FaSearch size={20}></FaSearch>
        </SearchButton>

        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </Searchbox>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
