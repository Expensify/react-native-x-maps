import {Layer, Source} from 'react-map-gl';
import {View} from 'react-native';
import {DirectionProps} from './MapViewTypes';

function Direction({coordinates, directionStyle}: DirectionProps) {
    if (coordinates.length < 1) {
        return null;
    }
    return (
        <View>
            {coordinates && (
                <Source
                    id="route"
                    type="geojson"
                    data={{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates,
                        },
                    }}
                >
                    <Layer
                        id="route"
                        type="line"
                        source="route"
                        layout={{'line-join': 'round', 'line-cap': 'round'}}
                        paint={{'line-color': directionStyle?.color ?? '#000000', 'line-width': directionStyle?.width ?? 1}}
                    />
                </Source>
            )}
        </View>
    );
}

export default Direction;
