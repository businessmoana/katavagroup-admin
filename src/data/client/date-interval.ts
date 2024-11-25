import {
  DateInterval,
  DateIntervalInput,
  DateIntervalPaginator,
  DateIntervalQueryOptions,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { crudFactory } from './curd-factory';

export const dateIntervalClient = {
  ...crudFactory<DateInterval, QueryOptions, DateIntervalInput>(API_ENDPOINTS.DATEINTERVAL),
  get({ id, language }: { id: string; language: string }) {
    return HttpClient.get<DateInterval>(`${API_ENDPOINTS.DATEINTERVAL}/${id}`, {
      language,
    });
  },
  paginated: ({ search, ...params }: Partial<DateIntervalQueryOptions>) => {
    return HttpClient.get<DateIntervalPaginator>(API_ENDPOINTS.DATEINTERVAL, {
      ...params,
    });
  },
  active: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.ACTIVE_DATEINTERVAL,
      variables
    );
  },
  inactive: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.INACTIVE_DATEINTERVAL,
      variables
    );
  },
};
