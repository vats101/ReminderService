const TicketService = require('../services/ticket-service');

ticketService= new TicketService();

const createTicket=async (req,res)=>{
    try{
        const response=await ticketService.createNotificationTicket(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            message:"Successfully created",
            error:{}
        })
    }
    catch(error){   
        return res.status(500).json({
            data:{},
            success:false,
            message:"Error in creating ticket",
            error:error
        })
    }
}



module.exports={createTicket};