type ArtItem = {
    id: number;
    title: string;
    artist_title: string;
    image_id: string;
};

export type FavoriteItem = ArtItem & {
    timestamp: number;
};

export type GridItem = ArtItem & {
    tileIndex: number;
};
