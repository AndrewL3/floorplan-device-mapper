import { Layer, Image as KonvaImage } from 'react-konva';

interface FloorplanImageProps {
    image: HTMLImageElement;
}

export function FloorplanImage({ image }: FloorplanImageProps) {
    return (
        <Layer listening={false}>
            <KonvaImage image={image} />
        </Layer>
    );
}