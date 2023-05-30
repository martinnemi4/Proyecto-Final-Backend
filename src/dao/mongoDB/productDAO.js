import productsModel from "./models/product.js";

export default class productDAO {
    getProducts = (params, page=1) => {
        return productsModel.paginate(params,{page,limit:12,lean:true})
    };

    getProductById = (id) => {
        return productsModel.findOne({_id: id}).lean()
    }

    createProduct = (product) => {
        return productsModel.create(product);
    };
};