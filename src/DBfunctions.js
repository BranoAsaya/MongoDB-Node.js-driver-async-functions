const mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient,
  ObjectId = mongodb.ObjectId,
  url = "mongodb://localhost:27017/",
  client = MongoClient.connect(url),
  DBname = "jsonplaceholder",
  collection = "todos";
let database, params, object, docs, newClient;

async function getAllDocs(req, res) {
  try {
    newClient = await MongoClient.connect(url);
    database = newClient.db(DBname);
    docs = await database.collection(collection).find({}).toArray();
    res.status(200).send(docs);
  } catch (error) {
    res.status(404).send("not found");
  }
}

async function getOneDoc(req, res) {
  try {
    newClient = await MongoClient.connect(url);
    database = newClient.db(DBname);
    params = req.params.id;
    object = { _id: ObjectId(params) };
    docs = await database.collection(collection).find(object).toArray();
    if (docs.length === 0) {
      throw "Not Found";
    }
    res.send(docs);
  } catch (error) {
    res.status(404).send(error);
  }
}
async function addOneDoc(req, res) {
  try {
    newClient = await MongoClient.connect(url);
    database = newClient.db(DBname);
    object = req.body;
    if (body.userId == null || body.id == null || body.title == null || body.completed == null) {
      throw "input error";
    }
    docs = await database.collection(collection).insertOne(object);
    console.log(docs);
    if (docs === null) {
      throw "Not Found";
    }
    res.send(docs);
  } catch (error) {
    res.status(404).send(error);
  }
}
async function deleteOneDoc(req, res) {
  try {
    newClient = await MongoClient.connect(url);
    database = newClient.db(DBname);
    params = req.params.id;
    object = { _id: ObjectId(params) };
    docs = await database.collection(collection).deleteOne(object);
    if (docs.deletedCount === 0) {
      throw "Not Found";
    }
    res.send(docs);
  } catch (error) {
    res.status(404).send(error);
  }
}
async function updateOneDoc(req, res) {
  try {
    newClient = await MongoClient.connect(url);
    body = req.body;
    database = newClient.db(DBname);
    params = req.params.id;
    object = { _id: ObjectId(params) };
    update = {
      $set: {
        userId: body.userId,
        id: body.id,
        title: body.title,
        completed: body.completed,
      },
    };
    if (
      body.userId == null ||
      body.id == null ||
      body.title == null ||
      body.completed == null
    ) {
      throw "input error";
    }
    docs = await database.collection(collection).updateOne(object, update);
    console.log(docs);
    if (Object.keys(docs).length === 0) {
      throw "Not Found";
    }
    res.send(docs);
  } catch (error) {
    res.status(404).send(error);
  }
}
module.exports = {
  getAllDocs,
  getOneDoc,
  updateOneDoc,
  deleteOneDoc,
  addOneDoc,
};
