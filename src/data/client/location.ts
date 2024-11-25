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

export const locationClient = {
  ...crudFactory<Chef, QueryOptions, ChefInput>(API_ENDPOINTS.LOCATION),
  get(id:any) {
    return HttpClient.get<any>(`${API_ENDPOINTS.LOCATION}/${id}`);
  },
  getOrderDateList(id:any) {
    return HttpClient.get<any>(`${API_ENDPOINTS.LOCATION}/${id}/order-date`);
  },

  getOrderDate(id:any) {
    return HttpClient.get<any>(`${API_ENDPOINTS.LOCATION}/order-date/${id}`);
  },

  paginated: ({ ...params }: Partial<ChefQueryOptions>) => {
    return HttpClient.get<ChefPaginator>(API_ENDPOINTS.LOCATION, {
      ...params,
    });
  },
  changeStatus: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      `${API_ENDPOINTS.LOCATION}/change-status`,
      variables
    );
  },

  deleteOrderDate: (id:any) => {
    return HttpClient.delete<{ id: string }>(
      `${API_ENDPOINTS.LOCATION}/order-date/${id}`);
  },

  createOrUpdateLocation:(data:any)=>{
    return HttpClient.post<any>(
      `${API_ENDPOINTS.LOCATION}/create-or-update`,data );
  },

  createOrUpdateOrderDate:(data:any)=>{
    return HttpClient.post<any>(
      `${API_ENDPOINTS.LOCATION}/order-date`,data );
  }
};
