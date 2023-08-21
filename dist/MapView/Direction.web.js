"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactMapGl = require("react-map-gl");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function Direction(_ref) {
  var _directionStyle$color, _directionStyle$width;
  var coordinates = _ref.coordinates,
    directionStyle = _ref.directionStyle;
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
          'line-color': (_directionStyle$color = directionStyle === null || directionStyle === void 0 ? void 0 : directionStyle.color) !== null && _directionStyle$color !== void 0 ? _directionStyle$color : '#000000',
          'line-width': (_directionStyle$width = directionStyle === null || directionStyle === void 0 ? void 0 : directionStyle.width) !== null && _directionStyle$width !== void 0 ? _directionStyle$width : 1
        }
      })
    })
  });
}
var _default = Direction;
exports["default"] = _default;
//# sourceMappingURL=Direction.web.js.map