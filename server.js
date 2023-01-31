const http = require("http");

const getReg = require("./methods/get-request");
const postReg = require("./methods/post-request");
const putReg = require("./methods/put-request");
const deleteReg = require("./methods/delete-request");
let items = require("./data/items.json");

//require("dotenv").config();

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    req.items = items;
    switch (req.method) {
        case "GET":
            getReg(req, res);
            break;
        case "POST":
            postReg(req, res);
            break;
        case "PUT":
            putReg(req, res);
            break;
        case "DELETE":
            deleteReg(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title:"Not Found", message: "Route Not Found" }));
            res.end();
    }


    
});

server.listen(PORT, () => {
    console.log(`Server has started on port :${PORT}`);
});