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
        modifyProductLocalizedContent: _ProductMutation.ModifyProductLocalizedContent

    }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: _Model.GraphQLRoot,
    mutation: Mutation
});