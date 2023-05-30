import mongoose, { mongo } from 'mongoose';

const collection = 'keys';

const schema = new mongoose.Schema({
    keyCode: String,
    type:{
        type: String,
        default: 'free'
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    expires: {  
        type: Date
    },
    usagesLeft:{
        type: Number,
        default: 10
    },
    status: {
        type: String,
        default: 'active'
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const keyModel = mongoose.model(collection, schema);

export default keyModel;

