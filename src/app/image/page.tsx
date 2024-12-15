'use client';

import {useEffect, useState} from "react";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import Image from 'next/image'
import {getFullImageUrl} from "@/app/utils";

export default function ImagePage() {
    const [images, setImages] = useState<ExerciseImage[]>([]);
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchImages() {
        setIsLoading(true);
        const imageResult: ImageResult = await fetch(`/api/image?cursor=${encodeURIComponent(cursor || '')}`)
            .then((res) => res.json())
        setImages(images.concat(imageResult.images));
        setCursor(imageResult.cursor);
        setHasMore(imageResult.hasMore);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchImages()
    }, [])


    return (
        <div className='flex flex-col items-center w-full'>
            <div className='grid grid-cols-1 gap-4'>
            {images && images.map(((blob, index) => (
                <div key={`image-${index}`}>
                    <Image src={getFullImageUrl(blob.imagePath)} alt='image' width={256} height={256 / 16 * 9} className='bg-opacity-50 bg-neutral-700'/>
                    <span>{getFullImageUrl(blob.imagePath).substring("https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/".length)}</span>
                </div>
            )))}
            </div>
            <button className='mt-2 inline-flex justify-center items-center' disabled={!hasMore} onClick={fetchImages}>
                <ArrowPathIcon className={`size-5 mr-2 ${isLoading ? 'animate-spin' : ''}`}/>
                load more
            </button>
        </div>
    )

}