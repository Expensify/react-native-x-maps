import Map, {MapRef, Marker} from 'react-map-gl';
import {RefObject, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import WebMercatorViewport from '@math.gl/web-mercator';
import {View} from 'react-native';
import {MapViewHandle, MapViewProps} from './MapViewTypes';
import Utils from './utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import Direction from './Direction';
import {DEFAULT_INITIAL_STATE} from './CONST';

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView(
    {accessToken, waypoints, style, mapPadding, markerComponent: MarkerComponent, directionCoordinates, initialState = DEFAULT_INITIAL_STATE},
    ref,
) {
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
                center: waypoints[0],
                zoom: 15,
            });
            return;
        }

        const {northEast, southWest} = Utils.getBounds(waypoints);
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
                {MarkerComponent &&
                    waypoints &&
                    waypoints.map((waypoint) => (
                        <Marker
                            key={`${waypoint[0]},${waypoint[1]}`}
                            longitude={waypoint[0]}
                            latitude={waypoint[1]}
                        >
                            <MarkerComponent />
                        </Marker>
                    ))}
                {directionCoordinates && <Direction coordinates={directionCoordinates} />}
            </Map>
        </View>
    );
});

const getMapDimension = (mapRef: RefObject<MapRef>): {width: number; height: number} | undefined => {
    if (!mapRef.current?.getMap()) {
        return undefined;
    }

    const {clientWidth, clientHeight} = mapRef.current.getCanvas();
    return {width: clientWidth, height: clientHeight};
};

export default MapView;
