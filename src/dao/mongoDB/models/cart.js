import mongoose from "mongoose";

const collection = 'carts';

const schema = new mongoose.Schema({
    products: [
        {
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products'
            },
            quantify: {
                type: Number,
                default: 1
            }
        }
    ]
});

const cartModel = mongoose.model(collection, schema);

export default cartModel;