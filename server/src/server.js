const http = require("http");
const {mongoConnect} = require('./services/mongo');
const {loadPlanetsData} = require('./models/plantes.model')
const {loadLaunchesData} = require("./models/launches.model")
const PORT =process.env.PORT || 8000;

const app = require('./app');
const server = http.createServer(app);




async function startServer(){
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(PORT,()=>{
        console.log('listening on ', PORT);
    })
}

startServer()