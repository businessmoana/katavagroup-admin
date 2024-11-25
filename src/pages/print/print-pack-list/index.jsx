import PrintPackList from './print';
import { useEffect, useState } from 'react';
import { printClient } from '@/data/client/print';

export default function PrintPackListPage() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const orderId = params.get('orderId');
  const tip = params.get('tip');
  const [list, setList] = useState();
  useEffect(()=>{
    if(orderId){
      getPackList();
    }
  },[orderId, tip])

  const getPackList = async() =>{
    const result = await printClient.getPackList(orderId, tip)
    if(result){
      let groupList = [];
      result.itemDetail.forEach((item, index) => {
        let indexOf = groupList.findIndex(
          (e) => e.category == item.product.sifKategorija.naziv,
        );
        if (indexOf !== -1) {
          groupList[indexOf].items.push(item);
        } else {
          groupList.push({
            category: item.product.sifKategorija.naziv,
            items: [item],
          });
        }
      });
      let list = {
        orderDetail:result.orderDetail,
        itemDetail:groupList
      }
      setList(list);
    }
  }

  return <>{list&&<PrintPackList list={list} tip={tip} />}</>;
}
