import {
  Chef,
  ChefInput,
  ChefPaginator,
  ChefQueryOptions,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { crudFactory } from './curd-factory';

export const chefClient = {
  ...crudFactory<Chef, QueryOptions, ChefInput>(API_ENDPOINTS.CHEFS),
  get({ id, language }: { id: string; language: string }) {
    return HttpClient.get<Chef>(`${API_ENDPOINTS.CHEFS}/${id}`, {
      language,
    });
  },
  paginated: ({ ...params }: Partial<ChefQueryOptions>) => {
    return HttpClient.get<ChefPaginator>(API_ENDPOINTS.CHEFS, {
      ...params,
    });
  },
  getGroupChefsStatement: ({ ...params }: Partial<any>) => {
    return HttpClient.get<any>(`${API_ENDPOINTS.CHEFS}/group-statement`, {
      ...params,
    });
  },
  active: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.ACTIVE_CHEF,
      variables
    );
  },
  inactive: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.INACTIVE_CHEF,
      variables
    );
  },
  getLocations: () =>
    HttpClient.get<any>(API_ENDPOINTS.CHEFS_GET_LOCATIONS),
};
