const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL,EXCHANGE_NAME} = require('../config/serverConfig');


const createChannel = async()=>{
    try{
        // console.log("In message queue")
        console.log(MESSAGE_BROKER_URL,EXCHANGE_NAME)
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        // console.log(channel);
        return channel; 
    }catch(error){
        console.log("Error due to ",error);
    }
}   

const subscribeMessage=async(channel,service,binding_key)=>{
    try{
        const applicationQueue=await channel.assertQueue('tasks');
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue,msg=>{
            // console.log('received data');
            const payload = JSON.parse(msg.content.toString());
            console.log(payload);
            service.createNotificationTicket(payload.data);
            channel.ack(msg);
        });
    }catch(error){
        console.log("Error in subscribing ",error);
    }
}

const publishMessage=async(channel,binding_key)=>{
    try{
        await channel.assertQueue('tasks');
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from('success'));
    }catch(error){
        console.log("Error in publishing ",error);
    }
}

module.exports={createChannel,subscribeMessage,publishMessage};