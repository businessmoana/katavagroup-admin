import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { salesClient } from './client/sales';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useGetDateIntervalsQuery = () => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.SALSE],
    () =>
      salesClient.all()
  );
  return {
    dateIntervals: data ? data : [],
    yearOptions: data ? data
      .map((item: any) => item.year)
      .filter((year: any, index: any, self: any[]) => self.indexOf(year) === index)
      .sort((a: any, b: any) => b - a)
      .map((year: any) => ({ value: year.toString(), label: year.toString() })) : [],
    error,
    dateIntervalLoading: isLoading,
  };
};

export const useGetSalesQuery = ({ id }: any) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.SALSE, { id }],
    () =>
      salesClient.get({ id })
  );
  return {
    sales: data ? data : [],
    error,
    dateIntervalLoading: isLoading,
  };
};

export const useDeleteSaleslMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(salesClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SALSE);
    },
  });
};

export const getSaleItems = async (id: number) => {
  return await salesClient.getSaleItems({ id })
}
