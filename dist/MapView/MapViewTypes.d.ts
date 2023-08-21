import { ComponentType } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export type MapViewProps = {
    accessToken: string;
    style: StyleProp<ViewStyle>;
    styleURL?: string;
    pitchEnabled?: boolean;
    mapPadding?: number;
    initialState?: InitialState;
    waypoints?: WayPoint[];
    directionCoordinates?: Array<[number, number]>;
    directionStyle?: DirectionStyle;
};
export type DirectionProps = {
    coordinates: Array<[number, number]>;
    directionStyle?: DirectionStyle;
};
type InitialState = {
    location: [number, number];
    zoom: number;
};
export type WayPoint = {
    coordinate: [number, number];
    markerComponent: ComponentType;
};
export type DirectionStyle = {
    width?: number;
    color?: string;
};
export type MapViewHandle = {
    flyTo: (location: [number, number], animationDuration?: number) => void;
};
export {};
//# sourceMappingURL=MapViewTypes.d.ts.map