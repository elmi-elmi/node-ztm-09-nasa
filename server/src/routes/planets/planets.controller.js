const {planets} = require("../../models/plantes.model");


const getAllPlanets = function (req, res){
    return res.status(200).json(planets)
}

module.exports = {getAllPlanets}