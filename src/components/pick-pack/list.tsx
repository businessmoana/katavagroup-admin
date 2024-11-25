import Accordion from '../ui/accordion';
import OrderItemForm from './order-item-form';
type IProps = {
  groupOrders: any;
};

const PickPackOrderList = ({ groupOrders }: IProps) => {
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        {groupOrders.map((subGroupOrders: any, indexOfSubGroup: any) => {
          return (
            <Accordion
              buttonTitle={subGroupOrders.location_name}
              defaultOpen={false}
              key={indexOfSubGroup}
            >
              {subGroupOrders.value.map((groupOrder: any, index: any) => {
                return (
                  <OrderItemForm
                    groupOrder={groupOrder}
                    key={index}
                  ></OrderItemForm>
                );
              })}
            </Accordion>
          );
        })}
      </div>
    </>
  );
};

export default PickPackOrderList;
