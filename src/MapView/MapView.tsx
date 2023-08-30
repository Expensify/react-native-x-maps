import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Mapbox, {MapState, MarkerView} from '@rnmapbox/maps';
import {View} from 'react-native';
import {MapViewProps, MapViewHandle} from './MapViewTypes';
import Direction from './Direction';
import Utils from './utils';

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView(
    {accessToken, style, styleURL, pitchEnabled, mapPadding, initialState, waypoints, directionCoordinates, directionStyle, isFocused, logoEnabled},
    ref,
) {
    const cameraRef = useRef<Mapbox.Camera>(null);
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        if (isFocused) return;
        setIsIdle(false);
    }, [isFocused]);

    useEffect(() => {
        if (!waypoints || !waypoints.length || !isIdle || !isFocused) return;

        if (waypoints.length === 1) {
            cameraRef.current?.setCamera({
                zoomLevel: 15,
                centerCoordinate: waypoints[0].coordinate,
            });
        } else {
            const {southWest, northEast} = Utils.getBounds(waypoints.map((waypoint) => waypoint.coordinate));
            cameraRef.current?.fitBounds(northEast, southWest, mapPadding, 1000);
        }
    }, [mapPadding, waypoints, isFocused, isIdle]);

    useImperativeHandle(
        ref,
        () => ({
            flyTo: (location: [number, number], animationDuration?: number) => cameraRef.current?.flyTo(location, animationDuration),
        }),
        [],
    );

    const setMapIdle = (e: MapState) => {
        if (e.gestures.isGestureActive) return;
        setIsIdle(true);
    }

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
                onMapIdle={setMapIdle}
                logoEnabled={logoEnabled}
            >
                <Mapbox.Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: initialState?.location,
                        zoomLevel: initialState?.zoom,
                    }}
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
