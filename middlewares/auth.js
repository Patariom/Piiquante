//Requires
const jwt = require('jsonwebtoken');

//Import Dotenv to use environnement variables
const dotenv = require('dotenv');
dotenv.config();


//Verify the token received from Front-End to let only authentified requests succeed
//That middleware will be added to the Sauce Routes
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
}

