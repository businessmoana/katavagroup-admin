import text from '../constant/text.json';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';
import styles from './style.module.css'; // Import your CSS module
import { usePrintChefQuery } from '@/data/print';

export default function PrintChef({chef}:{chef:any}) {
  const [loading, setLoading] = useState(true);
  const [pdfOutput, setPdfOutput] = useState('');
  const generatePDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = `
      <div style="display: flex; width: 100vw; height: 100vh;">
        <div class="${
          styles.container
        }" style="width: 210mm; max-width: 210mm; max-height: 290mm; padding: 10mm; box-sizing: border-box; height: 290mm; overflow: hidden;" id="pdf-wrapper">
          <div class="${styles.div_naslov}">${text.txt_list_chefs}</div>
          <table class="${styles.table_print}" cellPadding="3">
            <thead>
              <tr>
                <th>${text.txt_first_name_reg}</th>
                <th>${text.txt_last_name_reg}</th>
                <th>${text.txt_phone_n}</th>
                <th>${text.txt_user_role}</th>
              </tr>
            </thead>
            <tbody>
              ${chef.map(
                  (row:any) => `
                <tr>
                  <td>${row.first_name}</td>
                  <td>${row.last_name}</td>
                  <td>${row.phone_number}</td>
                  <td>${row.user_role}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    doc.html(tempDiv, {
      callback: function (doc) {
        const output = doc.output('bloburi');
        // @ts-ignore
        setPdfOutput(output); // Store the PDF output
        setLoading(false); // Set loading to false once PDF is generated
      },
      html2canvas: {
        scale: 0.265, // Adjust the scale for better quality
      },
    });
  };

  useEffect(() => {
    generatePDF(); // Automatically generate PDF after a timeout
  }, [chef]);

  return (
    <iframe
      src={pdfOutput}
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="PDF Output"
    />
  );
}
