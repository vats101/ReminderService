const cron=require('node-cron');
const EmailService = require('../services/ticket-service');
const sender=require('../config/emailConfig');
const {subscribeMessage,createChannel} = require('./message-queue');

class Job{
    constructor(){
        this.emailService=new EmailService();
    }

    async setupJobs(){
        cron.schedule('*/1 * * * *',async ()=>{
            console.log('running cron task every 1 minutes');
            const response=await this.emailService.fetchPendingEmails();
            // console.log(response);
            response.forEach(async (email)=>{
                // console.log(email.recipientEmail, email.subject, email.content);
                await sender.sendMail({
                    from:'shriyamehta186@gmail.com',
                    to:email.recipientEmail,
                    subject:email.subject,
                    text:email.content

                },(err,data)=>{
                        if(err)
                            console.log(err);
                        else{
                            // console.log(data);
                            this.emailService.updateTicket(email.id,{status:'SUCCESS'});
                        }  
                    }
                )}
            )
        })
    }
}
module.exports=Job ;