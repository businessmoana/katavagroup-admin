import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Config } from '@/config';
import { usePriceGroupQuery } from '@/data/price-group';
import { useRouter } from 'next/router';
import PriceGroupCreateOrUpdateForm from '@/components/price-group/price-group-form';
import { adminOnly } from '@/utils/auth-utils';

export default function UpdatePriceGroupPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const { priceGroup, loading, error } = usePriceGroupQuery({
    id: query.priceGroupId as string,
    language:
      query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Edit Price
        </h1>
      </div>
      <PriceGroupCreateOrUpdateForm initialValues={priceGroup} />
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
