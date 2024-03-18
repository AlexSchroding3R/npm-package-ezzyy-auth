const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.secret_key || "sdfsdfuhd*(#^&(@-34woie82634234j3246723wne";

let token;
let usercredentials = {};
function RegisterUser(username, password) {
    const data = {
        username: username,
        password: password,
    };
    token = jwt.sign(data, key);
    usercredentials[username] = {
        password: password,
        token: token,
    };
}

function Authenticateuser(username, password) {
    try {
        if (usercredentials[username] && usercredentials[username].password === password) {
            if (jwt.verify(token, key)) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log("error:", error.message);
        return false;
    }
}

function logoutuser(username){
    if(usercredentials[username]){
        delete usercredentials[username]
        return true
    }
    return false

}

module.exports = { RegisterUser, Authenticateuser , logoutuser };
