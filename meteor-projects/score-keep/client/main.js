import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Players, calculatePlayerPositions} from './../imports/api/players'; // on the client, when you call this collection and user its .insert method, it automatically runs minimongo which is sync to mongo via ddp
import {Tracker} from 'meteor/tracker';

import App from './../imports/ui/app';



Meteor.startup(() => {
  //Call tracker.autorun
    // create variable called players = players.find().fetch()
    // render players to the screen
  Tracker.autorun(() => {//tracker auto checks for changes in the given function and then runs the function again when the data changes
    let players = Players.find({}, {sort: {score: -1}}).fetch(); //first para for .find() is filter, if dont wanna filter leave it blank. second is the sort
    let positionedPlayers = calculatePlayerPositions(players);
    let title = "Score Keep";
  ReactDOM.render(<App title={title} players={positionedPlayers}/>, document.getElementById('app'));
  });

});
