import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Chef, ChefOrdersPaginator, ChefOrdersQueryOptions, ChefPaginator } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useQuery } from 'react-query';
import { chefOrdersClient } from './client/chef-orders';


export const useChefOrdersQuery = (options: Partial<ChefOrdersQueryOptions>) => {
  const { data, error, isLoading } = useQuery<ChefOrdersPaginator, Error>(
    [API_ENDPOINTS.CHEFORDERS, options],
    ({ queryKey, pageParam }) =>
      chefOrdersClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    chefOrders: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

// export const useChefOrderQuery = (options:any) => {
//   const { data, error, isLoading } = useQuery<any, Error>(
//     [API_ENDPOINTS.CHEFORDERS,options],
//     ({ queryKey, pageParam }) =>
//       chefOrdersClient.paginated(Object.assign({}, queryKey[1], pageParam)),
//     {
//       keepPreviousData: true,
//     },
//   );

//   return {
//     chefOrder: data,
//     error,
//     loading: isLoading,
//   };
// };

export const useChefOrderQuery = ({
  id,
  language,
}: {
  id: string;
  language: string;
}) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.CHEFORDERS, { id, language }],
    () => chefOrdersClient.get({ id, language }),
  );

  return {
    chefOrder: data,
    error,
    loading: isLoading,
  };
};

export const useOrderItemsQuery = ({
  id,
  language,
}: {
  id: string;
  language: string;
}) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.ORDERITEMS, { id, language }],
    () => chefOrdersClient.getOrderItems({ id, language }),
  );

  return {
    orderItems: data,
    error,
    loading: isLoading,
  };
};