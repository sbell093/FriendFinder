var friendData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

// app.post("/api/friends", function (req, res) {
//     if (friendData.length < 10) {
//         friendData.push(req.body);
//         res.json(true);
//     }
// });




}