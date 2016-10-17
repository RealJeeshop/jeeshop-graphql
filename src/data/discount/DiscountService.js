import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var DiscountService = {

    findAllDiscounts(args) {

        return axios.get(`${url}/jeeshop-admin/rs/discounts`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findDiscountById(id) {

        return axios.get(`${url}/jeeshop-admin/rs/discounts/${id}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findDiscountsWithMultipleIds(args) {

        if(!args) {
            return null;
        }

        let calls = args.map(id => {
            return this.findDiscountById(id)
        });

        return axios.all(calls)
            .then(axios.spread((args) => {
                    console.log("args : " + JSON.stringify(args));
            }))
    }

};
export default DiscountService;