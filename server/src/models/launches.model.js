const launches = require("./launches.mongo");
const {getAllPlanets, getPlanetWithName} = require("./plantes.model");

const DEFAULT_FLIGHT_NUM = 100;

// const launch = {
//     flightNumber: 100,
//     mission: "Kepler exploration x",
//     rocket: "Shahrokh-rocket",
//     launchDate: new Date('December 27, 2023'),
//     target: "Shiraz",
//     customers: ['elmi', 'ans'],
//     upcoming: true,
//     success: true,
// }

// launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
    return launches.find({})
}


async function addNewLaunch(newLaunch) {
    const planet = await getPlanetWithName(newLaunch.target)
    if(!planet){
        throw new Error('No matching planet found')
    }
    let latestLaunch = await launches
        .findOne()
        .sort('-flightNumber')
    let latestFlightNumber;
    if (!latestLaunch) {
        latestFlightNumber = DEFAULT_FLIGHT_NUM
    } else {
        latestFlightNumber = latestLaunch.flightNumber + 1
    }
    await launches.findOneAndUpdate({
            flightNumber: latestFlightNumber,
        }, Object.assign(newLaunch, {
            flightNumber: latestFlightNumber,
            upcoming: true,
            success: true,
            customers: ['elmi', 'hi']
        })
        , {
            upsert: true
        })
}

async function existsLaunchById(id) {
    return launches.findOne({flightNumber: id})
}


function abortLaunch(id) {
    return launches.findOneAndUpdate({
            flightNumber: id
        }, {
            success: false,
            upcoming: false
        },
        {
            upsert: true,
        }
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchById,
    abortLaunch
};

