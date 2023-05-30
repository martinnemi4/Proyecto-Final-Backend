import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts'
    },
    avatar: String,
    library: [
        {
            products: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products'
            },
            purchase: Date
        }
    ]
})

const userModel = mongoose.model(collection, schema);

export default userModel;