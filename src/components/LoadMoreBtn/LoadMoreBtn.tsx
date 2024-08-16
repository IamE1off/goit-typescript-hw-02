import css from "./LoadMoreBtn.module.css"

interface LoadMoreBtn {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtn) {
  return (
     <button className={css.loadMoreBtn} onClick={onClick}>Load more</button>
  )
}