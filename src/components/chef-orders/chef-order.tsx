import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

type IProps = {
  chefOrder: any[] | undefined;
};

const ChefOrder = ({
  chefOrder
}: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();


  let columns = [
    {
      title: "ID",
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      className: 'cursor-pointer',
    },

    {
      title: "Location",
      className: 'cursor-pointer',
      dataIndex: 'location',
      key: 'location',
      align: 'center' as AlignType,
      width: 180,
      render: (location: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            {location?.location_name}
          </span>
        </div>
      ),
    },

    {
      title: "Chef",
      className: 'cursor-pointer',
      dataIndex: 'chef',
      key: 'chef',
      align: 'center' as AlignType,
      width: 180,
      render: (chef: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            {chef?.first_name} {chef?.last_name}
          </span>
        </div>
      ),
    },

    {
      title: "Order date",
      className: 'cursor-pointer',
      dataIndex: 'datum',
      key: 'datum',
      align: 'center' as AlignType,
      width: 180,
      render: (datum: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            {dayjs(datum).format('MM/DD/YYYY HH:mm')}
          </span>
        </div>
      ),
    },
    {
      title: "Number of products",
      className: 'cursor-pointer',
      dataIndex: 'br_proizvoda',
      key: 'br_proizvoda',
      align: 'center' as AlignType,
      width: 180,
    },
    {
      title: "Materials",
      className: 'cursor-pointer',
      dataIndex: 'order_price',
      key: 'order_price',
      align: 'center' as AlignType,
      width: 180,
      render: (order_price: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            $ {order_price}
          </span>
        </div>
      ),
    },
    {
      title: "Delivery charge",
      className: 'cursor-pointer',
      dataIndex: 'sum_price',
      key: 'sum_price',
      align: 'center' as AlignType,
      width: 180,
      render: (sum_price: any) => (
        <div className="flex items-center font-medium justify-center">
          <span className="truncate text-center">
            $ {sum_price}
          </span>
        </div>
      ),
    },
    {
      title: "Sum price",
      className: 'cursor-pointer',
      dataIndex: 'ukupna_cena',
      key: 'ukupna_cena',
      align: 'center' as AlignType,
      width: 180,
      render: function Render(ukupna_cena:any, record: any) {
        return <div className="flex items-center font-medium justify-center">
           <span className="truncate text-center">
             $ {(Number(record.ukupna_cena) + Number(record.order_price)).toFixed(2)}
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
          data={[chefOrder]}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
};

export default ChefOrder;
