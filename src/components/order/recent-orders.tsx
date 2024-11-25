import dayjs from 'dayjs';
import { Table } from '@/components/ui/table';
import usePrice from '@/utils/use-price';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ActionButtons from '@/components/common/action-buttons';
import { MappedPaginatorInfo, Order, OrderStatus, Product } from '@/types';
import { useTranslation } from 'next-i18next';
import Badge from '@/components/ui/badge/badge';
import StatusColor from '@/components/order/status-color';
import { useRouter } from 'next/router';
import Avatar from '../common/avatar';
import Pagination from '@/components/ui/pagination';
import { NoDataFound } from '@/components/icons/no-data-found';
import { useIsRTL } from '@/utils/locals';
import { Routes } from '@/config/routes';
import cn from 'classnames';

type IProps = {
  orders: any;
  title?: string;
  className?: string;
};

const RecentOrders = ({
  orders,
  title,
  className,
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const rowExpandable = (record: any) => record.children?.length;

  const columns = [
    {
      title: "Date",
      dataIndex: 'datum_string',
      key: 'datum_string',
      align: alignLeft,
      width: 50,
    },
    {
      title: "Location",
      dataIndex: 'location',
      key: 'location',
      align: alignRight,
      width: 120,
      render: (location: any) => {
        return (
          <div>{location.location_name}</div>
        );
      },
    },
    {
      title: "Chef",
      dataIndex: 'chef',
      key: 'chef',
      align: alignRight,
      width: 120,
      render: (chef: any) => {
        return (
          <div>{chef.chef_name}</div>
        );
      },
    },
  ];

  return (
    <>
      <div
        className={cn(
          'overflow-hidden rounded-lg bg-white p-6 md:p-7',
          className
        )}
      >
        <div className="flex items-center justify-between pb-6 md:pb-7">
          <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
            {title}
          </h3>
        </div>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">
                {t('table:empty-table-data')}
              </div>
              <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
            </div>
          )}
          data={orders}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default RecentOrders;
