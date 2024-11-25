import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { ChefInvoicesPaginator, ChefInvoicesQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useQuery } from 'react-query';
import { chefInvoicesClient } from './client/chef-invoices';


export const useChefInvoicesQuery = (options: Partial<ChefInvoicesQueryOptions>) => {
  const { data, error, isLoading } = useQuery<ChefInvoicesPaginator, Error>(
    [API_ENDPOINTS.CHEFINVOICES, options],
    ({ queryKey, pageParam }) =>
      chefInvoicesClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    chefInvoices: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};