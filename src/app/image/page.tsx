'use client';

import {useEffect, useState} from "react";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import Image from 'next/image'

export default function ImagePage() {
    const [images, setImages] = useState<Image[]>([]);
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchPosts() {
        setIsLoading(true);
        const imageResult: ImageResult = await fetch(`/api/image?cursor=${encodeURIComponent(cursor || '')}`)
            .then((res) => res.json())
        setImages(images.concat(imageResult.images));
        setCursor(imageResult.cursor);
        setHasMore(imageResult.hasMore);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <div className='flex flex-col items-center w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {images && images.map(((blob, index) => (
                <Image key={`image-${index}`} src={blob.url} alt='image' width={256} height={256 / 16 * 9} className='bg-opacity-50 bg-neutral-700'/>
            )))}
            </div>
            <button className='mt-2 inline-flex justify-center items-center' disabled={!hasMore} onClick={fetchPosts}>
                <ArrowPathIcon className={`size-5 mr-2 ${isLoading ? 'animate-spin' : ''}`}/>
                load more
            </button>
        </div>
    )

}