import * as IconImport from "@/app/icon";

export function generateImageMetadata() {
    return IconImport.generateImageMetadata()
}

export default function Icon({id}: { id: string }) {
    return IconImport.default({id})
}