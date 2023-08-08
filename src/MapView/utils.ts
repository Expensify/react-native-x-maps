// Other util functions might be added so not using default export for this
// Remove this comment once other util functions are added
// eslint-disable-next-line import/prefer-default-export
export const getBounds = (waypoints: Array<[number, number]>): {southWest: [number, number]; northEast: [number, number]} => {
    const lngs = waypoints.map((waypoint) => waypoint[0]);
    const lats = waypoints.map((waypoint) => waypoint[1]);

    return {
        southWest: [Math.min(...lngs), Math.min(...lats)],
        northEast: [Math.max(...lngs), Math.max(...lats)],
    };
};
