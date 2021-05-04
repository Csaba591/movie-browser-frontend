export interface Movie {
    title: string;
    year:  number;
    ids:   MovieIds;
}

export interface MovieIds {
    trakt: number;
    slug:  string;
    imdb:  string;
    tmdb:  number;
}
