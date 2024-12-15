interface ExerciseImage {
    id: number;
    title: string;
    description: string;
    imagePath: string;
    updatedAt: Date;
}

interface ImageResult {
    images: ExerciseImage[];
    cursor?: string;
    hasMore: boolean;
}
