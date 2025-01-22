import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Chef, ChefLocation, KorisnickiNalog } from '@/types';
import { getErrorMessage } from '@/utils/form-error';
import { useSettingsQuery } from '@/data/settings';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import {
  useCreateChefMutation,
  useLocationsQuery,
  useUpdateChefMutation,
} from '@/data/chef';
import SelectInput from '../ui/select-input';
import Description from '../ui/description';
import { useEffect, useState } from 'react';
import { CloseFillIcon } from '../icons/close-fill';
import { productClient } from '@/data/client/product';
import { toast } from 'react-toastify';

type FormValues = {
  id: number;
  item_number: string;
  item_name: string;
  item_brand: string;
  sif_kategorija: any;
  package_qty: string;
  vendor_cost: string;
  shelf_life: string;
  lot_number: string;
  width: string;
  height: string;
  length: string;
  weight: string;
  ti: string;
  hi: string;
  pallet_ct: string;
  min_qty_on_hand: string;
  reordering_amount: string;
  public: any;
  note: string;
  item_image: string;
};

const statuses = [
  { name: 'Public', value: 0 },
  { name: 'Private', value: 1 },
];

const categories = [
  { name: 'Dry Goods', value: 1 },
  { name: 'Supplies', value: 2 },
  { name: 'Frozen Food', value: 3 },
  { name: 'Refrigerated', value: 4 },
  { name: 'Equipment', value: 5 },
];

type IProps = {
  initialValues?: any;
};
export default function ProductCreateOrUpdateForm({ initialValues }: IProps) {
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          public: statuses?.find((role) => role.value == initialValues?.public),
          sif_kategorija: initialValues?.naziv_kategorije
            ? categories?.find(
                (category) => category.name == initialValues?.naziv_kategorije,
              )
            : { name: '', value: '' },
        }
      : {
          public: statuses?.find((status) => status.name == 'Public'),
          sif_kategorija: categories?.find(
            (category) => category.name == 'Dry Goods',
          ),
        },
  });
  const { mutate: createChef, isLoading: creating } = useCreateChefMutation();
  const { mutate: updateChef, isLoading: updating } = useUpdateChefMutation();

  const {
    // @ts-ignore
    settings: { options },
  } = useSettingsQuery({
    language: locale!,
  });

  const onSubmit = async (values: FormValues) => {
    if(values.package_qty == ""|| values.lot_number == "" || values.width == "" || values.height == "" || values.length == "" || values.weight == "" || values.pallet_ct == "" || values.min_qty_on_hand == "" || values.reordering_amount == "") {
      toast.warning('Fill the info');
      console.log(values)
      return;
    }

    let input = {
      id: initialValues ? initialValues.id : 0,
      language: router.locale,
      item_number: values.item_number,
      item_name: values.item_name,
      item_brand: values.item_brand,
      sif_kategorija: values.sif_kategorija.value,
      package_qty: values.package_qty,
      shelf_life: values.shelf_life,
      lot_number: values.lot_number,
      width: values.width,
      height: values.height,
      length: values.length,
      weight: values.weight,
      ti: values.ti,
      hi: values.hi,
      pallet_ct: values.pallet_ct,
      min_qty_on_hand: values.min_qty_on_hand,
      reordering_amount: values.reordering_amount,
      public: values.public.value,
      note: values.note,
      item_image: image,
    };
    let data = input;
    const result = await productClient.createOrUpdateProduct({ data });
    if (result) {
      if (data.id) toast.success('Product Updated successfully');
      else toast.success('Product Created successfully');
      router.back();
    }
  };

  useEffect(() => {
    if (initialValues?.item_image) setImageName(initialValues?.item_image);
  }, [initialValues]);
  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = async () => {
    const result = await productClient.removeProductImage(
      initialValues?.id,
      initialValues?.item_image,
    );
    if (result) {
      toast.success('Product Image removed');
      setImageName('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title="Product information"
          details="Edit your  product description and necessary information from here"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Item number"
                {...register('item_number')}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Item name"
                {...register('item_name')}
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Item brand"
                {...register('item_brand')}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>Item category</Label>
              <SelectInput
                {...register('sif_kategorija')}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                control={control}
                options={categories}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Units per package"
                {...register('package_qty')}
                variant="outline"
                className="mb-5"
                type="number"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Cost per package"
                {...register('vendor_cost')}
                variant="outline"
                type="number"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Shelf life"
                {...register('shelf_life')}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Lot number"
                {...register('lot_number')}
                type="number"
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Width"
                {...register('width')}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Height"
                {...register('height')}
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Length"
                {...register('length')}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Weight"
                {...register('weight')}
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Ti"
                {...register('ti')}
                type="number"
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Hi"
                {...register('hi')}
                type="number"
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Pallet ct"
                {...register('pallet_ct')}
                type="number"
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Min qty on hand"
                {...register('min_qty_on_hand')}
                type="number"
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Re-ordering amount"
                {...register('reordering_amount')}
                type="number"
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>Product status</Label>
              <SelectInput
                {...register('public')}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                control={control}
                options={statuses}
              />
            </div>
          </div>
          <div className="relative">
            <TextArea
              label="Note"
              {...register('note')}
              variant="outline"
              className="mb-5"
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title="Product Image"
          details="Upload your product image here"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="w-full h-[150px]">
            <div className="h-full relative">
              <div className="absolute w-full h-full">
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="w-full h-full invisible cursor-pointer before:content-[''] before:absolute before:left-0 before:top-0 before:opacity-100 before:visible before:w-full before:h-full"
                  accept=".jpg, .png, .gif"
                  onChange={handleChange}
                />
              </div>
              <div className="h-full flex gap-5 justify-between items-center w-full p-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="h-full flex items-center space-x-2 flex-1 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {imageUrl != '' && (
              <div className="w-[200px] h-[170px] mt-3">
                <div className="flex gap-2 ">
                  <div className="w-[200px] h-[150px] border">
                    <img src={imageUrl} className="w-full h-full" alt=""></img>
                  </div>
                </div>
                <div className="mt-3 text-gray-600 pb-3">New Product Image</div>
              </div>
            )}
            {imageName != '' && (
              <div className="w-[200px] h-[170px] mt-3">
                <div className="flex gap-2 ">
                  <div className="w-[200px] h-[150px] border">
                    <img
                      src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/media/product-images/${initialValues?.id}_${imageName}`}
                      className="w-full h-full"
                      alt=""
                    ></img>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      removeImage();
                    }}
                  >
                    <CloseFillIcon width={16} />
                  </div>
                </div>
                <div className="mt-3 text-gray-600 pb-3">
                  Original Product Image
                </div>
              </div>
            )}
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

          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            Save
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}
