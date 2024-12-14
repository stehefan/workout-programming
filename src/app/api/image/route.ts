import {list, ListBlobResult} from "@vercel/blob";
import {NextRequest} from "next/server";

const DEFAULT_LIMIT: number = 10;

function getLimit(searchParams: URLSearchParams) {
    if (searchParams.has('limit')) {
        return Number.parseInt(searchParams.get('limit')!);
    }
    return DEFAULT_LIMIT;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const cursor = searchParams.get('cursor') ? decodeURIComponent(searchParams.get('cursor')!) : undefined;
    const limit = getLimit(searchParams);

    const blobResult: ListBlobResult = await list({
        limit: limit,
        cursor,
        prefix: 'training/preview/',
    });

    return Response.json({
        images: blobResult.blobs
            .filter(blob => blob.url.endsWith('png'))
            .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
            .map(blob => ({
                url: blob.url,
                uploadedAt: blob.uploadedAt,
            })),
        cursor: blobResult.cursor,
        hasMore: blobResult.hasMore,
    })
}
