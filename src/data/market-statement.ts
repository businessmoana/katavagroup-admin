import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Chef, ChefOrdersPaginator, ChefOrdersQueryOptions, ChefPaginator } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useQuery } from 'react-query';
import { marketStatementClient } from './client/market-statement';


export const useMarketStatementQuery = (options: Partial<any>) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.MARKET_STATEMENT, options],
    ({ queryKey, pageParam }) =>
      marketStatementClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    marketStatements: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
