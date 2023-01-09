const mongoose = require("mongoose");

const MONGO_URL = 'mongodb+srv://node-ztm-nasa-api:jNeQk6zkU66p9TS8@nodeztmnasa.wkwtgdi.mongodb.net/?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{
    console.log('mongodb open------------------------')
})

mongoose.connection.on('error',(err)=>{
    console.log('mongodb error-----------', err)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}
module.exports = {mongoConnect, mongoDisconnect};
