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
import Select from '../ui/select/select';

type FormValues = {
  saleItems: string[];
  saleOtherItems: string[];
};

const UpdateOrCreateChefsStatementView = () => {
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
      saleOtherItems: [],
    },
    //@ts-ignore
    // resolver: yupResolver(attributeValidationSchema),
  });

  const [loading, setLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'saleOtherItems',
  });
  const { data: StateValue } = useModalState();
  const { closeModal } = useModalAction();
  const salesId = StateValue.salesId;
  useEffect(() => {
    getSaleItems(salesId);
  }, [salesId]);

  const getSaleItems = async (id: number) => {
    let result = await salesClient.getSalesOtherItems({ id });
    setValue('saleItems', result?.saleItems);
    setValue('saleOtherItems', result?.saleOtherItems);
  };

  const handleUpdateSaleItems = async (data: any) => {
    data['saleId'] = salesId!;
    const result = await salesClient.createOrUpdateSalesOtherItem({ data });
    if (result) {
      if (salesId) toast.success('Updated successfully');
      else toast.success('Created successfully');
      closeModal();
    }
  };

  const handleDeactiveSaleOtherItem = async (itemId: number) => {
    const result = await salesClient.deactivateSalesOtherItem({ itemId });
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
            Other
          </div>
          {salesId == 0 && <div>You must add the sale first.</div>}
          {salesId != 0 && (
            <>
              {getValues()['saleItems'].map((item: any, index: any) => {
                return (
                  <div className="flex gap-3 items-center" key={item.id}>
                    <div className="w-[200px] p-0 sm:pe-2">
                      <DatePickerInput
                        disabled
                        control={control}
                        name={`saleItems.${index}.start_date`}
                        dateFormat="dd/MM/yyyy"
                        startDate={
                          new Date(getValues()['saleItems'][index].start_date)
                        }
                        label="Start Date"
                        className="border border-border-base"
                      />
                    </div>
                    <div className="w-[200px] p-0 sm:pe-2">
                      <DatePickerInput
                        disabled
                        control={control}
                        name={`saleItems.${index}.end_date`}
                        dateFormat="dd/MM/yyyy"
                        startDate={
                          new Date(getValues()['saleItems'][index].end_date)
                        }
                        label="End Date"
                        className="border border-border-base"
                      />
                    </div>
                    <div className="w-[500px] p-0 pt-3  sm:ps-2">
                      <Input
                        disabled
                        label="Description"
                        {...register(`saleItems.${index}.description`)}
                        variant="outline"
                        className="mb-5"
                      />
                    </div>
                    <div className="w-[150px] p-0 pt-3  sm:ps-2">
                      <Input
                        disabled
                        label="Sales"
                        {...register(`saleItems.${index}.sales`)}
                        variant="outline"
                        className="mb-5"
                        type="number"
                      />
                    </div>
                    <div className="w-[150px] p-0 pt-3  sm:ps-2">
                      <Input
                        disabled
                        label="Qty"
                        {...register(`saleItems.${index}.quantity`)}
                        variant="outline"
                        className="mb-5"
                        type="number"
                      />
                    </div>
                    <div className="w-[150px] p-0 pt-3  sm:ps-2">
                      <Input
                        label="Commission"
                        {...register(`saleItems.${index}.commission`)}
                        variant="outline"
                        className="mb-5"
                        type="number"
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end items-center w-full">
                <button
                  type="button"
                  onClick={() => append({ date_period: '', id: 0 })}
                  className={`text-red-500 transition duration-200 hover:text-red-600 focus:outline-none`}
                  title={t('common:text-delete')}
                >
                  <AddIcon width={20} />
                </button>
              </div>

              {fields.map((item, index) => {
                return (
                  <div className="flex gap-3 items-center" key={item.id}>
                    <div className="w-[200px] p-0 sm:pe-2 pt-4">
                      <select {...register(`saleOtherItems.${index}.date_period`)}>
                        <option value="Current Period">Current Period</option>
                      </select>
                    </div>
                    <div className="w-[650px] p-0 pt-3  sm:ps-2">
                      <Input
                        label="Description"
                        {...register(`saleOtherItems.${index}.description`)}
                        variant="outline"
                        className="mb-5"
                      />
                    </div>
                    <div className="w-[200px] p-0 pt-3  sm:ps-2">
                      <Input
                        label="Sales"
                        {...register(`saleOtherItems.${index}.sales`)}
                        variant="outline"
                        className="mb-5"
                        type="number"
                      />
                    </div>
                    <div className="w-[200px] p-0 pt-3  sm:ps-2">
                      <select {...register(`saleOtherItems.${index}.commission`)}>
                        <option value="100.00">100%</option>
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        console.log(getValues()['saleOtherItems'][index]);
                        if (getValues()['saleOtherItems'][index].id) {
                          handleDeactiveSaleOtherItem(
                            getValues()['saleOtherItems'][index].id,
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
          )}
        </div>
      </form>
    </>
  );
};

export default UpdateOrCreateChefsStatementView;
