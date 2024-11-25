import {
  PriceGroup,
  PriceGroupInput,
  PriceGroupPaginator,
  PriceGroupQueryOptions,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { crudFactory } from './curd-factory';

export const priceGroupClient = {
  ...crudFactory<PriceGroup, QueryOptions, PriceGroupInput>(API_ENDPOINTS.PRICEGROUP),
  getAll(){
    return HttpClient.get<PriceGroup>(`${API_ENDPOINTS.PRICEGROUP}/all`);
  },
  get({ id, language }: { id: string; language: string }) {
    return HttpClient.get<PriceGroup>(`${API_ENDPOINTS.PRICEGROUP}/${id}`, {
      language,
    });
  },
  paginated: ({ search, ...params }: Partial<PriceGroupQueryOptions>) => {
    return HttpClient.get<PriceGroupPaginator>(API_ENDPOINTS.PRICEGROUP, {
      ...params,
    });
  },
  active: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.ACTIVE_PRICEGROUP,
      variables
    );
  },
  inactive: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.INACTIVE_PRICEGROUP,
      variables
    );
  },
};
