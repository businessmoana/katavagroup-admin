import Input from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import DatePickerInput from '../ui/date-picker';
import { useUpdateOrCreateOrderDateQuery } from '@/data/location';

type IProps = {
  initialValues?: any;
};

export default function OrderDateCreateOrUpdateForm({
  initialValues,
}: IProps) {
  const { query, locale } = useRouter();
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      :''
  });
  const { mutate: createOrupdateOrderDate, isLoading } =
  useUpdateOrCreateOrderDateQuery();

  const onSubmit = async (values: any) => {
    const input = {
      order_date: values.order_date,
      id: initialValues ? initialValues.id : 0,
      locationId:query.locationId
    };
    createOrupdateOrderDate(input);
  };
  const [order_date] = watch(['order_date']);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Card className="w-full">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <DatePickerInput
                control={control}
                name="order_date"
                dateFormat="dd/MM/yyyy"
                startDate={new Date(order_date)}
                label="License due"
                className="border border-border-base"
              />
            </div>
          </div>
        </Card>
      </div>
      <StickyFooterPanel className="z-0">
        <div className="text-end">
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>

          <Button
            loading={isLoading}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}
