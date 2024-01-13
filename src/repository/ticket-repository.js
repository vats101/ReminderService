const { Op } = require('sequelize');
const {NotificationTicket} = require('../models/index');

class TicketRepository{

    async create(data){
        try{
            data.notificationTime = new Date
            const ticket=await NotificationTicket.create({...data,status:'PENDING'});
            return ticket;
        }
        catch(error){
            console.log("Something went wrong in ticket creation ",error)
        }
    }

    async getAll(){
        try{
            const tickets=await NotificationTicket.findAll();
            return tickets;
        }
        catch(error){
            console.log(error);
        }
    }


    async get(filter){
        try{
            const ticket=await NotificationTicket.findAll({
                where:{
                    status:filter.status,
                    notificationTime:{
                        [Op.lte]:new Date()
                    }
                }
            })
            return ticket;
        }
        catch(error){
            console.log(error);
        }
    }


    async update(id,data){
        try{
            const ticket=await NotificationTicket.update(data,{
                where:{
                    id:id
                }
            })
            return ticket;
        }
        catch(error){
            console.log(error);
        }
    }
}
 
module.exports=TicketRepository;