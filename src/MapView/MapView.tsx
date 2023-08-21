import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import Mapbox, {MarkerView} from '@rnmapbox/maps';
import {View} from 'react-native';
import {MapViewProps, MapViewHandle} from './MapViewTypes';
import Direction from './Direction';
import Utils from './utils';

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView(
    {accessToken, style, styleURL, pitchEnabled, mapPadding, initialState, waypoints, directionCoordinates, directionStyle},
    ref,
) {
    const cameraRef = useRef<Mapbox.Camera>(null);

    const bounds = useMemo(() => {
        if (!waypoints || waypoints.length === 0) {
            return undefined;
        }

        if (waypoints.length === 1) {
            cameraRef.current?.flyTo(waypoints[0].coordinate);
            cameraRef.current?.zoomTo(15);
            return undefined;
        }

        const {southWest, northEast} = Utils.getBounds(waypoints.map((waypoint) => waypoint.coordinate));
        return {
            ne: northEast,
            sw: southWest,
            paddingTop: mapPadding,
            paddingRight: mapPadding,
            paddingBottom: mapPadding,
            paddingLeft: mapPadding,
        };
    }, [waypoints]);

    useImperativeHandle(
        ref,
        () => ({
            flyTo: (location: [number, number], animationDuration?: number) => cameraRef.current?.flyTo(location, animationDuration),
        }),
        [],
    );

    // Initialize Mapbox on first mount
    useEffect(() => {
        Mapbox.setAccessToken(accessToken);
    }, []);

    return (
        <View style={style}>
            <Mapbox.MapView
                styleURL={styleURL}
                pitchEnabled={pitchEnabled}
                style={{flex: 1}}
            >
                <Mapbox.Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: initialState?.location,
                        zoomLevel: initialState?.zoom,
                    }}
                    bounds={bounds}
                />
                {waypoints &&
                    waypoints.map(({coordinate, markerComponent: MarkerComponent}) => (
                        <MarkerView
                            id={`${coordinate[0]},${coordinate[1]}`}
                            key={`${coordinate[0]},${coordinate[1]}`}
                            coordinate={coordinate}
                        >
                            <MarkerComponent />
                        </MarkerView>
                    ))}
                {directionCoordinates && (
                    <Direction
                        coordinates={directionCoordinates}
                        directionStyle={directionStyle}
                    />
                )}
            </Mapbox.MapView>
        </View>
    );
});

export default MapView;
