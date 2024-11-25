import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteSaleslMutation } from '@/data/sales';
import { useForm } from 'react-hook-form';
import Card from '../common/card';
import Input from '../ui/input';
import Button from '../ui/button';
import { productClient } from '@/data/client/product';
import { toast } from 'react-toastify';
const EditOrderItemView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();

  const {
    register,
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      quantity: data.kolicina,
    },
  });
  const handleForm = async(input: any) => {
    input['orderId']= data.orders_id
    input['orderItemId']= data.id
    console.log("Data:", input)

    const result = await productClient.updateOrderItem(input);
    if (result) {
      toast.success('Updated successfully');
      closeModal();
    }
  }
  return (
    <form onSubmit={handleSubmit(handleForm)}>
        <div className="bg-white pb-5">
          <div className="flex flex-wrap my-5 sm:my-8">
            <Card className="w-full">
              <Input
                label="Quantity"
                {...register('quantity')}
                variant="outline"
                className="mb-5"
                type='number'
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

export default EditOrderItemView;
