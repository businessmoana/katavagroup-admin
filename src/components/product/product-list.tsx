import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import { siteSettings } from '@/settings/site.settings';
import usePrice from '@/utils/use-price';
import Badge from '@/components/ui/badge/badge';
import { Router, useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { NoDataFound } from '@/components/icons/no-data-found';
import {
  Product,
  MappedPaginatorInfo,
  ProductType,
  Shop,
  SortOrder,
} from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useEffect, useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import { useModalAction } from '../ui/modal/modal.context';
import Button from '../ui/button';
import { AddIcon } from '../icons/add';
import { EditIcon } from '../icons/edit';
import Link from '@/components/ui/link';
import { InventoryIcon } from '../icons/sidebar';
import { CheckMarkCircle } from '../icons/checkmark-circle';
import { CloseFillIcon } from '../icons/close-fill';
import { productClient } from '@/data/client/product';
import { toast } from 'react-toastify';

export type IProps = {
  products: any;
  is_active: boolean;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  setTrigger: (current: any) => void;
};

type SortingObjType = {
  sort: SortOrder;
  column: string | null;
};

const ProductList = ({
  setTrigger,
  products,
  is_active,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const router = useRouter();

  const [sortingObj, setSortingObj] = useState<SortingObjType>({
    sort: SortOrder.Desc,
    column: null,
  });
  const { openModal } = useModalAction();

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

  const [tableData, setTableData] = useState(products);

  useEffect(() => {
    setTableData(products);
  }, [products]);

  const handleActiveDeactiveProduct = async (id: number, status: number) => {
    const result = await productClient.changeProductStatus({ id, status });
    if (result) {
      setTrigger((current: boolean) => (current ? false : true));
      if (is_active) toast.success('Inactived successfully');
      else toast.success('Reactived successfully');
    }
  };

  const duplicateProduct =async (id: number) => {
    const result = await productClient.duplicateProduct(id);
    if(result.id){
      router.replace(`${router.asPath}/${result.id}/edit`)
    }
  };

  let columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: alignLeft,
      width: 130,
      render: (id: number) => `#${t('table:table-item-id')}: ${id}`,
    },
    {
      title: (
        <TitleWithSort
          title="Item Category"
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'item_category'
          }
          isActive={sortingObj.column === 'item_category'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'item_category',
      key: 'item_category',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('item_category'),
    },
    {
      title: (
        <TitleWithSort
          title="Item"
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'item_number'
          }
          isActive={sortingObj.column === 'item_number'}
        />
      ),
      dataIndex: 'item_number',
      className: 'cursor-pointer',
      key: 'item_number',
      width: 150,
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('item_number'),
    },
    {
      title: (
        <TitleWithSort
          title="Item Name"
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'item_name'
          }
          isActive={sortingObj.column === 'item_name'}
        />
      ),
      dataIndex: 'item_name',
      className: 'cursor-pointer',
      key: 'item_name',
      width: 250,
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('item_name'),
    },
    {
      title: (
        <TitleWithSort
          title="Item Brand"
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'item_brand'
          }
          isActive={sortingObj.column === 'item_brand'}
        />
      ),
      dataIndex: 'item_brand',
      className: 'cursor-pointer',
      key: 'item_brand',
      width: 150,
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('item_brand'),
    },
    {
      title: 'Package',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      render: (id: string) => {
        return (
          <button
            onClick={() => {
              openModal('UPDATE_OR_CREATE_PACKAGE', id);
            }}
          >
            <AddIcon width={20} />
          </button>
        );
      },
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      render: (id: string) => {
        return (
          <Link
            href={`${router.asPath}/${id}/edit`}
            className="text-base flex justify-center items-center transition duration-200 hover:text-heading"
            title={t('common:text-edit')}
          >
            <EditIcon width={20} />
          </Link>
        );
      },
    },
    {
      title: 'Duplicate',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (id: string) => {
        return (
          <div
            className="cursor-pointer justify-center items-center flex"
            onClick={() => {
              duplicateProduct(+id);
            }}
          >
            <InventoryIcon width={20} />
          </div>
        );
      },
    },
    {
      title: `${is_active == true ? 'Inactive' : 'Reactive'}`,
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (id: number, record: any) => {
        return (
          <button
            onClick={() => {
              handleActiveDeactiveProduct(id, record.status);
            }}
          >
            {record.status == 0 && <CloseFillIcon width={20} color="red" />}
            {record.status != 0 && <CheckMarkCircle width={20} color="green" />}
          </button>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          /* @ts-ignore */
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
          data={tableData}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
