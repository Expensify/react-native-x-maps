import {ComponentType} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

export type MapViewProps = {
    // Public access token to be used to fetch map data from Mapbox.
    accessToken: string;
    // Style applied to MapView component. Note some of the View Style props are not available on ViewMap
    style: StyleProp<ViewStyle>;
    // Link to the style JSON document.
    styleURL?: string;
    // Whether map can tilt in the vertical direction.
    pitchEnabled?: boolean;
    // Padding to apply when the map is adjusted to fit waypoints and directions
    mapPadding?: number;
    // Initial coordinate and zoom level
    initialState?: InitialState;
    // Locations on which to put markers
    waypoints?: WayPoint[];
    // List of coordinates which together forms a direction.
    directionCoordinates?: Array<[number, number]>;
    // Style used for the line that displays direction
    directionStyle?: DirectionStyle;
};

export type DirectionProps = {
    // Coordinates of points that constitute the direction
    coordinates: Array<[number, number]>;
    // Style used for the line that displays direction
    directionStyle?: DirectionStyle;
};

// Initial state of the map
type InitialState = {
    // Coordinate on which to center the map
    location: [number, number];
    zoom: number;
};

// Waypoint to be displayed on the map
export type WayPoint = {
    coordinate: [number, number];
    markerComponent: ComponentType;
};

// Style used for the line that displays direction
export type DirectionStyle = {
    width?: number;
    color?: string;
};

export type MapViewHandle = {
    flyTo: (location: [number, number], animationDuration?: number) => void;
};
