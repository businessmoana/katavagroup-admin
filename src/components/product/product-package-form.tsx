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
import { productClient } from '@/data/client/product';

const UpdateOrCreatePackageView = () => {
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
      productItem: [],
    },
    //@ts-ignore
    // resolver: yupResolver(attributeValidationSchema),
  });

  const [loading, setLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productItem',
  });
  const { data: id } = useModalState();
  const { closeModal } = useModalAction();
  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = async (id: number) => {
    let result = await productClient.getProduct(id);
    setValue('priceGroupDetail', result.priceGroupDetail);
    setValue('productItem', result.itemDetail);
  };

  const handleUpdateSaleItems = async (data: any) => {
    data['productId'] = id!;
    const result = await productClient.createOrUpdateProductItem({ data });
    if (result) {
      if (id) toast.success('Updated successfully');
      else toast.success('Created successfully');
      closeModal();
    }
  };

  const handleDeactiveProductItem = async (itemId: number) => {
    const result = await productClient.deactivateProductItem({ itemId });
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
          <div className="mb-5 text-start text-lg font-semibold text-body">
            Package and price
          </div>
          {/* <div className="flex justify-end items-center w-full">
            <button
              type="button"
              onClick={() => append({ id: 0 })}
              className={`text-red-500 transition duration-200 hover:text-red-600 focus:outline-none`}
              title={t('common:text-delete')}
            >
              <AddIcon width={20} />
            </button>
          </div> */}
          {fields.map((item, index) => {
            return (
              <div className="flex gap-3 items-center" key={item.id}>
                <div className="w-[400px] p-0 pt-3  sm:ps-2">
                  <Input
                    label="Description"
                    {...register(`productItem.${index}.package`)}
                    variant="outline"
                    className="mb-5"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label="Sales"
                    {...register(`productItem.${index}.cost`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label={getValues()['priceGroupDetail'][0]['naziv']}
                    {...register(`productItem.${index}.price_1`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label={getValues()['priceGroupDetail'][1]['naziv']}
                    {...register(`productItem.${index}.price_2`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label={getValues()['priceGroupDetail'][2]['naziv']}
                    {...register(`productItem.${index}.price_3`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label={getValues()['priceGroupDetail'][3]['naziv']}
                    {...register(`productItem.${index}.price_4`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label={getValues()['priceGroupDetail'][4]['naziv']}
                    {...register(`productItem.${index}.price_5`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                <div className="w-[200px] p-0 pt-3  sm:ps-2">
                  <Input
                    label="Pack qty"
                    {...register(`productItem.${index}.package_qty`)}
                    variant="outline"
                    className="mb-5"
                    type="number"
                  />
                </div>
                {/* <button
                  onClick={() => {
                    if (getValues()['productItem'][index].id) {
                      handleDeactiveProductItem(
                        getValues()['productItem'][index].id,
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
                </button> */}
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
        </div>
      </form>
    </>
  );
};

export default UpdateOrCreatePackageView;
