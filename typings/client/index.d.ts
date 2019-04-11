declare module '*.scss' {
  const content: any;
  export default content;
}

interface Window {
  devToolsExtension?: any;
  csrf: string;
}
