import { usePrintInvoiceQuery } from '@/data/print';
import { useRouter } from 'next/router';
import PrintMarketInvoice from './print';
import { useEffect, useState } from 'react';
import { printClient } from '@/data/client/print';
export default function PrintInvoicePage() {
  const { query, locale } = useRouter();
  const [invoice,setInvoice] = useState();
  useEffect(()=>{
    if(query.invoiceId){
      getInvoiceDetail();
    }
  },[query.invoiceId])

  const getInvoiceDetail = async() =>{
    const result = await printClient.getMarketInvoice(query.invoiceId)
    console.log(result)
    if(result)
      setInvoice(result);
  }
  return (
    <>{invoice&&<PrintMarketInvoice invoice={invoice} />}</>
  );
}