const express=require('express');
const bodyParser= require('body-parser');
const app=express();
const {PORT} = require('./config/serverConfig')
const {sendBasicEmail}=require('./services/ticket-service')
const Job = require('./utils/job');
const db=require('./models/index');
const {createTicket} = require('./controllers/ticket-controller')
const {createChannel, subscribeMessage, publishMessage}=require('./utils/message-queue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');
const TicketService = require('./services/ticket-service');
const ticketService = new TicketService();

const setupAndStartServer=async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
    const channel = await createChannel();
    subscribeMessage(channel,ticketService,REMINDER_BINDING_KEY);

    app.post('/api/v1/ticket',createTicket);
    app.listen(PORT,async()=>{
        // await db.sequelize.sync({alter:true}) 
        console.log(`Server started on ${PORT}`);
        const job=new Job();
        job.setupJobs();
    })
}

setupAndStartServer();