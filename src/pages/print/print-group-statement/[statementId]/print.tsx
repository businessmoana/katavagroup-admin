import text from '../../constant/text.json';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';
export default function PrintChefStatement({ invoice }: { invoice: any }) {
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
    let total = 0;
    if (invoice?.orderDetails.length){
      invoice?.orderDetails?.map((orderItem:any)=>{
        total-=parseFloat(orderItem.sales)
      })
    }
    invoice.salesDetails?.map((salesDetail: any) => {
      salesDetail?.salesItems?.map((salesItem: any) => {
        if (salesItem.amount) total += parseFloat(salesItem.amount);
      })
    });
    invoice.otherDetails?.map((otherDetail: any) => {
      otherDetail?.salesItems?.map((salesItem: any) => {
        if (salesItem.amount) total += parseFloat(salesItem.amount);
      })
    });
    console.log(total);
    const styles = `
    <style>
      * {
      font-size: 12px;
      line-height:1.3;
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
        background-color: yellow;
      }

      #table_footer {
        width: 100%;
        margin-top: 100px;
        font-size: 13px;
        border-top: 1px solid #000;
      }

      #table_footer_1 tr td {
        border: 1px solid #000;
      }

      #table_footer_2 {
        width: 100%;
        background-color: #EBF1DE;
      }

      #table_footer_2 tr td {
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
      }

      #tr_background_footer {
        background-color: #D8E4BC;
      }

      .table_price {
        width: 100%;
      }

      .table_price tr td {
        border: none !important;
      }

      #table_footer_3 {
        width: 100%;
        text-align: center;
        font-size: 13px;
      }

      table {
        border-spacing: 0px;
      }
       
    </style>
    `;
    tempDiv.innerHTML = `
      ${styles}
      <div style="width: 210mm; padding: 10mm; box-sizing: border-box;" class="exclude-tailwind">
        <table id="table_header">
          <tbody>
            <tr>
              <td width="50%" align="left">
                <img src="${
                  process.env.NEXT_PUBLIC_REST_API_ENDPOINT
                }/media/logo_za_meni.png" alt="logo" style="width: 240px; height: auto;" />
              </td>
            </tr>
            <tr>
              <td width="50%" align="left">
                <img src="${
                  process.env.NEXT_PUBLIC_REST_API_ENDPOINT
                }/media/logo_za_liste_sushi.jpg" alt="logo" style="width: 240px; height: auto;margin-top:10px" />
              </td>
              <td width="50%" align="right" style="color: rgb(128,128,128);">
                <span style="font-size: 20px; font-weight: 700;">${
                  text.txt_statement_u
                }</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="table_info" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <table cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr><td>${text.txt_katava_naziv}</td></tr>
                    <tr><td>${invoice.sushi.address}</td></tr>
                    <tr><td>${invoice.sushi.place}</td></tr>
                    <tr><td>${invoice.sushi.company_phone}</td></tr>
                  </tbody>
                  <tbody>
                    <tr><td>&nbsp;</td></tr>
                  </tbody>
                  <tbody>
                    <td style="font-weight: bolder;">${
                      text.txt_statement_for
                    }:</td>
                    <tr><td>${invoice.locationDetail[0].chef_name}</td></tr>
                    <tr><td>${invoice.locationDetail[0].company_name}</td></tr>
                  </tbody>
                  <tbody>
                    <tr><td>&nbsp;</td></tr>
                  </tbody>
                  <tbody>
                  ${invoice.locationDetail
                    ?.map(
                      (location: any) => `
                    <tr><td><b>${location.location_name}</b></td></tr>
                    <tr><td>${location.location_address}</td></tr>
                  `,
                    )
                    .join('')}
                    <tr><td>&nbsp;</td></tr>
                  </tbody>
                </table>
              </td>
              <td align="right">
                <table cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000; font-weight: bolder;padding-right:5px;">${
                        text.txt_date
                      }</td>
                      <td style="padding-left:4px">${invoice.locationDetail[0]
                        ?.approved_date}</td>
                    </tr>
                    <tr>
                      <td style="border-right: 1px solid #000; font-weight: bolder;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000;padding-right:5px;"><b>${
                        text.txt_for
                      }</b></td>
                      <td style="padding-left:4px">${
                        text.txt_sushi_services
                      }</td>
                    </tr>
                     <tr>
                      <td align="right" style="border-right: 1px solid #000;padding-right:5px;"><b>${
                        text.txt_start
                      }</b></td>
                      <td style="padding-left:4px">${invoice.locationDetail[0]
                        ?.start_date}</td>
                    </tr>
                     <tr>
                      <td align="right" style="border-right: 1px solid #000;padding-right:5px;"><b>${
                        text.txt_end
                      }</b></td>
                      <td style="padding-left:4px">${invoice.locationDetail[0]
                        ?.end_date}</td>
                    </tr>
                     <tr>
                      <td style="border-right: 1px solid #000; font-weight: bolder;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="right" style="border-right: 1px solid #000;padding-right:5px;"><b>${
                        text.txt_location
                      }</b></td>
                      <td style="padding-left:4px">${invoice.locationDetail
                        ?.map((location: any) => `${location.location_name} `)
                        .join('')}</td>
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
              <th width="64%">${text.txt_description}</th>
              <th width="12%">${text.txt_sales}</th>
              <th width="12%">${text.txt_commission}</th>
              <th width="12%">${text.txt_amount}</th>
            </tr>
            ${invoice.salesDetails
              ?.map(
                (salesDetail: any) => `${salesDetail?.salesItems
                  ?.map(
                    (salesItem: any) => `
                  <tr>
                    <td>
                      <table class="table_description" cellspacing="0" cellpadding="0" style="width:100%">
                        <tr style="display:flex; justify-content: space-between;width:100%">
                          <td style="border:none">${salesItem?.description!}</td>
                          <td align="right" style="border:none;">${
                            salesItem?.start_date_item
                              ? salesItem?.start_date_item
                              : ''
                          }&nbsp;&nbsp;&nbsp;${
                            salesItem?.end_date_item
                              ? salesItem?.end_date_item
                              : ''
                          }</td>
                        </tr>
                      </table>
                    </td>
                    <td align="center">$${parseFloat(salesItem.sales).toFixed(2)}</td>
                    <td align="center">${salesItem.commission}%</td>
                    <td align="center">$${parseFloat(salesItem.amount).toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join('')}
              `,
              )
              .join('')}
              ${invoice.orderDetails
                ?.map(
                  (orderItem: any) => `
              <tr>
                <td>
                  <table class="table_description" cellspacing="0" cellpadding="0" style="width:100%">
                    <tr style="display:flex; justify-content: space-between;width:100%">
                      <td style="border:none">${orderItem.description!}</td>
                      <td align="right" style="border:none;">${orderItem.date_period!}</td>
                    </tr>
                  </table>
                </td>
                <td align="center">-$${parseFloat(orderItem.sales!).toFixed(2)}</td>
                <td align="center">${orderItem.commission!}%</td>
                <td align="center">-$${parseFloat(orderItem.sales!).toFixed(2)}</td>
              </tr>
            `,
                )
                .join('')}
            ${invoice.otherDetails
              ?.map((otherDetail: any) => `${otherDetail?.salesItems
                  ?.map(
                    (salesItem: any) => `
                <tr>
                  <td>
                    <table class="table_description" cellspacing="0" cellpadding="0" style="width:100%">
                      <tr style="display:flex; justify-content: space-between;width:100%">
                        <td style="border:none">${salesItem.description}</td>
                        <td align="right" style="border:none;">${
                          salesItem.date_period
                        }</td>
                      </tr>
                    </table>
                  </td>
                  <td align="center">$${parseFloat(salesItem.sales).toFixed(2)}</td>
                  <td align="center">${salesItem.commission}%</td>
                  <td align="center">$${parseFloat(salesItem.amount).toFixed(2)}</td>
                </tr>
              `,
                  )
                  .join('')}
              `,
              )
              .join('')}
             <tr>
              <td colspan="2" style="border:none"></td>
              <td align="center"><b>${text.txt_total}</b></td>
              <td align="center"><b>$${total.toFixed(2)}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    const footerHeight = 10;
    const bottomMargin = footerHeight + 5;
    const pageHeight = doc.internal.pageSize.height;
    doc.html(tempDiv, {
      callback: function (doc) {
        const pageCount = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          const footerText1 = ` ${text.txt_footer_cs_1} ${invoice.sushi?.company_phone} ${text.txt_footer_cs_or} ${text.txt_katava_mejl}`;
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText1, 20, pageHeight - bottomMargin);

          const footerText2 = `${text.txt_footer_cs_2}`;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText2, 105, pageHeight - footerHeight, {
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
      margin: [0, 0, 25, 0],
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
