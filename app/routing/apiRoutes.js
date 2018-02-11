const path = require('path');
const friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
//Post request
    app.post("/api/friends", function (req, res) {
        let surveyResult = req.body;

        surveyResult.name = surveyResult.name.replace(/\s+/g, "");
        surveyResult.photo = surveyResult.photo.replace(/\s+/g, "");

        convertStringToInt(surveyResult.scores);

        let newUserScore = surveyResult.scores;
        let matchName = '';
        let matchImage = '';

        let totalDiff = 10000;

        //Iterate through friends array
        for (let i = 0; i < friends.length; i++) {
            let difference = 0;

            for (let s = 0; s < friends[i].scores.length; s++) {
                difference += Math.abs(friends[i].scores[s] - newUserScore[s]);
            }
            if (difference < totalDiff) {
                totalDiff = difference;

                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }
        friends.push(surveyResult);

        res.json({
            status: 'OK',
            matchName: matchName,
            matchImage: matchImage
        });
});

}

function convertStringToInt(surveyResult) {
    for (let i = 0; i < surveyResult.length; i++) {
        surveyResult[i] = parseInt(surveyResult[i]);
    }
}
