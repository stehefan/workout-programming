import {ExerciseEntry, IdentifiableObject} from "@/types/Exercise";
import {Prisma} from "@prisma/client";
import ExerciseGetPayload = Prisma.ExerciseGetPayload;
import ExerciseDefaultArgs = Prisma.ExerciseDefaultArgs;

export function sortByIdASC(a: IdentifiableObject, b: IdentifiableObject): number {
    return a.id - b.id;
}

export function mapToDomainExercise(exercise: ExerciseGetPayload<ExerciseDefaultArgs>): ExerciseEntry {
    return {
        id: exercise.id,
        exerciseName: exercise.exerciseName,
        measureUnit: exercise.measureUnit,
        measureCount: exercise.measureCount,
        previewImageUrl: exercise.previewImageUrl ?? undefined,
        note: exercise?.note ?? undefined,
        videoUrl: exercise.videoUrl ?? undefined
    };
}