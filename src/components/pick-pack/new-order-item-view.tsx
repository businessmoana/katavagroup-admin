import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { productClient } from '@/data/client/product';
import { useDeleteSaleslMutation } from '@/data/sales';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from '../common/card';
import Input from '../ui/input';
import Button from '../ui/button';
import SelectInput from '../ui/select-input';
import Label from '../ui/label';
const NewOrderItemView = () => {
  const [productList, setProductList] = useState([]);
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  useEffect(() => {
    getProductsList();
  }, [data]);
  const getProductsList = async () => {
    const result = await productClient.getProductList();
    setProductList(result);
  };
  const { register, handleSubmit, control } = useForm<any>();

  const handleForm = async (input: any) => {
    input['orderId'] = data;
    const result = await productClient.newOrderItem(input);
    if (result) {
      toast.success('Order approved successfully');
      closeModal();
    }
  };
  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div className="bg-white pb-5 w-[80vw] md:w-[60vw]">
        <div className="flex flex-wrap my-5 sm:my-8">
          <Card className="w-full">
            <div>
              <Label>Product</Label>
              <SelectInput
                {...register('product')}
                getOptionLabel={(option: any) =>
                  `${option.item_number}-${option.item_name}-${option.package}-${option.item_brand}`
                }
                getOptionValue={(option: any) => option.product_id}
                control={control}
                options={productList}
              />
            </div>
            <Input
              label="Quantity"
              {...register('quantity')}
              variant="outline"
              className="mb-5 mt-4"
              type="number"
            />
          </Card>
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={closeModal}
            className="me-4"
            type="button"
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </form>
  );
};

export default NewOrderItemView;
