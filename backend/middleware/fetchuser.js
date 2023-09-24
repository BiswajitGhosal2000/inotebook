const jwt = require("jsonwebtoken");
const JWT_SECRET = 'ghosalbiswajit11';

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // console.log(data)
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please Authenticate using a valid token" })
    }
}




module.exports = fetchuser;