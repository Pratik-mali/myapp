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
      case "19":
        return "Marriage Biodata Template-19.png";
      case "20":
        return "Marriage Biodata Template-20.png";
      case "21":
        return "Marriage Biodata Template-21.png";
      case "22":
        return "Marriage Biodata Template-22.png";
      case "23":
        return "Marriage Biodata Template-23.png";
      case "24":
        return "Marriage Biodata Template-24.png";
      case "25":
        return "Marriage Biodata Template-25.png";
      case "26":
        return "Marriage Biodata Template-26.png";
      case "27":
        return "Marriage Biodata Template-27.png";

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
        const lineHeight = 18;

        const drawText = (label, value) => {
          if (!value || value === "") return; // Skip if value is empty
      
          // Replace underscores with spaces
          const formattedLabel = label.replace(/_/g, ' ');
          const formattedValue = String(value).replace(/_/g, ' ');
      
          ctx.fillText(`${formattedLabel}`, x, y);
          const valueX = x + 115;
          const stringValue = `: ${formattedValue}`;
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
      

        const drawHeading = (heading) => {
            ctx.font = 'bold 16px Sans-serif';
            ctx.fillStyle = 'orange';
            const textWidth = ctx.measureText(heading).width;
            ctx.fillText(heading, (canvas.width - textWidth) / 2, y);
            y += lineHeight ;
            ctx.font = '15px Sans-serif'; // Reset to normal font
            ctx.fillStyle = 'black'; // Reset to black color
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
              // Define the maximum dimensions for the resized image
              const maxWidth = 180;
              const maxHeight = 180;
      
              // Get the original dimensions of the image
              const originalWidth = image.width;
              const originalHeight = image.height;
      
              // Calculate the aspect ratio
              const aspectRatio = originalWidth / originalHeight;
      
              let newWidth, newHeight;
      
              if (originalWidth > originalHeight) {
                  // Landscape orientation
                  newWidth = maxWidth;
                  newHeight = maxWidth / aspectRatio;
              } else {
                  // Portrait or square orientation
                  newHeight = maxHeight;
                  newWidth = maxHeight * aspectRatio;
              }
      
              // Positioning the image
              const imgX = (canvas.width - newWidth) - 60;
              const imgY = 220;
      
              // Draw the resized image on the canvas
              ctx.drawImage(image, imgX, imgY, newWidth, newHeight);
      
              // Set the border properties
              const borderWidth = 2;
              ctx.strokeStyle = 'black';
              ctx.lineWidth = borderWidth;
      
              // Draw the border around the image
              ctx.strokeRect(imgX, imgY, newWidth, newHeight);
          };
      }
      

        if (centerText) {
            ctx.font = 'bold 16px Sans-serif';
            ctx.fillStyle = 'orange';
            ctx.fillText(centerText, (canvas.width - ctx.measureText(centerText).width) / 2, y);
            y += lineHeight + 1;

            ctx.fillText('बायोडाटा', (canvas.width - ctx.measureText('बायोडाटा').width) / 2, y);
            y += lineHeight - 5;
            ctx.font = '15px Sans-serif'; // Reset to normal font
            ctx.fillStyle = 'black'; // Reset to black color
        }

        // Draw sections with headings
        const sections = [
            {keys : ['नाव','जन्मतारीख', 'जन्मवेळ', 'जन्मस्थान', 'जन्मनाव', 'धर्म', 'जात', 'कुलदैवत', 'देवक', 'गोत्र', 'नक्षत्र', 'रास', 'गण', 'नाडी', 'ऊंची', 'रंग', 'रक्तगट','शिक्षण', 'नोकरी', 'पगार', 'इतर_माहिती'  ]},
            { heading: 'कौटुंबिक माहिती', keys: ['वडिलांचे_नाव', 'वडिलांचा_व्यवसाय', 'आईचे_नाव','बहीण', 'भाऊ', 'मामा', 'चूलते', 'दाजी', 'नातेसंबंध', 'इतर'] },
            { heading: 'संपर्क', keys: ['पत्ता', 'मोबाईल_नं'] },
            // Add more sections as needed
        ];

        for (const section of sections) {
            let sectionDrawn = false;
            for (const key of section.keys) {
                const value = formData[key];
                if (value) {
                    if (!sectionDrawn) {
                      if(!(section.heading === undefined)){
                        drawHeading(section.heading);
                        sectionDrawn = true;
                      }
                    }
                    const title = value.title || key;
                    switch (key) {
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
}, [formData, templateId, getBackgroundImage, imagePreview, additionalImage, centerText]);

  
  

  const downloadPDF = (withWatermark) => {
    const canvas = canvasRef.current;
    const pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

    if (withWatermark) {
      pdf.setTextColor(150);
      pdf.setFontSize(60);
      
    
      pdf.text('mazabiodata.com', canvas.width / 2 +10, canvas.height / 2 +10, {
        align: 'center',
        baseline: 'middle',
        rotate: 30
      });
    }

    const userName = formData['नाव']?.value || 'download';
    pdf.save(`${userName}_बायोडाटा.pdf`);
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
    const pdfBlob = await pdf(<PDFDocument formData={formData} templateId={templateId} additionalImage={additionalImage} imagePreview={imagePreview} centerText={centerText}/>).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    const userName = formData['नाव']?.value || 'download';
    a.href = url;
    a.download = `${userName}_बायोडाटा.pdf`;
    a.click();
    setLoading(false);
  };

  const templates = Array.from({ length: 27 }, (_, i) => i + 1);
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
        <button onClick={() => downloadPDF(true)}>वॉटरमार्कसह साधारण डाउनलोड</button>
        <button onClick={handlePaymentAndDownload}>उच्च क्वालिटी डाउनलोड</button>
        <button onClick={handleEditClick}>माहिती दुरुस्त करा</button>
      </div>
      <div className="template-selection">
      {templates.map((id) => (
        <img
          key={id}
          src={`/Marriage Biodata Template-${id < 10 ? `0${id}` : id}.png`}
          alt={`Template ${id}`}
          className={`template-thumbnail ${templateId === `${id}` ? 'selected' : ''}`}
          onClick={() =>  setTemplateId(`${id}`)}
        />
      ))}
        
        {/* Add more template images here */}
      </div>
    </div>
  );
};

export default PreviewPage;
