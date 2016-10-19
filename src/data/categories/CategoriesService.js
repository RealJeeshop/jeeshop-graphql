import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var CategoriesService = {

    findAllCategories(args) {

        return axios.get(`${url}/jeeshop-admin/rs/categories`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findCatalogCategories(catalogId, locale) {

        let params = locale ? {locale: locale} : {};

        return axios.get(`${url}/jeeshop-admin/rs/catalogs/${catalogId}/categories`, {params: params, headers: credentials})
            .then((response) => {
                console.log("resonse.data : " + JSON.stringify(response.data));
                return response.data
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findCategoryRelatedCategories(categoryId, locale) {

        let params = locale ? {locale: locale} : {};

        return axios.get(`${url}/jeeshop-admin/rs/categories/${categoryId}/categories`, {params: params, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findCategoryById(categoryId, locale) {

        let params = locale ? {locale: locale} : {};

        return axios.get(`${url}/jeeshop-admin/rs/categories/${categoryId}`, {params: params, headers: credentials})
            .then((response) => {
                console.log("resonse.data : " + JSON.stringify(response.data));
                return response.data
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    createCategory(input) {
        return axios.post(`${url}/jeeshop-admin/rs/categories`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("error in createCategory : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    modifyCategory(input) {
        return axios.put(`${url}/jeeshop-admin/rs/categories`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("error in modifyCategory : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    deleteCategory(id) {
        return axios.delete(`${url}/jeeshop-admin/rs/categories/${id}`, {headers: credentials})
            .then((response) => {
                if(response.status == "204") return {success: true}
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    createCategoryLocalizedContent(id, input) {
        return axios.post(`${url}/jeeshop-admin/rs/categories/${id}/presentations/${input.locale}`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    getCategoryLocalizedContent(id, locale) {
        return axios.get(`${url}/jeeshop-admin/rs/categories/${id}/presentations/${locale}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    modifyCategoryLocalizedContent(categoryId, input) {
        return axios.put(`${url}/jeeshop-admin/rs/categories/${categoryId}/presentations/${input.locale}`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    deleteCategoryLocalizedContent(catalogId, locale) {
        return axios.delete(`${url}/jeeshop-admin/rs/categories/${catalogId}/presentations/${locale}`, {headers: credentials})
            .then((response) => {
                if(response.status == "204") return {success: true}
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return [];
                return []
            })
    }
};
export default CategoriesService;