import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Alert from '@/components/ui/alert';
import { salesClient } from '@/data/client/sales';
import DatePickerInput from '../ui/date-picker';
import Input from '../ui/input';
import { TrashIcon } from '../icons/trash';
import { AddIcon } from '../icons/add';
import { toast } from 'react-toastify';

const UpdateOrCreateSalesView = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      saleItems: [],
    },
    //@ts-ignore
    // resolver: yupResolver(attributeValidationSchema),
  });

  const [loading, setLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'saleItems',
  });
  const { data: StateValue } = useModalState();
  const { closeModal } = useModalAction();
  const salesId = StateValue.salesId;
  useEffect(() => {
    getSaleItems(salesId);
  }, [salesId]);

  const getSaleItems = async (id: number) => {
    let result = await salesClient.getSaleItems({ id });
    if (result.saleItems.length) setValue('saleItems', result?.saleItems);
    else {
      const interval = StateValue.interval;

      const [startDateStr, endDateStr] = interval.split(' - ');

      const [startMonth, startDay, startYear] = startDateStr.split('/').map(Number);
      const [endMonth, endDay, endYear] = endDateStr.split('/').map(Number);

      const startDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));
      const endDate = new Date(Date.UTC(endYear, endMonth - 1, endDay));

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
      }
      const weekDiff = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7),
      );

      const saleItems = Array.from({ length: weekDiff }, (_, index) => {
        const currentStartDate = new Date(startDate);
        currentStartDate.setDate(startDate.getDate() + index * 7);
        
        const currentEndDate = new Date(currentStartDate);
        currentEndDate.setDate(currentStartDate.getDate() + 6);

        if (currentEndDate > endDate) {
          currentEndDate.setTime(endDate.getTime());
        }

        return {
          start_date: currentStartDate.toISOString().split('T')[0],
          end_date: currentEndDate.toISOString().split('T')[0],
          id: 0,
        };
      });


      setValue('saleItems', saleItems);
    }
  };

  const handleUpdateSaleItems = async (data: any) => {
    const formattedSaleItems = data.saleItems.map((item: any) => ({
      ...item,
      start_date: formatToUTCString(new Date(item.start_date)),
      end_date: formatToUTCString(new Date(item.end_date)),
    }));

    data['saleId'] = salesId!;
    data['intervalId'] = StateValue.intervalId!;
    data['locationId'] = StateValue.locationId!;
    data['locationName'] = StateValue.locationName!;
    data['saleItems'] = formattedSaleItems;
    const result = await salesClient.createOrUpdateSalesItem({ data });
    if (result) {
      if (salesId) toast.success('Updated successfully');
      else toast.success('Created successfully');
      closeModal();
    }
  };

  const handleDeactiveSaleItem = async (itemId: number) => {
    const result = await salesClient.deactivateSalesItem({ itemId });
  };

  const formatToUTCString = (date: Date) => {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    )
      .toISOString()
      .split('T')[0];
  };

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(handleUpdateSaleItems)} noValidate>
        <div className="m-auto flex w-full min-w-[50rem] max-w-7xl flex-col rounded bg-light p-5">
          <div className="mb-5 text-left text-lg font-semibold text-body">
            Sales
          </div>
          <>
            <div className="flex justify-end items-center w-full">
              <button
                type="button"
                onClick={() => append({ start_date: '', end_date: '', id: 0 })}
                className={`text-red-500 transition duration-200 hover:text-red-600 focus:outline-none`}
                title={t('common:text-delete')}
              >
                <AddIcon width={20} />
              </button>
            </div>

            {fields.map((item, index) => {
              return (
                <div className="flex gap-3 items-center" key={item.id}>
                  <div className="w-[200px] p-0 sm:pe-2">
                    <DatePickerInput
                      control={control}
                      name={`saleItems.${index}.start_date`}
                      dateFormat="dd/MM/yyyy"
                      label="Start Date"
                      className="border border-border-base"
                    />
                  </div>
                  <div className="w-[200px] p-0 sm:pe-2">
                    <DatePickerInput
                      control={control}
                      name={`saleItems.${index}.end_date`}
                      dateFormat="dd/MM/yyyy"
                      label="End Date"
                      className="border border-border-base"
                    />
                  </div>
                  <div className="w-[500px] p-0 pt-3  sm:ps-2">
                    <Input
                      label="Description"
                      {...register(`saleItems.${index}.description`)}
                      variant="outline"
                      className="mb-5"
                      required
                    />
                  </div>
                  <div className="w-[150px] p-0 pt-3  sm:ps-2">
                    <Input
                      label="Sales"
                      {...register(`saleItems.${index}.sales`)}
                      variant="outline"
                      className="mb-5"
                      type="number"
                      required
                    />
                  </div>
                  <div className="w-[150px] p-0 pt-3  sm:ps-2">
                    <Input
                      label="Qty"
                      {...register(`saleItems.${index}.quantity`)}
                      variant="outline"
                      className="mb-5"
                      type="number"
                      required
                    />
                  </div>
                  <div className="w-[150px] p-0 pt-3  sm:ps-2">
                    <Input
                      label="Commission"
                      {...register(`saleItems.${index}.commission`)}
                      variant="outline"
                      className="mb-5"
                      type="number"
                      required
                    />
                  </div>
                  <button
                    onClick={() => {
                      console.log(getValues()['saleItems'][index]);
                      if (getValues()['saleItems'][index].id) {
                        handleDeactiveSaleItem(
                          getValues()['saleItems'][index].id,
                        );
                      }
                      remove(index);
                    }}
                    className={`text-red-500 transition duration-200 hover:text-red-600 focus:outline-none ${
                      index == 0 ? 'invisible' : ''
                    }`}
                    title={t('common:text-delete')}
                  >
                    <TrashIcon width={14} />
                  </button>
                </div>
              );
            })}
            <div className="w-full flex justify-end gap-4">
              <Button
                className="mt-3 w-[150px]"
                loading={loading}
                disabled={loading}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={closeModal}
                className="mt-3 w-[150px] bg-gray-400"
                loading={loading}
                disabled={loading}
              >
                Close
              </Button>
            </div>
          </>
        </div>
      </form>
    </>
  );
};

export default UpdateOrCreateSalesView;
