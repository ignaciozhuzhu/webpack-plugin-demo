// @ts-nocheck
/// <reference path="../../../types/global.d.ts" />
//import '../../../setupTests';
import {stringify} from 'qs';
import fetchMock from 'fetch-mock';
import FetchUtils from '../index';
const ponyfill = require('fetch-ponyfill')();
fetchMock.config = Object.assign(fetchMock.config, {
  Headers: ponyfill.Headers,
  Request: ponyfill.Request,
  Response: ponyfill.Response,
  fetch: ponyfill,
});

const Response = ponyfill.Response;
jest.autoMockOff();

function getFormatRequestInit(op: {body: Object}): RequestInit {
  return Object.assign(op, {body: JSON.stringify(op.body)});
}

describe('FetchUtils使用 Get 请求', () => {
  it.skip('fetch Get 请求200 不带参数', (done) => {
    let mockResult = {
      body: {code: 0},
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let url = 'http://localhost/201';
    let options = {body: {a: 1}};
    let mock = fetchMock.mock(url, mockResult, options);
    FetchUtils.fetchGet(url).then((result) => {
      expect(result).toEqual(mockResult.body);
      mock.lastOptions(true, {headers: {}});
      done();
    });
  });
  it.skip('fetch Get 请求200 global responseProcess', (done) => {
    let mockResult = {
      body: {code: 0},
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let responseProcessResult = {
      body: {code: 1},
    };
    let url = 'http://localhost/response/200';
    let options = {body: {a: 1}};
    fetchMock.mock(url, mockResult, options);
    global.fetch.responseProcess = (): Promise<any> => {
      return Promise.resolve(responseProcessResult);
    };
    FetchUtils.fetchRequest(url, {}).then((result) => {
      expect(result).toEqual(responseProcessResult);
      // @ts-ignore
      delete global.fetch.responseProcess;
      done();
    });
  });
  it.skip('fetch Get 请求200 global responseProcess default', (done) => {
    let mockResult = {
      body: {code: 0},
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let responseProcessResult = {
      body: {code: 1},
    };
    let url = 'http://localhost/response/default/200';
    let options = {body: {a: 1}};
    fetchMock.mock(url, mockResult, options);

    FetchUtils.fetchGet(url).then((result) => {
      global.fetch.responseProcess = (): Promise<any> => {
        return Promise.resolve(responseProcessResult);
      };
      expect(result).toEqual(mockResult.body);
      FetchUtils.fetchGet(url).then((result) => {
        expect(result).toEqual(responseProcessResult);
        // @ts-ignore
        delete global.fetch.responseProcess;
        done();
      });
    });
  });
  it.skip('fetch Get 请求500 不带参数', (done) => {
    let mockResult = {
      code: 500,
    };
    let url = 'http://localhost/500';
    let options = {};
    fetchMock.mock(url, 500, options);
    FetchUtils.fetchGet(url).then((result: {code: number; msg: string}) => {
      expect(result.code).toEqual(mockResult.code);
      done();
    });
  });

  it.skip('fetch Get 请求200 带参数 a=1', (done) => {
    let mockResult = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    };
    let url = 'http://localhost/a/aa?b=2';
    let options: {body: Object} = {
      body: {
        a: 1,
      },
    };
    fetchMock.mock(
      [url, stringify(options.body)].join('?'),
      mockResult,
      options
    );
    const body = {b: 1};
    FetchUtils.fetchGet(url, body).then(
      (result: {code: number; message: string; data: Object}) => {
        expect(result).toEqual(mockResult.body);
        done();
      }
    );
  });
  it.skip('fetch Get 请求200 url带参数 a=1 body b:1', (done) => {
    let mockResult = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    };
    let url = 'http://localhost/?a=1';
    let options = {
      body: {
        b: 1,
      },
    };
    fetchMock.mock(
      [url, stringify(options.body)].join('&'),
      mockResult,
      options
    );

    FetchUtils.fetchGet(url, getFormatRequestInit(options)).then((result) => {
      expect(result).toEqual(mockResult.body);
      done();
    });
  });

  it.skip('fetch Get 请求200 带参数 array a=["2018","2019"]', (done) => {
    let mockResult = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    };
    let url = 'http://localhost/withParam/array';
    let options = {
      body: {
        a: ['2018', '2019'],
      },
    };
    fetchMock.mock(
      url.concat('?a=%5B%222018%22%2C%222019%22%5D'),
      mockResult,
      options
    );

    FetchUtils.fetchGet(url, getFormatRequestInit(options)).then((result) => {
      expect(result).toEqual(mockResult.body);
      done();
    });
  });
  it.skip('fetchList 请求200', (done) => {
    const mockResult = {
      body: {
        code: 0,
        data: {
          item: [],
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let url = 'http://localhost/fetchList/200';
    fetchMock.mock(url, mockResult, {});
    FetchUtils.fetchList(url).then((result) => {
      expect(result).toEqual(mockResult.body);
      done();
    });
  });
});
describe.skip('FetchUtils使用 upload 请求', () => {
  it('upload 请求200', (done) => {
    let mockResult = {code: 0};
    let url = 'http://localhost/upload/200';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');
    fetchMock.mock(url, response);
    FetchUtils.fetchUpload(url, {}).then((result) => {
      expect(result).toEqual(mockResult);
      done();
    });
  });
  it('upload 请求200 content-type为文件', (done) => {
    let mockResult = {code: 0};
    let url = 'http://localhost/upload/file/200';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'multipart/form-data');
    fetchMock.mock(url, response);
    FetchUtils.fetchUpload(url, {}).then(async (result) => {
      expect(result.headers.get('Content-Type')).toEqual('multipart/form-data');
      expect(await result.json()).toEqual(mockResult);
      done();
    });
  });
  it('upload 请求500', (done) => {
    let mockResult = {
      code: 500,
    };
    let url = 'http://localhost/upload/500';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response);
    FetchUtils.fetchUpload(url, {}).then((result) => {
      expect(result).toEqual(mockResult);
      done();
    });
  });
});
describe.skip('FetchUtils使用 Post 请求', () => {
  it('post 请求200', (done) => {
    let mockResult = {code: 0};
    let url = 'http://localhost/post/200';
    let options = {
      a: 1222,
    };
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response, options);
    FetchUtils.fetchPost(url, getFormatRequestInit(options)).then((result) => {
      expect(result).toEqual(mockResult);
      done();
    });
  });

  it('post 请求500', (done) => {
    let mockResult = {code: 500};
    let url = 'http://localhost/post/500';
    let options = {
      body: {},
    };
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response, options);
    FetchUtils.fetchPost(url, getFormatRequestInit(options)).then((result) => {
      expect(result).toEqual(mockResult);
      done();
    });
  });

  it('fetch aborted throw error ', (done) => {
    let mockResult = {
      body: {
        code: -1,
        message: 'Failed to fetch',
      },
    };
    let url = 'http://localhost/post/500/throw';
    let options = {
      body: {},
    };
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.config.fallbackToNetwork = false;
    fetchMock.mock(url, response, options);
    FetchUtils.fetchPost(url, getFormatRequestInit(options)).then((result) => {
      expect(result).toEqual(mockResult);
      done();
    });
  });
});
describe.skip('FetchUtils使用 fetchDownload 请求', () => {
  it('fetchDownload 请求200', (done) => {
    let mockResult = {
      body: {
        code: 0,
        message: 'success',
      },
    };
    let url = 'http://localhost/download/200';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'text/xml');
    fetchMock.mock(url, response, {method: 'GET'});
    FetchUtils.fetchDownload(url).then((result) => {
      expect(result).toEqual(mockResult.body);
      done();
    });
  });
  it('fetchDownload 返回类型', (done) => {
    let mockResult = {
      blob: (): Promise<any> => {
        return Promise.resolve();
      },
      headers: {},
      body: {code: 0, message: 'success'},
    };
    let url = 'http://localhost/downloadfail/200/down';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'text/xml');
    fetchMock.mock(url, response, {method: 'GET'});
    FetchUtils.fetchDownload(url).then(
      (result: {code: number; msg: string; data: Object}) => {
        expect(result).toEqual(mockResult.body);
        done();
      }
    );
  });
});
it.skip('fetchDownload 浏览器兼容', (done) => {
  let mockResult = {
    blob: (): Promise<any> => {
      return Promise.resolve();
    },
    headers: {},
    body: {code: 0, message: 'success'},
  };
  window.navigator.msSaveOrOpenBlob = () => {
    return true;
  };
  let url = 'http://localhost/download/ie';
  const response = new Response(JSON.stringify(mockResult));
  response.headers.set('Content-Type', 'text/xml');
  fetchMock.mock(url, response, {method: 'GET'});
  FetchUtils.fetchDownload(url).then(
    (result: {code: number; msg: string; data: Object}) => {
      expect(result).toEqual(mockResult.body);
      done();
    }
  );
});
describe.skip('FetchUtils使用 fetchGraphql请求', () => {
  it('fetchGraphql请求200', (done) => {
    let mockResult = {data: {}};
    let url = 'http://localhost/graphql/base';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response);
    FetchUtils.fetchGraphql(url, {}).then((result) => {
      expect(result).toEqual(mockResult);
      done();
    });
  });

  it('fetchGraphqlList请求200', (done) => {
    let mockResult = {
      data: {
        result: {},
      },
    };
    let url = 'http://localhost/graphql/graphqlList';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response);

    FetchUtils.fetchGraphqlList(url, {}).then((result) => {
      expect(result).toEqual(mockResult.data.result);
      done();
    });
  });

  it('fetchGraphqlAsResult请求200', (done) => {
    let mockResult = {
      data: {
        result: {},
      },
    };
    let url = 'http://localhost/graphql/graphqlListAsResult';
    const response = new Response(JSON.stringify(mockResult));
    response.headers.set('Content-Type', 'application/json');
    fetchMock.mock(url, response);
    FetchUtils.fetchGraphqlAsResult(url, {}).then((result) => {
      expect(result).toEqual(mockResult.data.result);
      done();
    });
  });
});
describe.skip('stringifyURL 方法', () => {
  it('是否可以将对应url中的变量替换', () => {
    const url = 'http://localhost/:id';
    const options = {
      id: 123,
    };
    const result = 'http://localhost/123';

    expect(FetchUtils.stringifyURL(url, JSON.stringify(options))).toEqual(
      result
    );
  });

  it('如果变量不同则报错', () => {
    const url = 'http://localhost/:id';
    const options = {
      member: 213,
    };
    let errorMessage = {message: ''};
    try {
      FetchUtils.stringifyURL(url, JSON.stringify(options));
    } catch (error) {
      errorMessage = error;
    }
    expect(errorMessage.message).toBe(
      'Could not find url parameter id in passed options object'
    );
  });

  it('替换值为0的时候，不报错', () => {
    const url = 'http://localhost/:id';

    const options = {
      id: 0,
    };
    const result = 'http://localhost/0';

    expect(FetchUtils.stringifyURL(url, JSON.stringify(options))).toEqual(
      result
    );
  });

  it('替换值为null 时，转换为字符串null ', () => {
    const url = 'http://localhost/:id';

    const options = {
      id: null,
    };
    const result = 'http://localhost/null';

    expect(FetchUtils.stringifyURL(url, JSON.stringify(options))).toEqual(
      result
    );
  });
});
describe.skip('FetchUtils使用 processBody 方法', () => {
  it('processBody', (done) => {
    const options = {
      body: {
        aa: 123,
        bb: 456,
      },
    };
    const result = {
      body: Object.assign({}, options.body, {
        currentPage: undefined,
        totalCount: undefined,
        pageSize: undefined,
      }),
    };

    expect(result).toEqual(
      FetchUtils.processBody(getFormatRequestInit(options))
    );
    done();
  });

  it('processPraramItem 如果正常传入值没有空和数组则不转化', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    expect(FetchUtils.processPraramItem(obj)).toEqual(obj);
  });

  it('processPraramItem 如果对象值为空则转为undefined', () => {
    const obj = {
      a: '',
    };
    expect(FetchUtils.processPraramItem(obj)).toEqual({a: undefined});
  });

  it('processPraramItem 如果对象值为[]则转为undefined', () => {
    const obj = {
      a: [],
    };

    expect(FetchUtils.processPraramItem(obj)).toEqual({a: undefined});
  });

  it('processPraramItem 如果值为数组则转为字符串', () => {
    const obj = {
      a: [1, 2, 3],
    };

    expect(FetchUtils.processPraramItem(obj)).toEqual({
      a: JSON.stringify([1, 2, 3]),
    });
  });

  it('processPraramItem 如果值为json则不处理', () => {
    const obj = {
      a: {
        b: 1,
      },
    };
    const result = {
      b: 1,
    };
    expect(FetchUtils.processPraramItem(obj)).toEqual({a: result});
  });

  it('processGraphqlParams undefined', () => {
    let result = {
      start: 0,
      end: 9,
    };
    expect(FetchUtils.processGraphqlParams(undefined)).toEqual(result);
  });

  it('processGraphqlParams {current:1,pageSize:10}', () => {
    let params = {current: 1, pageSize: 10};
    let result = {start: 0, end: 9};
    expect(FetchUtils.processGraphqlParams(params)).toEqual(result);
  });

  it("processGraphqlParams {order:'descend',columnKey:'aa'} 别名转换 ", () => {
    let params = {order: 'descend', columnKey: 'aa'};
    let result = {order: 'desc', orderBy: 'aa', start: 0, end: 9};
    expect(FetchUtils.processGraphqlParams(params)).toEqual(result);
  });
  it("processGraphqlParams {order:'descend',columnKey:'aa'} 非别名不转换 ", () => {
    let params = {order: 'descend', columnKey: 'aa', name: '11'};
    let result = {order: 'desc', orderBy: 'aa', name: '11', start: 0, end: 9};
    expect(FetchUtils.processGraphqlParams(params)).toEqual(result);
  });
});
describe.skip('FetchUtils使用 processBody 方法', () => {
  it('processBody', (done) => {
    const options = {
      body: {
        aa: 123,
        bb: 456,
      },
    };
    const result = {
      body: Object.assign({}, options.body, {
        currentPage: undefined,
        totalCount: undefined,
        pageSize: undefined,
      }),
    };
    expect(result).toEqual(
      FetchUtils.processBody(getFormatRequestInit(options))
    );
    done();
  });

  it('processPraramItem 如果正常传入值没有空和数组则不转化', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    expect(FetchUtils.processPraramItem(obj)).toEqual(obj);
  });

  it('processPraramItem 如果对象值为空则转为undefined', () => {
    const obj = {
      a: '',
    };
    expect(FetchUtils.processPraramItem(obj)).toEqual({a: undefined});
  });
});

