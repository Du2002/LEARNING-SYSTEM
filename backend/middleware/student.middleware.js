const jwt = require("jsonwebtoken")


async function authenticateStudent(req,res,next){
    try {
         
        const token = req.headers.authorization?.split(" ")[1];
 


        if(!token){
            return res.status(404).json({msg:"Token not found "})
        }else{
            const valid = await jwt.verify(token,"12345")

            if (!valid){
                return res.status(401).json({msg:"Token Invalid"})
            } else if (valid.role !=="student"){
                return res.status(401).json({msg:"Permission denied"})
            }else{ 
                req.user = valid._id
                next()
            }

        }
    } catch (error) {
        return res.status(500).json({msg:"Token Invalid!"})
    }
}

module.exports = {authenticateStudent}