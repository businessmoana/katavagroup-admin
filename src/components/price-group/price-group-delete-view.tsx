import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeletePriceGroupMutation } from '@/data/price-group';
const PriceGroupDeleteView = () => {
  const { mutate: deletePriceGroup, isLoading: loading } =
  useDeletePriceGroupMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    deletePriceGroup({
      id: data,
    });
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

export default PriceGroupDeleteView;
