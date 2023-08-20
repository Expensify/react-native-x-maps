"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactMapGl = _interopRequireWildcard(require("react-map-gl"));
var _react = require("react");
var _webMercator = _interopRequireDefault(require("@math.gl/web-mercator"));
var _reactNative = require("react-native");
var _utils = _interopRequireDefault(require("./utils"));
require("mapbox-gl/dist/mapbox-gl.css");
var _Direction = _interopRequireDefault(require("./Direction"));
var _CONST = require("./CONST");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getAdjustment = function getAdjustment(mapWidth, mapHeight, waypoints, mapPadding) {
  var viewport = new _webMercator["default"]({
    height: mapWidth,
    width: mapHeight
  });
  var _Utils$getBounds = _utils["default"].getBounds(waypoints.map(function (waypoint) {
      return waypoint.coordinate;
    })),
    northEast = _Utils$getBounds.northEast,
    southWest = _Utils$getBounds.southWest;
  return viewport.fitBounds([southWest, northEast], {
    padding: mapPadding
  });
};
var MapView = /*#__PURE__*/(0, _react.forwardRef)(function MapView(_ref, ref) {
  var _mapRef$getCanvas;
  var accessToken = _ref.accessToken,
    waypoints = _ref.waypoints,
    style = _ref.style,
    mapPadding = _ref.mapPadding,
    directionCoordinates = _ref.directionCoordinates,
    _ref$initialState = _ref.initialState,
    initialState = _ref$initialState === void 0 ? _CONST.DEFAULT_INITIAL_STATE : _ref$initialState;
  // const mapRef = useRef<MapRef>(null);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    mapRef = _useState2[0],
    setMapRef = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    bounds = _useState4[0],
    setBounds = _useState4[1];
  var setRef = (0, _react.useCallback)(function (newRef) {
    return setMapRef(newRef);
  }, []);
  var _ref2 = (_mapRef$getCanvas = mapRef === null || mapRef === void 0 ? void 0 : mapRef.getCanvas()) !== null && _mapRef$getCanvas !== void 0 ? _mapRef$getCanvas : {
      clientHeight: undefined,
      clientWidth: undefined
    },
    mapHeight = _ref2.clientHeight,
    mapWidth = _ref2.clientWidth;
  (0, _react.useEffect)(function () {
    if (!waypoints || waypoints.length === 0) {
      return;
    }
    if (!mapRef || !mapWidth || !mapHeight) {
      return;
    }
    if (waypoints.length === 1) {
      console.log('map size', mapHeight, mapWidth);
      mapRef.flyTo({
        center: waypoints[0].coordinate,
        zoom: 15
      });
      return;
    }
    var newBounds = getAdjustment(mapWidth, mapHeight, waypoints, mapPadding);
    setBounds(newBounds);
  }, [waypoints, mapHeight, mapWidth]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      flyTo: function flyTo(location, animationDuration) {
        mapRef === null || mapRef === void 0 ? void 0 : mapRef.flyTo({
          center: location,
          duration: animationDuration
        });
      }
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactMapGl["default"], _objectSpread(_objectSpread({
      ref: setRef,
      mapboxAccessToken: accessToken,
      initialViewState: {
        longitude: initialState === null || initialState === void 0 ? void 0 : initialState.location[0],
        latitude: initialState === null || initialState === void 0 ? void 0 : initialState.location[1],
        zoom: initialState === null || initialState === void 0 ? void 0 : initialState.zoom
      },
      mapStyle: "mapbox://styles/mapbox/streets-v9"
    }, bounds), {}, {
      children: [waypoints && waypoints.map(function (_ref3) {
        var coordinate = _ref3.coordinate,
          MarkerComponent = _ref3.markerComponent;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactMapGl.Marker, {
          longitude: coordinate[0],
          latitude: coordinate[1],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MarkerComponent, {})
        }, "".concat(coordinate[0], ",").concat(coordinate[1]));
      }), directionCoordinates && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Direction["default"], {
        coordinates: directionCoordinates
      })]
    }))
  });
});
var _default = MapView;
exports["default"] = _default;
//# sourceMappingURL=MapView.web.js.map