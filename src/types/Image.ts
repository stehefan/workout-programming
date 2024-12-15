interface ExerciseImage {
    id: number;
    title: string;
    description: string;
    imagePath: string;
    createdAt: Date;
}

interface ImageResult {
    images: ExerciseImage[];
    cursor?: string;
    hasMore: boolean;
}
