import ConfirmationCard from '@/components/common/confirmation-card';
import { CheckMarkCircle } from '@/components/icons/checkmark-circle';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { useInActiveChefMutation } from '@/data/chef';
const InActiveChefView = () => {
  const { t } = useTranslation();
  const { mutate: InActiveChefById, isLoading: loading } =
  useInActiveChefMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  async function handleInActive() {
    InActiveChefById(
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
      onDelete={handleInActive}
      deleteBtnLoading={loading}
      deleteBtnText="Deactivate"
      icon={<CheckMarkCircle className="w-10 h-10 m-auto mt-4 text-accent" />}
      deleteBtnClassName="!bg-accent focus:outline-none hover:!bg-accent-hover focus:!bg-accent-hover"
      cancelBtnClassName="!bg-red-600 focus:outline-none hover:!bg-red-700 focus:!bg-red-700"
      title="Deactivate Chef"
      description="Are you want to deactivate the chef?"
    />
  );
};

export default InActiveChefView;
