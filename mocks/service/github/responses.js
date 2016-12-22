import request from 'request';
import React from 'react';
import ReactDOM from 'react-dom/server';

import LoginForm from './login-form';

export function okayNewHookCreated(req, res) {
  res.status(201);
  // No response body implemented
  res.send();

  // Send ping to webhook endpoint
  request.post({
    url: req.body.config.url,
    headers: {
      'X-Github-Delivery': '72d3162e-cc78-11e3-81ab-4c9367dc0958',
      'User-Agent': 'GitHub-Hookshot/044aadd',
      'X-GitHub-Event': 'issues'
    },
    json: {
      'zen': 'Draco dormiens nunquam titillandus',
      'hook_id': 'anid',
      'hook': req.body.config
    }
  });
}

export function okayPromptForLogin(req, res) {
  res.status(200).send(ReactDOM.renderToString(
    <LoginForm
      redirectUrl={ req.query.redirect_uri }
      sharedSecret={ req.query.state }
    />
  ));
}

export function errorNoAccountOrRepo(req, res) {
  res.status(404).send({
    message: 'Not Found'
  });
}

export function errorBadCredentials(req, res) {
  res.status(401).send({
    message: 'Bad Credentials'
  });
}

export function errorWebhookExists(req, res) {
  res.status(422).send({
    message: 'Validation Failed'
  });
}

export function okayAuthenticated(req, res) {
  res.status(200).send({
    access_token: 'e72e16c7e42f292c6912e7710c838347ae178b4a',
    scope: 'read:repo_hook',
    token_type: 'bearer'
  });
}