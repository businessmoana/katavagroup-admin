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

type IProps = {
  chefOrders: any[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  isMultiCommissionRate?: boolean;
};

const ChefOrdersList = ({
  chefOrders,
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
          title={'Location'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'location_name'
          }
          isActive={sortingObj.column === 'location_name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'location',
      key: 'location',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('location_name'),
      render: (location: any) => (
        <div className="flex items-center font-medium">
          <span className="truncate text-center">
            {location?.location_name}
          </span>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={'Chef'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'first_name'
          }
          isActive={sortingObj.column === 'first_name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'chef',
      key: 'chef',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('first_name'),
      render: (chef: any) => (
        <div className="flex items-center font-medium">
          <span className="truncate text-left">
            {chef?.first_name} {chef?.last_name}
          </span>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={'Order date'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'datum'
          }
          isActive={sortingObj.column === 'datum'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'datum',
      key: 'datum',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('datum'),
      render: (datum: any) => (
        <div className="flex items-center font-medium">
          <span className="truncate text-left">
            {dayjs(datum).format('MM/DD/YYYY HH:mm')}
          </span>
        </div>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={'Number of products'}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'br_proizvoda'
          }
          isActive={sortingObj.column === 'br_proizvoda'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'br_proizvoda',
      key: 'br_proizvoda',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('br_proizvoda'),
    },
    {
      title: (
        <TitleWithSort
          title={'Sum price'}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'ukupna_cena'
          }
          isActive={sortingObj.column === 'ukupna_cena'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'ukupna_cena',
      key: 'ukupna_cena',
      align: 'center' as AlignType,
      width: 180,
      onHeaderCell: () => onHeaderClick('ukupna_cena'),
      render: function Render(ukupna_cena:any, record: any) {
        return <div className="flex items-center font-medium justify-center">
           <span className="truncate text-center">
             {(Number(record.ukupna_cena) + Number(record.order_price)).toFixed(2)}
           </span>
         </div>
      },
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
          <ActionButtons
            id={id}
            detailsUrl={`${router.asPath}/${id}/view`}
          />
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
          data={chefOrders}
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

export default ChefOrdersList;
