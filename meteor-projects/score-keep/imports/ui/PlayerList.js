import React from 'react';
import Player from './Player';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move'; //meteor npm install this package for animation of shuffling the list

export default class PlayerList extends React.Component {
  renderPlayers() {
    if (this.props.players.length === 0) {
      return <div className='item'><p className="item__message item__message--empty">Add your first player to get started!</p></div>
    }
    return this.props.players.map((p) => {
      return <Player key={p._id} player={p} />;
    });
  }
  render() {
    return (
      <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderPlayers()}
          </FlipMove>
      </div>
  );
};
};

PlayerList.PropTypes = {
  players: PropTypes.array.isRequired,
};
