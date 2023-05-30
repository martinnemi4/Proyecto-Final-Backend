import { productService } from "../dao/index.js";

const createProduct = async(req,res) => {
    const file = req.file;
    const {title, description, code, price, category, stock} = req.body;
    if(!title||!description||!code||!price) return res.send(400).send({status:"error",error:"Incomplete values."});
    const product = {
        title,
        description,
        code,
        price,
        category,
        thumbnail: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
        stock
    }
    const result = await productService.createProduct(product);
    res.send({status:"success",payload:result})
}

const getProducts = async(req,res) => {
    const products = await productService.getProducts();
    res.send({status:"success", payload:products})
};



export default {
    createProduct,
    getProducts
}