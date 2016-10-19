'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var credentials = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json" };
var url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var UsersService = {
    findAllUsers: function findAllUsers() {

        return _axios2.default.get(url + '/jeeshop-admin/rs/users', { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    findUserById: function findUserById(id) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/users/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    }
};
exports.default = UsersService;