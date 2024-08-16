import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Photo } from "../App/App.types";


interface Props {
  items: Photo[];
  onImgClick: (image: Photo) => void;
}

export default function ImageGallery({ items, onImgClick }: Props) {
  return (
    <ul className={css.container}>
      {items.map((item, index) => (
        <li key={`${item.id}-${index}`} className={css.cardItem}>
          <ImageCard
            src={item.urls.small}
            alt={item.alt_description}
            onClick={() => onImgClick(item)}
            likes={item.likes}
          />
        </li>
      ))}
    </ul>
  );
}

