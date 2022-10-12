import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    this.props.onSubmit(this.state.value);
    // this.setState({ value: '' });
  };

  render() {
    // console.log(this.props);
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
