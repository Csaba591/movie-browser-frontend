import { Ids } from './ids.model';

export interface Actor {
    name: string;
    ids: Ids;
    social_ids: SocialIds;
    biography: string;
    birthday: Date;
    death: Date;
    birthplace: string;
    homepage: string;
}

export interface SocialIds {
    twitter: string;
    facebook: string;
    instagram: string;
    wikipedia: string;
}
