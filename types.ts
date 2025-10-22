export interface Creator {
  id: number;
  name: string;
  handle: string;
  imageUrl: string;
  bio: string;
  socials: {
    [key: string]: string;
  };
}

export interface Episode {
  id: number;
  title: string;
  duration: string;
}

export interface Series {
  id: number;
  title: string;
  creator: string;
  imageUrl: string;
  genre: string;
  synopsis: string;
  cast: string[];
  episodes: Episode[];
  featured?: boolean;
  averageRating?: number;
  ratingCount?: number;
}