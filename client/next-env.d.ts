/// <reference types="next" />
/// <reference types="next/types/global" />

namespace KoaNext {
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }

  export interface IBody {
    [propName: string]: any;
  }

  export interface IResponse {
    success: boolean;
    errorMsg?: string;
    result?: any;
  }
}
