const express = require("express");
const {httpGetLaunches, httpPostLaunch, httpDeleteLaunch} = require("./launches.controller")

const launchesRouter = express.Router();
launchesRouter.get('/', httpGetLaunches)
launchesRouter.post('/', httpPostLaunch);
launchesRouter.delete('/:id', httpDeleteLaunch)


module.exports = launchesRouter;