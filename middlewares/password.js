const passwordValidator = require('password-validator');

// Create a schema
const passwordSchema = new passwordValidator();

// Set properties for schema
passwordSchema
.is().min(5)                                    // Minimum length 5
.is().max(50)                                   // Maximum length 50
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


//Verify the password set by user fits all the properties set
//That middleware will be added to the User Signup Route
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)) {
        next()
    } else {
        res.status(400).json({ error : "Ce mot de passe est incorrect. Il doit comprendre entre 5 et 25 caractères, avec des caractères miniscules et majuscules, au moins 1 chiffre et pas d'espaces." });
    }
}

