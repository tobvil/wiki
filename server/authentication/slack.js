'use strict'

/* global wiki */

// ------------------------------------
// Slack Account
// ------------------------------------

const SlackStrategy = require('passport-slack').Strategy

module.exports = {
  key: 'slack',
  title: 'Slack',
  props: ['clientId', 'clientSecret', 'callbackURL'],
  init (passport, conf) {
    passport.use('slack',
      new SlackStrategy({
        clientID: conf.clientId,
        clientSecret: conf.clientSecret,
        callbackURL: conf.callbackURL
      }, (accessToken, refreshToken, profile, cb) => {
        wiki.db.User.processProfile(profile).then((user) => {
          return cb(null, user) || true
        }).catch((err) => {
          return cb(err, null) || true
        })
      }
      ))
  }
}
