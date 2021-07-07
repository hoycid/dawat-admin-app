import dbConnect from "../../../utils/dbConnect";
import Types from "../../../models/Types";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      try {
        const types = await Types.find({});
        res.status(200).json({ success: true, data: types })
      } catch(err) {
        res.status(400).json({ success: false, err});
      }
      break;
    case 'POST': 
      try {
        const type = await Types.create(req.body);
        res.status(201).json({ success: true, data: type })
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