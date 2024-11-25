import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Config } from '@/config';
import { usePriceGroupListQuery, usePriceGroupQuery } from '@/data/price-group';
import { useRouter } from 'next/router';
import { adminOnly } from '@/utils/auth-utils';
import LocationCreateOrUpdateForm from '@/components/location/form';
import { useLocationQuery } from '@/data/location';

export default function UpdatePriceGroupPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const { priceGroupList } = usePriceGroupListQuery();
  const { location, loading, error } = useLocationQuery(query.locationId);

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">Edit Location</h1>
      </div>
      {priceGroupList && (
        <LocationCreateOrUpdateForm
          initialValues={location}
          priceGroupList={priceGroupList}
        />
      )}
    </>
  );
}
UpdatePriceGroupPage.authenticate = {
  permissions: adminOnly,
};
UpdatePriceGroupPage.Layout = Layout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
