import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


Accounts.validateNewUser((user) => { //accounts.createuser function in client-end automatically hooks to backend.
  const email = user.emails[0].address;
    new SimpleSchema ({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
      }
    }).validate({email});

  return true;
});
