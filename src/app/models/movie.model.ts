export interface Movie {
    title: string;
    year: number;
    ids: MovieIds;
    tagline: string;
    overview: string;
    released: Date;
    runtime: number;
    country: string;
    updated_at: Date;
    trailer: string;
    homepage: string;
    status: string;
    rating: number;
    votes: number;
    comment_count: number;
    language: string;
    available_translations: string[];
    genres: string[];
    certification: string;
}

export interface MovieIds {
    trakt: number;
    slug: string;
    imdb: string;
    tmdb: number;
}
