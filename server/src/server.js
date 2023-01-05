const http = require("http");
const PORT =process.env.PORT || 8000;
const {loadPlanetsData} = require('./models/plantes.model')

const app = require('./app');


const server = http.createServer(app);



async function startServer(){
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log('listening on ', PORT);
    })
}

startServer()