import { Meteor } from 'meteor/meteor';
import '../imports/api/users'; //basically importing the entire file
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';
import { WebApp } from 'meteor/webapp'; //allows us to attach middleware

Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1); //req.url returns /asdsada from localhost:3000/asdsada , 1 refers to asdsada
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else{
      next()
    }

  });
});
