// @ts-nocheck
import {stringify} from 'qs';
import {GraphqlBodyObject, GraphqlParams, defaultPageParams} from './interface';
import * as qiniu from 'qiniu-js';
import {fetch} from 'cross-fetch';

var global = {};
global.fetch = fetch;

// 默认的Headers
const defaults: RequestInit = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    Pragma: 'no-cache',
  },
};

// notes: 所有自定义的的对象或常规对象上自定义挂载，都使用(<any>object)强制转换 不做校验

class FetchUtilsBase {
  // 获取请求
  static async fetchRequest(url: string, options: RequestInit): Promise<any> {
    if (!this.checkFetch()) {
      return Promise.resolve({code: -2, message: 'fetch not found'});
    }

    if (options.method === 'GET' || options.method === 'HEAD') {
      delete options.body;
    }

    options = this.removeContentType(this.combineOptions(defaults, options));

    if (
      global.fetch.preRequestProcess &&
      typeof global.fetch.preRequestProcess === 'function'
    ) {
      await global.fetch.preRequestProcess(url, options);
    }

    if (
      global.fetch.preRequestOptions &&
      typeof global.fetch.preRequestOptions === 'function'
    ) {
      options = global.fetch.preRequestOptions(options, url);
    }

    return fetch(url, options)
      .then(
        (global.fetch.responseProcess ||
          this.defauleFetchResponseProcess.call(this, options)) as any
      )
      .catch(
        (global.fetch.catchGlobalErrorProcess ||
          function (err: Error) {
            return {
              code: -1,
              ok: false,
              message: err.message,
            };
          }) as any
      );
  }

  // 默认的处理返回数据函数
  protected static defauleFetchResponseProcess(options: RequestInit): Function {
    return (res: Response): Promise<any> => {
      if (res.ok === true) {
        const contentType =
          res.headers.get('Content-Type') || 'application/json';
        const isJsonType =
          contentType && contentType.indexOf('application/json') !== -1;
        if (!isJsonType) {
          return Promise.resolve(res);
        } else {
          return res.json();
        }
      }
      return Promise.resolve({
        code: res.status,
        message: res.statusText,
      });
    };
  }

  // 检验fetch 是否存在
  protected static checkFetch(): boolean {
    // global绑定判断-兼容判断
    if (global.fetch && typeof global.fetch === 'function') {
      return true;
    }

    // 抛错
    console.error(`
        import fetch from 'cross-fetch'  // import you fetch utils
        global.fetch = fetch
    `);
    return false;
  }

  // 合并Options
  protected static combineOptions(
    options: RequestInit = {},
    newOptions: RequestInit = {}
  ): RequestInit {
    return Object.assign({}, defaults, options, newOptions, {
      headers: Object.assign({}, options.headers, newOptions.headers),
    });
  }

  // 去除options的headers的contenttype
  protected static removeContentType(options: RequestInit = {}): RequestInit {
    if (options.headers) {
      for (const key in options.headers) {
        if (
          options.headers[key] === undefined ||
          options.headers[key] === null
        ) {
          delete options.headers[key];
          continue;
        }
        if (key === 'clean-content-type' && options.headers[key]) {
          delete options.headers['Content-Type'];
        }
      }
    }

    return options;
  }
}
export default class FetchUtils extends FetchUtilsBase {
  static readonly defaultsHeaders = defaults;

  // 返回错误
  static fetchCatch(error: Error): Error {
    return error;
  }

  static formateOptions(options?: RequestInit): void {
    // console.log(89,options)
    if (options) {
      // && typeof options.data === 'string'
      try {
        options.body = JSON.parse(JSON.stringify(options));
        //console.log(89,options)
      } catch (error) {
        throw new Error(`parse options is error ${options}`);
      }
    }
  }

  // 获取Get请求类型资源数据
  static fetchGet(url: string, options?: RequestInit): Promise<any> {
    // options = this.processBody(options);
    //this.formateOptions(options);
    // console.log(44,options)
    if (options) {
      // && options.body && options.body !== ''
      url = [this.stringifyURL(url, options), stringify(options)].join(
        url.indexOf('?') > 0 ? '&' : '?'
      );
      url = url.replace(/\?$/, '');
    }
    // console.log(66,options)
    return this.fetchRequest(
      url,
      this.combineOptions({method: 'GET'}, options)
    );
  }

  // 获取列表
  static fetchList(url: string, options?: RequestInit): Promise<any> {
    return this.fetchGet(url, options);
  }

