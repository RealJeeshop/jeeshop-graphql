'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerViewer = registerViewer;
exports.getViewerLocale = getViewerLocale;
exports.getViewer = getViewer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewer = exports.Viewer = function (_Object) {
    _inherits(Viewer, _Object);

    function Viewer() {
        _classCallCheck(this, Viewer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).apply(this, arguments));
    }

    return Viewer;
}(Object);

var VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.catalogId = VIEWER_ID;
viewer.locale = 'fr_FR';

var users = {};
users[VIEWER_ID] = viewer;

var usersById = _defineProperty({}, VIEWER_ID, viewer);

function registerViewer(viewer) {

    if (users[viewer.catalogId] == undefined) {
        users[viewer.catalogId] = viewer;
    }
}

function getViewerLocale(viewerId) {
    return users[viewerId].locale;
}

function getViewer(viewerId) {
    return users[viewerId];
}