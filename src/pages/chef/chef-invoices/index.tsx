import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { adminOnly } from '@/utils/auth-utils';
import { SortOrder } from '@/types';
import PageHeading from '@/components/common/page-heading';
import { useRouter } from 'next/router';
import { useSettingsQuery } from '@/data/settings';
import { useChefInvoicesQuery } from '@/data/chef-invoices';
import ChefInvoicesList from '@/components/chef-invoices/chef-invoices-list';


export default function AllChefInvoicesPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { chefInvoices, paginatorInfo, loading, error } = useChefInvoicesQuery({
    search: "",
    limit: 10,
    page,
    orderBy,
    sortedBy
  });

  const { settings, loading: loadingSettings } = useSettingsQuery({
    language: locale!,
  });
  if (loading || loadingSettings)
    return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Invoices'} />
        </div>
      </Card>
      <ChefInvoicesList
        chefInvoices={chefInvoices}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
        isMultiCommissionRate={Boolean(
          settings?.options?.isMultiCommissionRate,
        )}
      />
    </>
  );
}
AllChefInvoicesPage.authenticate = {
  permissions: adminOnly,
};
AllChefInvoicesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
