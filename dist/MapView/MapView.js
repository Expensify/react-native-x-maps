"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _maps = _interopRequireWildcard(require("@rnmapbox/maps"));
var _reactNative = require("react-native");
var _Direction = _interopRequireDefault(require("./Direction"));
var _utils = _interopRequireDefault(require("./utils"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var MapView = /*#__PURE__*/(0, _react.forwardRef)(function MapView(_ref, ref) {
  var accessToken = _ref.accessToken,
    style = _ref.style,
    styleURL = _ref.styleURL,
    pitchEnabled = _ref.pitchEnabled,
    mapPadding = _ref.mapPadding,
    initialState = _ref.initialState,
    waypoints = _ref.waypoints,
    MarkerComponent = _ref.markerComponent,
    directionCoordinates = _ref.directionCoordinates;
  var cameraRef = (0, _react.useRef)(null);
  var bounds = (0, _react.useMemo)(function () {
    if (!waypoints || waypoints.length === 0) {
      return undefined;
    }
    if (waypoints.length === 1) {
      var _cameraRef$current, _cameraRef$current2;
      (_cameraRef$current = cameraRef.current) === null || _cameraRef$current === void 0 ? void 0 : _cameraRef$current.flyTo(waypoints[0]);
      (_cameraRef$current2 = cameraRef.current) === null || _cameraRef$current2 === void 0 ? void 0 : _cameraRef$current2.zoomTo(15);
      return undefined;
    }
    var _Utils$getBounds = _utils["default"].getBounds(waypoints),
      southWest = _Utils$getBounds.southWest,
      northEast = _Utils$getBounds.northEast;
    return {
      ne: northEast,
      sw: southWest,
      paddingTop: mapPadding,
      paddingRight: mapPadding,
      paddingBottom: mapPadding,
      paddingLeft: mapPadding
    };
  }, [waypoints]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      flyTo: function flyTo(location, animationDuration) {
        var _cameraRef$current3;
        return (_cameraRef$current3 = cameraRef.current) === null || _cameraRef$current3 === void 0 ? void 0 : _cameraRef$current3.flyTo(location, animationDuration);
      }
    };
  }, []);

  // Initialize Mapbox on first mount
  (0, _react.useEffect)(function () {
    _maps["default"].setAccessToken(accessToken);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_maps["default"].MapView, {
      styleURL: styleURL,
      pitchEnabled: pitchEnabled,
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_maps["default"].Camera, {
        ref: cameraRef,
        defaultSettings: {
          centerCoordinate: initialState === null || initialState === void 0 ? void 0 : initialState.location,
          zoomLevel: initialState === null || initialState === void 0 ? void 0 : initialState.zoom
        },
        bounds: bounds
      }), MarkerComponent && waypoints && waypoints.map(function (waypoint) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.MarkerView, {
          id: "".concat(waypoint[0], ",").concat(waypoint[1]),
          coordinate: waypoint,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MarkerComponent, {})
        }, "".concat(waypoint[0], ",").concat(waypoint[1]));
      }), directionCoordinates && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Direction["default"], {
        coordinates: directionCoordinates
      })]
    })
  });
});
var _default = MapView;
exports["default"] = _default;
//# sourceMappingURL=MapView.js.map