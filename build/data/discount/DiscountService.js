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

var DiscountService = {
    findAllDiscounts: function findAllDiscounts(args) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/discounts', { params: args, headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findDiscountById: function findDiscountById(id) {

        return _axios2.default.get(url + '/jeeshop-admin/rs/discounts/' + id, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    findDiscountsWithMultipleIds: function findDiscountsWithMultipleIds(args) {
        var _this = this;

        if (!args) {
            return null;
        }

        var calls = args.map(function (id) {
            return _this.findDiscountById(id);
        });

        return _axios2.default.all(calls).then(_axios2.default.spread(function (args) {
            console.log("args : " + JSON.stringify(args));
        }));
    },
    modifyDiscount: function modifyDiscount(input) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/discounts/', input, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    deleteDiscount: function deleteDiscount(id) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/discounts/' + id, { headers: credentials }).then(function (response) {
            return response;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
            return {};
        });
    },
    findDiscountLocalizedContent: function findDiscountLocalizedContent(id, locale) {
        return _axios2.default.get(url + '/jeeshop-admin/rs/discounts/' + id + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    deleteDiscountLocalizedContent: function deleteDiscountLocalizedContent(discountId, locale) {
        return _axios2.default.delete(url + '/jeeshop-admin/rs/discounts/' + discountId + '/presentations/' + locale, { headers: credentials }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    createDiscountLocalizedContent: function createDiscountLocalizedContent(discountId, locale, presentationObject) {
        return _axios2.default.post(url + '/jeeshop-admin/rs/discounts/' + discountId + '/presentations/' + locale, presentationObject, { headers: credentials }).then(function (response) {

            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    },
    modifyDiscountLocalizedContent: function modifyDiscountLocalizedContent(discountId, locale, presentationObject) {
        return _axios2.default.put(url + '/jeeshop-admin/rs/discounts/' + discountId + '/presentations/' + locale, presentationObject, { headers: credentials }).then(function (response) {
            console.log("response : " + JSON.stringify(response.data));
            return response.data;
        }).catch(function (response) {
            console.log("response error : " + JSON.stringify(response));
            if (response.status == "404") return [];
        });
    }
};
exports.default = DiscountService;