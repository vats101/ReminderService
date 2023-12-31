const sender=require('../config/emailConfig')

const sendBasicEmail=async(mailFrom,mailTo,mailSubject,mailBody)=>{
    try{
        const response=await sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        })
    }catch(error){
        console.log("Error in sending mail due to ",error)
    }
}

module.exports={
    sendBasicEmail
};