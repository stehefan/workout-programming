import React from 'react';
import {ExerciseEntry, Section, Workout} from "@/types/Exercise";
import Image from "next/image";
import Link from "next/link";

const NUMBER_OF_PREVIEW_IMAGES = 8;
export type WorkoutPreviewProps = {
    workout: Workout;
}

function topUpPreviewImages(exercises: ExerciseEntry[]): ExerciseEntry[] {
    const result = [...exercises];

    while (result.length < NUMBER_OF_PREVIEW_IMAGES && exercises.length > 0) {
        const remaining = NUMBER_OF_PREVIEW_IMAGES - result.length;
        const toAdd = exercises.slice(0, remaining);
        result.push(...toAdd);
    }

    return result;
}

export default function WorkoutPreview(props: WorkoutPreviewProps) {
    if (!props.workout.sections) {
        return <></>
    }

    const exercisesWithImages = props.workout.sections
        .flatMap((section: Section): ExerciseEntry[] => {
            return section.exercises?.filter(exercise => exercise.previewImageUrl !== undefined) ?? [];
        });

    const exercises = topUpPreviewImages(exercisesWithImages)
        .map((exercise, index) => {
            const width = 128;
            const height = Math.floor(width / 16 * 9);
            return <Image key={`${exercise.id}-${index}`}
                          src={`https://wsrv.nl/?url=${exercise.previewImageUrl!}&w=${width}&h=${height}&dpr=2`}
                          width={width}
                          height={height}
                          alt={exercise.exerciseName}
            />
        })
        .slice(0, NUMBER_OF_PREVIEW_IMAGES);

    return (

        <Link href={`/workout/${props.workout.id}`} className='relative max-w-lg w-full rounded-2xl overflow-hidden'>
            <div className='pointer-events-none select-none grid grid-cols-4 grid-rows-2'>{exercises}</div>
            <div
                className='inline-flex text-2xl sm:text-4xl backdrop-blur-sm backdrop-grayscale text-white w-full h-full font-extrabold absolute top-0 left-0 justify-center items-center'>
                {props.workout.name}
            </div>
        </Link>
    );
}


