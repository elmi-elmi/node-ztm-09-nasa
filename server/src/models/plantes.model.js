const {parse} = require('csv-parse');
const fs = require('fs');
const path = require("path");
const planets = require("./planets.mongo");


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

 function loadPlanetsData (){
    return new Promise((resolve, reject)=>{
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler-data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                    if (isHabitablePlanet(data)) {
                       await savePlanet(data)
                    }
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', async () => {
                const countFoundPlanet = await getAllPlanets()
                // console.log(`${countFoundPlanet} habitable planets found!`);
                resolve()
            });


    })
}

async function getAllPlanets(){
    return  planets.find({},{
        _id:0, __v:0
    })
}

async function savePlanet(data) {
    try {
        await planets.findOneAndUpdate({
            keplerName: data.kepler_name
        }, {
            keplerName: data.kepler_name
        }, {
            upsert: true
        })
    } catch (err) {
        // console.log(err)
    }
}

async function getPlanetWithName(name){
    return planets.findOne({keplerName: name})
}

module.exports = {
    getAllPlanets,
    loadPlanetsData,
    getPlanetWithName
}