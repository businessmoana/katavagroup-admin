import { NoDataFound } from '@/components/icons/no-data-found';
import Link from '@/components/ui/link';
import Pagination from '@/components/ui/pagination';
import { AlignType, Table } from '@/components/ui/table';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { getAuthCredentials } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import Button from '../ui/button';
import { EditIcon } from '../icons/edit';
import { AddIcon } from '../icons/add';
import {
  useChangeLocationStatusMutation,
  useDeleteOrderDate,
} from '@/data/location';
import { TrashIcon } from '../icons/trash';

type IProps = {
  orderDateList: any;
};

const OrderDateList = ({ orderDateList }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { permissions } = getAuthCredentials();
  const { mutate: removeOrderDate, isLoading: loading } = useDeleteOrderDate();

  let columns = [
    {
      title: 'Order date',
      dataIndex: 'order_date',
      key: 'order_date',
      align: 'center' as AlignType,
      width: 300,
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
    {
      title: `Delete`,
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'Actions',
      align: 'center' as AlignType,
      width: 50,
      render: (id: string) => {
        return (
          <>
            <button
              onClick={() => deleteOrderDate(id)}
              className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
              title="Delete"
            >
              <TrashIcon color="red" width={20} />
            </button>
          </>
        );
      },
    },
  ];

  const deleteOrderDate = (id: any) => {
    removeOrderDate(id);
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
          data={orderDateList}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
};

export default OrderDateList;
