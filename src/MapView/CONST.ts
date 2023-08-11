import {MapViewProps} from './MapViewTypes';

const DEFAULT_ZOOM = 10;
const DEFAULT_COORDINATE: [number, number] = [-122.4021, 37.7911];

export const PADDING = 50;
export const DEFAULT_INITIAL_STATE: MapViewProps['initialState'] = {
    location: DEFAULT_COORDINATE,
    zoom: DEFAULT_ZOOM,
};
