import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { adminOnly } from '@/utils/auth-utils';
import { useOrderDateQuery } from '@/data/location';
import OrderDateCreateOrUpdateForm from '@/components/location/order-date-form';

export default function UpdateOrderDatePage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const { orderDate, loading, error } = useOrderDateQuery(query.orderDateId);

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Edit Order Date
        </h1>
      </div>
      <OrderDateCreateOrUpdateForm initialValues={orderDate}/>
    </>
  );
}
UpdateOrderDatePage.authenticate = {
  permissions: adminOnly,
};
UpdateOrderDatePage.Layout = Layout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
