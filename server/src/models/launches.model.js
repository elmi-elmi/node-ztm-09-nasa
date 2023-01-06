const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler exploration x",
    rocket: "Shahrokh-rocket",
    launchDate: new Date('December 27, 2023'),
    target: "Shiraz",
    customer: ['elmi', 'ans'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(newLaunch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(newLaunch, {
            success: true,
            upcoming: true,
            customer: ['elmi', 'el'],
            flightNumber: latestFlightNumber
        })
    )
}

module.exports = {
    getAllLaunches,
    addNewLaunch
}

