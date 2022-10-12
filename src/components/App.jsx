import React, { Component } from 'react';

import getImages from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    isLoading: false,
    modal: '',
  };

  async componentDidUpdate(pervProps, prevState) {
    const { value, page } = this.state;

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });
      const images = await getImages(value, page);
      this.setState(() => ({
        images: [...this.state.images, ...images.hits],
        isLoading: false,
      }));
    }
  }
  onSubmit = async value => {
    const page = 1;
    this.setState({
      value: value,
      isLoading: true,
      page: page,
    });

    const images = await getImages(value, page);
    // if (images.totalHits === 0) {
    //   this.setState({ images: [], error: true, isLoading: false });
    //   toast.warning('Nothing found. Try another search.');
    //   return;
    // }
    // toast.info(`Found ${images.totalHits} images`);
    this.setState({
      images: images.hits,
      totalHits: images.totalHits,
      isLoading: false,
    });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = modal => {
    this.setState({ modal });
  };
  render() {
    console.log(getImages('cat', 1));
    const { images, isLoading, totalHits, modal } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 ? (
          <ImageGallery images={images} openModal={this.toggleModal} />
        ) : null}
        {isLoading ? <Loader /> : null}
        {images.length !== 0 && !isLoading && images.length !== totalHits && (
          <Button onClick={this.loadMore} />
        )}
        {modal && (
          <Modal images={images} modal={modal} closeModal={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
