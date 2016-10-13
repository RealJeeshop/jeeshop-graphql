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

var CategoriesService = {
    findAllCategories: function findAllCategories(args) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/categories', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findCatalogCategories: function findCatalogCategories(catalogId, locale) {

        var params = locale ? { locale: locale } : {};

        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs/' + catalogId + '/categories', { params: params, headers: credentials }).then(function (response) {
            console.log("resonse.data : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findCategoryRelatedCategories: function findCategoryRelatedCategories(categoryId, locale) {

        var params = locale ? { locale: locale } : {};

        return _axios2.default.get(url + '/jeeshop-admin/rs/categories/' + categoryId + '/categories', { params: params, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findCategoryById: function findCategoryById(categoryId, locale) {

        var params = locale ? { locale: locale } : {};

        return _axios2.default.get(url + '/jeeshop-admin/rs/categories/' + categoryId, { params: params, headers: credentials }).then(function (response) {
            console.log("resonse.data : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createCategory: function createCategory(input) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/categories', input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("error in createCategory : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    modifyCategory: function modifyCategory(input) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/categories', input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("error in createCategory : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    deleteCategory: function deleteCategory(id) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/categories/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createCategoryLocalizedContent: function createCategoryLocalizedContent(id, input) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/categories/' + id + '/presentations/' + input.locale, input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    getCategoryLocalizedContent: function getCategoryLocalizedContent(id, locale) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/categories/' + id + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    modifyCategoryLocalizedContent: function modifyCategoryLocalizedContent(categoryId, input) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/categories/' + categoryId + '/presentations/' + input.locale, input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    },
    deleteCategoryLocalizedContent: function deleteCategoryLocalizedContent(catalogId, locale) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/categories/' + catalogId + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return [];
        });
    }
};
exports.default = CategoriesService;