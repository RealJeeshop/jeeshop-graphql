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

var CatalogService = {
    findAllCatalog: function findAllCatalog(args) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs', { params: args, headers: credentials }).then(function (response) {
            console.log("response.data of find all : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            if (response.status == "404") return [];
        });
    },
    findCatalogById: function findCatalogById(id) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            if (response.status == "404") return [];
        });
    },
    createCatalog: function createCatalog(input) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/catalogs', input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response catch: " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    modifyCatalog: function modifyCatalog(input) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/catalogs', input, { headers: credentials }).then(function (response) {
            console.log("response : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            if (response.status == "404") return [];
            return [];
        });
    },
    deleteCatalog: function deleteCatalog(id) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/catalogs/' + id, { headers: credentials }).then(function (response) {
            console.log("response.data of delete : " + JSON.stringify(response));
            return computeServiceResult(response);
        }).catch(function (response) {
            console.log("response.data of catch delete : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    getCatalogLocalizedContent: function getCatalogLocalizedContent(id, locale) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs/' + id + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            console.log("response from getCatalogLocalizedContent: " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    createCatalogLocalizedContent: function createCatalogLocalizedContent(id, input) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/catalogs/' + id + '/presentations/' + input.locale, input, { headers: credentials }).then(function (response) {
            console.log("response from createCatalogLocalizedContent: " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
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