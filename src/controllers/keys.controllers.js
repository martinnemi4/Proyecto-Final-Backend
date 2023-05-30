import { keyService } from "../dao/index.js";
import { DateTime } from "luxon";
import { makeId } from "../utils.js";

const getKeys = async(req, res) => {
    const result = await keyService.getKeys();
    res.send({status: "success", payload: result})
};

const getKeyBy = async(req, res) => {
    const key = req.params.kid
    const result = await keyService.getKeysBy({_id: key});
    res.send({status: "success", payload: result})
};

const createKey = async(req, res) => {
    const expiration = DateTime.now().plus({months: 2}).toISODate();
    const key = {
        expires: expiration,
        keyCode: makeId(25)
    };
    const result = await keyModel.createKey(key);
    res.send({status: "success", payload: result});
}

export default {
    getKeys,
    getKeyBy,
    createKey
}