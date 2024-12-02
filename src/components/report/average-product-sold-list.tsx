import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';

type IProps = {
  dataList: any;
};

const AverageProductSoldList = ({ dataList }: IProps) => {
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
      title: 'Total Sales',
      dataIndex: 'totalSale',
      key: 'totalSale',
      align: alignLeft as AlignType,
      width: 130,
      render: (totalSale: any) => <div>${totalSale}</div>,
    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: alignLeft as AlignType,
      width: 130,
    },
    {
      title: 'Average',
      dataIndex: 'location_name',
      key: 'location_name',
      align: alignLeft as AlignType,
      width: 130,
      render: (location_name: any, record: any) => (
        <>
          {record.totalQuantity != 0 && (
            <div>${(record.totalSale / record.totalQuantity).toFixed(2)}</div>
          )}
        </>
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

export default AverageProductSoldList;
