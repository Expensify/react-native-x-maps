import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import Mapbox, {MarkerView} from '@rnmapbox/maps';
import {View} from 'react-native';
import {MapViewProps, MapViewHandle} from './MapViewTypes';
import Direction from './Direction';
import {getBounds} from './utils';

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView(
    {accessToken, style, styleURL, pitchEnabled, mapPadding, initialState, waypoints, markerComponent: MarkerComponent, directionCoordinates},
    ref,
) {
    const cameraRef = useRef<Mapbox.Camera>(null);

    const bounds = useMemo(() => {
        if (!waypoints || waypoints.length === 0) {
            return undefined;
        }

        if (waypoints.length === 1) {
            cameraRef.current?.flyTo(waypoints[0]);
            cameraRef.current?.zoomTo(15);
            return undefined;
        }

        const {southWest, northEast} = getBounds(waypoints);
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
                {MarkerComponent &&
                    waypoints &&
                    waypoints.map((waypoint) => (
                        <MarkerView
                            id={`${waypoint[0]},${waypoint[1]}`}
                            key={`${waypoint[0]},${waypoint[1]}`}
                            coordinate={waypoint}
                        >
                            <MarkerComponent />
                        </MarkerView>
                    ))}
                {directionCoordinates && <Direction coordinates={directionCoordinates} />}
            </Mapbox.MapView>
        </View>
    );
});

export default MapView;
