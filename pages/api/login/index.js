// import jwt from "jsonwebtoken";
// const KEY = "uidudf818294u899rf8sdas"

// export default (req, res) => {
//     if (!req.body) {
//         res.statusCode = 404
//         res.end("Error")
//         return
//     }

//     const { username, password } = req.body;

//     res.json({
//         token: jwt.sign(
//         {
//             username,
//             admin: username === "admin" && password === "admin"
//         }, KEY)
//     });
// };
