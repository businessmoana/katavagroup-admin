import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteOrderItemlMutation } from '@/data/product';
const DeleteOrderItemView = () => {
  const { mutate: deleteOrderItem, isLoading: loading } =
    useDeleteOrderItemlMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    deleteOrderItem(data);
    closeModal();
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default DeleteOrderItemView;
