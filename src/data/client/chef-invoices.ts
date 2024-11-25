import {
  ChefInvoicesQueryOptions,
  ChefInvoicesPaginator,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';

export const chefInvoicesClient = {
  get({ id, language }: { id: string; language: string }) {
    return HttpClient.get<any>(`${API_ENDPOINTS.CHEFINVOICES}/${id}`, {
      language,
    });
  },
  paginated: ({ search, ...params }: Partial<ChefInvoicesQueryOptions>) => {
    return HttpClient.get<ChefInvoicesPaginator>(API_ENDPOINTS.CHEFINVOICES, {
      ...params,
    });
  },
  // getOrderItems({ id, language }: { id: string; language: string }) {
  //   return HttpClient.get<any>(`${API_ENDPOINTS.ORDERITEMS}/${id}`, {
  //     language,
  //   });
  // },
};
