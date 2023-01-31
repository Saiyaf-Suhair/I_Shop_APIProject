module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  //To validate a UUID
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i
  );

  if (req.url === "/api/items") {
    res.statuCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.items));
    res.end();
  } else if (!regexV4.test(id)) {
    console.log(regexV4.test(id));
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not Valid",
      })
    );
  } else if (baseUrl === "/api/items/" && regexV4.test(id)) {
    res.statuCode = 200;
    res.setHeader("Content-Type", "application/json");
    let filteredItems = req.items.filter((item) => {
      return item.id === id;
    });

    //ITEMS fOUNDS
    if (filteredItems.length > 0) {
      res.statuCode = 200;
      res.write(JSON.stringify(filteredItems));
      res.end();
    } else {
      res.statuCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Item Not Found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
  }
};
