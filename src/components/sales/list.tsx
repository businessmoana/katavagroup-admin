import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { SortOrder } from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Button from '../ui/button';
import { useModalAction } from '../ui/modal/modal.context';
import { CloseFillIcon } from '../icons/close-fill';
import { CheckMarkCircle } from '../icons/checkmark-circle';
import { salesClient } from '@/data/client/sales';
import { toast } from 'react-toastify';

type IProps = {
  sales: any;
  intervalId: any | undefined;
  dateInterval?: any | undefined;
};
const SalesList = ({ sales, intervalId, dateInterval }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();
  const [tableData, setTableData] = useState(sales);

  useEffect(() => {
    setTableData(sales);
  }, [sales]);
  // const approveSales = async (salesId: number) => {
  //   let result = await salesClient.approveSales(salesId);
  //   if (result) {
  //     toast.success('Approved successfully');
  //     setTableData(
  //       (prevData: any) =>
  //         prevData?.map((item: any) =>
  //           item.s_id === salesId ? { ...item, flag_approved: 0 } : item,
  //         ),
  //     );
  //   }
  // };

  let columns = [
    {
      title: 'Location Name',
      dataIndex: 'location_name',
      key: 'location_name',
      align: alignLeft as AlignType,
      width: 130,
    },
    {
      dataIndex: 's_id',
      key: 's_id',
      align: alignLeft as AlignType,
      width: 50,
      render: (s_id: number, record: any) => {
        return (
          <Button
            onClick={() => {
              openModal('UPDATE_OR_CREATE_SALES', {
                salesId: record.s_id,
                locationId: record.l_id,
                locationName: record.location_name,
                intervalId: intervalId,
                interval: dateInterval,
              });
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      dataIndex: 's_id',
      key: 's_id',
      align: alignLeft as AlignType,
      width: 50,
      render: (s_id: number, record: any) => {
        return (
          <div>
            {s_id != 0 && (
              <a
                href={`/print/print-market-invoice/${s_id}`}
                className="w-full h-12 md:w-auto md:ms-6"
                target="_blank"
              >
                <Button className="bg-opacity-0 border border-green-700 text-grey gap-3">
                  Invoice
                </Button>
              </a>
            )}
            {s_id == 0 && (
              <Button
                disabled
                className="bg-opacity-0 border border-green-700 text-grey gap-3"
              >
                Invoice
              </Button>
            )}
          </div>
        );
      },
    },
    {
      dataIndex: 's_id',
      key: 's_id',
      align: alignLeft as AlignType,
      width: 50,
      render: (s_id: number, record: any) => {
        return (
          <div
            onClick={() => {
              openModal('DELETE_SALES', s_id);
            }}
          >
            {s_id != 0 && (
              <Button className="bg-red-600 hover:bg-red-500 border border-red-700 text-white gap-3">
                Delete
              </Button>
            )}
            {s_id == 0 && (
              <Button
                disabled
                className="border border-red-700 text-gray gap-3"
              >
                Delete
              </Button>
            )}
          </div>
        );
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
          data={tableData}
          rowKey="s_id"
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
};

export default SalesList;
