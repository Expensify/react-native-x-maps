import { ComponentType } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export type MapViewProps = {
    accessToken: string;
    style: StyleProp<ViewStyle>;
    styleURL?: string;
    pitchEnabled?: boolean;
    mapPadding?: number;
    initialState?: {
        location: [number, number];
        zoom: number;
    };
    waypoints?: Array<[number, number]>;
    markerComponent?: ComponentType;
    directionCoordinates?: Array<[number, number]>;
};
export type MapViewHandle = {
    flyTo: (location: [number, number], animationDuration?: number) => void;
};
//# sourceMappingURL=MapViewTypes.d.ts.map