import Map, {MapRef, Marker} from 'react-map-gl';
import {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import WebMercatorViewport from '@math.gl/web-mercator';
import {View} from 'react-native';
import {MapViewHandle, MapViewProps, WayPoint} from './MapViewTypes';
import Utils from './utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import Direction from './Direction';
import {DEFAULT_INITIAL_STATE} from './CONST';

const getAdjustment = (mapRef: MapRef, waypoints: WayPoint[], mapPadding?: number) => {
    const {clientHeight, clientWidth} = mapRef.getCanvas();
    const viewport = new WebMercatorViewport({height: clientHeight, width: clientWidth});

    const {northEast, southWest} = Utils.getBounds(waypoints.map((waypoint) => waypoint.coordinate));
    return viewport.fitBounds([southWest, northEast], {
        padding: mapPadding,
    });
};

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView({accessToken, waypoints, style, mapPadding, directionCoordinates, initialState = DEFAULT_INITIAL_STATE}, ref) {
    const [mapRef, setMapRef] = useState<MapRef | null>(null);
    const [bounds, setBounds] = useState<{
        longitude: number;
        latitude: number;
        zoom: number;
    }>();

    const setRef = useCallback((newRef: MapRef | null) => setMapRef(newRef), []);

    useEffect(() => {
        if (!waypoints || waypoints.length === 0) {
            return;
        }

        if (!mapRef) {
            return;
        }

        if (waypoints.length === 1) {
            mapRef.flyTo({
                center: waypoints[0].coordinate,
                zoom: 15,
            });
            return;
        }

        const newBounds = getAdjustment(mapRef, waypoints, mapPadding);
        setBounds(newBounds);
    }, [waypoints, mapRef]);

    useImperativeHandle(
        ref,
        () => ({
            flyTo: (location: [number, number], animationDuration?: number) =>
                mapRef?.flyTo({
                    center: location,
                    duration: animationDuration,
                }),
        }),
        [],
    );

    return (
        <View style={style}>
            <Map
                ref={setRef}
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
