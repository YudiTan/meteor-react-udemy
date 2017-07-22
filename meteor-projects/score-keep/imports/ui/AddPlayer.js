import React from 'react';
import {Players} from './../api/players';

export default class AddPlayer extends React.Component {
  handleSubmit (e) { //e means event, which is basically the entire submitted form object
    let playerName = e.target.playerName.value;
    e.preventDefault(); //this stops refresh
    if (playerName){ //check to see if it is non empty string
      e.target.playerName.value = ''; //so input box becomes empty again after submmiting name
      Players.insert({
        name: playerName,
        score: 0
      });
    }
  };

  render() {
    return (
      <div className="item">
        {/* have to manually .bind(this ) in event listeners */}
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <input className="form__input" type="text" name="playerName" placeholder="Player name"/>
          <button className="button">Add Player</button>
        </form>
      </div>
    )
  }
};
