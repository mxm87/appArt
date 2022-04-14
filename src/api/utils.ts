export const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;

export const getImageURI = (image_id: string, small: boolean = false) => {
    const size = small ? 200 : 843;
    return `https://www.artic.edu/iiif/2/${image_id}/full/${size},/0/default.jpg`;
};

export const getSearchParams = () => {
    return {
        q: "paintings",
        limit: 8,
        page: random(1, 100),
        query: {
            bool: {
                must: [
                    { term: { is_public_domain: true } },
                    {
                        script: {
                            script: "doc['thumbnail.height'].value > doc['thumbnail.width'].value",
                        },
                    },
                ],
            },
        },
    };
};
