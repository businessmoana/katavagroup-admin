import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Config } from '@/config';
import { usePriceGroupListQuery, usePriceGroupQuery } from '@/data/price-group';
import { useRouter } from 'next/router';
import { adminOnly } from '@/utils/auth-utils';
import { useOrderDateListQuery } from '@/data/location';
import Card from '@/components/common/card';
import PageHeading from '@/components/common/page-heading';
import LinkButton from '@/components/ui/link-button';
import OrderDateList from '@/components/location/order-date-list';
import SelectInput from '@/components/ui/select-input';
import Select from '@/components/ui/select/select';
import { useEffect, useState } from 'react';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import Button from '@/components/ui/button';
let yearOptions:any = [];
export default function OrderDatePage() {
  const { query, locale } = useRouter();
  const { orderDateList, loading, error } = useOrderDateListQuery(query.locationId);
  const { t } = useTranslation();
  const router = useRouter();
  if(orderDateList?.length){
    yearOptions = Array.from(
      new Set(orderDateList?.map((item: any) => item.year)),
    )
      .sort((a: any, b: any) => b - a)
      ?.map((year: any) => ({
        value: year,
        name: year.toString(), // Convert year to string for the name
      }));
  }

  const [listData, setListData] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();

  useEffect(() => {
    setSelectedYear(yearOptions[0]);
  }, [query.locationId, orderDateList]);

  useEffect(() => {
    if (selectedYear)
      setListData(
        orderDateList?.filter((item: any) => item.year === selectedYear.value),
      );
  }, [selectedYear, query.locationId, orderDateList]);

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Order Dates'} />
        </div>
        <div className="flex w-full flex-col items-center justify-end ms-auto md:w-1/2 md:flex-row">
          {yearOptions && (
            <Select
              name="Year"
              value={selectedYear}
              defaultValue={yearOptions[0]}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.value}
              options={yearOptions!}
              onChange={(e: any) => {
                setSelectedYear(e);
              }}
            />
          )}
          <LinkButton
            href={`/location/${query.locationId}/order-dates/create`}
            className="w-full h-12 md:w-auto md:ms-6"
          >
            <span>+ New Order Date</span>
          </LinkButton>
        </div>
      </Card>
      {listData && <OrderDateList orderDateList={listData} />}
      <StickyFooterPanel className="z-0">
        <div className="text-end">
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        </div>
      </StickyFooterPanel>
    </>
  );
}
OrderDatePage.authenticate = {
  permissions: adminOnly,
};
OrderDatePage.Layout = Layout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
