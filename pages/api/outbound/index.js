import dbConnect from "../../../utils/dbConnect";
import Outbound from "../../../models/Outbound";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const threeMonthsAgoInSeconds = threeMonthsAgo.getTime() / 1000;

  switch (method) {
    case "GET":
      try {
        const outbound = await Outbound.find({
          date: { $gte: threeMonthsAgoInSeconds },
        }).sort({
          date: -1,
        });
        res.status(200).json({ success: true, data: outbound });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case "POST":
      try {
        const outbound = await Outbound.create(req.body);
        res.status(201).json({ success: true, data: outbound });
      } catch (err) {
        res.status(400).json({ success: false, error: err });
      }
      break;
    default:
      res.status(400).json({ success: false, err });
      break;
  }
};
