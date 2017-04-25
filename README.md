# track-js-data-api
NodeJS implementation of the Track JS Data Api

# Prerequisites
You'll need to get a Track JS API Access API key and a Track JS API Access Customer ID from  
https://my.trackjs.com/Account/Organization.

#Installation and Initialization

````
npm install track-js-data-api
````

Then in your Node application

````
const trackjs = require('track-js-data-api');

track.init({ apiKey: '<insert your apikey here>', customerId: '<insert your customerId here>' });
````

After that you are good to go!

#Available Exports

## errors

`trackjs.errors(configObj, cb)`
http://docs.trackjs.com/data-api/errors

## errorsByDay

`trackjs.errorsByDay(configObj, cb)`
http://docs.trackjs.com/data-api/errors-by-day

## errorsByMessage

`trackjs.errorsByMessage(configObj, cb)`
http://docs.trackjs.com/data-api/errors-by-message

## errorsByUrl

`trackjs.errorsByUrl(configObj, cb)`
http://docs.trackjs.com/data-api/errors-by-url

## pageViewsByDay

`trackjs.pageViewsByDay(configObj, cb)`
http://docs.trackjs.com/data-api/pageviews-by-day

# configObj

All of the methods, take a config object:

```{
  startDate: <YYYY-MM-DDTHH:MM:SS<timezone>>,
  endDate: <YYYY-MM-DDTHH:MM:SS<timezone>>,
  page: <page number to return>,
  size: <number of items on a page>,
  application: <application of which to filter results by>,
  sort: <(date|count|usercount)>|<asc|desc>
  }
```

# Dependencies

* Request module
