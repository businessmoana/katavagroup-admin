import { AlignType, Table } from '@/components/ui/table';
import Accordion from '../ui/accordion';
import { useIsRTL } from '@/utils/locals';
import { NoDataFound } from '../icons/no-data-found';
import { useTranslation } from 'react-i18next';
type IProps = {
  groupInvoices: any;
};

const CombinedInvoiceList = ({ groupInvoices }: IProps) => {
  const { alignLeft, alignRight } = useIsRTL();
  const { t } = useTranslation();

  let columns = [
    {
      title: 'Item Brand',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      render: (id: any, record: any) => (
        <div>
          {record?.product?.item_brand}
        </div>
      ),
    },
    {
      title: 'Item Name',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      render: (id: any, record: any) => (
        <div>
          {record?.product?.item_name}
        </div>
      ),
    },
    {
      title: 'Item Number',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      render: (id: any, record: any) => (
        <div>
          {record?.product?.item_number}
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: alignLeft as AlignType,
      width: 130,
    },
    {
      title: 'Per price',
      dataIndex: 'price',
      key: 'price',
      align: alignLeft as AlignType,
      width: 130,
    },
    {
      title: 'Sum price',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      render: (id: any, record: any) => (
        <div>
          {(parseFloat(record?.price) * parseFloat(record?.quantity)).toFixed(2)}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        {groupInvoices.map((subGroupInvoice: any, indexOfSubGroup: any) => {
          return (
            <Accordion
              buttonTitle={subGroupInvoice.location_name}
              defaultOpen={false}
              key={indexOfSubGroup}
            >
              <Table
                columns={columns}
                emptyText={() => (
                  <div className="flex flex-col items-center py-7">
                    <NoDataFound className="w-52" />
                    <div className="mb-1 pt-6 text-base font-semibold text-heading">
                      {t('table:empty-table-data')}
                    </div>
                    <p className="text-[13px]">
                      {t('table:empty-table-sorry-text')}
                    </p>
                  </div>
                )}
                data={subGroupInvoice?.orderItems}
                rowKey="id"
                scroll={{ x: 1000 }}
              />
            </Accordion>
          );
        })}
      </div>
    </>
  );
};

export default CombinedInvoiceList;
