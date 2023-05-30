import mongoose from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

const collection = 'products';

const schema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number, 
    category: String,
    thumbnail: String,
    stock: Number
});

schema.plugin(mongoosePagination);

const productsModel = mongoose.model(collection, schema);

export default productsModel;