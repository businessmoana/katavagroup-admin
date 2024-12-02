import {
  Product,
  CreateProduct,
  ProductPaginator,
  QueryOptions,
  GetParams,
  ProductQueryOptions,
  GenerateDescriptionInput,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { frameData } from 'framer-motion';

export const reportClient = {
  getInvoiceSales(startDate:any, endDate:any) {
    return HttpClient.get<any>(`${API_ENDPOINTS.REPORT}/invoice-sales?startDate=${startDate}&endDate=${endDate}`);
  },

  getCombinedInvoices(startDate:any, endDate:any) {
    return HttpClient.get<any>(`${API_ENDPOINTS.REPORT}/invoice-combine?startDate=${startDate}&endDate=${endDate}`);
  },
  
  getSalesDetail(startDate:any, endDate:any) {
    return HttpClient.get<any>(`${API_ENDPOINTS.REPORT}/sales?startDate=${startDate}&endDate=${endDate}`);
  },
};
