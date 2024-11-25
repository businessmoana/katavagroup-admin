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
import { productClient } from '@/data/client/product';
import PickPackOrderList from '@/components/pick-pack/list';

export default function PickPackListPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  // const [dateForList, setDateForList] = useState<any>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [groupOrders, setOrderList] = useState();

  const handleGenerate = async () => {
    if (startDate && endDate) {
      const startDateFormatted = formatDateToISO(startDate);
      const endDateFormatted = formatDateToISO(endDate);
      const result = await productClient.getOrders(
        startDateFormatted,
        endDateFormatted,
      );
      const groupOrders = groupOrdersByLocation(result);
      setOrderList(groupOrders);
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

  const groupOrdersByLocation = (orders: any) => {
    let result: any = [];
    orders.forEach((order: any, index: any) => {
      let indexOf = result.findIndex(
        (e: any) => e.location_name == order.location_name,
      );
      if (indexOf !== -1) {
        result[indexOf].value.push(order);
      } else {
        result.push({
          location_name: order.location_name,
          value: [order],
        });
      }
    });
    return result;
  };

  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={'Pick&Pack List'} />
        </div>
        {/* <div className="flex justify-center items-center md:1/2 flex-col md:flex-row">
          <div className="w-full p-0 mb-5 sm:mb-0 md:w-1/2 sm:pe-2  relative z-20">
            <div>Date of scheduled delivery</div>
            <DatePicker
              name="date_for_list"
              dateFormat="dd/MM/yyyy"
              onChange={(e: any) => {
                setDateForList(e);
              }}
              selected={dateForList}
              className="border border-border-base"
            />
          </div>
          <Button className="bg-opacity-0 border-2 border-orange-500 text-orange-500 gap-3 me-2 mt-6">
            <span>Original List</span>
          </Button>
          <Button className="bg-opacity-0 border-2 border-green-500 text-green-500 gap-3 mt-6">
            <span>Pick List</span>
          </Button>
        </div> */}
      </Card>
      <div className="flex justify-start items-center md:1/2 flex-col md:flex-row relative z-10">
        <div className='flex justify-start items-center'>
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
      {groupOrders && <PickPackOrderList groupOrders={groupOrders} />}
    </>
  );
}
PickPackListPage.authenticate = {
  permissions: adminOnly,
};
PickPackListPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
