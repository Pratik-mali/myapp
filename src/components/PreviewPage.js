import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { pdf } from '@react-pdf/renderer';
import './PreviewPage.css';
import PDFDocument from './PDFDocument'; // Adjust the path as needed

const PreviewPage = () => {
  const location = useLocation();
  const { formData, templateId: initialTemplateId, imagePreview, centerText, additionalImage } = location.state;
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const canvasRef = useRef(null);

  const getBackgroundImage = useCallback(() => {
    switch (templateId) {
      case "1":
        return "Marriage Biodata Template-01.png";
      case "2":
        return "Marriage Biodata Template-02.png";
      case "3":
        return "Marriage Biodata Template-03.png";
      case "4":
        return "Marriage Biodata Template-04.png";
      case "5":
        return "Marriage Biodata Template-05.png";
      case "6":
        return "Marriage Biodata Template-06.png";
      case "7":
        return "Marriage Biodata Template-07.png";
      case "8":
        return "Marriage Biodata Template-08.png";
      case "9":
        return "Marriage Biodata Template-09.png";
      case "10":
        return "Marriage Biodata Template-10.png";
      case "11":
        return "Marriage Biodata Template-11.png";
      case "12":
        return "Marriage Biodata Template-12.png";
      case "13":
        return "Marriage Biodata Template-13.png";
      case "14":
        return "Marriage Biodata Template-14.png";
      case "15":
        return "Marriage Biodata Template-15.png";
      case "16":
        return "Marriage Biodata Template-16.png";
      case "17":
        return "Marriage Biodata Template-17.png";
      case "18":
        return "Marriage Biodata Template-18.png";
      default:
        return "border.png";
    }
  }, [templateId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = getBackgroundImage();

    const loadBackgroundImage = () => {
      canvas.width = 595; // A4 width in points (8.27 inches * 72 DPI)
      canvas.height = 900; // A4 height in points (11.69 inches * 72 DPI)

      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      ctx.font = '15px Sans-serif';
      ctx.fillStyle = 'black';

      let x = 100;
      let y = 120;
      const lineHeight = 23;

      const drawText = (label, value) => {
        ctx.fillText(`${label}:`, x, y);
        const valueX = x + 150;
        const stringValue = String(value);
        const words = stringValue.split(' ');
        let line = '';
        for (let word of words) {
          const testLine = line + word + ' ';
          const { width } = ctx.measureText(testLine);
          if (width > canvas.width - valueX - 50) {
            ctx.fillText(line, valueX, y);
            y += lineHeight;
            line = word + ' ';
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, valueX, y);
        y += lineHeight;
      };

      if (imagePreview) {
        const image = new Image();
        image.src = imagePreview;
        image.onload = () => {
          const imgX = (canvas.width - 50) / 2;
          const imgY = 40;
          ctx.drawImage(image, imgX, imgY, 50, 50);
          y = 80;
        };
      }

      if (additionalImage) {
        const image = new Image();
        image.src = additionalImage;
        image.onload = () => {
          const imgX = (canvas.width - 50) / 2;
          const imgY = 80;
          ctx.drawImage(image, imgX, imgY, 50, 50);
          y = 80;
        };
      }

      if (centerText) {
        ctx.font = '14px Sans-serif';
        ctx.fillText(centerText, (canvas.width - ctx.measureText(centerText).width) / 2, y);
        y += lineHeight + 1;
      }

      for (const [key, value] of Object.entries(formData)) {
        const title = value.title || key; // Use the title if provided, otherwise use the key
        switch (key) {
          case 'नाव':
            drawText(title, value.value);
            break;
          case 'जन्मतारीख':
            drawText(title, `${value.day}-${value.month}-${value.year}`);
            break;
          case 'जन्मवेळ':
            drawText(title, `${value.period} ${value.hour}वा.${value.minute}मि.`);
            break;
          case 'बायोडेटाप्रकार':
            drawText(title, value.value);
            break;
          case 'बहीण':
          case 'भाऊ':
          case 'मामा':
          case 'चूलते':
          case 'दाजी':
            drawText(title, value.map(item => item.value).join(', '));
            break;
          default:
            if (value && value.value) {
              drawText(title, value.value);
            }
            break;
        }
      }

      console.log('Text drawn successfully.');
    };

    if (backgroundImage.complete) {
      loadBackgroundImage();
    } else {
      backgroundImage.onload = loadBackgroundImage;
    }

    backgroundImage.onerror = (error) => {
      console.error('Error loading background image:', error);
    };
    ctx.onerror = (error) => {
      console.error('Error drawing text on canvas:', error);
    };
  }, [formData, templateId, getBackgroundImage, imagePreview, centerText, additionalImage]);

  const downloadPDF = (withWatermark) => {
    const canvas = canvasRef.current;
    const pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

    if (withWatermark) {
      pdf.setTextColor(150);
      pdf.setFontSize(30);
      pdf.text('Watermark', canvas.width / 2, canvas.height / 2, {
        align: 'center',
        baseline: 'middle'
      });
    }

    pdf.save('download.pdf');
  };

  const handlePaymentAndDownload = async () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_1BKUN7TysPDAk4',
      amount: 100,
      currency: 'INR',
      name: 'Your Company',
      description: 'Download PDF without watermark',
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        downloadPDFWithoutWatermark();
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Your Address'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const downloadPDFWithoutWatermark = async () => {
    const pdfBlob = await pdf(<PDFDocument formData={formData} templateId={templateId} additionalImage={additionalImage} imagePreview={imagePreview} />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download.pdf';
    a.click();
  };

  return (
    <div className="preview-container">
      <h1>Preview for Template {templateId}</h1>
      <canvas ref={canvasRef} />
      <div className="buttons-container">
        <button onClick={() => downloadPDF(true)}>Download with Watermark</button>
        <button onClick={handlePaymentAndDownload}>Remove Watermark and Download</button>
      </div>
      <div className="template-selection">
        <img
          src="/Marriage Biodata Template-01.png"
          alt="Template 1"
          className={`template-thumbnail ${templateId === '1' ? 'selected' : ''}`}
          onClick={() => setTemplateId('1')}
        />
        <img
          src="/Marriage Biodata Template-02.png"
          alt="Template 2"
          className={`template-thumbnail ${templateId === '2' ? 'selected' : ''}`}
          onClick={() => setTemplateId('2')}
        />
        <img
          src="/Marriage Biodata Template-03.png"
          alt="Template 3"
          className={`template-thumbnail ${templateId === '3' ? 'selected' : ''}`}
          onClick={() => setTemplateId('3')}
        />
        {/* Add more template images here */}
      </div>
    </div>
  );
};

export default PreviewPage;
