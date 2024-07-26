import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { pdf } from '@react-pdf/renderer';
import './PreviewPage.css';
import PDFDocument from './PDFDocument'; // Adjust the path as needed

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, templateId: initialTemplateId, imagePreview, centerText, additionalImage } = location.state;
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const getBackgroundImage = useCallback(() => {
    switch (templateId) {
      case '1':
        return 'Marriage Biodata Template-01.png';
      case '2':
        return 'Marriage Biodata Template-02.png';
      case '3':
        return 'Marriage Biodata Template-03.png';
      default:
        return 'border.png';
    }
  }, [templateId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = getBackgroundImage();

    const loadBackgroundImage = () => {
      canvas.width = 595;
      canvas.height = 900;
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
          const imgX = (canvas.width - 200) - 20;
          const imgY = 180;
          ctx.drawImage(image, imgX, imgY, 200, 200);
          y = 80;
        };
      }

      if (centerText) {
        ctx.font = '14px Sans-serif';
        ctx.fillText(centerText, (canvas.width - ctx.measureText(centerText).width) / 2, y);
        y += lineHeight + 1;

        ctx.fillText('Biodata', (canvas.width - ctx.measureText(centerText).width) / 2 + 25, y);
        y += lineHeight + 1;
      }

      for (const [key, value] of Object.entries(formData)) {
        const title = value.title || key;
        switch (key) {
          case 'नाव':
            drawText(title, value.value);
            break;
          case 'जन्मतारीख':
            drawText(title, `${value.varr} ${value.day}-${value.month}-${value.year}`);
            break;
          case 'जन्मवेळ':
            drawText(title, `${value.period} ${value.hour} वा.${value.minute} मि.`);
            break;
          case 'बहीण':
          case 'भाऊ':
          case 'मामा':
          case 'चूलते':
          case 'दाजी':
            if (value.some(item => item.value)) {
              drawText(title, value.map(item => item.value).join(', '));
            }
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

    const userName = formData['नाव']?.value || 'download';
    pdf.save(`${userName}_biodata.pdf`);
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
    setLoading(true);
    const pdfBlob = await pdf(<PDFDocument formData={formData} templateId={templateId} additionalImage={additionalImage} imagePreview={imagePreview} />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    const userName = formData['नाव']?.value || 'download';
    a.href = url;
    a.download = `${userName}_biodata.pdf`;
    a.click();
    setLoading(false);
  };

  const handleEditClick = () => {
    navigate('/input-form/1', {
      state: {
        initialFormData: formData,
        imagePreview,
        centerText,
        additionalImage,
        templateId
      }
    });
  };

  return (
    <div className="preview-container">
      <h1>Preview for Template {templateId}</h1>
      <canvas ref={canvasRef} />
      {loading && <div className="loading-overlay">Loading...</div>}
      <div className="buttons-container">
        <button onClick={() => downloadPDF(true)}>Download with Watermark</button>
        <button onClick={handlePaymentAndDownload}>Remove Watermark and Download</button>
        <button onClick={handleEditClick}>Edit Data</button>
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
