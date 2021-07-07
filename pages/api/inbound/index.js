import dbConnect from "../../../utils/dbConnect";
import Inbound from "../../../models/Inbound";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      try {
        const inbound = await Inbound.find({}).sort({date: -1});
        res.status(200).json({ success: true, data: inbound })
      } catch(err) {
        res.status(400).json({ success: false, err});
      }
      break;
    case 'POST': 
      try {
        const inbound = await Inbound.create(req.body);
        res.status(201).json({ success: true, data: inbound })
      } catch(err) {
        const data = req.body;
        res.status(400).json({ success: false, error: err});
      }
      break;
    default:
      res.status(400).json({ success: false, err});
      break;
  }
}