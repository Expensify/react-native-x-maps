import {useEffect} from 'react';
import Mapbox from '@rnmapbox/maps';
import {MapViewProps} from './MapViewProps';

function MapView({accessToken, ...props}: MapViewProps) {
    useEffect(() => {
        Mapbox.setAccessToken(accessToken);
    }, []);

    return <Mapbox.MapView {...props} />;
}

export default MapView;
