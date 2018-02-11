var path = require('path');
var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
//Post request
    app.post("/api/friends", function (req, res) {
        var surveyResult = req.body;

        surveyResult.name = surveyResult.name.replace(/\s+/g, "");
        surveyResult.photo = surveyResult.photo.replace(/\s+/g, "");

        convertStringToInt(surveyResult.scores);

        var newUserScore = surveyResult.scores;
        var matchName = '';
        var matchImage = '';

        var totalDiff = 10000;

        //Iterate through friends array
        for (var i = 0; i < friends.length; i++) {
            var difference = 0;

            for (var s = 0; s < friends[i].scores.length; s++) {
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
    for (var i = 0; i < surveyResult.length; i++) {
        surveyResult[i] = parseInt(surveyResult[i]);
    }
}
