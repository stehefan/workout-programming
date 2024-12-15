'use server';

import {ExerciseEntry, MeasureUnits} from "@/types/Exercise";
import {z} from "zod";
import {ActionError, ActionErrorType} from "@/types/Error";
import {handleAuthentication} from "@/app/actions";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

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
        imageId: formData.get('imageId'),
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

    const imageUpdate: Prisma.ImageUpdateOneWithoutExerciseNestedInput = {}
    if (parse.data.imageId !== null) {
        imageUpdate['connect'] = {
            id: Number.parseInt(parse.data.imageId)
        }
    }

    if (previousExerciseEntry.image?.id.toString() !== parse.data.imageId) {
        imageUpdate['disconnect'] = {
            id: previousExerciseEntry.image?.id
        }
    }


    const newExerciseEntry = await prisma.exercise.update({
        where: {
            id: parse.data.id,
            userId: appUser.id,
        },
        data: {
            exerciseName: parse.data.exerciseName,
            measureUnit: parse.data.measureUnit,
            measureCount: parse.data.measureCount,
            videoUrl: parse.data.videoUrl,
            image: imageUpdate
        },
        include: {
            image: true
        }
    });

    return {
        ...newExerciseEntry,
        videoUrl: newExerciseEntry.videoUrl || undefined,
        image: newExerciseEntry.image || undefined,
        note: newExerciseEntry.note || undefined,
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
