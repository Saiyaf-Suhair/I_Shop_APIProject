const crypto = require("crypto");
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {
  if (req.url === "/api/items") {
    try {
      let body = await requestBodyparser(req);
      console.log("Request Body:", body);
      body.id = crypto.randomUUID();
      req.items.push(body);
      writeToFile(req.items);
      res.writeHead(201, { "Content-type": "application/json" });
      res.end();
    } catch (error) {
      console.log(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request Body is not Valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
  }
};
