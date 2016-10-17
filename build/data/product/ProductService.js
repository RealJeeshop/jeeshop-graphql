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

var ProductService = {
    findAllProducts: function findAllProducts(args) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/products', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findProductById: function findProductById(id, locale) {

        var params = locale ? { locale: locale } : {};
        return _axios2.default.get(url + '/jeeshop-admin/rs/products/' + id, { params: params, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createProduct: function createProduct(args) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/products', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    modifyProduct: function modifyProduct(args) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/products', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    deleteProduct: function deleteProduct(id) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/products/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findProductLocalizedContent: function findProductLocalizedContent(productId, locale) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/products/' + productId + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    deleteProductLocalizedContent: function deleteProductLocalizedContent(productId, locale) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/products/' + productId + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createProductLocalizedContent: function createProductLocalizedContent(productId, locale, presentationObject) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/products/' + productId + '/presentations/' + locale, presentationObject, { headers: credentials }).then(function (response) {

            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    modifyProductLocalizedContent: function modifyProductLocalizedContent(productId, locale, presentationObject) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/products/' + productId + '/presentations/' + locale, presentationObject, { headers: credentials }).then(function (response) {
            console.log("response : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findProductRelatedSKUs: function findProductRelatedSKUs(productId) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/products/' + productId + '/skus', { headers: credentials }).then(function (response) {
            console.log("response : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    }
};
exports.default = ProductService;