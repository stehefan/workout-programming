import ImageForm from "@/components/ui/ImageForm/ImageForm";
import {insertImage} from "@/app/image/actions";
import {PrismaClient} from "@prisma/client";
import {handleAuthentication} from "@/app/actions";
import {ImageDetail} from "@/components/ui/ImageDetail/ImageDetail";

const prisma = new PrismaClient();

export default async function ImagePage() {
    const appUser = (await handleAuthentication())!

    const images = await prisma.image.findMany({
        where: {
            userId: appUser.id,
        }
    });

    function ImageList() {
        return <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{
            images && images.map((image => (
                <ImageDetail image={image} key={`image-${image.id}`}/>
            )))
        }
        </div>;
    }

    return (
        <div className='flex flex-col items-center w-full'>
            {images.length > 0 ? ImageList() : <span>No images - please add one</span>}
            <div className='border-t w-full mt-4 mb-4 pt-4'>
                <ImageForm action={insertImage}/>
            </div>
        </div>
    )
}