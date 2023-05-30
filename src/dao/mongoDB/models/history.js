import mongoose from "mongoose";

const collection = 'histories';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    events: [
        {
            event: String,
            date: Date,
            description: String,
            thumbnail: String,
            tags: Array
        }
    ]
});

const historyModel = mongoose.model(collection, schema);

export default historyModel;