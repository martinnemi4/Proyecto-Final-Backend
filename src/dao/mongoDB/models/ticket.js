import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    products: [
        {
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:'products'
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        unique: true
    }
}, {timestampos: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;