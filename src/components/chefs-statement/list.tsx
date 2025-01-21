import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
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
  list: any[] | undefined;
  intervalId: any | undefined;
};
const ChefsStatementList = ({ list, intervalId }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();
  const [tableData, setTableData] = useState(list);

  useEffect(() => {
    setTableData(list);
  }, [list]);

  const approveSales = async (salesId: number) => {
    let result = await salesClient.approveSales(salesId);
    if (result) {
      toast.success('Approved successfully');
      setTableData(
        (prevData) =>
          prevData?.map((item) =>
            item.s_id === salesId ? { ...item, flag_approved: 0 } : item,
          ),
      );
    }
  };

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
      key: 'update',
      align: alignLeft as AlignType,
      width: 50,
      render: (s_id: number, record: any) => {
        return (
          <Button
            onClick={() => {
              openModal('UPDATE_OR_CREATE_CHEFS_STATEMENT', {
                salesId: record.s_id,
                locationId: record.l_id,
                locationName: record.location_name,
                intervalId: intervalId,
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
      key: 'approve',
      align: alignLeft as AlignType,
      width: 50,
      render: (s_id: number, record: any) => {
        return (
          <>
            <div
              onClick={() => {
                approveSales(s_id);
              }}
              className="w-fit"
            >
              {s_id != 0 && record?.flag_approved == 0 && (
                <Button disabled>
                  <CheckMarkCircle width={16} color="green" />
                  Approved
                </Button>
              )}
              {s_id != 0 && record?.flag_approved != 0 && (
                <Button className="bg-opacity-0 border border-green-700 text-grey gap-3">
                  <CloseFillIcon width={16} color="red" />
                  Approve
                </Button>
              )}
              {s_id == 0 && (
                <Button disabled>
                  <CloseFillIcon width={16} color="red" opacity={0.5} />
                  Approve
                </Button>
              )}
            </div>
          </>
        );
      },
    },
    {
      dataIndex: 's_id',
      key: 'statement',
      align: alignLeft as AlignType,
      width: 50,
      render: (s_id: number, record: any) => {
        return (
          <>
            {s_id != 0 && (
              <a
                href={`/print/print-chef-statement/${s_id}`}
                className="w-full h-12 md:w-auto md:ms-6"
                target="_blank"
              >
                <Button>Statement</Button>
              </a>
            )}
            {s_id == 0 && (
              <a className="w-full h-12 md:w-auto md:ms-6">
                <Button
                  disabled
                  className="bg-opacity-0 border border-green-700 text-grey gap-3"
                >
                  Statement
                </Button>
              </a>
            )}
          </>
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
          scroll={{ x: 10 }}
        />
      </div>
    </>
  );
};

export default ChefsStatementList;
