import fs from "fs";
import moment from "moment";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const timeStamp = moment().format("MM-DD-YYYY");

  fs.mkdir(`./assets/${timeStamp}`, { recursive: true }, function (err) {
    return console.log(err);
  });

  const data = await new Promise((resolve, reject) => {
    const form = formidable({
      multiple: true,
      uploadDir: `./assets/${timeStamp}`,
    });

    form.keepExtensions = true;
    form.keepFileName = true;

    form.on("fileBeing", function (name, file) {
      file.path = path.join(`assets/${timeStamp}`, file.name);
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
  res.status(201).json(data);
};
