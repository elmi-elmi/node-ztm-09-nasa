const launches = new Map();


const launch = {
    flightNumber: 100,
    mission: "Kepler exploration x",
    rocket: "Sharokh-rocket",
    launchDate: new Date('December 27, 2023'),
    destination: "Shiraz",
    customer: ['elmi', 'ans'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);


module.exports = {
    launches
}

