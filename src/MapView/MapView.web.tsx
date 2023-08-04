import Map from 'react-map-gl';
import {MapViewWebProps} from './MapViewProps';

function MapView({accessToken, webStyle}: MapViewWebProps) {
    return (
        <Map
            mapboxAccessToken={accessToken}
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14,
            }}
            style={webStyle}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    );
}

export default MapView;
