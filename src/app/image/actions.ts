'use server';

import {z} from "zod";
import {ActionError, ActionErrorType} from "@/types/Error";
import {del, put} from "@vercel/blob";
import {handleAuthentication} from "@/app/actions";
import {PrismaClient} from "@prisma/client";
import {getPreviewImageBasePath} from "@/app/utils";
import {revalidatePath} from "next/cache";

const ACCEPTED_MIME_TYPES = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
const MAX_SIZE_FILE_UPLOAD = 5 * 1024 * 1024;

const prisma = new PrismaClient();

async function processImageData(formData: FormData) {
    const appUser = (await handleAuthentication())!
    const schema = z.object({
        id: z.coerce.number(),
        title: z.string(),
        description: z.string(),
        prevImagePath: z.string().nullable(),
        file: z
            .instanceof(File)
            .refine(
                (file) => ACCEPTED_MIME_TYPES.includes(file.type),
                {message: "File type must be one of the following: " + ACCEPTED_MIME_TYPES.join(", ")}
            )
            .refine(
                (file) => file.size <= MAX_SIZE_FILE_UPLOAD,
                {message: `File size must not exceed ${MAX_SIZE_FILE_UPLOAD}MB`}
            )
    });
    const parse = schema.safeParse({
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        prevImagePath: formData.get("prevImagePath"),
        file: formData.get("image"),
    });

    if (!parse.success) {
        throw new ActionError(ActionErrorType.ValidationError, parse.error.message);
    }

    const data = parse.data!;
    const blob = await put(`${getPreviewImageBasePath()}/${data.file.name}`, data.file, {access: 'public'});

    // if there was a prior picture, delete it now
    if (data.prevImagePath) {
        await del(data.prevImagePath);
    }
    return {appUser, imageUrl: blob.url, data};
}

export async function insertImage(
    formData: FormData
): Promise<void> {
    const {appUser, imageUrl, data} = await processImageData(formData);

    console.log(appUser, imageUrl, data);

    await prisma.image
        .create({
            data: {
                title: data.title,
                description: data.description,
                imageUrl: imageUrl,
                userId: appUser.id,
            }
        })
        .catch((reason) => {
            throw new Error(`Request failed - ${reason}`, {
                cause: ActionErrorType.DatabaseError
            })
        })

    revalidatePath('/image')
}


export async function updateImage(
    formData: FormData
): Promise<void> {
    const {appUser, imageUrl, data} = await processImageData(formData);

    await prisma.image
        .update({
            where: {
                id: data.id,
                userId: appUser.id
            },
            data: {
                title: data.title,
                description: data.description,
                imageUrl: imageUrl || undefined,
                updatedAt: new Date(),
            }
        })
        .catch((reason) => {
            throw new Error(`Request failed - ${reason}`, {
                cause: ActionErrorType.DatabaseError
            });
        });

    revalidatePath('/image')
}

export async function deleteImage(imageId: number): Promise<void> {
    const appUser = (await handleAuthentication())!

    await prisma.image.delete({
        where: {
            id: imageId,
            userId: appUser.id
        }
    });

    revalidatePath('/image')
}