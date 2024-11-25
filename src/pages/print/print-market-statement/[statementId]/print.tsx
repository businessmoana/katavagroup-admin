import text from '../../constant/text.json';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';
export default function PrintInvoice({ invoice }: { invoice: any }) {
  const [pdfOutput, setPdfOutput] = useState('');
  const [generating, setGenerating] = useState(true);

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

      #table_info {
        width: 100%;
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
        margin-top: 20px;
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
        background-color: orange;
      }
      table {
        border-spacing: 0px;
      }
       
    </style>
    `;
    tempDiv.innerHTML = `
      ${styles}
      <div style="width: 210mm; padding: 10mm; box-sizing: border-box;" class="exclude-tailwind">
        <table id="table_info" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <table cellspacing="0" cellpadding="2">
                  <tbody>
                    <tr><td>${invoice.sushi.company_name}</td></tr>
                    <tr><td>${invoice.sushi.address}</td></tr>
                    <tr><td>${invoice.sushi.place}</td></tr>
                    <tr><td>${invoice.sushi.company_phone}</td></tr>
                  </tbody>
                  <tbody>
                    <tr><td>&nbsp;</td></tr>
                    <tr><td>&nbsp;</td></tr>
                  </tbody>
                  <tbody>
                    <td style="font-weight: bolder;">${text.txt_bill_to}:</td>
                    <tr><td>${invoice.market.company_name}</td></tr>
                    <tr><td>${invoice.market.company_address}</td></tr>
                    <tr><td>${invoice.market.place}</td></tr>
                    <tr><td>${invoice.market.company_phone}</td></tr>
                  </tbody>
                </table>
              </td>
              <td align="right">
                <table cellspacing="0" cellpadding="10">
                  <tbody>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000; font-weight: bolder;">${
                        text.txt_date
                      }</td>
                      <td>${invoice.zaglavlje?.statement_date}</td>
                    </tr>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000; font-weight: bolder;">${
                        text.txt_for
                      }</td>
                      <td><i>${text.txt_sushi_services}</i></td>
                    </tr>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000; font-weight: bolder;">${
                        text.txt_start
                      }</td>
                      <td>${invoice.zaglavlje?.start_date}</td>
                    </tr>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000; font-weight: bolder;">${
                        text.txt_end
                      }</td>
                      <td>${invoice.zaglavlje?.end_date}</td>
                    </tr>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000; font-weight: bolder;">${
                        text.txt_location
                      }</td>
                      <td>${invoice.zaglavlje?.location?.locations}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="table_list" cellspacing="0" cellpadding="2">
          <tbody>
            <tr class="tr_background">
              <th width="50%" colspan="2">${text.txt_description}</th>
              <th width="10%">${text.txt_weekly_sales}</th>
              <th width="10%">${text.txt_period_sales}</th>
              <th width="8%">${text.txt_commission}</th>
              <th width="10%">${text.txt_subtotal}</th>
              <th width="12%">${text.txt_total}</th>
            </tr>
            ${invoice.salesDetail
              ?.map(
                (salesItems: any) => `
              ${salesItems.salesItems
                ?.map(
                  (salesItem: any, index:any) => `
              <tr>
                  <td >${salesItem.description}</td>
                  <td >${salesItem.end_date_item}</td>
                  <td align="center">$${parseFloat(salesItem.sales).toFixed(2,)}</td>
                  ${index==0?`<td rowspan="${salesItems.items_count}" align="center">$${parseFloat(salesItems.sum_sales,).toFixed(2)}</td>`:''}
                  <td align="center">${salesItem.commission}%</td>
                  <td align="center">$${salesItem.amount}</td>
                  ${index==0?`<td rowspan="${salesItems.items_count}" align="center">$${parseFloat(salesItems.sum_amount,).toFixed(2)}</td>`:''}
              </tr>
            `,
                )
                .join('')}`,
              )
              .join('')}
              <tr>
                <td colspan="6" style="border:none"></td>
                <td align="center"><b>$${invoice.salesDetail?.map((salesItems: any) => parseFloat(salesItems.sum_amount))
                .reduce((sum: any, a: any) => sum + a, 0)
                .toFixed(2)}</b></td>
              </tr>
          </tbody>
        </table>
      </div>
    `;
    const footerHeight = 10;
    const bottomMargin = footerHeight + 15;
    const pageHeight = doc.internal.pageSize.height;
    doc.html(tempDiv, {
      callback: function (doc) {
        const pageCount = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);

          doc.addImage(
            `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/media/logo_za_liste_sushi.jpg`,
            'JPEG',
            10,
            5,
            70,
            15,
          );

          const headerText = ` ${text.txt_statement_u}`;
          doc.setFontSize(15);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 100, 100);
          doc.text(headerText, 180, 15, {
            align: 'center',
          });

          const footerText1 = ` ${text.txt_footer_ms_1} ${invoice.sushi?.company_phone}, ${invoice.sushi?.company_email}`;
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText1, 10, pageHeight - bottomMargin);

          const footerText2 = `${text.txt_footer_ms_2}`;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText2, 100, pageHeight - footerHeight, {
            align: 'center',
          });

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
      margin: [25, 0, 35, 0],
      html2canvas: {
        scale: 0.265,
      },
      autoPaging: true,
    });
  };

  useEffect(() => {
    generatePDF();
  }, [invoice, generating]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {pdfOutput && !generating && (
        <iframe
          src={pdfOutput}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Invoice PDF"
        />
      )}
    </div>
  );
}
