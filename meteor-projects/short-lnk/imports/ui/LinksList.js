import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import {Links} from '../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }


  componentDidMount() { // automatically runs when the below render successfully runs
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible') //this is originally set in main.js
      }).fetch();
      this.setState({links});
    });
  };
  componentWillUnmount(){ //fires right before the component is removed from screen. these are lifecycle methods.
    this.linksTracker.stop(); //stops the autorun function so that it doesnt keep running in the background, helps faster runtime.
  };
  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className='item'>
          <p className='item__status-message'>No Links Found</p>
        </div>
      )
    }
    return this.state.links.map((l) => {
      const shortUrl = Meteor.absoluteUrl(l._id);
      return <div key={l._id}><LinksListItem  shortUrl={shortUrl} {...l}/></div>
   });
  };

  render(){
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
