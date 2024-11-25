import { HttpClient } from '@/data/client/http-client';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';

export const dashboardAdmin = {
  analytics() {
    return HttpClient.get<any>(`${API_ENDPOINTS.ANALYTICS}/admin/common`);
  },

  analyticsOrders() {
    return HttpClient.get<any>(`${API_ENDPOINTS.ANALYTICS}/admin/orders`);
  },

};

export const dashboardManager = {
  analytics() {
    return HttpClient.get<any>(`${API_ENDPOINTS.ANALYTICS}/manager/common`);
  },
};
