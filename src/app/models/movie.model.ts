export interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: string[];
    production_countries: string[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: string[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Genre {
    id: number;
    name: string;
}
