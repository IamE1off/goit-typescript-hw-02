export interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  likes: string;
}

export interface FetchPhotosResponse {
  results: Photo[];
  total_pages: number;
}
