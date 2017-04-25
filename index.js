/*jshint esversion: 6 */
/*jslint node: true */

let request = require('request');

let api = {
  version: 'v1',
  init: function(options) {
    this.apiKey = options.apiKey;
    this.customerId = options.customerId;

    this.baseUrl = 'https://api.trackjs.com/' + this.customerId + '/';
  },
  errors: function(configObj, cb) {
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors?' + BuildQuery(configObj)), cb);
  },
  errorsByDay: function(configObj, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors/daily?' + BuildQuery(configObj)), cb);
  },
  errorsByMessage: function(configObj, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors/daily?' + BuildQuery(configObj)), cb);
  },
  errorsByUrl: function(configObj, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors/urls?' + BuildQuery(configObj)), cb);
  },
  pageViewsByDay: function(configObj, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/hits/daily?' + BuildQuery(configObj)), cb);
  }
};

module.exports = api;

function PrepOptions(url) {
  return {
    url: url,
    'Authorization': api.apiKey
  };
}

function GetRequest(options, cb) {
  request(options, function(err, res, body) {
    if (cb) {
      if (err) {
        cb(err);
      } else {
        try {
          cb(null, JSON.parse(body));
        } catch (err) {
          cb(err);
        }
      }
    }
  });
}

function BuildQuery(configObj) {
  const configKeys = Object.keys(configObj);
  let returnString = [];

  for (const arg of configKeys) {
    returnString.push(arg + '=' + configObj[arg]);
  }

  return returnString.join('&');
}

function SanitizeState() {
  if (!api.apiKey || !api.customerId) {
    throw 'track-js-data-api is not initialized';
  }
}

function PrepGetRequestOptions(url) {
  return {
    url: url,
    headers: {
      'Authorization': api.apiKey
    }
  };
}
