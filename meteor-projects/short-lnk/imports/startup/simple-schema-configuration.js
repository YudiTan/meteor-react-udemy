import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.defineValidationErrorTransform((error) => { //import this in client and server main.js so that whenever there is an error it automatically calls this whenever we use simpleschema.
  return new Meteor.Error(400, error.message);
});
