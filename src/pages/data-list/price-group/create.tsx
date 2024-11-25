import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PriceGroupCreateOrUpdateForm from '@/components/price-group/price-group-form';
import { adminOnly } from '@/utils/auth-utils';

export default function CreatePriceGroupPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Create Price Group
        </h1>
      </div>
      <PriceGroupCreateOrUpdateForm />
    </>
  );
}
CreatePriceGroupPage.authenticate = {
  permissions: adminOnly,
};
CreatePriceGroupPage.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