describe.skip('FetchUtils使用 测试global.fetch方法', () => {
  it('preRequestProcess', (done) => {
    async function sleep(ms: number) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
      });
    }
    global.fetch.preRequestProcess = async function (url, options) {
      // @ts-ignore tmp global variable
      global.preRequestProcess = true;
      await sleep(500);
    };
    const url = 'http://localhost/prerequest';
    const response = new Response(JSON.stringify({a: 1}));

    fetchMock.mock(url, response, {method: 'GET'});

    FetchUtils.fetchRequest(url, {}).then((result) => {
      // @ts-ignore tmp global variable
      expect(global.preRequestProcess).toEqual(true);
      delete global.fetch.preRequestProcess;
      done();
    });
  });

  it('preRequestOptions', (done) => {
    global.fetch.preRequestOptions = function (options, url) {
      options.test = true;
      return options;
    };
    const url = 'http://localhost/preRequestOptions';
    const response = new Response(JSON.stringify({test: true}));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response, {method: 'GET'});
    FetchUtils.fetchRequest(url, {}).then((result) => {
      expect(result.test).toEqual(true);
      done();
    });
  });

  it('catchGlobalErrorProcess', (done) => {
    global.fetch.catchGlobalErrorProcess = function (err) {
      // @ts-ignore
      global.iserror = true;
      return {
        code: -1,
        message: err.message,
      };
    };
    global.fetch.responseProcess = (): Promise<any> => {
      return Promise.reject({});
    };
    const url = 'http://localhost/catchGlobalErrorProcess/500/throw';
    const response = new Response(JSON.stringify({test: true}));
    response.headers.set('Content-Type', 'application/json');

    fetchMock.mock(url, response, {method: 'GET'});
    FetchUtils.fetchRequest(url, {}).then(() => {
      // @ts-ignore
      expect(global.iserror).toEqual(true);
      done();
    });
  });
});
