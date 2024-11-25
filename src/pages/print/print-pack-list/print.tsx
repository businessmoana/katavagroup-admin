import text from '../constant/text.json';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';
export default function PrintMarketInvoice({ list, tip }: { list: any, tip:any }) {
  const [pdfOutput, setPdfOutput] = useState('');
  const [generating, setGenerating] = useState(true);
  console.log(list)
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    });
    const tempDiv = document.createElement('div');
    const styles = `
    <style>
      * {
      font-size: 12px;
      line-height:1;
      }
      
      #table_header {
        width: 100%;
        font-size: 20px;
      }

      #table_info {
        width: 100%;
        margin-top:20px;
        font-size: 13px;
      }

      #table_info_1 {
        width: 100%;
        margin-top: 20px;
        font-size: 13px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
      }

      #table_info_2 {
        width: 100%;
        font-size: 13px;
        text-align: center;
        border-bottom: 1px solid #000;
      }

      #table_list {
        width: 100%;
        margin-top: 5px;
        font-size: 12px;
        border-collapse: collapse;
      }

      #table_list tr th {
        border: 1px solid #000;
      }

      #table_list tr td {
        border: 1px solid #000;
      }

      .tr_background {
        background-color: #f5f0f0;
      }

      #table_footer {
        width: 100%;
        margin-top: 100px;
        font-size: 13px;
        border-top: 1px solid #000;
      }
      table {
        border-spacing: 0px;
      }
       
    </style>
    `;
    tempDiv.innerHTML = `
      ${styles}
      <div style="width: 210mm; padding: 10mm; box-sizing: border-box;" class="exclude-tailwind">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div>
            <img src="${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/media/logo_za_liste_sushi.jpg" alt="logo" style="width: 240px; height: auto;" />
          </div>
          <div style="font-size: 16px; font-weight: 400;">${tip==1?text.txt_original_list:text.txt_product_packing_list_m}</div>
          <div style="font-size: 16px; font-weight: 400;">${list?.orderDetail?.location?.location_name!}-${list?.orderDetail?.datum_porudzbine!}</div>
        </div>
        ${list?.itemDetail?.map((item:any)=>`
              <div style="margin-top:15px; font-size:15px; font-weight:700;">${item.category}</div>
              <table id="table_list" cellspacing="0" cellpadding="2">
                <tbody>
                  <tr class="tr_background">
                    <th width="20%">${text.txt_item_number}</th>
                    <th width="30%">${text.txt_item_name}</th>
                    <th width="20%">${text.txt_package}</th>
                    <th width="20%">${text.txt_item_brand}</th>
                    <th width="10%">${text.txt_quantity}</th>
                  </tr>
                  ${item?.items?.map((item:any)=>`
                    <tr>
                      <td align="right" width="20%">${item?.product?.item_number}</td>
                      <td width="30%">${item?.product?.item_name}</td>
                      <td width="20%">${item?.productItem?.package}</td>
                      <td width="20%">${item?.product?.item_brand}</td>
                      <td align="right" width="10%">${item?.kolicina}</td>
                    </tr>
                  `,).join('')}
                </tbody>
              </table>
          `,).join('')}
        
      </div>
    `;
    const footerHeight = 10;
    const bottomMargin = footerHeight + 15;
    const pageHeight = doc.internal.pageSize.height;
    doc.html(tempDiv, {
      callback: function (doc) {
        const pageCount = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
          const footerText3 = `(${i})`;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText3, 200, pageHeight - footerHeight, {
            align: 'center',
          });
        }

        const pdfOutput = doc.output('bloburi');
        //@ts-ignore
        setPdfOutput(pdfOutput);
        setGenerating(false);
      },
      margin: [0, 0, 35, 0],
      html2canvas: {
        scale: 0.265,
      },
      autoPaging: true,
    });
  };

  useEffect(() => {
    generatePDF();
  }, [list, generating]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {pdfOutput && !generating && (
        <iframe
          src={pdfOutput}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="list PDF"
        />
      )}
    </div>
  );
}
