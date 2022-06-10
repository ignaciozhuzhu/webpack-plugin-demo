interface RequestInit {
  responseType?: string;
}

interface GraphqlBodyObject {
  operationName?: string;
  query: string;
  variables?: Object;
}
interface Response {
  code?: number | string;
}

interface CommonResponseJson {
  code: number | string;
  message: string;
  data?: object;
}

type PromiseResponse = Promise<Response | CommonResponseJson>;

interface ResponseProcess {
  (res: Response): PromiseResponse;
}

declare namespace NodeJS {
  interface Global {
    fetch: {
      (url: string, options?: RequestInit): Promise<Response>;
      responseProcess: ResponseProcess;
      preRequestProcess: (
        url: string,
        options?: RequestInit
      ) => Promise<void> | void;
      preRequestOptions: Function;
      catchGlobalErrorProcess: Function;
    };
  }
}
