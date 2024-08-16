import { useEffect, useState } from "react";
import { fetchPhotos } from "../../photos-api";
import toast, { Toaster } from 'react-hot-toast';
import { Photo } from "./App.types";
import { FetchPhotosResponse } from "./App.types";
import SearchBar from "../SeachBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import css from "./App.module.css";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [onImg, setOnImg] = useState<Photo | null>(null);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  const handleSearch = async (newTopic: string): Promise<void> => {
    setPhotos([]);
    setPage(1);
    setTopic(newTopic);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const modalOpen = (image: Photo): void => {
    setOnImg(image);
    setisModalOpen(true);
  };

  const modalClosed = (): void => {
    setOnImg(null);
    setisModalOpen(false);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getPhotos(): Promise<void> {
      try {
        setLoading(true);
        setError(false);
        const data: FetchPhotosResponse = await fetchPhotos(topic, page);
        if (data.results.length === 0 && page === 1) {
          toast.error("Sorry, no photo matching your request :(");
        } else {
          setTotalPages(data.total_pages);
          setPhotos(prevPhotos => [...prevPhotos, ...data.results]);
        }
      } catch (error) {
        toast.error("Please, try to reload this page!");
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPhotos();
  }, [page, topic]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {photos.length > 0 && <ImageGallery items={photos} onImgClick={modalOpen} />}
      {photos.length > 0 && !loading && !(page >= totalPages) && <LoadMoreBtn onClick={handleLoadMore} />}
      {page === totalPages && <p className={css.lastPageTxt}>Sorry, this is the last page for now! ☹️</p>}
      <ImageModal isOpen={isModalOpen} onRequestClose={modalClosed} img={onImg} />
      <Toaster position="top-right" />
    </div>
  );
}
