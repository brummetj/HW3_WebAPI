/**
 * Created by JoshuaBrummet on 2/27/17.
 */
'use strict';

var util = require('util');

module.exports = {
    getGit: testGitHub
};

function testGitHub(req,res) {

    var githubApi = require("github");

    var github = new githubApi({
        //required
         version:    '3.0.0'
    });

    //Using the vault.
    var vault = require('avault').createVault(__dirname);

    //Getting the stored token from avault and authenticating the github account
    vault.get('sigad', function (profileString) {
        var token = JSON.parse(profileString);
        console.log(token);
        github.authenticate({
            type: "oauth",
            token: token.token
        });
    });

    //Responding with github account Repo information.
    github.users.get({} , function(err, resp) {
        console.log("GOT ERR?", err);
        console.log("GOT RES?", resp);

        github.repos.getAll({}, function (err, resp) {
            console.log("GOT ERR?", err);
            console.log("GOT RES?", resp);
            res.send(resp);
        });
    });
}

