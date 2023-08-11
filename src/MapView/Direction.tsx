import Mapbox from '@rnmapbox/maps';

function Direction({coordinates}: {coordinates: Array<[number, number]>}) {
    if (coordinates.length < 1) {
        return null;
    }

    return (
        <Mapbox.ShapeSource
            id="routeSource"
            shape={{
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates,
                },
            }}
        >
            <Mapbox.LineLayer
                id="routeFill"
                style={{
                    lineColor: 'blue',
                    lineWidth: 3,
                }}
            />
        </Mapbox.ShapeSource>
    );
}

export default Direction;
