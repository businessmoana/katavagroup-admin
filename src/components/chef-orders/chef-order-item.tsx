import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

type IProps = {
  orderItems: any[] | undefined;
};

const OrderItems = ({
  orderItems
}: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();


  let columns = [
    {
      title: "Item number",
      dataIndex: 'item_number',
      key: 'item_number',
      align: alignLeft as AlignType,
      width: 130,
      className: 'cursor-pointer',
    },

    {
      title: "Item name",
      className: 'cursor-pointer',
      dataIndex: 'item_name',
      key: 'item_name',
      align: 'center' as AlignType,
      width: 180,
    },

    {
      title: "Item brand",
      className: 'cursor-pointer',
      dataIndex: 'item_brand',
      key: 'item_brand',
      align: 'center' as AlignType,
      width: 180,
    },

    {
      title: "Package",
      className: 'cursor-pointer',
      dataIndex: 'package',
      key: 'package',
      align: 'center' as AlignType,
      width: 180,
    },
    {
      title: "Ordered qty",
      className: 'cursor-pointer',
      dataIndex: 'order_kol',
      key: 'order_kol',
      align: 'center' as AlignType,
      width: 180,
    },
    {
      title: "Get qty",
      className: 'cursor-pointer',
      dataIndex: 'get_kol',
      key: 'get_kol',
      align: 'center' as AlignType,
      width: 180,
    },
    {
      title: "Item price",
      className: 'cursor-pointer',
      dataIndex: 'price',
      key: 'price',
      align: 'center' as AlignType,
      width: 180,
      render: (price: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            $ {price}
          </span>
        </div>
      ),
    },
    {
      title: "Sum price",
      className: 'cursor-pointer',
      dataIndex: 'price',
      key: 'price',
      align: 'center' as AlignType,
      width: 180,
      render: function Render(price:any, record: any) {
        return <div className="flex items-center font-medium justify-center">
           <span className="truncate text-center">
             $ {(Number(record.get_kol) * Number(record.price)).toFixed(2)}
           </span>
         </div>
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
          data={orderItems}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
};

export default OrderItems;
