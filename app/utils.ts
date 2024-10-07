import {ExerciseEntry, IdentifiableObject, Section, Workout} from "@/types/Exercise";
import {$Enums} from "@prisma/client";

export function sortByIdASC(a: IdentifiableObject, b: IdentifiableObject): number {
    return a.id - b.id;
}

/*
 * Mapper functions that infer their types from the uses context; Prisma does not automatically create types for those
 * output items, so this is a way of both satisfying the compiler and keeping the types in sync.
 */

type PrismaProgramOutput = { id: number; name: string; programId: number; };
type PrismaSectionOutput = { id: number; name: string; roundCount: number; workoutId: number };
type PrismaExerciseOutput = {
    id: number;
    exerciseName: string;
    measureUnit: $Enums.MeasureUnit;
    measureCount: string;
    previewImageUrl: string | null;
    note: string | null;
    videoUrl: string | null;
    sectionId: number
};

export function mapToDomainWorkout(workout: {
    sections: ({        exercises: PrismaExerciseOutput[];
    } & PrismaSectionOutput)[];
} & PrismaProgramOutput): Workout {
    return {
        id: workout.id,
        name: workout.name,
        sections: workout.sections.map(section => {
            return mapToDomainSection(section);
        })
    }
}

export function mapToDomainSection(section: {
    exercises: PrismaExerciseOutput[]
} & PrismaSectionOutput): Section {
    return {
        id: section.id,
        name: section.name,
        roundCount: section.roundCount,
        exercises: section.exercises.map(exercise => mapToDomainExercise(exercise))
    }
}

export function mapToDomainExercise(exercise: PrismaExerciseOutput): ExerciseEntry {
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
