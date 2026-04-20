import { Stage } from 'react-konva';
import { FloorplanImage } from './FloorplanImage';
import { WallLayer } from './WallLayer';
import { CoverageLayer } from './CoverageLayer';
import { DeviceLayer } from './DeviceLayer';
import { SnapGuideLayer } from './SnapGuideLayer';

interface FloorplanStageProps {
    width: number;
    height: number;
    image: HTMLImageElement;
    stageProps: {
        scaleX: number;
        scaleY: number;
        x: number;
        y: number;
        draggable: boolean;
        onWheel: (e: any) => void;
        onDragStart: () => void;
        onDragEnd: (e: any) => void;
    };
}

export function FloorplanStage({ width, height, image, stageProps }: FloorplanStageProps) {
    return (
        <Stage width={width} height={height} {...stageProps}>
            <FloorplanImage image={image} />
            <WallLayer />
            <CoverageLayer />
            <DeviceLayer />
            <SnapGuideLayer />
        </Stage>
    );
}