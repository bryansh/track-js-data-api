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
  errors: function(startDate, endDate, page, pageSize, includeStack, application, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors?' + query), cb);
  },
  errorsByDay: function(startDate, endDate, page, pageSize, includeStack, application, sorting, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors/daily?' + query), cb);
  },
  errorsByMessage: function(startDate, endDate, page, pageSize, includeStack, application, sorting, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors/daily?' + query), cb);
  },
  errorsByUrl: function(startDate, endDate, page, pageSize, includeStack, application, sorting, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/errors/urls?' + query), cb);
  },
  pageViewsByDay: function(startDate, endDate, page, pageSize, includeStack, application, cb) {
    let query = BuildQuery(startDate, endDate, page, pageSize, includeStack, application);
    GetRequest(PrepGetRequestOptions(this.baseUrl + api.version + '/hits/daily?' + query), cb);
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

function BuildQuery(startDate, endDate, page, pageSize, includeStack, application, sorting) {
  let returnString = [];

  if (startDate) {
    returnString.push('startDate=' + startDate);
  }

  if (endDate) {
    returnString.push('endDate=' + endDate);
  }

  if (page) {
    returnString.push('page=' + page);
  }

  if (pageSize) {
    returnString.push('pageSize=' + pageSize);
  }

  if (includeStack) {
    returnString.push('includeStack=' + includeStack);
  }

  if (application) {
    returnString.push('application=' + application);
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
