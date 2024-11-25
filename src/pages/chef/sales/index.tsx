import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import PageHeading from '@/components/common/page-heading';
import {
  useGetDateIntervalsQuery,
  useGetSalesQuery,
} from '@/data/sales';
import { useState } from 'react';
import Select from '@/components/ui/select/select';
import CategoryTypeFilter from '@/components/filters/category-type-filter';
import Label from '@/components/ui/label';
import Button from '@/components/ui/button';
import SalesList from '@/components/sales/list';
// import SalesList from '@/components/sales/list';

export default function AllSalesPage() {
  const { t } = useTranslation();
  const { dateIntervals, yearOptions, dateIntervalLoading, error } = useGetDateIntervalsQuery();
  
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [selectedDateInterval, setSelectedDateInterval] = useState<any>();
  
  const { sales } = useGetSalesQuery({id:selectedDateInterval?.id!});
  if (dateIntervalLoading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Sales'} />
        </div>
        <div className="flex w-full flex-grow justify-between items-center gap-4">
          <div className="flex w-full flex-col md:flex-row md:items-center">
            <CategoryTypeFilter
              className="w-full"
              onYearFilter={(year: any) => {
                setSelectedYear(year!);
              }}
              enableYearType
            />
          </div>
          <div className="w-full p-0 sm:pe-2">
            <Label>Period</Label>
            <Select
              getOptionLabel={(option: any) => option.date_interval}
              getOptionValue={(option: any) => option.id}
              options={dateIntervals?.filter(
                (item: any) => item.year == selectedYear?.value,
              )}
              onChange={(value: any) => {
                setSelectedDateInterval(value!);
              }}
            />
          </div>
        </div>
      </Card>
      <SalesList 
        sales={sales}
        intervalId = {selectedDateInterval?.id!}
        dateInterval = {selectedDateInterval?.date_interval}
      />
    </>
  );
}
AllSalesPage.authenticate = {
  permissions: adminOnly,
};
AllSalesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
