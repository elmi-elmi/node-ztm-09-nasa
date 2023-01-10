const launches = require("./launches.mongo");
const { getPlanetWithName} = require("./plantes.model");
const axios = require("axios");

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
    return launches.find({},{
        _id: 0, __v:0
    })
}

// TODO: getLatestFlightNumber function
async function getLatestFlightNumber(){
    let latestLaunch = await launches
        .findOne()
        .sort('-flightNumber')
    let latestFlightNumber;
    if (!latestLaunch) {
        latestFlightNumber = DEFAULT_FLIGHT_NUM
    } else {
        latestFlightNumber = latestLaunch.flightNumber + 1
    }
    return latestFlightNumber
}
async function addNewLaunch(launch) {
    const planet = await getPlanetWithName(newLaunch.target)
    if(!planet){
        throw new Error('No matching planet found')
    }
    const latestFlightNumber = await getLatestFlightNumber()

    const newLaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true,
        customers: ['elmi', 'hi']
    })

    await saveLaunch(launch)

}
async function saveLaunch(launch){
    await launches.findOneAndUpdate({
            flightNumber: launch.flightNumber,
        }, launch
        , {
            upsert: true
        });
}
async function existsLaunchById(id) {
    return launches.findOne({flightNumber: id})
}


async function abortLaunch(id) {
    const aborted = await launches.updateOne({
            flightNumber: id
        }, {
            success: false,
            upcoming: false
        },
        {
            upsert: true,
        }
    );
    return aborted.acknowledged && aborted.modifiedCount === 1
}
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {name: 1},
                },
                {
                    path: 'payloads',
                    select: {customers: 1}
                }
            ]
        }
    })
    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        console.log(launchDoc['flight_number'], launchDoc.rocket['name']);
        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap(p => p['customers']);
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            success: launchDoc['success'],
            upcoming: launchDoc['upcoming'],
            launchDate: launchDoc['date_local'],
            customers
        };
        saveLaunch(launch)
    }
}


async function loadLaunchesData() {
    console.log('Downloading launches data ...')
    if (await existsLaunchById(1)) return

    await populateLaunches();
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchById,
    abortLaunch,
    loadLaunchesData
};

