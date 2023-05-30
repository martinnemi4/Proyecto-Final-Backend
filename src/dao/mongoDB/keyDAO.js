import keyModel from "./models/key.js";

export default class keyDAO{
    getKeys = () => {
        return keyModel.find().lean()
    };
    getKeyBy = (params) => {
        return keyModel.findOne(params).lean()
    };
    createKey = (key) => {
        return keyModel.create(key)
    };
    updateKey = (id, key) => {
        return keyModel.findByIdAndUpdate(id, {$set: key})
    }
}