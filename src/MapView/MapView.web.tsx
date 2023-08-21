import Map, {MapRef, Marker} from 'react-map-gl';
import {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import WebMercatorViewport from '@math.gl/web-mercator';
import {View} from 'react-native';
import {MapViewHandle, MapViewProps, WayPoint} from './MapViewTypes';
import Utils from './utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import Direction from './Direction';

const getAdjustment = (mapWidth: number, mapHeight: number, waypoints: WayPoint[], mapPadding?: number) => {
    const viewport = new WebMercatorViewport({height: mapWidth, width: mapHeight});

    const {northEast, southWest} = Utils.getBounds(waypoints.map((waypoint) => waypoint.coordinate));
    return viewport.fitBounds([southWest, northEast], {
        padding: mapPadding,
    });
};

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView({accessToken, waypoints, style, mapPadding, directionCoordinates, longitude, latitude, zoom, onMove}, ref) {
    // const mapRef = useRef<MapRef>(null);
    const [mapRef, setMapRef] = useState<MapRef | null>(null);
    const [bounds, setBounds] = useState<{
        longitude: number;
        latitude: number;
        zoom: number;
    }>();

    const setRef = useCallback((newRef: MapRef | null) => setMapRef(newRef), []);

    const {clientHeight: mapHeight, clientWidth: mapWidth} = mapRef?.getCanvas() ?? {clientHeight: undefined, clientWidth: undefined};

    useEffect(() => {
        if (!waypoints || waypoints.length === 0) {
            return;
        }

        if (!mapRef || !mapWidth || !mapHeight) {
            return;
        }

        if (waypoints.length === 1) {
            mapRef.flyTo({
                center: waypoints[0].coordinate,
                zoom: 15,
            });
            return;
        }

        const newBounds = getAdjustment(mapWidth, mapHeight, waypoints, mapPadding);
        setBounds(newBounds);
    }, [waypoints, mapHeight, mapWidth]);

    useImperativeHandle(
        ref,
        () => ({
            flyTo: (location: [number, number], animationDuration?: number) => {
                mapRef?.flyTo({
                    center: location,
                    duration: animationDuration,
                });
            },
        }),
        [],
    );

    return (
        <View style={style}>
            <Map
                ref={setRef}
                mapboxAccessToken={accessToken}
                longitude={longitude}
                latitude={latitude}
                zoom={zoom}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={(event) => onMove(event.viewState)}
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
