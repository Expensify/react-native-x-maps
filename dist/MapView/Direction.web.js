"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactMapGl = require("react-map-gl");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function Direction(_ref) {
  var coordinates = _ref.coordinates;
  if (coordinates.length < 1) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: coordinates && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactMapGl.Source, {
      id: "route",
      type: "geojson",
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactMapGl.Layer, {
        id: "route",
        type: "line",
        source: "route",
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#888',
          'line-width': 4
        }
      })
    })
  });
}
var _default = Direction;
exports["default"] = _default;
//# sourceMappingURL=Direction.web.js.map