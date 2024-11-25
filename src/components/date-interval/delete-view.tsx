import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteDateIntervalMutation } from '@/data/date-interval';
const DateIntervalDeleteView = () => {
  const { mutate: deletePriceGroup, isLoading: loading } =
  useDeleteDateIntervalMutation();

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

export default DateIntervalDeleteView;
