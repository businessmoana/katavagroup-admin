import { usePrintInvoiceQuery } from '@/data/print';
import { useRouter } from 'next/router';
import PrintInvoice from './print';
import { useEffect, useState } from 'react';
import { printClient } from '@/data/client/print';
export default function PrintMarketStatementPage() {
  const { query, locale } = useRouter();
  const [invoice,setInvoice] = useState();
  useEffect(()=>{
    if(query.statementId){
      getStatementDetail();
    }
  },[query.statementId])

  const getStatementDetail = async() =>{
    const result = await printClient.getMarketStatement(query.statementId)
    console.log(result)
    if(result)
      setInvoice(result);
  }
  return (
    <>{invoice&&<PrintInvoice invoice={invoice} />}</>
  );
}