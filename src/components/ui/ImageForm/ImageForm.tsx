'use client';

import Image from 'next/image';
import PreviewImagePlaceholder from "@/components/ui/Exercise/PreviewImagePlaceholder";
import {useState} from "react";
import {SaveButton} from "@/components/ui/SaveButton/SaveButton";

export type ImageEditFormProps = {
    action: (formData: FormData) => void;
    image?: ExerciseImage | undefined;
}

export default function ImageForm({action, image}: ImageEditFormProps) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(image && image.imageUrl);

    const submitFn = (formData: FormData) => {
        action(formData);
        setImageUrl(undefined);
    }

    const ImageElement = imageUrl ?
        <Image src={imageUrl} width={640} height={360} alt='Image Representation of an exercise'
               className='object-cover'/> :
        <PreviewImagePlaceholder width={640} height={360}/>;

    const updatePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result as string;
                setImageUrl(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='flex flex-col gap-4 justify-center items-center w-full'>
            {ImageElement}
            <fieldset id='image-form'>
                <form className='grid grid-cols-3 gap-4 items-center w-full'>
                    <label className='text-lg mr-5 col-span-1' htmlFor="image">Image:</label>
                    <input className='col-span-2' type="file" required={true} name='image'
                           accept={'.jpg,.jpeg,.png,.gif'} onChange={updatePreview}/>
                    <input type="hidden" name="prevImagePath" value={image?.imageUrl}/>
                    <label className='text-lg mr-5 col-span-1' htmlFor="title">Title:</label>
                    <input className='col-span-2' type='text' required={true} name='title'
                           placeholder='A descriptive title'/>
                    <label className='text-lg mr-5 col-span-1' htmlFor="description">Description:</label>
                    <input className='col-span-2' type='text' required={true} name='description'
                           placeholder='A description'/>
                    <SaveButton submitFn={submitFn} additionalClassNames='col-span-1 col-start-2'/>
                </form>
            </fieldset>
        </div>
    );
}