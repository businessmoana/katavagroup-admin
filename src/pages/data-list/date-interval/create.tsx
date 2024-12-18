import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DateIntervalCreateOrUpdateForm from '@/components/date-interval/form';
import { adminOnly } from '@/utils/auth-utils';
export default function CreateDateIntervalPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Create Date Interval
        </h1>
      </div>
      <DateIntervalCreateOrUpdateForm />
    </>
  );
}
CreateDateIntervalPage.authenticate = {
  permissions: adminOnly,
};
CreateDateIntervalPage.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
