import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Chef, PriceGroup, PriceGroupPaginator, PriceGroupQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { chefClient } from './client/chef';
import { priceGroupClient } from './client/price-group';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/config/routes';
import Router, { useRouter } from 'next/router';
import { Config } from '@/config';


export const usePriceGroupsQuery = (options: Partial<PriceGroupQueryOptions>) => {
  const { data, error, isLoading } = useQuery<PriceGroupPaginator, Error>(
    [API_ENDPOINTS.PRICEGROUP, options],
    ({ queryKey, pageParam }) =>
      priceGroupClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    priceGroups: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const usePriceGroupQuery = ({
  id,
  language,
}: {
  id: string;
  language: string;
}) => {
  const { data, error, isLoading } = useQuery<PriceGroup, Error>(
    [API_ENDPOINTS.PRICEGROUP, { id, language }],
    () => priceGroupClient.get({ id, language }),
  );

  return {
    priceGroup: data,
    error,
    loading: isLoading,
  };
};

export const usePriceGroupListQuery = () => {
  const { data, error, isLoading } = useQuery<PriceGroup, Error>(
    [API_ENDPOINTS.PRICEGROUP],
    () => priceGroupClient.getAll(),
  );

  return {
    priceGroupList: data,
    error,
    loading: isLoading,
  };
};


export const useActivePriceGroupMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(priceGroupClient.active, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRICEGROUP);
    },
  });
};
export const useInActivePriceGroupMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(priceGroupClient.inactive, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRICEGROUP);
    },
  });
};

export const useDeletePriceGroupMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(priceGroupClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRICEGROUP);
    },
  });
};

export const useCreatePriceGroupMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  return useMutation(priceGroupClient.create, {
    onSuccess: async () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.priceGroup.list}`
        : Routes.priceGroup.list;
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
      queryClient.invalidateQueries(API_ENDPOINTS.PRICEGROUP);
    },
  });
};
export const useUpdatePriceGroupMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(priceGroupClient.update, {
    onSuccess: async (data) => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.priceGroup.list}`
        : Routes.priceGroup.list;
      await router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });

      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRICEGROUP);
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`));
    },
  });
};