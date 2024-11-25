import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { DateInterval, DateIntervalPaginator, DateIntervalQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { dateIntervalClient } from './client/date-interval';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/config/routes';
import Router, { useRouter } from 'next/router';
import { Config } from '@/config';


export const useDateIntervalsQuery = (options: Partial<DateIntervalQueryOptions>) => {
  const { data, error, isLoading } = useQuery<DateIntervalPaginator, Error>(
    [API_ENDPOINTS.DATEINTERVAL, options],
    ({ queryKey, pageParam }) =>
      dateIntervalClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    },
  );

  return {
    dateIntervals: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useDateIntervalQuery = ({
  id,
  language,
}: {
  id: string;
  language: string;
}) => {
  const { data, error, isLoading } = useQuery<DateInterval, Error>(
    [API_ENDPOINTS.DATEINTERVAL, { id, language }],
    () => dateIntervalClient.get({ id, language }),
  );

  return {
    dateInterval: data,
    error,
    loading: isLoading,
  };
};

export const useActiveDateIntervalMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(dateIntervalClient.active, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DATEINTERVAL);
    },
  });
};
export const useInActiveDateIntervalMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(dateIntervalClient.inactive, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DATEINTERVAL);
    },
  });
};

export const useDeleteDateIntervalMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(dateIntervalClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DATEINTERVAL);
    },
  });
};

export const useCreateDateIntervalMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  return useMutation(dateIntervalClient.create, {
    onSuccess: async () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.dateInterval.list}`
        : Routes.dateInterval.list;
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
      queryClient.invalidateQueries(API_ENDPOINTS.DATEINTERVAL);
    },
  });
};
export const useUpdateDateIntervalMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(dateIntervalClient.update, {
    onSuccess: async (data) => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.dateInterval.list}`
        : Routes.dateInterval.list;
      await router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });

      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.DATEINTERVAL);
    },
    onError: (error: any) => {
      toast.error(t(`common:${error?.response?.data.message}`));
    },
  });
};