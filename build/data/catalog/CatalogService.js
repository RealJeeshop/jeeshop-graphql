'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var credentials = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==" };

var CatalogService = {
    findAllCatalog: function findAllCatalog(args) {
        return _axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            if (response.status == "404") return [];
        });
    },
    findCatalogById: function findCatalogById(id) {
        return _axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            if (response.status == "404") return [];
        });
    },
    createCatalog: function createCatalog(input) {
        return _axios2.default.post('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs', input, { headers: credentials }).then(function (response) {
            console.log("response : " + JSON.stringify(response));
            return response.data;
        }).catch(function (response) {
            console.log("response : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    }
};

function computeServiceResult(response) {

    var result = {};
    switch (response.status) {

        case 200:
        case 201:
        case 204:
            result.message = "Success";
            result.success = true;
            break;

        case 400:
            result.message = response.data.message + ': ' + response.data.exception;
            result.success = false;
            break;

        case 409:
            result.message = response.data.message + ': ' + response.data.exception;
            result.success = false;
            break;

        default:
            result.message = '(' + response.status + ') ' + response.data.message + ': ' + response.data.exception;
            result.success = false;
            break;
    }

    return result;
}

exports.default = CatalogService;