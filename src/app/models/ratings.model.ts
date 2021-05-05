export interface Ratings {
    rating: number;
    votes: number;
    distribution: { [key: string]: number };
}
