const express = require("express"),
  app = express(),
  baseRoute = "/todos",
  baseRouteID = "/todos/:id",
  PORT = 8080,
  {
    getAllDocs,
    getOneDoc,
    updateOneDoc,
    deleteOneDoc,
    addOneDoc,
  } = require("./DBfunctions");

app.use(express.json());

app.get(baseRoute, (req, res) => {
  getAllDocs(req, res);
});
app.post(baseRoute, (req, res) => {
  addOneDoc(req, res);
});
app.get(baseRouteID, (req, res) => {
  getOneDoc(req, res);
});
app.delete(baseRouteID, (req, res) => {
  deleteOneDoc(req, res);
});
app.patch(baseRouteID, (req, res) => {
  updateOneDoc(req, res);
});

app.listen(PORT, () => {
  console.log("start");
});
