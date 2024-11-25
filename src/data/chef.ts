import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Chef, ChefPaginator, ChefQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { chefClient } from './client/chef';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/config/routes';
import Router, { useRouter } from 'next/router';
import { Config } from '@/config';


export const useChefsQuery = (options: Partial<ChefQueryOptions>) => {
  const { data, error, isLoading } = useQuery<ChefPaginator, Error>(
    [API_ENDPOINTS.CHEFS, options],
    ({ queryKey, pageParam }) =>
      chefClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    chefs: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useGroupChefsStatementQuery = (options: Partial<any>) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.CHEFS, options],
    ({ queryKey, pageParam }) =>
      chefClient.getGroupChefsStatement(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    statements: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useChefQuery = ({
  id,
  language,
}: {
  id: string;
  language: string;
}) => {
  const { data, error, isLoading } = useQuery<Chef, Error>(
    [API_ENDPOINTS.CHEFS, { id, language }],
    () => chefClient.get({ id, language }),
  );

  return {
    chef: data,
    error,
    loading: isLoading,
  };
};

export const useActiveChefMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(chefClient.active, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
    },
  });
};
export const useInActiveChefMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(chefClient.inactive, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
    },
  });
};

export const useDeleteChefMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(chefClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
    },
  });
};

export const useCreateChefMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  return useMutation(chefClient.create, {
    onSuccess: async () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.chef.list}`
        : Routes.chef.list;
      await Router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });
      toast.success(t('common:successfully-created'));
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
    },
  });
};
export const useUpdateChefMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(chefClient.update, {
    onSuccess: async (data) => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.chef.list}`
        : Routes.chef.list;
      await router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });

      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CHEFS);
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`));
    },
  });
};

export const useLocationsQuery = () =>{
  const { data, error, isLoading } = useQuery<any, Error>(
    [API_ENDPOINTS.CHEFS_GET_LOCATIONS],
    () =>
      chefClient.getLocations(),
    {
      keepPreviousData: true,
    }
  );

  return {
    locations: data ?? [],
    error,
    loading: isLoading,
  };
}