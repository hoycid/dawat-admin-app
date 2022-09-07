import dbConnect from "../../../utils/dbConnect";
import Log from "../../../models/Log";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const threeMonthsAgoInSeconds = threeMonthsAgo.getTime() / 1000;

  switch (method) {
    case "GET":
      try {
        const log = await Log.find({
          date: { $gte: threeMonthsAgoInSeconds },
        }).sort({
          date: -1,
        });
        res.status(200).json({ success: true, data: log });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case "POST":
      try {
        const log = await Log.create(req.body);
        res.status(201).json({ success: true, data: log });
      } catch (err) {
        res.status(400).json({ success: false, error: err });
      }
      break;
    default:
      res.status(400).json({ success: false, err });
      break;
  }
};
