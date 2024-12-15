import {PrismaClient} from "@prisma/client";
import {handleAuthentication} from "@/app/actions";

const prisma = new PrismaClient();

export async function GET() {
    const appUser = (await handleAuthentication())!;
    const images = await prisma.image.findMany({
        where: {
            userId: appUser.id,
        }
    });

    const mappedImages: ExerciseImage[] = images.map(image => {
        return {
            id: image.id,
            title: image.title,
            description: image.description,
            imageUrl: image.imageUrl,
            updatedAt: image.updatedAt
        }
    });

    return Response.json(mappedImages)
}
