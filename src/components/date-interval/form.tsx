import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { dateIntervalValidationSchema } from './validation-schema';
import { DateInterval } from '@/types';
import { getErrorMessage } from '@/utils/form-error';
import { Config } from '@/config';
import { useSettingsQuery } from '@/data/settings';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import {
  useCreateDateIntervalMutation,
  useUpdateDateIntervalMutation,
} from '@/data/date-interval';
import DatePickerInput from '../ui/date-picker';

type FormValues = {
  start_date: Date; // Change to Date type
  end_date: Date; // Change to Date type
  year: string;
};

const defaultValues = {
  year: '',
  start_date: new Date(),
  end_date: new Date(), // Ensure end_date has a default value
};

type IProps = {
  initialValues?: DateInterval;
};

export default function DateIntervalCreateOrUpdateForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? {
          ...initialValues,
          start_date: new Date(initialValues.start_date!), // Ensure conversion to Date
          end_date: new Date(initialValues.end_date!), // Ensure conversion to Date
        }
      : defaultValues,
    resolver: yupResolver(dateIntervalValidationSchema),
  });

  const { mutate: createDateInterval, isLoading: creating } =
    useCreateDateIntervalMutation();
  const { mutate: updateDateInterval, isLoading: updating } =
    useUpdateDateIntervalMutation();

  const { settings } = useSettingsQuery({ language: locale! });
  const isTranslateCoupon = router.locale !== Config.defaultLanguage;
  const [start_date, end_date] = watch(['start_date', 'end_date']);

  const formatToUTCString = (date: Date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
  };

  const onSubmit = async (values: FormValues) => {
    const input = {
      language: router.locale,
      start_date: formatToUTCString(values.start_date), // Format to UTC string
      end_date: formatToUTCString(values.end_date), // Format to UTC string
      year: values.year,
    };
    
    try {
      if (!initialValues) {
        await createDateInterval(input);
      } else {
        await updateDateInterval({ ...input, id: initialValues.id });
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Card className="w-full">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/3 sm:pe-2">
              <DatePickerInput
                control={control}
                name="start_date"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date(end_date)} // Ensure maxDate is valid
                label="Start Date"
                className="border border-border-base"
                error={t(errors.start_date?.message!)}
              />
            </div>
            <div className="w-full p-0 sm:w-1/3 sm:ps-2">
              <DatePickerInput
                control={control}
                name="end_date"
                dateFormat="dd/MM/yyyy"
                minDate={new Date(start_date)} // Ensure minDate is valid
                label="End Date"
                className="border border-border-base"
                error={t(errors.end_date?.message!)}
              />
            </div>
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/3 sm:ps-2">
              <Input
                label="Year"
                {...register('year')}
                error={t(errors.year?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
        </Card>
      </div>
      <StickyFooterPanel className="z-0">
        <div className="text-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t('form:button-label-back')}
            </Button>
          )}
          <Button loading={creating || updating} disabled={creating || updating}>
            {initialValues ? 'Update Date Interval' : 'Create Date Interval'}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}