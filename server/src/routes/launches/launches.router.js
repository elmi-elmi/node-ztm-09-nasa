const express = require("express");
const {httpGetLaunches, httpPostLaunch} = require("./launches.controller")

const launchesRouter = express.Router();
launchesRouter.get('/', httpGetLaunches)
launchesRouter.post('/', httpPostLaunch);


module.exports = launchesRouter;