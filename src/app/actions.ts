'use server';

import {PrismaClient} from "@prisma/client";
import {z} from "zod";
import {ActionError, ActionErrorType} from "@/types/Error";
import {auth} from "@clerk/nextjs/server";
import {AppUser, getUserForClerkUserId} from "@/app/utils";
import {ExerciseEntry, MeasureUnits} from "@/types/Exercise";

const prisma = new PrismaClient()

async function handleAuthentication(): Promise<AppUser> {
    const {userId} = await auth();
    if (!userId) {
        throw new ActionError(ActionErrorType.AuthenticationError, 'You must be signed in to update notes');
    }

    const appUser: AppUser | undefined = await getUserForClerkUserId(userId);
    if (!appUser) {
        throw new ActionError(ActionErrorType.AuthenticationError, 'You need to be logged in and have a clerk user assigned to you');
    }

    return appUser!;
}

export async function updateExerciseEntry(previousExerciseEntry: ExerciseEntry, formData: FormData): Promise<ExerciseEntry> {
    const appUser = (await handleAuthentication())!;
    const schema = z.object({
        id: z.coerce.number(),
        exerciseName: z.string(),
        measureUnit: z.nativeEnum(MeasureUnits),
        measureCount: z.string(),
        videoUrl: z.string().nullable(),
        imageId: z.string().nullable(),
        note: z.string().nullable(),
    });

    const parse = schema.safeParse({
        id: formData.get("id"),
        exerciseName: formData.get('exerciseName'),
        measureUnit: formData.get('measureUnit'),
        measureCount: formData.get('measureCount'),
        videoUrl: formData.get('videoUrl'),
        previewImageUrl: formData.get('previewImageUrl'),
        note: formData.get('note'),
    });

    if (!parse.success) {
        throw new ActionError(
            ActionErrorType.ValidationError,
            parse.error.message
        );
    }

    if (previousExerciseEntry.id !== parse.data.id) {
        throw new ActionError(
            ActionErrorType.ValidationError,
            'The id of the exercise entry does not match the id of the exercise entry in the database'
        );
    }

    const newExerciseEntry = await prisma.exercise.update({
        where: {
            id: parse.data.id,
            userId: appUser.id,
        },
        data: parse.data,
    });

    return {
        ...newExerciseEntry,
        videoUrl: newExerciseEntry.videoUrl ?? undefined,
        image: newExerciseEntry.imageId ?? undefined,
        note: newExerciseEntry.note ?? undefined,
    }
}

export async function updateNote(
    formData: FormData
): Promise<void> {
    const appUser = (await handleAuthentication())!

    const schema = z.object({
        note: z.string().nullable(),
        id: z.coerce.number()
    });
    const parse = schema.safeParse({
        note: formData.get("note"),
        id: formData.get("id")
    });

    if (!parse.success) {
        throw new ActionError(ActionErrorType.ValidationError, parse.error.message);
    }

    const data = parse.data;

    prisma.exercise
        .update({
            where: {
                id: data!.id,
                userId: appUser.id
            },
            data: {
                note: data!.note
            }
        })
        .catch((reason) => {
            console.log(reason);
            throw new Error(`Request failed - ${reason}`, {
                cause: ActionErrorType.DatabaseError
            })
        })
}
