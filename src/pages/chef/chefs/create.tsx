import Layout from '@/components/layouts/admin';
import ChefCreateOrUpdateForm from '@/components/chef/chef-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';

export default function CreateCouponPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Create Chef
        </h1>
      </div>
      <ChefCreateOrUpdateForm />
    </>
  );
}
CreateCouponPage.authenticate = {
  permissions: adminOnly,
};
CreateCouponPage.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
