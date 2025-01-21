import Avatar from '@/components/common/avatar';
import { NoDataFound } from '@/components/icons/no-data-found';
import Badge from '@/components/ui/badge/badge';
import Link from '@/components/ui/link';
import Pagination from '@/components/ui/pagination';
import { AlignType, Table } from '@/components/ui/table';
import TitleWithSort from '@/components/ui/title-with-sort';
import { siteSettings } from '@/settings/site.settings';
import { Chef, MappedPaginatorInfo, SortOrder } from '@/types';
import { OWNERSHIP_TRANSFER_STATUS } from '@/utils/constants';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { getAuthCredentials } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import Button from '../ui/button';
import { EditIcon } from '../icons/edit';
import { AddIcon } from '../icons/add';
import { CheckMarkCircle } from '../icons/checkmark-circle';
import { CloseFillIcon } from '../icons/close-fill';
import { useInActiveChefMutation } from '@/data/chef';
import { useChangeLocationStatusMutation } from '@/data/location';

type IProps = {
  locations: any;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  isMultiCommissionRate?: boolean;
  is_active: boolean;
};

const LocationList = ({
  locations,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
  is_active,
}: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { permissions } = getAuthCredentials();
  const { mutate: changeLocationStatus, isLoading: loading } =
    useChangeLocationStatusMutation();
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
          title={'Location Number'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'location_number'
          }
          isActive={sortingObj.column === 'location_number'}
        />
      ),
      dataIndex: 'location_number',
      key: 'location_number',
      align: alignLeft as AlignType,
      width: 50,
      className: 'cursor-pointer',
      onHeaderCell: () => onHeaderClick('location_number'),
    },

    {
      title: (
        <TitleWithSort
          title={'Location Name'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'location_name'
          }
          isActive={sortingObj.column === 'location_name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'location_name',
      key: 'location_name',
      align: 'center' as AlignType,
      width: 50,
      onHeaderCell: () => onHeaderClick('location_name'),
    },

    {
      title: (
        <TitleWithSort
          title={'Location address'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'last_name'
          }
          isActive={sortingObj.column === 'location_address'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'location_address',
      key: 'location_address',
      align: 'center' as AlignType,
      width: 250,
      onHeaderCell: () => onHeaderClick('location_address'),
      render: (location_address: any) => (
        <div className="flex items-start font-medium justify-start">
          <span className="truncate text-start">
            {location_address}
          </span>
        </div>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      key: 'Actions',
      align: 'center' as AlignType,
      width: 50,
      render: (id: string) => {
        return (
          <Link
            href={`${router.asPath}/${id}/edit`}
            className="text-base transition duration-200 hover:text-heading"
            title={t('common:text-edit')}
          >
            <Button className="bg-blue-400 hover:bg-blue-500 p-4">
              <EditIcon width={20} />
            </Button>
          </Link>
        );
      },
    },
    // {
    //   title: 'Order dates',
    //   dataIndex: 'id',
    //   key: 'Actions',
    //   align: 'center' as AlignType,
    //   width: 50,
    //   render: (id: string) => {
    //     return (
    //       <Link
    //         href={`${router.asPath}/${id}/order-dates`}
    //         className="text-base transition duration-200 hover:text-heading"
    //         title="Add Order Date"
    //       >
    //         <Button className="bg-white hover:bg-white border border-gray-800 p-4">
    //           <AddIcon width={20} />
    //         </Button>
    //       </Link>
    //     );
    //   },
    // },
    {
      title: `${is_active ? 'Inactive' : 'Re-active'}`,
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'Actions',
      align: 'center' as AlignType,
      width: 50,
      render: (id: string, { status }: Chef) => {
        return (
          <>
            {status ? (
              <button
                onClick={() => handleLocationStatus(id)}
                className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
                title="Active Chef"
              >
                <CheckMarkCircle width={20} />
              </button>
            ) : (
              <button
                onClick={() => handleLocationStatus(id)}
                className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
                title="Diactive Chef ?"
              >
                <CloseFillIcon width={20} />
              </button>
            )}
          </>
        );
      },
    },
  ];

  const handleLocationStatus = (id: any) => {
    changeLocationStatus({ id });
  };

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
          data={locations}
          rowKey="id"
          scroll={{ x: 10 }}
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

export default LocationList;
