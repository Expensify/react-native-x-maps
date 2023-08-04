import {ComponentProps} from 'react';
import Mapbox from '@rnmapbox/maps';
import Map from 'react-map-gl';

type MapViewBaseProps = {
    accessToken: string;
};

export type MapViewWebProps = MapViewBaseProps & {
    webStyle?: ComponentProps<typeof Map>['style'];
};

export type MapViewMobileProps = MapViewBaseProps & {
    style?: ComponentProps<typeof Mapbox.MapView>['style'];
    pitchEnabled?: boolean;
    attributionEnabled?: boolean;
    logoEnabled?: boolean;
};

export type MapViewProps = MapViewWebProps & MapViewMobileProps;
