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
    const formatDateWithSpaces = (dateString: any) => {
      return dateString.replace(/\//g, ' / ');
    };
    const tempDiv = document.createElement('div');
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
        background-color: #EBF1DE;
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
              <td width="50%" align="right" style="color: rgb(128,128,128);">
                <span style="font-size: 20px; font-weight: 700;">${
                  text.txt_customer_invoice_in
                }</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="table_info" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <table cellspacing="0" cellpadding="2">
                  <tbody>
                    <tr><td>${text.txt_katava_naziv}</td></tr>
                    <tr><td>${invoice.sushi.address}</td></tr>
                    <tr><td>${invoice.sushi.place}</td></tr>
                    <tr><td>${invoice.sushi.company_phone}</td></tr>
                  </tbody>
                </table>
              </td>
              <td align="right">
                <table cellspacing="0" cellpadding="10">
                  <tbody>
                    <tr>
                      <td style="border-right: 1px solid #000; font-weight: bolder;">${
                        text.txt_invoice_date_in
                      }</td>
                      <td>${invoice.orderDetails?.invoice_date}</td>
                    </tr>
                    <tr>
                      <td style="border-right: 1px solid #000;"><b>${
                        text.txt_invoice_number_u_in
                      } #</b></td>
                      <td>${invoice.orderDetails?.invoice_number}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="table_info_1" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td width="50%">
                <table cellspacing="0" cellpadding="2">
                  <tbody>
                    <tr><td><b>${text.txt_bill_to_in}:</b></td></tr>
                    <tr><td>${invoice.orderDetails?.company_name}</td></tr>
                    <tr><td>${invoice.orderDetails?.address}</td></tr>
                    <tr><td>${invoice.orderDetails?.company_phone}</td></tr>
                  </tbody>
                </table>
              </td>
              <td width="50%">
                <table cellspacing="0" cellpadding="2">
                  <tbody>
                    <tr><td><b>${text.txt_ship_to_in}:</b></td></tr>
                    <tr><td>${invoice.orderDetails?.location_name}</td></tr>
                    <tr><td>${invoice.orderDetails?.location_address}</td></tr>
                    <tr><td>${text.txt_attn_in}: ${invoice.orderDetails
                      ?.company_name}</td></tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="table_info_2" cellspacing="0" cellpadding="2">
          <tbody>
            <tr>
              <td width="50%"></td>
              <td width="16%"><b>${text.txt_ordered_date_in}</b><br />${formatDateWithSpaces(
                invoice.orderDetails?.order_date,
              )}</td>
              <td width="12%"><b>${text.txt_ship_date_in}</b><br />${formatDateWithSpaces(
                invoice.orderDetails?.ship_date,
              )}</td>
              <td width="10%"></td>
              <td width="12%"><b>${text.txt_terms_in}</b><br />${
                text.txt_regular_in
              }</td>
            </tr>
          </tbody>
        </table>
        <table id="table_list" cellspacing="0" cellpadding="2">
          <tbody>
            <tr class="tr_background">
              <th width="12%">${text.txt_category_in}</th>
              <th width="7%">${text.txt_item_in} #</th>
              <th width="32%">${text.txt_item_name_in}</th>
              <th width="18%">${text.txt_packing_size_in}</th>
              <th width="7%">${text.txt_qty_upper_in}</th>
              <th width="12%">${text.txt_item_price_in}</th>
              <th width="12%">${text.txt_extended_price_in}</th>
            </tr>
            ${invoice.orderDetails?.orderItems
              .map(
                (orderItem: any) => `
              <tr>
                <td>${orderItem.product.sifKategorija.kategorija_naziv}</td>
                <td>${orderItem.product.item_number}</td>
                <td>${orderItem.product.item_name}</td>
                <td align="center">${orderItem.productItem.package}</td>
                <td align="center">${orderItem.kolicina}</td>
                <td>
                  <div style="display:flex;justify-content:space-between;">
                    <div>$</div>
                    <div style="align-items:end;text-align:end;padding-right:0;">${orderItem.price.toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}</div>
                  </div>
                <td>
                  <div style="display:flex;justify-content:space-between;">
                    <div>$</div>
                    <div style="align-items:end;text-align:end;padding-right:0;">${orderItem.extended_price.toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}</div>
                  </div>
                </td>
              </tr>
            `,
              )
              .join('')}
            <tr class="tr_background">
              <td colspan="5"></td>
              <td align="center"><b>${text.txt_extended_amount_in}</b></td>
              <td>
                <b>
                  <div style="display:flex;justify-content:space-between;">
                    <div>$</div>
                    <div style="align-items:end;text-align:end;padding-right:0;">${invoice.orderDetails?.orderItems
                      .map((item: any) => parseFloat(item.extended_price))
                      .reduce((sum: any, a: any) => sum + a, 0)
                      .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </b>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="table_footer" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td width="64%">
                <div style="margin-top:-14px">${text.txt_footer_line_in}</div>
              </td>
              <td width="36%">
                <table id="table_footer_2" cellspacing="0" cellpadding="2">
                  <tbody>
                    <tr>
                      <td>${text.txt_subtotal_in}</td>
                      <td>
                        <div style="display:flex;justify-content:space-between;">
                          <div>$</div>
                          <div style="align-items:end;text-align:end;padding-right:0;">${invoice.orderDetails?.orderItems
                            .map((item: any) => parseFloat(item.extended_price))
                            .reduce((sum: any, a: any) => sum + a, 0)
                            .toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>${text.txt_shipping_in}</td>
                      <td><div style="display:flex;justify-content:space-between;">
                          <div>$</div>
                          <div style="align-items:end;text-align:end;padding-right:0;">${invoice.orderDetails?.shipping.toLocaleString(
                            'en-US',
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                          </div>
                        </div></td>
                    </tr>
                    <tr>
                      <td>${text.txt_pallet_cost_in}</td>
                      <td>
                        <div style="display:flex;justify-content:space-between;">
                          <div>$</div>
                          <div style="align-items:end;text-align:end;padding-right:0;">${invoice.orderDetails?.pallet_cost.toLocaleString(
                            'en-US',
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>${text.txt_tax_in}</td>
                      <td>
                        <div style="display:flex;justify-content:space-between;">
                          <div>$</div>
                          <div style="align-items:end;text-align:end;padding-right:0;">${invoice.orderDetails?.tax.toLocaleString(
                            'en-US',
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr id="tr_background_footer">
                      <td><b>${text.txt_total_in}</b></td>
                      <td>
                        <b>
                          <div style="display:flex;justify-content:space-between;">
                            <div>$</div>
                            <div style="align-items:end;text-align:end;padding-right:0;">${(
                              invoice.orderDetails?.orderItems
                                .map((item: any) =>
                                  parseFloat(item.extended_price),
                                )
                                .reduce((sum: any, a: any) => sum + a, 0) +
                              parseFloat(invoice.orderDetails?.shipping) +
                              parseFloat(invoice.orderDetails?.pallet_cost) +
                              parseFloat(invoice.orderDetails?.tax)
                            ).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            </div>
                          </div>
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
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
          const footerText1 = ` ${text.txt_footer_in_1} ${invoice.orderDetails?.company_phone} ${text.txt_footer_in_or} ${text.txt_katava_mejl}`;
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText1, 10, pageHeight - bottomMargin);

          const footerText2 = `${text.txt_footer_in_2}`;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText2, 100, pageHeight - footerHeight,{align:'center'});

          const footerText3 = `(${i})`;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(footerText3, 200, pageHeight - footerHeight,{align:'center'});
        }

        const pdfOutput = doc.output('bloburi');
        //@ts-ignore
        setPdfOutput(pdfOutput);
        setGenerating(false);
      },
      margin: [11, 0, 35, 0],
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
