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

var SKUService = {
    findAllSKUs: function findAllSKUs(args) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/skus', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findSKUById: function findSKUById(id) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/skus/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createSKU: function createSKU(input) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/skus/', input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    modifySKU: function modifySKU(input) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/skus/', input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    deleteSKU: function deleteSKU(id) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/skus/' + id, { headers: credentials }).then(function (response) {
            return response;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return {};
        });
    },
    findSKULocalizedContent: function findSKULocalizedContent(id, locale) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/skus/' + id + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    deleteSKULocalizedContent: function deleteSKULocalizedContent(skuId, locale) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/skus/' + skuId + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createSKULocalizedContent: function createSKULocalizedContent(skuId, locale, presentationObject) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/skus/' + skuId + '/presentations/' + locale, presentationObject, { headers: credentials }).then(function (response) {

            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    modifySKULocalizedContent: function modifySKULocalizedContent(skuId, locale, presentationObject) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/skus/' + skuId + '/presentations/' + locale, presentationObject, { headers: credentials }).then(function (response) {
            console.log("response : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    }
};
exports.default = SKUService;