"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Direction(_ref) {
  var _directionStyle$color, _directionStyle$width;
  var coordinates = _ref.coordinates,
    directionStyle = _ref.directionStyle;
  if (coordinates.length < 1) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps["default"].ShapeSource, {
    id: "routeSource",
    shape: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps["default"].LineLayer, {
      id: "routeFill",
      style: {
        lineColor: (_directionStyle$color = directionStyle === null || directionStyle === void 0 ? void 0 : directionStyle.color) !== null && _directionStyle$color !== void 0 ? _directionStyle$color : '#000000',
        lineWidth: (_directionStyle$width = directionStyle === null || directionStyle === void 0 ? void 0 : directionStyle.width) !== null && _directionStyle$width !== void 0 ? _directionStyle$width : 1
      }
    })
  });
}
var _default = Direction;
exports["default"] = _default;
//# sourceMappingURL=Direction.js.map