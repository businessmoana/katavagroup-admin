import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import OrderDateCreateOrUpdateForm from '@/components/location/order-date-form';

export default function CreateOrderDatePage() {
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Add Order Date
        </h1>
      </div>
      <OrderDateCreateOrUpdateForm/>
    </>
  );
}
CreateOrderDatePage.authenticate = {
  permissions: adminOnly,
};
CreateOrderDatePage.Layout = Layout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