  // 更新数据（POST）
  static fetchPost(url: string, options?: RequestInit): Promise<any> {
    this.formateOptions(options);
    if (options && options.body) {
      url = this.stringifyURL(url, options.body);
      if (options.body !== '' && typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
      }
    }
    //console.log(44, options);
    return this.fetchRequest(
      url,
      this.combineOptions(
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Pragma: 'no-cache',
          },
          method: 'POST',
        },
        options
      )
    );
  }

  // 更新数据（PUT）
  static fetchPut(url: string, options?: RequestInit): Promise<any> {
    return this.fetchPost(
      url,
      this.combineOptions(
        {
          method: 'PUT',
        },
        options
      )
    );
  }

  // 删除数据（DELETE）
  static fetchDelete(url: string, options?: RequestInit): Promise<any> {
    return this.fetchPost(
      url,
      this.combineOptions(
        {
          method: 'DELETE',
        },
        options
      )
    );
  }

  // 获取数据（Graphql接口）
  static fetchGraphql(url: string, options?: RequestInit): Promise<any> {
    options = this.combineOptions(
      {
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Pragma: 'no-cache',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
      },
      options
    );
    this.formateOptions(options);
    if (options && options.body) {
      this.pickObject(<any>options.body);
    }

    return this.fetchPost(url, options);
  }

  static pickObject(
    body: GraphqlBodyObject,
    keys: Array<string> = []
  ): GraphqlBodyObject {
    return {
      operationName: body.operationName,
      query: body.query,
      variables: body.variables,
    };
  }

  // 获取数据（Graphql接口，返回去掉data.result的外包装）
  static fetchGraphqlAsResult(
    url: string,
    options?: RequestInit
  ): Promise<any> {
    return this.fetchGraphql(url, options).then(
      (res: Object | Response): Promise<any> => (<any>res)?.data?.result
    ); // 无法确定是哪种类型的数据，需要根据数据类型处理
  }

  // 获取数据(Graphql列表接口，返回去掉data.result的外包装)
  static fetchGraphqlList(url: string, options?: RequestInit): Promise<any> {
    this.formateOptions(options);
    if (options && options.body) {
      (<any>options.body).variables = this.processGraphqlParams(
        (<any>options.body).variables
      );
    }
    return this.fetchGraphqlAsResult(url, options);
  }

  // 上传数据
  static fetchUpload(url: string, options?: RequestInit): Promise<any> {
    this.formateOptions(options);
    if (options && options.body) {
      url = this.stringifyURL(url, options.body);
    }
    let params = new FormData();
    for (let i in (<any>options).body) {
      params.append(i, (<any>options).body[i]);
    }
    delete options?.body;

    return this.fetchRequest(
      url,
      this.combineOptions(
        {
          method: 'POST',
          body: params,
        },
        options
      )
    );
  }

  static fetchUploadFile(url: string, options?: RequestInit): Promise<any> {
    this.formateOptions(options);
    if (options && options.body) {
      url = this.stringifyURL(url, options.body);
    }
    let params = new FormData();
    for (let i in (<any>options).body) {
      params.append(i, (<any>options).body[i]);
    }
    delete options?.body;

    return this.fetchRequest(
      url,
      this.combineOptions(
        {
          method: 'POST',
          body: params,
          headers: {
            'Content-Type': 'multipart/form-data;',
            'clean-content-type': true,
          } as any,
        },
        options
      )
    );
  }

  /**
   * 上传图片
   */
  static uploadImg(file: File, API_TYPE: string) {
    function newUploadUrl() {
      if (API_TYPE === 'Prod') {
        return 'https://api.bestdealer.com/third/qn/tk';
      }
      return 'https://api-test.bestdealer.com/third/qn/tk';
    }
    return new Promise((resolve, reject) => {
      fetch(newUploadUrl(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8;',
          // tk:'nRpzAWNuzGoqBYaoQstG'
        },
      })
        .then(async (res) => {
          let response = await res.json();
          return response;
        })
        .then((res) => {
          const observer = {
            //上传过程的监听函数 result参数带有total字段的 object，包含loaded、total、percent三个属性)
            next(result) {
              // 实现上传进度条 ...
              console.log(result);
            },
            //上传失败回调
            error(err) {
              console.log(err.message);
            },
            // 上传完成回调
            complete(res) {
              resolve({data: 'https://cdn-image.bestdealer.com/' + res.key});
            },
          };
          const observable = qiniu.upload(
            file,
            `image/${new Date().getTime()}/${file.name}`,
            res.token
          );
          observable.subscribe(observer); // 上传开始
        })
        .catch((error) => reject(error));
    });
  }

  // 下载文件流
  static fetchDownload(url: string, options?: RequestInit): Promise<any> {
    return this.fetchGet(
      url,
      this.combineOptions(
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Pragma: 'no-cache',
          },
        },
        options
      )
    ).then((res: any): Promise<any> => {
      if (res.blob && typeof res.blob === 'function') {
        return res.blob().then((blob: Blob): Promise<any> => {
          if (blob) {
            var filename = res.headers.get('Content-Disposition') || '';
            this.downloadFileInBowser(blob, filename);
            return Promise.resolve({code: 0, message: 'success'});
          } else {
            return Promise.resolve({
              code: 1,
              message: 'fetch download fail, blob is not found',
            });
          }
        });
      }
      return Promise.resolve({
        code: 2,
        message: 'fetch download fail, response blob is not function',
      });
    });
  }

  // POST方式下载文件流
  static fetchPostDownload(url: string, options?: RequestInit): Promise<any> {
    return this.fetchPost(
      url,
      this.combineOptions(
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Pragma: 'no-cache',
          },
        },
        options
      )
    ).then((res: any): Promise<any> => {
      if (res.blob && typeof res.blob === 'function') {
        return res.blob().then((blob: Blob): Promise<any> => {
          if (blob) {
            var filename =
              res.headers.get('Content-Disposition') ||
              res.headers.get('Content-disposition') ||
              '';
            this.downloadFileInBowser(blob, filename);
          }
          return Promise.resolve(res);
        });
      }
      return Promise.resolve(res);
    });
  }

  static downloadFileInBowser(blob, filename) {
    if ('msSaveOrOpenBlob' in navigator) {
      // 修复ie浏览器，无法下载的bug
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.href = url;
      a.download = decodeURI(filename.replace('attachment;filename=', ''));
      a.click();
      //修正Firefox 无法下载问题
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  }

  // 格式字符串Url重的/:id=>/1,用body={ id: 1 }
  static stringifyURL(str: string, options?: BodyInit): string {
    if (!str) {
      return str;
    }
    const optionsTmp = {body: options};
    this.formateOptions(optionsTmp);
    const optionsBody = <object>optionsTmp.body;
    return str.replace(/:([A-Z|a-z]+)/gi, function (match, p1) {
      var replacement = optionsBody[p1];
      if (replacement === undefined) {
        throw new Error(
          'Could not find url parameter ' + p1 + ' in passed options object'
        );
      }

      return replacement;
    });
  }

  // 处理graphql参数
  static processGraphqlParams(params: GraphqlParams = {}) {
    const {
      column,
      current = 1,
      showQuickJumper,
      pageSize = 10,
      total,
      field,
      pageSizeOptions,
      showSizeChanger,
      columnKey,
      order,
      ...otherParam
    } = params;
    return Object.assign(
      {},
      otherParam,
      {
        start: (current - 1) * pageSize || 0,
        end: current * pageSize - 1 || 9,
      },
      order
        ? {
            order: order && order.replace(/end$/, ''),
          }
        : {},
      columnKey
        ? {
            orderBy: columnKey,
          }
        : {}
    );
  }
  // 处理每个参数
  static processPraramItem(object: object): object {
    for (var key in object) {
      if (object[key] instanceof Array) {
        if (object[key].length !== 0) {
          object[key] = JSON.stringify(object[key]);
        } else {
          object[key] = undefined;
        }
      } else {
        if (object[key] === '') {
          object[key] = undefined;
        }
      }
    }
    return object;
  }

  // 处理参数
  static processParams(object: defaultPageParams): object {
    let {
      column,
      current,
      showQuickJumper,
      pageSize,
      total,
      field,
      pageSizeOptions,
      showSizeChanger,
      ...other
    } = object;
    var body = {
      currentPage: current,
      totalCount: total,
      pageSize,
      ...other,
    };
    return this.processPraramItem(body);
  }

  // 处理参数
  static processBody(options?: RequestInit): RequestInit | undefined {
    //  console.log(3,options)
    //this.formateOptions(options);
    // if (options && typeof options.body === 'object') {
    //   (<object>options.body) = this.processParams(<any>options.body);
    // }
    // console.log(22,options)
    return options;
  }
}
