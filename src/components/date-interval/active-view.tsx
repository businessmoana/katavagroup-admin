import ConfirmationCard from '@/components/common/confirmation-card';
import { CheckMarkCircle } from '@/components/icons/checkmark-circle';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useActiveDateIntervalMutation } from '@/data/date-interval';
import { useTranslation } from 'next-i18next';

const ActiveDateIntervalView = () => {
  const { t } = useTranslation();
  const { mutate: ActiveDateIntervalById, isLoading: loading } =
  useActiveDateIntervalMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  async function handleActive() {
    ActiveDateIntervalById(
      { id: modalData as string },
      {
        onSettled: () => {
          closeModal();
        },
      },
    );
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleActive}
      deleteBtnLoading={loading}
      deleteBtnText="Active"
      icon={<CheckMarkCircle className="w-10 h-10 m-auto mt-4 text-accent" />}
      deleteBtnClassName="!bg-accent focus:outline-none hover:!bg-accent-hover focus:!bg-accent-hover"
      cancelBtnClassName="!bg-red-600 focus:outline-none hover:!bg-red-700 focus:!bg-red-700"
      title="Active Price Group"
      description="Are you want to active the Price Group?"
    />
  );
};

export default ActiveDateIntervalView;