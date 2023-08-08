import Map, {MapRef, Marker} from 'react-map-gl';
import {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import WebMercatorViewport from '@math.gl/web-mercator';
import {MapViewHandle, MapViewProps} from './MapViewTypes';
import {getBounds} from './utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import Direction from './Direction';
import {DEFAULT_INITIAL_STATE} from './consts';

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView(
    {accessToken, waypoints, height, width, mapPadding, markerComponent: MarkerComponent, directionCoordinates, initialState = DEFAULT_INITIAL_STATE},
    ref,
) {
    const mapRef = useRef<MapRef>(null);

    const bounds = useMemo(() => {
        if (!waypoints || waypoints.length === 0) {
            return undefined;
        }

        if (waypoints.length === 1) {
            mapRef.current?.flyTo({
                center: waypoints[0],
                zoom: 15,
            });
            return undefined;
        }

        const boundColors = getBounds(waypoints);
        const viewport = new WebMercatorViewport({height, width});
        return viewport.fitBounds([boundColors.northEast, boundColors.southWest], {
            padding: mapPadding,
        });
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
        <Map
            ref={mapRef}
            mapboxAccessToken={accessToken}
            initialViewState={{
                longitude: initialState?.location[0],
                latitude: initialState?.location[1],
                zoom: initialState?.zoom,
            }}
            style={{height, width, borderWidth: 5, borderColor: 'orange'}}
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
    );
});

export default MapView;
