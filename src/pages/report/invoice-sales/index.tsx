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

export default function InvoiceSalesReportPage() {
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
      const invoiceSales = sumInvoiceSales(result.invoiceDetails);
      const salesItemsSales = sumSalesItems(result.salesDetails);
      const combinedResults = combineSalesData(invoiceSales, salesItemsSales);
      const sortedCombinedResults = combinedResults.sort((a, b) => {
        return a.location_name.localeCompare(b.location_name);
      });
      console.log('sortedCombinedResults=>', sortedCombinedResults);
      setList(sortedCombinedResults);
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

  const sumInvoiceSales = (invoices: any[]) => {
    const invoiceSummary: any = {};

    invoices.forEach((invoice: any) => {
      const locationName = invoice.location_name;
      const totalSales = parseFloat(invoice.sales); // Assuming sales is a string

      if (!invoiceSummary[locationName]) {
        invoiceSummary[locationName] = {
          location_name: locationName,
          invoice_sales: totalSales,
        };
      } else {
        invoiceSummary[locationName].invoice_sales += totalSales;
      }
    });

    return Object.values(invoiceSummary).map((loc: any) => ({
      ...loc,
      invoice_sales: loc.invoice_sales.toFixed(2), // Format to two decimal places
    }));
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

  const combineSalesData = (invoices: any[], salesItems: any[]) => {
    const combined: any = {};

    invoices.forEach((invoice) => {
      const locationName = invoice.location_name;
      combined[locationName] = {
        location_name: locationName,
        invoice_sales: invoice.invoice_sales || '0.00', // Default to "0.00" if not present
        sales_items_sales: '0.00', // Initialize sales_items_sales
      };
    });

    salesItems.forEach((item) => {
      const locationName = item.location_name;
      if (combined[locationName]) {
        combined[locationName].sales_items_sales = item.sales_items_sales; // Assign sales_items_sales
      } else {
        combined[locationName] = {
          location_name: locationName,
          invoice_sales: '0.00', // Default to "0.00" if not present
          sales_items_sales: item.sales_items_sales,
        };
      }
    });

    return Object.values(combined).map((loc: any) => ({
      ...loc,
      invoice_sales: loc.invoice_sales,
      sales_items_sales: loc.sales_items_sales,
    }));
  };

  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Invoice & Sales'} />
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
        <Button
          className="bg-opacity-0 border-2 border-black-500 text-black-500 gap-3 mt-6"
          onClick={handleGenerate}
        >
          <span>Generate</span>
        </Button>
      </div>
      {list && <InvoiceSalesList dataList={list} />}
    </>
  );
}
InvoiceSalesReportPage.authenticate = {
  permissions: adminOnly,
};
InvoiceSalesReportPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
