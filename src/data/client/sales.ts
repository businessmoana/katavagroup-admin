import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';

export const salesClient = {
  all() {
    return HttpClient.get<any>(`${API_ENDPOINTS.SALSE}`);
  },
  get({ id }: { id: string }) {
    return HttpClient.get<any>(`${API_ENDPOINTS.SALSE}/${id}`);
  },
  delete({ id }: { id: string }) {
    return HttpClient.delete<boolean>(`${API_ENDPOINTS.SALSE}/${id}`);
  },
  getSaleItems({ id }: { id: number }) {
    return HttpClient.get<any>(`${API_ENDPOINTS.SALSE}/sale-items/${id}`);
  },
  getSalesOtherItems({ id }: { id: number }) {
    return HttpClient.get<any>(`${API_ENDPOINTS.SALSE}/sales-other-items/${id}`);
  },
  createOrUpdateSalesItem({ data }: Partial<any> & { data: any }) {
    return HttpClient.post<any>(`${API_ENDPOINTS.SALSE}`, data);
  },
  createOrUpdateSalesOtherItem({ data }: Partial<any> & { data: any }) {
    return HttpClient.post<any>(`${API_ENDPOINTS.SALSE}/other`, data);
  },
  deactivateSalesItem({ itemId }: Partial<any> & { itemId: number }) {
    return HttpClient.put<any>(`${API_ENDPOINTS.SALSE}/deactive-sale-items/${itemId}`,[]);
  },
  deactivateSalesOtherItem({ itemId }: Partial<any> & { itemId: number }) {
    return HttpClient.put<any>(`${API_ENDPOINTS.SALSE}/deactive-sale-other-items/${itemId}`,[]);
  },
  approveSales(salesId:number) {
    return HttpClient.put<any>(`${API_ENDPOINTS.SALSE}/approve-sales/${salesId}`,[]);
  },
};
