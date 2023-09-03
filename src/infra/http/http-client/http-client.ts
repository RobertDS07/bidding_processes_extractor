export type GetParams = Record<string, any>;

export default abstract class HttpClient {
  abstract get: <T = any>(url: string, params: GetParams) => Promise<T>;
}
