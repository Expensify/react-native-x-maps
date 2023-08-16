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
    initialState?: {
        location: [number, number];
        zoom: number;
    };
    // Locations on which to put markers
    waypoints?: Array<[number, number]>;
    // React component to use for the marker. If not provided, markers are not displayed for waypoints.
    markerComponent?: ComponentType;
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

type DirectionStyle = {
    width?: number;
    color?: string;
};

export type MapViewHandle = {
    flyTo: (location: [number, number], animationDuration?: number) => void;
};
