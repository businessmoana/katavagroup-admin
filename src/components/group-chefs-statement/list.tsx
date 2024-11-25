import { NoDataFound } from '@/components/icons/no-data-found';
import Link from '@/components/ui/link';
import Pagination from '@/components/ui/pagination';
import { AlignType, Table } from '@/components/ui/table';
import { Chef, MappedPaginatorInfo, SortOrder } from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { getAuthCredentials } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import { EyeIcon } from '../icons/category/eyes-icon';
import Button from '../ui/button';

type IProps = {
  statements: any;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  isMultiCommissionRate?: boolean;
};

const GroupChefsStatementList = ({
  statements,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
  isMultiCommissionRate,
}: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { permissions } = getAuthCredentials();
  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc
          ? SortOrder.Asc
          : SortOrder.Desc,
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  let columns = [
    {
      title: 'Location',
      className: 'cursor-pointer',
      dataIndex: 'location_name',
      key: 'location_name',
      align: 'center' as AlignType,
      width: 180,
    },

    {
      title: 'Chef',
      className: 'cursor-pointer',
      dataIndex: 'chef_name',
      key: 'chef_name',
      align: 'center' as AlignType,
      width: 180,
    },

    {
      title: 'Start Date',
      className: 'cursor-pointer',
      dataIndex: 'start_date',
      key: 'start_date',
      align: 'center' as AlignType,
      width: 180,
    },
    {
      title: 'End Date',
      className: 'cursor-pointer',
      dataIndex: 'end_date',
      key: 'end_date',
      align: 'center' as AlignType,
      width: 180,
    },
    {
      title: 'View',
      className: 'cursor-pointer',
      dataIndex: 'sales_id',
      key: 'view',
      align: 'center' as AlignType,
      width: 50,
      render: (sales_id: string) => {
        return (
          <a
            href={`/print/print-group-statement/${sales_id}`}
            className="w-full h-12 md:w-auto md:ms-6"
            target="_blank"
          >
            <Button>Statement</Button>
          </a>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
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
          data={statements}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default GroupChefsStatementList;
