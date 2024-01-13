const sender=require('../config/emailConfig')
const TicketRepository = require('../repository/ticket-repository')

class TicketService{

    constructor(){
        this.ticketRepository=new TicketRepository();
    }

    async sendBasicEmail(mailFrom,mailTo,mailSubject,mailBody){
        try{
            const response=await sender.sendMail({
                from:mailFrom,
                to:mailTo,
                subject:mailSubject,
                text:mailBody
            })
        }
        catch(error){
            console.log("Error in sending mail due to ",error)
        }
    }

    async fetchPendingEmails(){
        try{
            const response=await this.ticketRepository.get({status:'PENDING'});
            return response;
        }
        catch(error){
            console.log("Something went wrong in fetching emails. ",error);
        }
    }

    async createNotificationTicket(data){
        try{
            const response=await this.ticketRepository.create(data)
            return response;
        }
        catch(error){
            console.log("Something went wrong in creating notification ticket. ",error);
        }
    }
    
    async updateTicket(id,data){
        try{
            const response=await this.ticketRepository.update(id,data);
            return response;
        }
        catch(error){
            console.log("Something went wrong in creating notification ticket. ",error);
        }
    }


    async testingQueue(data){
        console.log("inside service layer " , data.toString());
    }
}
module.exports=TicketService;