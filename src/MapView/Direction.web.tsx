import {Layer, Source} from 'react-map-gl';
import {View} from 'react-native';

function Direction({coordinates}: {coordinates: Array<[number, number]>}) {
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
                        paint={{'line-color': '#888', 'line-width': 4}}
                    />
                </Source>
            )}
        </View>
    );
}

export default Direction;
