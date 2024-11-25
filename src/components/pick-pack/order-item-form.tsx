import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { CheckMark } from '../icons/checkmark';
import Button from '../ui/button';
import { useModalAction } from '../ui/modal/modal.context';
import { EditIcon } from '../icons/edit';
import { TrashIcon } from '../icons/trash';
import Input from '../ui/input';
import { useForm } from 'react-hook-form';
import { CloseFillIcon } from '../icons/close-fill';
import { productClient } from '@/data/client/product';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
type IProps = {
  groupOrder: any;
};

const OrderItemForm = ({ groupOrder }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const { openModal } = useModalAction();
  const [orderInfo, setOrderInfo] = useState(groupOrder);
  let columns = [
    {
      title: 'Item name',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      render: function Render(id: any, record: any) {
        return (
          <div className="flex items-start font-medium justify-start">
            <span className="truncate text-start">
              {record?.product?.item_name}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Package',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 130,
      render: function Render(id: any, record: any) {
        return (
          <div className="flex items-start font-medium justify-start">
            <span className="truncate text-start">
              {record?.productItem?.package}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'prodajna_kolicina',
      key: 'prodajna_kolicina',
      align: alignLeft as AlignType,
      width: 130,
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 50,
      render: (id: number) => {
        return (
          <button
            type="button"
            onClick={() => {
              editOrderItem(id);
            }}
          >
            <EditIcon width={20} />
          </button>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft as AlignType,
      width: 50,
      render: (id: number) => {
        return (
          <button
            type="button"
            onClick={() => {
              openModal('DELETE_ORDER_ITEM', {
                orderItemId: id,
                orderId: orderInfo.order_id,
              });
            }}
          >
            <TrashIcon width={20} color="red" />
          </button>
        );
      },
    },
  ];
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      pallet_cost: groupOrder.pallet_cost,
      tax: groupOrder.tax,
    },
  });

  useEffect(() => {
    setOrderInfo(groupOrder);
  }, [groupOrder]);

  const handleForm = async (data: any) => {
    data['orderId'] = orderInfo.order_id;
    const result = await productClient.savePalletTax(data);
    if (result) {
      toast.success('Saved successfully');
    }
  };

  const approveOrder = async () => {
    const result = await productClient.approveOrder(orderInfo.order_id);
    if (result) {
      toast.success('Order approved successfully');
      setOrderInfo({ ...orderInfo, flag_approved: 0 });
    }
  };

  const editOrderItem = async (orderItemId: any) => {
    const result = await productClient.getOrderItem(orderItemId);
    openModal('EDIT_ORDER_ITEM', result);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate>
      {orderInfo && (
        <>
          <div className="flex items-center justify-between p-2 flex-col xl:flex-row overflow-x-auto bg-white">
            <div className="flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
              <div className="w-fit w-max-[100px]">
                <div className="font-medium text-[#428BCA]">Order date</div>
                <div className="font-base text-[#292c2f]">
                  {orderInfo?.datum_porudzbine}
                </div>
              </div>
              <div className="w-fit w-max-[100px]">
                <div className="font-medium text-[#428BCA]">Scheduled date</div>
                <div className="font-base text-[#292c2f]">
                  {orderInfo?.date_for_list}
                </div>
              </div>
              {/* <div className="w-fit w-max-[120px]">
                <div className="font-medium text-[#428BCA]">
                  Delivery option
                </div>
                <div className="font-base text-[#292c2f]">
                  {orderInfo?.delivery_option == 1
                    ? 'Delivery is not free &nbsp;<b>($100.00)</b>'
                    : orderInfo?.delivery_option == 2
                    ? 'Pick up at facility by call'
                    : '-'}
                </div>
              </div> */}
              <div className="w-fit w-max-[150px]">
                <div className="font-medium text-[#428BCA]">Status</div>
                {orderInfo?.flag_approved == 0 && (
                  <div className="font-base text-[#292c2f] flex gap-1 item-center justify-center">
                    <CheckMark width={20} height={20} color="green" />
                    Approved
                  </div>
                )}
                {orderInfo?.flag_approved == 1 && (
                  <div className="font-base text-[#292c2f] flex gap-1 item-center justify-center">
                    <CloseFillIcon width={20} height={20} color="red" />
                    Not approved
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-3 flex-wrap md:flex-nowrap">
              {orderInfo?.flag_approved == 0 && (
                <Button
                  type="button"
                  className="bg-opacity-0 border-2 border-black-500 text-red-500 gap-3 w-[100px]"
                  disabled
                >
                  <span>Approved</span>
                </Button>
              )}
              {orderInfo?.flag_approved == 1 && (
                <Button
                  type="button"
                  className="bg-opacity-0 border-2 border-black-500 text-red-500 gap-3 w-[100px]"
                  onClick={approveOrder}
                >
                  <span>Approve</span>
                </Button>
              )}
              <Button
                type="button"
                className="bg-opacity-0 border-2 border-black-500 text-black-500 gap-3 w-[150px]"
                onClick={() => {
                  openModal('NEW_ORDER_ITEM', orderInfo.order_id);
                }}
              >
                <span>New order item</span>
              </Button>
              <a
                href={`/print/print-pack-list?orderId=${orderInfo.order_id}&tip=1`}
                className="w-full h-12 md:w-auto md:ms-6"
                target="_blank"
              >
                <Button
                type="button"
                className="bg-opacity-0 border-2 border-orange-500 text-orange-500 gap-3 w-[150px]"
              >
                <span>Original list</span>
              </Button>
              </a>
              <a
                href={`/print/print-pack-list?orderId=${orderInfo.order_id}&tip=2`}
                className="w-full h-12 md:w-auto md:ms-6"
                target="_blank"
              >
                <Button
                  type="button"
                  className="bg-opacity-0 border-2 border-green-500 text-green-500 gap-3 w-[100px]"
                >
                  <span>Pack list</span>
                </Button>
              </a>
              <Button
                type="button"
                className="bg-red-500 border-none  text-white gap-3 w-[100px]"
                onClick={() => {
                  openModal('DELETE_ORDER', orderInfo.order_id);
                }}
              >
                <span>Delete</span>
              </Button>
            </div>
          </div>
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
            data={orderInfo?.orderItems}
            rowKey="id"
            scroll={{ x: 1000 }}
          />
          <div className="flex items-center justify-end gap-3 p-2 flex-col xl:flex-row overflow-x-auto bg-white">
            <div className="w-fit w-max-[100px]">
              <Input
                label="Pallet cost"
                {...register(`pallet_cost`)}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div className="w-fit w-max-[100px]">
              <Input
                label="Tax"
                {...register(`tax`)}
                variant="outline"
                className="mb-5"
              />
            </div>
            <Button className="bg-opacity-0 border-2 border-black-500 text-black-500 w-[100px] mt-2">
              <span>Save</span>
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default OrderItemForm;
