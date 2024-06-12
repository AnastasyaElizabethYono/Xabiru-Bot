export interface ApiResponse<T> {
  data: T; // Use a generic type T for data
  status: number;
  statusText: string;
  headers: any; // Consider specifying further if needed
  config: any; // This can also be typed based on AxiosRequestConfig
  request?: any; // Optional and environment-dependent
}
