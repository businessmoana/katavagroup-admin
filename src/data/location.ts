import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { locationClient } from './client/location';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


export const useLocationsQuery = (options: Partial<any>) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.LOCATION, options],
    ({ queryKey, pageParam }) =>
      locationClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    locations: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useChangeLocationStatusMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(locationClient.changeStatus, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.LOCATION);
    },
  });
};

export const useDeleteOrderDate = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(locationClient.deleteOrderDate, {
    onSuccess: (data) => {
      if(!data)
        toast.warning("Order is already placed.");
      else toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.LOCATION);
    },
  });
};

export const useLocationQuery = (locationId:any) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.LOCATION, locationId],
    () => locationClient.get(locationId),
  );

  return {
    location: data,
    error,
    loading: isLoading,
  };
};

export const useOrderDateListQuery = (locationId:any) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.LOCATION, locationId],
    () => locationClient.getOrderDateList(locationId),
  );

  return {
    orderDateList: data,
    error,
    loading: isLoading,
  };
};

export const useOrderDateQuery = (orderDateIe:any) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.LOCATION, orderDateIe],
    () => locationClient.getOrderDate(orderDateIe),
  );

  return {
    orderDate: data,
    error,
    loading: isLoading,
  };
};

export const useUpdateOrCreateLocationQuery = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(locationClient.createOrUpdateLocation, {
    onSuccess: () => {
      toast.success("Successfully saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.LOCATION);
    },
  });
};

export const useUpdateOrCreateOrderDateQuery = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(locationClient.createOrUpdateOrderDate, {
    onSuccess: () => {
      toast.success("Successfully saved");
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.LOCATION);
    },
  });
};

// export const useInActiveChefMutation = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   return useMutation(chefClient.inactive, {
//     onSuccess: () => {
//       toast.success(t('common:successfully-updated'));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
//     },
//   });
// };

// export const useDeleteChefMutation = () => {
//   const queryClient = useQueryClient();
//   const { t } = useTranslation();

//   return useMutation(chefClient.delete, {
//     onSuccess: () => {
//       toast.success(t('common:successfully-deleted'));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
//     },
//   });
// };

// export const useCreateChefMutation = () => {
//   const queryClient = useQueryClient();
//   const { t } = useTranslation();
//   const router = useRouter();

//   return useMutation(chefClient.create, {
//     onSuccess: async () => {
//       const generateRedirectUrl = router.query.shop
//         ? `/${router.query.shop}${Routes.chef.list}`
//         : Routes.chef.list;
//       await Router.push(generateRedirectUrl, undefined, {
//         locale: Config.defaultLanguage,
//       });
//       toast.success(t('common:successfully-created'));
//     },
//     onError: (error: any) => {
//       toast.error(t(`common:${error?.response?.data.message}`));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
//     },
//   });
// };
// export const useUpdateChefMutation = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   return useMutation(chefClient.update, {
//     onSuccess: async (data) => {
//       const generateRedirectUrl = router.query.shop
//         ? `/${router.query.shop}${Routes.chef.list}`
//         : Routes.chef.list;
//       await router.push(generateRedirectUrl, undefined, {
//         locale: Config.defaultLanguage,
//       });

//       toast.success(t('common:successfully-updated'));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
//     },
//     onError: (error: any) => {
//       toast.error(t(`common:${error?.response?.data.message}`));
//     },
//   });
// };

// export const useLocationsQuery = () =>{
//   const { data, error, isLoading } = useQuery<any, Error>(
//     [API_ENDPOINTS.CHEFS_GET_LOCATIONS],
//     () =>
//       chefClient.getLocations(),
//     {
//       keepPreviousData: true,
//     }
//   );

//   return {
//     locations: data ?? [],
//     error,
//     loading: isLoading,
//   };
// }