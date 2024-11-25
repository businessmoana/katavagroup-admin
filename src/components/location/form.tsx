import Input from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Config } from '@/config';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import Label from '../ui/label';
import SelectInput from '../ui/select-input';
import TextArea from '../ui/text-area';
import { useUpdateOrCreateLocationQuery } from '@/data/location';

type IProps = {
  initialValues?: any;
  priceGroupList: any;
};

export default function LocationCreateOrUpdateForm({
  initialValues,
  priceGroupList,
}: IProps) {
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
          priceGroup: initialValues?.sif_price_group_id
            ? priceGroupList?.find(
                (priceGroup: any) =>
                  priceGroup.id == initialValues?.sif_price_group_id!,
              )
            : { name: '', value: '' },
        }
      : {
        priceGroup:priceGroupList[0]
      },
  });
  const { mutate: createOrupdateLocation, isLoading } =
  useUpdateOrCreateLocationQuery();

  const isTranslateCoupon = router.locale !== Config.defaultLanguage;

  const onSubmit = async (values: any) => {
    const input = {
      location_number: values.location_number,
      location_name: values.location_name,
      location_address: values.location_address,
      sif_price_group_id: values?.priceGroup?.id,
      note: values.note,
      id: initialValues ? initialValues.id : 0,
    };
    createOrupdateLocation(input);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Card className="w-full">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Location Number"
                {...register('location_number')}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Location Name"
                {...register('location_name')}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Location Address"
                {...register('location_address')}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>Price Group</Label>
              <SelectInput
                {...register('priceGroup')}
                getOptionLabel={(option: any) => option.naziv}
                getOptionValue={(option: any) => option.id}
                control={control}
                options={priceGroupList}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:pe-2 mt-4">
              <TextArea
                label="Note"
                {...register('note')}
                variant="outline"
                className="mb-5"
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
