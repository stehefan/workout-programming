interface Image {
    url: string;
    uploadedAt: Date;
}

interface ImageResult {
    images: Image[];
    cursor?: string;
    hasMore: boolean;
}
