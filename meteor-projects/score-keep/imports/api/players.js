import {Mongo} from 'meteor/mongo';
import numeral from 'numeral';

export const Players = new Mongo.Collection('players');


export const calculatePlayerPositions = (players) => {
  let rank = 1;

  return players.map((player, index) => {
    if (index !== 0 && players[index-1].score > player.score) {
      rank++;
    }

    return {
      ...player, //Object spread operator, basically bringing in the properties from the player object
      rank,
      position: numeral(rank).format('0o'),
    };
  });
};
