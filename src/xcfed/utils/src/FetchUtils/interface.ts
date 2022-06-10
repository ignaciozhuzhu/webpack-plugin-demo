export interface FetchConfig {
  responseProcess?(): any;
  fetch?(): any;
}

interface CommonResponseJson {
  code: number | string;
  message: string;
  data?: object;
}
export type PromiseResponse = Promise<Response | Object>;
export interface ResponseProcess {
  (res: Response): PromiseResponse;
}

export interface GraphqlBodyObject {
  operationName?: string;
  query: string;
  variables?: Object;
}

export interface GraphqlParams {
  column?: number;
  current?: number;
  showQuickJumper?: boolean;
  pageSize?: number;
  total?: number;
  field?: string;
  pageSizeOptions?: any;
  showSizeChanger?: any;
  columnKey?: string;
  order?: string;
  otherParam?: any;
}

export interface defaultPageParams {
  column: number;
  current: number;
  showQuickJumper: boolean;
  pageSize: number;
  total: number;
  field: string;
  pageSizeOptions: object;
  showSizeChanger: boolean;
}
