// .html files are bundled as strings via esbuild's text loader.
declare module '*.html' {
  const content: string;
  export default content;
}
