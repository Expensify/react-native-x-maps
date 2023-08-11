import {MapViewProps} from './MapViewTypes';

const DEFAULT_ZOOM = 10;
const DEFAULT_COORDINATE: [number, number] = [-122.4021, 37.7911];

// Other constants will probably defined so not using default export here
// Remove this comment once other constants are added
// eslint-disable-next-line import/prefer-default-export
export const DEFAULT_INITIAL_STATE: MapViewProps['initialState'] = {
    location: DEFAULT_COORDINATE,
    zoom: DEFAULT_ZOOM,
};
