import {ImageResponse} from 'next/og'

const variants: {
    [key: string]: {
        contentType: string;
        size: {
            width: number;
            height: number;
        };
        id: string;
    }
} = {
    'small': {
        contentType: 'image/png',
        size: {width: 48, height: 48},
        id: 'small',
    },
    'medium': {
        contentType: 'image/png',
        size: {width: 72, height: 72},
        id: 'medium',
    },
    'large': {
        contentType: 'image/png',
        size: {width: 512, height: 512},
        id: 'large',
    },

}

export function generateImageMetadata() {
    return [
        variants['small'],
        variants['medium'],
        variants['large'],
    ]
}

export default function Icon({id}: { id: string }) {
    const size = variants[id].size;
    return new ImageResponse(
        (
            <div
                id={id}
                style={{
                    width: size['width'],
                    height: size['height'],
                    fontSize: size['height'],
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    padding: 0,
                    margin: 0
                }}
            >
                💪
            </div>
        ),
        {
            emoji: 'openmoji',
            ...size
        }
    )
}