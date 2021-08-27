export class PaginatedResult {
  data: any[];
  meta: {
    items_total: number;
    current_page: number;
    last_page: number;
  };
}
