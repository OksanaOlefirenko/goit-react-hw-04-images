import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';
import { getImagesWithQuery } from 'services/api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    addImages(searchQuery, page);
  }, [searchQuery, page]);

  const addImages = async (query, page) => {
    try {
      setIsLoading(true);
      const items = await getImagesWithQuery(query, page);
      if (items.hits.length === 0) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (page === 1) {
        toast.success(`Hooray! We found ${items.totalHits} images.`);
      }

      setImages(prevImages => [...prevImages, ...items.hits]);
      setTotal(items.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = newSearchQuery => {
    if (newSearchQuery === searchQuery) return;
    setPage(1);
    setSearchQuery(newSearchQuery);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(prevState => !prevState);
    setSelectedImage(largeImageURL);
    setTags(tags);
  };

  const isLastPage = images.length === total;

  return (
    <Container>
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {images.length > 0 && !isLastPage && <Button onClick={loadMore}></Button>}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedImage} alt={tags} />
        </Modal>
      )}
    </Container>
  );
};
