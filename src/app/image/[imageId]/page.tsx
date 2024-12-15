import ImageForm from "@/components/ui/ImageForm/ImageForm";
import {PrismaClient} from "@prisma/client";
import {notFound} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import {AppUser, getUserForClerkUserId} from "@/app/utils";
import {updateImage} from "@/app/image/actions";

const prisma = new PrismaClient();

type ImagePageParams = Promise<{
    imageId: string
}>

export default async function ImagePage({params}: { params: ImagePageParams }) {
    const { imageId } = await params;

    if (Number.isNaN(imageId)) {
        return notFound();
    }

    const {userId} = await auth();
    const appUser: AppUser | undefined = await getUserForClerkUserId(userId!);

    if (!appUser) {
        throw new Error('You need to be logged in and have a clerk user assigned to you');
    }

    const image = await prisma.image.findFirst({
        where: {
            id: Number.parseInt(imageId),
            userId: appUser.id,
        }
    });

    /*if (!image) {
        return notFound()
    }*/

    return <ImageForm action={updateImage} image={image ?? undefined} />
}