export interface PaginatedNumberResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  max_pages: number;
  results: T;
}
