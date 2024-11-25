import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ChefList from '@/components/chef/chef-list';
import { useState } from 'react';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import { useChefsQuery } from '@/data/chef';
import { SortOrder } from '@/types';
import PageHeading from '@/components/common/page-heading';
import { useRouter } from 'next/router';
import { useSettingsQuery } from '@/data/settings';
import BasicFilter from '@/components/filters/basic-filter';
import LinkButton from '@/components/ui/link-button';
import { Config } from '@/config';
import { useLocationsQuery } from '@/data/location';
import LocationList from '@/components/location/location-list';

interface FilterOptions {
  name: string;
  value: boolean;
}

export default function AllLocationListPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState(true);
  const [orderBy, setOrder] = useState('');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { locations, paginatorInfo, loading, error } = useLocationsQuery({
    limit: 10,
    page,
    orderBy,
    search: searchTerm,
    sortedBy,
    is_active: filterType,
  });

  const { settings, loading: loadingSettings } = useSettingsQuery({
    language: locale!,
  });
  if (loading || loadingSettings)
    return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Location'} />
        </div>

        <div className="flex w-full flex-col items-center ms-auto md:w-1/2 md:flex-row">
          <Search
            onSearch={handleSearch}
            placeholderText={t('form:input-placeholder-search-name')}
          />
          <BasicFilter
            className="md:ms-6"
            filterOptions={[
              { name: 'Search active', value: true },
              { name: 'Search inactive', value: false },
            ]}
            onFilterFunction={(filterType: FilterOptions) => {
              setFilterType(filterType?.value!);
              setPage(1);
            }}
            placeholder="filter by active"
            defaultValue={[{ name: 'Search active', value: true }]}
          />
          {locale === Config.defaultLanguage && (
            <LinkButton
              href="/location/create"
              className="w-full h-12 md:w-auto md:ms-6"
            >
              <span>+ New location</span>
            </LinkButton>
          )}
        </div>
      </Card>
      <LocationList
        locations={locations}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
        is_active = {filterType}
        isMultiCommissionRate={Boolean(
          settings?.options?.isMultiCommissionRate,
        )}
      />
    </>
  );
}
AllLocationListPage.authenticate = {
  permissions: adminOnly,
};
AllLocationListPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
