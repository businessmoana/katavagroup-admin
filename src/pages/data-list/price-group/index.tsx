import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ChefList from '@/components/chef/chef-list';
import PriceGroupList from '@/components/price-group/price-group-list';
import { useState } from 'react';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import { useChefsQuery } from '@/data/chef';
import { usePriceGroupsQuery } from '@/data/price-group';
import { SortOrder } from '@/types';
import PageHeading from '@/components/common/page-heading';
import { useRouter } from 'next/router';
import { useSettingsQuery } from '@/data/settings';
import BasicFilter from '@/components/filters/basic-filter';
import LinkButton from '@/components/ui/link-button';
import { Config } from '@/config';

interface FilterOptions {
  name: string;
  value: boolean;
}

export default function AllPriceGroupPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState(true);
  const [orderBy, setOrder] = useState('');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { priceGroups, paginatorInfo, loading, error } = usePriceGroupsQuery({
    limit: 10,
    page,
    orderBy,
    sortedBy,
    is_active: filterType,
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
          <PageHeading title={'Price Group'} />
        </div>

        <div className="flex w-full flex-col items-center ms-auto md:w-1/2 md:flex-row">
          {/* {locale === Config.defaultLanguage && (
            <LinkButton
              href="/data-list/price-group/create"
              className="w-full h-12 md:w-auto md:ms-6"
            >
              <span>+ Create Price Group</span>
            </LinkButton>
          )} */}
        </div>
      </Card>
      <PriceGroupList
        priceGroups={priceGroups}
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
AllPriceGroupPage.authenticate = {
  permissions: adminOnly,
};
AllPriceGroupPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
