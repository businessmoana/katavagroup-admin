import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';

type IProps = {
  dataList: any;
};

const InvoiceSalesList = ({ dataList }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  let columns = [
    {
      title: 'Location Name',
      dataIndex: 'location_name',
      key: 'location_name',
      align: alignLeft as AlignType,
      width: 130,
    },
    {
      title: 'Invoice',
      dataIndex: 'invoice_sales',
      key: 'invoice_sales',
      align: alignLeft as AlignType,
      width: 130,
      render: (invoice_sales: any) => <div>${invoice_sales}</div>,
    },
    {
      title: 'Sales',
      dataIndex: 'sales_items_sales',
      key: 'sales_items_sales',
      align: alignLeft as AlignType,
      width: 130,
      render: (sales_items_sales: any) => <div>${sales_items_sales}</div>,
    },
    {
      title: 'Percent',
      dataIndex: 'location_name',
      key: 'location_name',
      align: alignLeft as AlignType,
      width: 130,
      render: (location_name: any, record: any) => (
        <div>
          {((record.invoice_sales / record.sales_items_sales) * 100).toFixed(2)}
          %
        </div>
      ),
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
          data={dataList}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
};

export default InvoiceSalesList;
