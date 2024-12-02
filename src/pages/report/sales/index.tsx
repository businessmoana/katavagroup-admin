import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { adminOnly } from '@/utils/auth-utils';
import PageHeading from '@/components/common/page-heading';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import Button from '@/components/ui/button';
import PickPackOrderList from '@/components/pick-pack/list';
import { reportClient } from '@/data/client/report';
import InvoiceSalesList from '@/components/report/invoice-sales-list';
import ColumnChart from '@/components/widgets/column-chart';

export default function SalesReportPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  // const [dateForList, setDateForList] = useState<any>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [list, setList] = useState<any>();

  const handleGenerate = async () => {
    if (startDate && endDate) {
      const startDateFormatted = formatDateToISO(startDate);
      const endDateFormatted = formatDateToISO(endDate);
      const result = await reportClient.getInvoiceSales(
        startDateFormatted,
        endDateFormatted,
      );
      const salesItemsSales = sumSalesItems(result.salesDetails);
      setList(salesItemsSales);
      console.log(salesItemsSales);
    }
  };

  const formatDateToISO = (date: any) => {
    const localDate = new Date(date);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
      ),
    );
    return utcDate.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  const sumSalesItems = (salesItemsData: any[]) => {
    const salesItemsSummary: any = {};

    salesItemsData.forEach((location) => {
      const locationName = location.location_name;
      const totalSales = location.salesItems.reduce((sum: any, item: any) => {
        const salesValue = item.sales ? parseFloat(item.sales) : 0; // Default to 0 if null or undefined
        return sum + salesValue;
      }, 0);

      if (!salesItemsSummary[locationName]) {
        salesItemsSummary[locationName] = {
          location_name: locationName,
          sales_items_sales: totalSales,
        };
      } else {
        salesItemsSummary[locationName].sales_items_sales += totalSales;
      }
    });

    return Object.values(salesItemsSummary).map((loc: any) => ({
      ...loc,
      sales_items_sales: loc.sales_items_sales.toFixed(2), // Format to two decimal places
    }));
  };

  return (
    <>
      <div className="flex justify-start items-center md:1/2 flex-col md:flex-row relative z-10 mb-5">
        <div className="flex justify-start items-center">
          <div className="w-full p-0 mb-5 sm:mb-0 md:w-1/4 sm:pe-2">
            <div>From date</div>
            <DatePicker
              name="start_date"
              dateFormat="dd/MM/yyyy"
              onChange={(e: any) => {
                setStartDate(e);
              }}
              selected={startDate}
              className="border border-border-base"
            />
          </div>
          <div className="w-full p-0 mb-5 sm:mb-0 md:w-1/4 sm:pe-2">
            <div>To date</div>
            <DatePicker
              name="end_date"
              dateFormat="dd/MM/yyyy"
              minDate={startDate}
              onChange={(e: any) => {
                setEndDate(e);
              }}
              selected={endDate}
              className="border border-border-base"
            />
          </div>
        </div>
        <Button
          className="bg-opacity-0 border-2 border-black-500 text-black-500 gap-3 mt-6"
          onClick={handleGenerate}
        >
          <span>Generate</span>
        </Button>
      </div>
      {list && <ColumnChart
          widgetTitle={t('common:sale-history')}
          colors={['#6073D4']}
          series={list?.map((item: any) =>
            item?.sales_items_sales)}
          categories={list?.map((item:any)=>item.location_name)}
        />}
    </>
  );
}
SalesReportPage.authenticate = {
  permissions: adminOnly,
};
SalesReportPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
