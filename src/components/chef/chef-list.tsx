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
import Image from 'next/image';
import { useState } from 'react';
import { getAuthCredentials } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';
import { title } from 'process';
import { render } from '@headlessui/react/dist/utils/render';
import ActionButtons from '../common/action-buttons';
import { useRouter } from 'next/router';

type IProps = {
  chefs: Chef[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  isMultiCommissionRate?: boolean;
};

const ChefList = ({
  chefs,
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
      width: 70,
      className: 'cursor-pointer',
      onHeaderCell: () => onHeaderClick('id'),
    },

    {
      title: (
        <TitleWithSort
          title={'First Name'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'first_name'
          }
          isActive={sortingObj.column === 'first_name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'center' as AlignType,
      width: 100,
      onHeaderCell: () => onHeaderClick('first_name'),
      render: (first_name: any) => (
        <div className="flex items-start font-medium justify-start">
          <span className="truncate text-start">
            {first_name}
          </span>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={'Last Name'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'last_name'
          }
          isActive={sortingObj.column === 'last_name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'last_name',
      key: 'last_name',
      align: 'center' as AlignType,
      width: 70,
      onHeaderCell: () => onHeaderClick('last_name'),
      render: (last_name: any) => (
        <div className="flex items-start font-medium justify-start">
          <span className="truncate text-start">
            {last_name}
          </span>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={'Phone Number'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'phone_number'
          }
          isActive={sortingObj.column === 'phone_number'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center' as AlignType,
      width: 150,
      onHeaderCell: () => onHeaderClick('phone_number'),
    },
    {
      title: (
        <TitleWithSort
          title={'User Role'}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'role'
          }
          isActive={sortingObj.column === 'role'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'korisnickiNalog',
      key: 'korisnickiNalog',
      align: 'center' as AlignType,
      width: 100,
      onHeaderCell: () => onHeaderClick('role'),
      render: (korisnickiNalog: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            {korisnickiNalog?.sifUloga?.naziv}
          </span>
        </div>
      ),
    },
    {
      title: 'Status',
      className: 'cursor-pointer',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as AlignType,
      width: 100,
      onHeaderCell: () => onHeaderClick('status'),
      render: (status: number) => (
        <Badge
          textKey={status ? 'common:text-inactive' : 'common:text-active'}
          color={
            status
              ? 'bg-status-failed/10 text-status-failed'
              : ' bg-accent/10 !text-accent'
          }
        />
      ),
    },
    {
      title: 'Actions',
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'Actions',
      align: 'center' as AlignType,
      width: 200,
      render: (id: string, { status }: Chef) => {
        return (
          <ActionButtons
            id={id}
            editUrl={`${router.asPath}/${id}/edit`}
            // detailsUrl={`/print/print-chef`}
            chefApproveButton={true}
            // deleteModalView="DELETE_CHEF"
            isChefActive={status}
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
          data={chefs}
          rowKey="id"
          scroll={{ x: 5 }}
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

export default ChefList;
