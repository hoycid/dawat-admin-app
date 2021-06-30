import { MongoClient } from "mongodb";

// /api/inbound
// POST /api/inbound

async function handler(req, res) {
    if(req.method === "POST") {
        const data = req.body;
    }

    const connection = await MongoClient.connect("mongodb+srv://cid-admin:dhmdl33leh05243@pagro-admin.szvh2.mongodb.net/pagro-admin?retryWrites=true&w=majority");
    const db = connection.db();

    console.log(db)

    const inboundCollection = db.collection("inbound");

    const result = await inboundCollection.insertOne(data);

    console.log(result);

    connection.close();

    res.status(201).json({ message: "Inbound document successfully processed!" })
}

export default handler;