// ESLint rule forces the usage of default export if there is only one export.
// But not using default export here as more util functions might be added later.
// eslint-disable-next-line import/prefer-default-export
export const getBounds = (waypoints: Array<[number, number]>): {southWest: [number, number]; northEast: [number, number]} => {
    const lngs = waypoints.map((waypoint) => waypoint[0]);
    const lats = waypoints.map((waypoint) => waypoint[1]);

    return {
        southWest: [Math.min(...lngs), Math.min(...lats)],
        northEast: [Math.max(...lngs), Math.max(...lats)],
    };
};
