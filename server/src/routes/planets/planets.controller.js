const {getAllPlanets} = require("../../models/plantes.model");


const httpGetAllPlanets = async function (req, res){
    return res.status(200).json(await getAllPlanets())
}

module.exports = {httpGetAllPlanets}