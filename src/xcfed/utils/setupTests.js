global.fetch = require('cross-fetch');
global.window.URL = {
  createObjectURL: function () {
    return 'mock/url';
  },
  revokeObjectURL: function () {},
};
global.fetch.responseProcess = function (response) {
  // console.log(response)
  if (response.ok === true) {
    return response.json();
  } else {
    return {
      code: res.status,
      message: res.statusText,
    };
  }
};
const nodeFetch = jest.requireActual('cross-fetch');
const fetchMock = require('fetch-mock').sandbox();
Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
});
const ponyfill = require('fetch-ponyfill')();
ponyfill.responseProcess = function (response) {
  // console.log(response)
  console.log(response);
  if (response.ok === true) {
    return response.json();
  } else {
    return {
      code: res.status,
      message: res.statusText,
    };
  }
};
fetchMock.config = Object.assign(fetchMock.config, {
  Headers: ponyfill.Headers,
  Request: ponyfill.Request,
  Response: ponyfill.Response,
  fetch: ponyfill,
});

global.Headers = () => {};
module.exports = fetchMock;
