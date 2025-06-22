import { ExerciseEntry, Section, Workout } from "@/types/Exercise";
import { $Enums, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

/*
 * Mapper functions that infer their types from the uses context; Prisma does not automatically create types for those
 * output items, so this is a way of both satisfying the compiler and keeping the types in sync.
 */
type PrismaProgramOutput = { id: number; name: string; programId: number; };
type PrismaSectionOutput = { id: number; name: string; roundCount: number; workoutId: number };
type PrismaImageOutput = { id: number; title: string; description: string; updatedAt: Date; imageUrl: string };
type PrismaExerciseOutput = {
    id: number;
    exerciseName: string;
    measureUnit: $Enums.MeasureUnit;
    measureCount: string;
    image?: PrismaImageOutput | null;
    note?: string | null;
    videoUrl?: string | null;
    sectionId: number
};

export function mapToDomainWorkout(workout: {
    sections: ({
        exercises: PrismaExerciseOutput[];
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
        image: exercise.image ? mapToDomainImage(exercise.image) : undefined,
        note: exercise?.note ?? undefined,
        videoUrl: exercise.videoUrl ?? undefined
    };
}

function mapToDomainImage(image: PrismaImageOutput): ExerciseImage {
    return {
        id: image.id,
        title: image.title,
        description: image.description,
        imageUrl: image.imageUrl,
        updatedAt: image.updatedAt
    }
}
export type AppUser = Prisma.PromiseReturnType<typeof getUserForClerkUserId>

export async function getUserForClerkUserId(clerkUserId: string) {
    return prisma.user.findFirst({
        where: {
            clerkUserId: clerkUserId
        }
    })
}

export function getPreviewImageBasePath(): string {
    return process.env.NEXT_PUBLIC_IMAGE_BASE_PATH || 'training/preview'
};
