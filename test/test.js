const express = require("express");
const app = express();
const { RegisterUser, Authenticateuser, logoutuser } = require("ezzyy-auth");

app.use(express.json());
const port = 4000;
const host = "127.0.0.1";
app.listen(port, host, () => {
    console.log("runnninnggg brooooo");
});
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    RegisterUser(username, password);

    res.json({ message: "success" });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    try {
        if (Authenticateuser(username, password)) {
            res.json({ message: "authorized" });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.post("/logout", (req, res) => {
    const { username } = req.body;
    if (logoutuser(username)) {
        res.json({ message: "logout successful" });
    } else {
        res.status(404).send({ message: "User not found" });
    }
});
