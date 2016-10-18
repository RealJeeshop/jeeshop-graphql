'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _Model = require('./Model');

var _CatalogMutation = require('./catalog/CatalogMutation');

var _CategoriesMutation = require('./categories/CategoriesMutation');

var _ProductMutation = require('./product/ProductMutation');

var _SKUMutation = require('./product/SKUMutation');

var _DiscountMutation = require('./discount/DiscountMutation');

var Mutation = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createCatalog: _CatalogMutation.CreateCatalogMutation,
        modifyCatalog: _CatalogMutation.ModifyCatalogMutation,
        deleteCatalog: _CatalogMutation.DeleteCatalogMutation,
        createCatalogLocalizedContent: _CatalogMutation.CreateCatalogLocalizedContentMutation,
        modifyCatalogLocalizedContent: _CatalogMutation.ModifyCatalogLocalizedContent,
        deleteCatalogLocalizedContent: _CatalogMutation.DeleteCatalogLocalizedContent,

        createCategoryMutation: _CategoriesMutation.CreateCategoryMutation,
        modifyCategoryMutation: _CategoriesMutation.ModifyCategoryMutation,
        deleteCategoryMutation: _CategoriesMutation.DeleteCategoryMutation,
        createCategoryLocalizedContent: _CategoriesMutation.CreateCategoryLocalizedContentMutation,
        modifyCategoryLocalizedContent: _CategoriesMutation.ModifyCategoryLocalizedContent,
        deleteCategoryLocalizedContent: _CategoriesMutation.DeleteCategoryLocalizedContent,

        createProductMutation: _ProductMutation.CreateProductMutation,
        modifyProductMutation: _ProductMutation.ModifyProductMutation,
        deleteProductMutation: _ProductMutation.DeleteProductMutation,
        createProductLocalizedContent: _ProductMutation.CreateProductLocalizedContent,
        deleteProductLocalizedContent: _ProductMutation.DeleteProductLocalizedContent,
        modifyProductLocalizedContent: _ProductMutation.ModifyProductLocalizedContent,

        createSKU: _SKUMutation.CreateSKUMutation,
        modifySKU: _SKUMutation.ModifySKUMutation,
        deleteSKU: _SKUMutation.DeleteSKUMutation,
        deleteSKULocalizedContent: _SKUMutation.DeleteSKULocalizedContent,
        createSKULocalizedContent: _SKUMutation.CreateSKULocalizedContent,
        modifySKULocalizedContent: _SKUMutation.ModifySKULocalizedContent,

        createDiscount: _DiscountMutation.CreateDiscountMutation,
        modifyDiscount: _DiscountMutation.ModifyDiscountMutation,
        deleteDiscount: _DiscountMutation.DeleteDiscountMutation,
        createDiscountLocalizedContent: _DiscountMutation.CreateDiscountLocalizedContent,
        modifyDiscountLocalizedContent: _DiscountMutation.ModifyDiscountLocalizedContent,
        deleteDiscountLocalizedContent: _DiscountMutation.DeleteDiscountLocalizedContent
    }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: _Model.GraphQLRoot,
    mutation: Mutation
});