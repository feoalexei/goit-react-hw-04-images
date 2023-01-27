import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import fetchPictures from 'services/pictures-api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [fullImage, setFullImage] = useState('');
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      getImages(query, page);
    }
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPictures([]);
    setPage(1);

    if (query.trim() === '') {
      Notiflix.Notify.info('Please specify your query');
      return;
    }
  };

  const getImages = (query, page) => {
    setIsFetching(true);
    setShowLoadMoreBtn(true);

    fetchPictures(query, page)
      .then(data => {
        if (data.data.hits.length === 0) {
          Notiflix.Notify.info('Sorry, there are no results on your query');
        }
        if (data.data.hits.length < 12) {
          setShowLoadMoreBtn(false);
        }
        setPictures(prevPictures => [...prevPictures, ...data.data.hits]);
      })
      .catch(error => console.log(error))
      .finally(() => setIsFetching(false));
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setFullImage('');
  };

  const showFullImage = fullImage => {
    setFullImage(fullImage);
  };

  return (
    <>
      <Searchbar onSearch={handleSubmit} />
      <ImageGallery pictures={pictures} showFullImage={showFullImage} />
      {pictures.length !== 0 && showLoadMoreBtn && !isFetching && (
        <Button onLoadMore={loadMore} />
      )}
      {isFetching && <Loader />}
      {fullImage && <Modal onClose={toggleModal} fullImage={fullImage} />}
    </>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     pictures: [],
//     page: 1,
//     isFetching: false,
//     fullImage: '',
//     showLoadMoreBtn: true,
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (prevState.page !== page || prevState.query !== query) {
//       this.getImages();
//     }
//   }

//   handleSubmit = query => {
//     this.setState({ query: query, pictures: [], page: 1 });
//     if (query.trim() === '') {
//       Notiflix.Notify.info('Please specify your query');
//       return;
//     }
//   };

//   getImages = () => {
//     const { query, page } = this.state;

//     this.setState({
//       isFetching: true,
//       showLoadMoreBtn: true,
//     });

//     fetchPictures(query, page)
//       .then(data => {
//         if (data.data.hits.length === 0) {
//           Notiflix.Notify.info('Sorry, there are no results on your query');
//         }
//         if (data.data.hits.length < 12) {
//           this.setState({ showLoadMoreBtn: false });
//         }
//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...data.data.hits],
//         }));
//       })
//       .catch(error => console.log(error))
//       .finally(() => this.setState({ isFetching: false }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = () => {
//     this.setState({ fullImage: '' });
//   };

//   showFullImage = fullImage => {
//     this.setState({ fullImage });
//   };

//   render() {
//     const { pictures, isFetching, fullImage, showLoadMoreBtn } = this.state;
//     return (
//       <>
//         <Searchbar onSearch={this.handleSubmit} />
//         <ImageGallery pictures={pictures} showFullImage={this.showFullImage} />
//         {pictures.length !== 0 && showLoadMoreBtn && !isFetching && (
//           <Button onLoadMore={this.loadMore} />
//         )}
//         {isFetching && <Loader />}
//         {fullImage && (
//           <Modal onClose={this.toggleModal} fullImage={fullImage} />
//         )}
//       </>
//     );
//   }
// }
