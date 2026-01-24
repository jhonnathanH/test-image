export default interface IgnoreUrls {
  GET: string[]
  POST: string[]
  PUT: never[]
  PATCH: never[]
  DELETE: never[]
};
