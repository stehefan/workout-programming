'use server';

import {PrismaClient} from "@prisma/client";
import {z} from "zod";
import {ResponseMessageError} from "@/types/ResponseMessageError";
import {revalidatePath} from "next/cache";
import {withApiAuthRequired} from "@auth0/nextjs-auth0";

export async function updateNote(
    formData: FormData
): Promise<void> {
    withApiAuthRequired(async function () {
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
        const prisma = new PrismaClient()

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
    })
}
