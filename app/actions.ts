'use server';

import {PrismaClient} from "@prisma/client";
import {z} from "zod";
import {ResponseMessageError} from "@/types/ResponseMessageError";
import {auth} from "@clerk/nextjs/server";
import {AppUser, getUserForClerkUserId} from "@/app/utils";

const prisma = new PrismaClient()

export async function updateNote(
    formData: FormData
): Promise<void> {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('You must be signed in to update notes');
    }

    const appUser: AppUser | undefined = await getUserForClerkUserId(userId);
    if (!appUser) {
        throw new Error('You need to be logged in and have a clerk user assigned to you');
    }

    const schema = z.object({
        note: z.string().nullable(),
        id: z.coerce.number()
    });
    const parse = schema.safeParse({
        note: formData.get("note"),
        id: formData.get("id")
    });

    if (!parse.success) {
        throw new Error('Invalid request - missing note or id', {
            cause: ResponseMessageError.ValidationError,
        });
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
                cause: ResponseMessageError.DatabaseError
            })
        })
}
