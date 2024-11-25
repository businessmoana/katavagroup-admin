import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { crudFactory } from './curd-factory';

export const marketStatementClient = {
  paginated: ({ search, ...params }: Partial<any>) => {
    return HttpClient.get<any>(API_ENDPOINTS.MARKET_STATEMENT, {
      ...params,
    });
  },
};
