import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { adminOnly } from '@/utils/auth-utils';
import PageHeading from '@/components/common/page-heading';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import Button from '@/components/ui/button';
import PickPackOrderList from '@/components/pick-pack/list';
import { reportClient } from '@/data/client/report';
import InvoiceSalesList from '@/components/report/invoice-sales-list';
import CombinedInvoiceList from '@/components/report/combined-invoice-list';
import Search from '@/components/common/search';
import { lowerCase } from 'lodash';

export default function CombinedInvoiceReportPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [list, setList] = useState<any>();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<any>();

  const handleGenerate = async () => {
    if (startDate && endDate) {
      const startDateFormatted = formatDateToISO(startDate);
      const endDateFormatted = formatDateToISO(endDate);
      const result = await reportClient.getCombinedInvoices(
        startDateFormatted,
        endDateFormatted,
      );
      setData(result);
    }
  };

  useEffect(()=>{
    if(data){
      const list = groupData(data);
      setList(list);
    }
  },[data, searchText])
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

  const groupData = (result: any) => {
    let processedData: any = [];
    result?.forEach((row: any) => {
      let rowIndex = processedData.findIndex(
        (t: any) => t.location_name == row.location_name,
      );
      if (rowIndex == -1) {
        processedData.push({
          location_name: row.location_name,
          orderItems: [],
        });
        rowIndex = processedData.length - 1;
      }
      row.orderItems.forEach((orderItem: any) => {
        if (searchText && lowerCase(orderItem.product.item_name).includes(lowerCase(searchText))) {
          let itemIndex = processedData[rowIndex].orderItems.findIndex(
            (e: any) => e.product.item_number == orderItem.product.item_number,
          );

          if (itemIndex == -1) {
            processedData[rowIndex].orderItems.push({ ...orderItem });
          } else {
            processedData[rowIndex].orderItems[itemIndex].quantity =
              parseInt(processedData[rowIndex].orderItems[itemIndex].quantity) +
              parseInt(orderItem.quantity);
          }
        } else if (!searchText) {
          // If no searchText, add all items
          let itemIndex = processedData[rowIndex].orderItems.findIndex(
            (e: any) => e.product.item_number == orderItem.product.item_number,
          );

          if (itemIndex == -1) {
            processedData[rowIndex].orderItems.push({ ...orderItem });
          } else {
            processedData[rowIndex].orderItems[itemIndex].quantity =
              parseInt(processedData[rowIndex].orderItems[itemIndex].quantity) +
              parseInt(orderItem.quantity);
          }
        }
      });
    });
    return processedData;
  };

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchText(searchText);
    console.log(searchText);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Combined Invoices'} />
        </div>
      </Card>
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
        <div className="flex justify-end flex-1 gap-6">
          <Button
            className="bg-opacity-0 border-2 border-black-500 text-black-500 gap-3 mt-6"
            onClick={handleGenerate}
          >
            <span>Generate</span>
          </Button>
          {list && (
            <Search
              onSearch={handleSearch}
              placeholderText={'Search by product name'}
              className="w-[240px] mt-6"
            />
          )}
        </div>
      </div>
      {list && <CombinedInvoiceList groupInvoices={list} />}
    </>
  );
}
CombinedInvoiceReportPage.authenticate = {
  permissions: adminOnly,
};
CombinedInvoiceReportPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
