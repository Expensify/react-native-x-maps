import Map, {MapRef, Marker} from 'react-map-gl';
import {RefObject, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import WebMercatorViewport from '@math.gl/web-mercator';
import {View} from 'react-native';
import {MapViewHandle, MapViewProps} from './MapViewTypes';
import Utils from './utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import Direction from './Direction';
import {DEFAULT_INITIAL_STATE} from './CONST';

const getMapDimension = (mapRef: RefObject<MapRef>): {width: number; height: number} | undefined => {
    if (!mapRef.current?.getMap()) {
        return undefined;
    }

    const {clientWidth, clientHeight} = mapRef.current.getCanvas();
    return {width: clientWidth, height: clientHeight};
};

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView({accessToken, waypoints, style, mapPadding, directionCoordinates, initialState = DEFAULT_INITIAL_STATE}, ref) {
    const mapRef = useRef<MapRef>(null);
    const [bounds, setBounds] = useState<{
        longitude: number;
        latitude: number;
        zoom: number;
    }>();

    useEffect(() => {
        if (!waypoints || waypoints.length === 0) {
            return;
        }

        if (waypoints.length === 1) {
            mapRef.current?.flyTo({
                center: waypoints[0].coordinate,
                zoom: 15,
            });
            return;
        }

        console.log(waypoints.map((waypoint) => waypoint.coordinate));
        const {northEast, southWest} = Utils.getBounds(waypoints.map((waypoint) => waypoint.coordinate));
        const {width, height} = getMapDimension(mapRef) || {
            width: 0,
            height: 0,
        };
        const viewport = new WebMercatorViewport({height, width});

        const {latitude, longitude, zoom} = viewport.fitBounds([southWest, northEast], {
            padding: mapPadding,
        });

        setBounds({latitude, longitude, zoom});
    }, [waypoints]);

    useImperativeHandle(
        ref,
        () => ({
            flyTo: (location: [number, number], animationDuration?: number) =>
                mapRef.current?.flyTo({
                    center: location,
                    duration: animationDuration,
                }),
        }),
        [],
    );

    return (
        <View style={style}>
            <Map
                ref={mapRef}
                mapboxAccessToken={accessToken}
                initialViewState={{
                    longitude: initialState?.location[0],
                    latitude: initialState?.location[1],
                    zoom: initialState?.zoom,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                {...bounds}
            >
                {waypoints &&
                    waypoints.map(({coordinate, markerComponent: MarkerComponent}) => (
                        <Marker
                            key={`${coordinate[0]},${coordinate[1]}`}
                            longitude={coordinate[0]}
                            latitude={coordinate[1]}
                        >
                            <MarkerComponent />
                        </Marker>
                    ))}
                {directionCoordinates && <Direction coordinates={directionCoordinates} />}
            </Map>
        </View>
    );
});

export default MapView;
