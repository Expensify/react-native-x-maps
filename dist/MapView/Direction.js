"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Direction(_ref) {
  var coordinates = _ref.coordinates;
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
        lineColor: 'blue',
        lineWidth: 3
      }
    })
  });
}
var _default = Direction;
exports["default"] = _default;
//# sourceMappingURL=Direction.js.map