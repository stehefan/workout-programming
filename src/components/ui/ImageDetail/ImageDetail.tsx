'use client';

import Image from "next/image";
import {ArrowPathIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {deleteImage} from "@/app/image/actions";

const IMAGE_WIDTH = 200;

export type ImageDetailProps = {
    image: ExerciseImage;
    width?: number;
    height?: number;
}

export function ImageDetail({image, width, height}: ImageDetailProps) {
    const [actionIsPending, setActionIsPending] = useState(false);

    const deleteAction = () => {
        setActionIsPending(true);
        deleteImage(image.id)
    }

    const imageWidth = width ?? IMAGE_WIDTH;
    const imageHeight = height ?? imageWidth / 16 * 9;

    const Icon = actionIsPending
        ? <ArrowPathIcon className='size-5 mr-2 animate-spin'/>
        : <TrashIcon className='size-5 mr-2'/>

    return (
        <div className='border rounded-lg flex flex-row w-4/10'>
            <Image src={image.imageUrl} alt='image' width={imageWidth} height={imageHeight}
                   className='bg-opacity-50 bg-neutral-700 object-cover rounded-tl-lg rounded-bl-lg'/>
            <div className='flex flex-col stretch p-2 w-full h-full'>
                <span className='font-bold text-lg'>{image.title}</span>
                <p>{image.description}</p>
                <div className='inline-flex justify-center grow'>
                    <button className='self-end text-red-500 inline-flex justify-center items-center'
                            onClick={deleteAction}>
                        {Icon}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}