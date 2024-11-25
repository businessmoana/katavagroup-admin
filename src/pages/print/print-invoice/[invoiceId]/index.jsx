import { usePrintInvoiceQuery } from '@/data/print';
import { useRouter } from 'next/router';
import PrintInvoice from './print';
import { useEffect, useState } from 'react';
import { printClient } from '@/data/client/print';
export default function PrintInvoicePage() {
  const { query, locale } = useRouter();
  // const { invoice,loading } = usePrintInvoiceQuery(query.invoiceId);
  const [invoice,setInvoice] = useState();
  console.log(invoice)
  useEffect(()=>{
    if(query.invoiceId){
      getInvoiceDetail();
    }
  },[query.invoiceId])

  const getInvoiceDetail = async() =>{
    const result = await printClient.getInvoice(query.invoiceId)
    if(result)
      setInvoice(result);
  }
  return (
    <>{invoice&&<PrintInvoice invoice={invoice} />}</>
  );
}