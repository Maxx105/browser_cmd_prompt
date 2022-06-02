const express = require('express');
const app = express();
const path = require('path');
const { exec } = require("child_process");
const PORT = process.env.PORT || 5000;

let commandResponse = {
    response: "",
    isLoaded: false
}

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../client')));

app.get('/results', (req, res) => {
    res.send(commandResponse)
})

app.post('/results', (req, res) => {
    const cmd = req.body.command
    commandResponse = {
        response: "",
        isLoaded: false
    }
    if (cmd === "") {
        commandResponse = {
            response: "Please enter command",
            isLoaded: true
        }
        res.json(commandResponse)
    } else exec(cmd, (error, stdout, stderr) => {
        if (error) {
            commandResponse = {
                response: stderr,
                isLoaded: true
            }
        } else {
            commandResponse = {
                response: stdout,
                isLoaded: true
            }
        }
        res.json(commandResponse)
    })
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))