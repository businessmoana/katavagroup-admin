import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { useQuery } from 'react-query';
import { printClient } from './client/print';

export const usePrintChefQuery = () => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.PRINTCHEF],
    () => printClient.getChef(),
  );

  return {
    chef: data,
    error,
    loading: isLoading,
  };
};

export const usePrintInvoiceQuery = (orderId:any) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.PRINTCHEF],
    () => printClient.getInvoice(orderId),
  );

  return {
    invoice: data,
    error,
    loading: isLoading,
  };
};