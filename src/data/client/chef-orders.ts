import {
  Chef,
  ChefInput,
  ChefOrdersPaginator,
  ChefQueryOptions,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { crudFactory } from './curd-factory';

export const chefOrdersClient = {
  ...crudFactory<Chef, QueryOptions, ChefInput>(API_ENDPOINTS.CHEFORDERS),
  get({ id, language }: { id: string; language: string }) {
    return HttpClient.get<any>(`${API_ENDPOINTS.CHEFORDERS}/${id}`, {
      language,
    });
  },
  paginated: ({ search, ...params }: Partial<ChefQueryOptions>) => {
    return HttpClient.get<ChefOrdersPaginator>(API_ENDPOINTS.CHEFORDERS, {
      ...params,
    });
  },
  getOrderItems({ id, language }: { id: string; language: string }) {
    return HttpClient.get<any>(`${API_ENDPOINTS.ORDERITEMS}/${id}`, {
      language,
    });
  },
};
