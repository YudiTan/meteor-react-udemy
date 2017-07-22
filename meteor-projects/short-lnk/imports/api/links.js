import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');


if (Meteor.isServer) {
  Meteor.publish('links', function (){ //has to use this instead of arrowfunction because we need the "this" method
    let userId = this.userId //when decided to use pub-sub, run meteor list and remove the 2 (prototyping) packages so that we can control the user's interaction with db
    return Links.find({userId});
  })
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link', //this helps to make the error message more readable, instead of URL must a valid URL it becomes Your Link must be a valid url.
          regEx: SimpleSchema.RegEx.Url,
        }
      }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    })
  },

  'links.setVisibility'(_id, visible){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema ({
      _id: { type: String, min: 1},
      visible: { type: Boolean },
    }).validate({ _id, visible });

    Links.update({ _id, userId: this.userId }, { $set: { visible } });
  },

  'links.trackVisit'(_id) {
    new SimpleSchema ({
      _id: { type: String, min: 1},
    }).validate({ _id });

    Links.update({_id}, {$set: { lastVisitedAt: new Date().getTime() }, $inc: { visitedCount: 1 }});
  }
});
