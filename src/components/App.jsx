import React from 'react';
import { useState, useEffect } from 'react';

import getImages from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  useEffect(() => {
    const fetchImg = async () => {
      setIsLoading(true);
      const images = await getImages(request, page);

      setImages(prevState => [...prevState, ...images.hits]);
    };

    if (page > 1) {
      fetchImg();
    }
    setIsLoading(false);
  }, [page, request]);

  // async componentDidUpdate(pervProps, prevState) {
  //   const { value, page } = this.state;

  //   if (
  //     (prevState.page !== page && page !== 1) ||
  //     prevState.value !== this.state.value
  //   ) {
  //     this.setState({ isLoading: true });
  //     const images = await getImages(value, page);
  //     this.setState(() => ({
  //       images: [...images, ...hits],
  //       isLoading: false,
  //       totalHits: images.totalHits,
  //     }));
  //   }

  const onSubmit = async value => {
    const page = 1;
    setRequest(value);
    setPage(page);
    setIsLoading(true);

    const images = await getImages(value, page);
    setImages(images.hits);
    setTotalHits(images.totalHits);
    setIsLoading(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = modal => {
    setModal(modal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 ? (
        <ImageGallery images={images} openModal={toggleModal} />
      ) : null}
      {isLoading ? <Loader /> : null}
      {images.length !== 0 && !isLoading && images.length !== totalHits && (
        <Button onClick={loadMore} />
      )}
      {modal && (
        <Modal images={images} modal={modal} closeModal={toggleModal} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
