const jwt =  require("jsonwebtoken")
const envs = require("../envs")

const verifyToken = (req, res ,next) =>{
    const authHeader = req.headers.authorization

    if(authHeader) {
        jwt.verify(authHeader , envs.JWT_SECRET, (err) => {
            if(err) {
                return res.status(403).json({message: "Token is not valid"})
            }
            next()
        })
    }else{
        res.status(401).json({message: "You are not authorized"})
    }
}

module.exports = verifyToken