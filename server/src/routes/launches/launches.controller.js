const {getAllLaunches, addNewLaunch, abortLaunch, existLaunchById} = require("../../models/launches.model");

function httpGetLaunches(req, res){
    return res.status(200).json(getAllLaunches())
}
function httpPostLaunch(req, res){
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "Missing require launch property"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpDeleteLaunch (req, res) {
    const id = Number(req.params.id);
    console.log('------>', id)
    if(!existLaunchById(id)){
        return res.status(400).json({
            error: 'Id not found'
        })
    }else{
        const deletedLaunch = abortLaunch(id)
        return res.status(200).json(deletedLaunch)
    }
}

module.exports = {httpGetLaunches, httpPostLaunch, httpDeleteLaunch}