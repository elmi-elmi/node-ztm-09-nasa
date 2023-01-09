const {getAllLaunches, addNewLaunch, abortLaunch, existsLaunchById} = require("../../models/launches.model");

async function httpGetLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpPostLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing require launch property"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    try{
        await addNewLaunch(launch);
        return res.status(201).json(launch)
    }catch (err){
        return res.status(400).json({
            error: err
        })
    }

}

async function httpDeleteLaunch(req, res) {
    const id = Number(req.params.id);
    const existsLaunch = await existsLaunchById(id)
    if (!existsLaunch) {
        return res.status(400).json({
            error: 'Id not found'
        })
    } else {
        const abortedLaunch = await abortLaunch(id)
        if (!abortedLaunch) {
            return res.status(400).json({error: 'Launch not aborted'})
        }
        return res.status(200).json(abortedLaunch)
    }
}

module.exports = {httpGetLaunches, httpPostLaunch, httpDeleteLaunch}