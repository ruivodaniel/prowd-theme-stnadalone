declare module "virtual:theme-urls" {
  const urls: Record<string, string>;   // "theme:version" and "theme:version:fonts" -> /@fs url
  export default urls;
}
