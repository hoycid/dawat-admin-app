import { MongoClient } from "mongodb";

// /api/inbound
// POST /api/inbound

async function handler(req, res) {
    if(req.method === "POST") {
        const data = req.body;
    }

    const url = "mongodb+srv://cid-admin:12345@pagro-admin.szvh2.mongodb.net/pagroadmin?retryWrites=true&w=majority";
    const client = await MongoClient.connect(url);
    const db = client.db();

    const inboundCollection = db.collection("inbounds");

    const result = await inboundCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Inbound document successfully processed!" })
}

export default handler;