import {keyService} from '../dao/index.js';

export const handleKey = async(req, res, next) => {
    const keyQuery = req.params.apiKey;
    if(!keyQuery){
        return res.status(401).send({stauts:"error", error:"No key provided"});
    };
    const key = await keyService.getKeyBy({keyCode: keyQuery});
    if(!key){
        return res.status(401).send({status:"error", error: "Invalid key"});
    };
    if(key.status!=="active"){
        return res.status(400).send({status:"error", error: "Key not active"});
    };
    if(key.usagesLeft <= 0){
        return res.status(400).send({stauts:"error", error:"No more usages left"});
    };
    key.usagesLeft--;
    if(key.usagesLeft <= 0){
        //insert mail for no more usages left
    };
    await keyService.updateKey(key._id,{usagesLeft:key.usagesLeft});
    next();
};