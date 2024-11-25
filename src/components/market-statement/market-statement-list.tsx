import { NoDataFound } from '@/components/icons/no-data-found';
import Badge from '@/components/ui/badge/badge';
import Pagination from '@/components/ui/pagination';
import { AlignType, Table } from '@/components/ui/table';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Chef, MappedPaginatorInfo, Order, SortOrder } from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { getAuthCredentials } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';
import ActionButtons from '../common/action-buttons';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Button from '../ui/button';

type IProps = {
  marketStatements: any[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  isMultiCommissionRate?: boolean;
};

const MarketStatementList = ({
  marketStatements,
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
      title: (
        <TitleWithSort
          title={'ID'}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'id'
          }
          isActive={sortingObj.column === 'id'}
        />
      ),
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      className: 'cursor-pointer',
      onHeaderCell: () => onHeaderClick('id'),
    },

    {
      title: (
        <TitleWithSort
          title={'Start Date'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'start_date'
          }
          isActive={sortingObj.column === 'start_date'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'start_date',
      key: 'start_date',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('start_date'),
    },

    {
      title: (
        <TitleWithSort
          title={'End Date'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'end_date'
          }
          isActive={sortingObj.column === 'end_date'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'end_date',
      key: 'end_date',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('end_date'),
    },
    {
      title: 'Actions',
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'Actions',
      align: 'center' as AlignType,
      width: 180,
      render: (id: string, { status }: Chef) => {
        return (
          <a
            href={`/print/print-market-statement/${id}`}
            className="w-full h-12 md:w-auto md:ms-6"
            target="_blank"
          >
            <Button>View</Button>
          </a>
        );
      },
    },
  ];

  if (!Boolean(isMultiCommissionRate)) {
    columns = columns?.filter((column) => column?.key !== 'settings');
  }

  if (!permissions?.includes(SUPER_ADMIN)) {
    columns = columns?.filter((column) => column?.key !== 'actions');
  }

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
          data={marketStatements}
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

export default MarketStatementList;
