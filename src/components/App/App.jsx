import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';
import { getImagesWithQuery } from 'services/api';

export class App extends Component {
  state = {
    showModal: false,
    selectedImage: null,
    searchQuery: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevState.page !== nextPage) {
      this.addImages(nextQuery, nextPage);
    }
  }

  addImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const items = await getImagesWithQuery(query, page);
      if (items.hits.length === 0) {
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (page === 1) {
        toast.success(`Hooray! We found ${items.totalHits} images.`);
      }

      this.setState(({ images }) => ({
        images: [...images, ...items.hits],
        total: items.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) return;
    this.setState({
      page: 1,
      searchQuery,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: largeImageURL,
    }));
  };

  render() {
    const { showModal, error, isLoading, images, total, selectedImage, tags } =
      this.state;
    const isLastPage = images.length === total;
    return (
      <Container>
        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}
        {images.length > 0 && !isLastPage && (
          <Button onClick={this.loadMore}></Button>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImage} alt={tags} />
          </Modal>
        )}
      </Container>
    );
  }
}
