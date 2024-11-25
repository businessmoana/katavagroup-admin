import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import LocationCreateOrUpdateForm from '@/components/location/form';
import { usePriceGroupListQuery } from '@/data/price-group';

export default function CreateLocationPage() {
  const { t } = useTranslation();
  const { priceGroupList } = usePriceGroupListQuery();

  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">Create Location</h1>
      </div>
      {priceGroupList && (
        <LocationCreateOrUpdateForm priceGroupList={priceGroupList} />
      )}
    </>
  );
}
CreateLocationPage.authenticate = {
  permissions: adminOnly,
};
CreateLocationPage.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
