import React from 'react';
import {Workout} from "@/types/Exercise";
import Image from "next/image";
import Link from "next/link";

export type WorkoutPreviewProps = {
    workout: Workout;
}

export default function WorkoutPreview(props: WorkoutPreviewProps) {
    if (!props.workout.sections) {
        return <></>
    }

    const exercises: React.JSX.Element[] = props.workout.sections
        .flatMap((section) => {
            return section.exercises?.filter(exercise => exercise.previewImageUrl !== undefined) ?? [];
        })
        .map((exercise) => {
            const width = 128;
            return <Image key={exercise.id}
                          src={exercise.previewImageUrl!}
                          width={width}
                          height={width / 16 * 9}
                          alt={exercise.exerciseName}
            />
        }).slice(0, 8)


    return (

        <Link href={`/workout/${props.workout.id}`} className='relative max-w-lg w-full rounded-2xl overflow-hidden'>
            <div className='pointer-events-none select-none grid grid-cols-4 grid-rows-2'>{exercises}</div>
            <div className='inline-flex text-2xl sm:text-4xl backdrop-blur-sm backdrop-grayscale text-white w-full h-full font-extrabold absolute top-0 left-0 justify-center items-center'>{props.workout.name}</div>
        </Link>
    );
}


