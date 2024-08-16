import { IoSearchOutline } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { FormEvent } from "react";
import css from "./SearchBar.module.css";

interface SearchProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget
    const query = (form.elements.namedItem('searchInput') as HTMLInputElement).value.trim()
    if (query) {
      onSearch(query);
      console.log(query);
    } 
    if (query === "") {
      toast("Search field mustn't be empty!")
    }
    form.reset()
  };

  return (
    <header className={css.header}>
      <form className={css.container} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          name="searchInput"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.btn}><IoSearchOutline /></button>
      </form>
      <Toaster position="top-right"/>
    </header>
  );
}
