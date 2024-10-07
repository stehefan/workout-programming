'use server';

import {PrismaClient} from "@prisma/client";
import {z} from "zod";
import {ResponseMessageError} from "@/types/ResponseMessageError";
import {revalidatePath} from "next/cache";
import {auth} from "@clerk/nextjs/server";

const prisma = new PrismaClient()

export async function updateNote(
    formData: FormData
): Promise<void> {
    const { userId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to add an item to your cart')
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

    console.log(`Updating note for exercise with id ${data!.id} with note ${data!.note}`)

    return prisma.exercise
        .update({
            where: {
                id: data!.id
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
        .then(() => {
            revalidatePath('/')
        })
}
