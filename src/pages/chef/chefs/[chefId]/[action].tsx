import Layout from '@/components/layouts/admin';
import ChefCreateOrUpdateForm from '@/components/chef/chef-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Config } from '@/config';
import { useChefQuery } from '@/data/chef';
import { useRouter } from 'next/router';
import { adminOnly } from '@/utils/auth-utils';

export default function UpdateChefPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const { chef, loading, error } = useChefQuery({
    id: query.chefId as string,
    language:
      query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Edit Chef
        </h1>
      </div>
      <ChefCreateOrUpdateForm initialValues={chef} />
    </>
  );
}
UpdateChefPage.authenticate = {
  permissions: adminOnly,
};
UpdateChefPage.Layout = Layout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
