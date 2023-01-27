import PropTypes from 'prop-types';
import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.value);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmit}>
          <button className={css.searchform__button}>
            <span className={css.searchform__buttonLabel}>
              <FaSearch />
            </span>
          </button>
          <input
            className={css.searchform__input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
