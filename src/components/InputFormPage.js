import React, { useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TransliterationInput from "./TransliterationInput";
import "./InputFormPage.css";
import ImageCropComponent from "./ImageCropComponent";

const InputFormPage = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const location = useLocation();
  const initialFormData = location.state?.initialFormData; // Ensure this line exists and correctly references the passed state
  console.log(initialFormData);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  
  }, []);
  
  const [formData, setFormData] = useState(initialFormData || {
    नाव: { value: "", type: "text", titleOptions: ["नाव", "मुलाचे नाव", "मुलीचे नाव"],  restrictNumbers: true },
    जन्मतारीख: { day: "", month: "", year: "", varr:"", type: "date", titleOptions: ["जन्मतारीख", "जन्मदिनांक"] },
    जन्मवेळ: { hour: "", minute: "", period: "", type: "time" },
    जन्मस्थान: { value: "", type: "text", titleOptions: ["जन्म स्थळ", "जन्म ठिकाण"] },

    जन्मनाव: { value: "", type: "text", titleOptions: ["जन्मनाव", "नावरस नाव", "रास नाव"], restrictNumbers: true },
    धर्म: { value: "", type: "text", titleOptions: ["धर्म"], restrictNumbers: true },
    जात: { value: "", type: "text", titleOptions: ["जात"], restrictNumbers: true },
    कुलदैवत: { value: "", type: "text", titleOptions: ["कुलदैवत"],restrictNumbers: true },
    देवक: { value: "", type: "text", titleOptions: ["देवक"],restrictNumbers: true },

    गोत्र: { value: "", type: "select", titleOptions: ["गोत्र"] },
    नक्षत्र: { value: "", type: "select", titleOptions: ["नक्षत्र"] },
    रास: { value: "", type: "select", titleOptions: ["रास"] },
    गण: { value: "", type: "select", titleOptions: ["गण"] },
    नाडी: { value: "", type: "select", titleOptions: ["नाडी"] },
    ऊंची: { value: "", type: "select", titleOptions: ["ऊंची"] },
    रंग: { value: "", type: "select", titleOptions: ["रंग", "वर्ण"] },
    रक्तगट: { value: "", type: "select", titleOptions: ["रक्तगट"] },
    शिक्षण: { value: "", type: "text", titleOptions: ["शिक्षण"] },
    नोकरी: { value: "", type: "text", titleOptions: ["नोकरी", "व्यवसाय"] },
    पगार: { value: "", type: "number", titleOptions: ["पगार", "वेतन" , "उत्पन्न"] },
    इतर_माहिती: { value: "", type: "text", titleOptions: ["इतर_माहिती"] },

    वडिलांचे_नाव: { value: "", type: "text", titleOptions: ["वडिलांचे_नाव"], restrictNumbers: true },
    वडिलांचा_व्यवसाय: { value: "", type: "text", titleOptions: ["वडिलांचा_व्यवसाय"] },
    आईचे_नाव: { value: "", type: "text", titleOptions: ["आईचे_नाव"], restrictNumbers: true },
    बहीण: [{ value: "", type: "text", titleOptions: ["बहीण"], maritalStatus: "", restrictNumbers: true }],
    भाऊ: [{ value: "", type: "text", titleOptions: ["भाऊ"], maritalStatus: "", restrictNumbers: true }],
    मामा: [{ value: "", type: "text", titleOptions: ["मामा"], restrictNumbers: true }],
    दाजी: [{ value: "", type: "text", titleOptions: ["दाजी"], restrictNumbers: true }],
    चूलते: [{ value: "", type: "text", titleOptions: ["चूलते"], restrictNumbers: true  }],
    नातेसंबंध: { value: "", type: "text", titleOptions: ["नातेसंबंध"], restrictNumbers: true  },
    इतर: { value: "", type: "text", titleOptions: ["इतर"] },

    पत्ता: { value: "", type: "text", titleOptions: ["पत्ता"] },
    मोबाईल_नं: { value: "", type: "number", titleOptions: ["मोबाईल_नं"] },
    
  });
  

  const [imagePreview, setImagePreview] = useState("/ganesha.png");
  const [additionalImage, setAdditionalImage] = useState(null);
  const [centerText, setCenterText] = useState("|| श्री गणेशाय नम: ||");
  const [missingFields, setMissingFields] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const predefinedImages = [
    "/lakshmi.png",
    "/bismillah.png",
    "/christ.png",
  ];
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split("-");
  
    if (subfield) {
      const updatedField = { ...formData[field], [subfield]: value };
  
      // Check if we need to calculate the weekday
      if (subfield === "day" || subfield === "month" || subfield === "year") {
        const { day, month, year } = updatedField;
  
        if (day && month && year) {
          const monthIndex = monthIndexMap[month];
          if (monthIndex !== undefined) {
            const date = new Date(year, monthIndex, day); // Month is zero-based in JS Date
            const weekdays = ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
            updatedField.varr = weekdays[date.getDay()];
          } else {
            updatedField.varr = "";
          }
        } else {
          updatedField.varr = "";
        }
      }
  
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedField,
      }));
    } else if (Array.isArray(formData[field])) {
      const updatedArray = [...formData[field]];
      updatedArray[subfield] = { ...updatedArray[subfield], value };
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedArray,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], value },
      }));
    }
  };
  
const handleArrayChange = (e, index, field) => {
  const { name, value } = e.target;
  
  // Check if 'name' is defined
  if (!name) {
    console.error("Name attribute is missing.");
    return;
  }

  // Extract key from name
  const nameParts = name.split('-');

  // Ensure name has expected parts
  if (nameParts.length < 3) {
    console.error("Name attribute format is incorrect.");
    return;
  }

  const key = nameParts[2];

  setFormData((prevFormData) => {
    const updatedArray = [...prevFormData[field]];
    const currentItem = updatedArray[index];

    if (key === 'maritalStatus') {
      // Update the maritalStatus field
      updatedArray[index] = { 
        ...currentItem, 
        maritalStatus: value,
        value: currentItem.value ? `${currentItem.value} (${value})` : `(${value})`
      };
    } else {
      // Update other fields
      updatedArray[index] = { ...currentItem, [key]: value };
    }

    return { ...prevFormData, [field]: updatedArray };
  });
};

  
  
  

  const handleAddField = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...prevFormData[field], { value: "", type: "text" }],
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleDeleteField = (field, index) => {
    setFormData((prevFormData) => {
      const updatedArray = prevFormData[field].filter((_, i) => i !== index);
      return { ...prevFormData, [field]: updatedArray };
    });
  };
  

  const handleAdditionalImageChange = (croppedImage) => {
    // croppedImage is now a base64 image (Data URL)
    if (croppedImage) {
      const byteString = atob(croppedImage.split(',')[1]); // Decode base64 to byte string
      const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0]; // Extract mime type
  
      const arrayBuffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }
  
      const file = new Blob([arrayBuffer], { type: mimeString }); // Convert byte string to Blob object (similar to a file)
  
   
      // Create a URL for the cropped image and set it
      setAdditionalImage(URL.createObjectURL(file));
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = Object.entries(formData)
      .filter(([key]) => !["चूलते", "दाजी", "भाऊ", "बहीण", "मामा", "गण" ,"गोत्र", 'इतर_माहिती', 'इतर', 'पगार'].includes(key))
      .map(([key, value]) => {
        if (value.type === "date") {
          return {
            key,
            isValid: value.day && value.month && value.year
          };
        } else if (value.type === "time") {
          return {
            key,
            isValid: value.hour && value.minute && value.period
          };
        } else {
          return {
            key,
            isValid: !!value.value
          };
        }
      });

    const missing = requiredFields.filter(field => !field.isValid).map(field => field.key);
    if (missing.length > 0) {
      setMissingFields(missing);
    } else {
      const completeFormData = {
        ...formData
        
      };
      navigate("/preview", {
        state: {
          formData: completeFormData,
          templateId,
          imagePreview,
          additionalImage,
          centerText,
        },
      });
    }
  };

  const handleArrayChangee = (e, index, field) => {
    const { value } = e.target;
  
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[field]];
      updatedArray[index] = { ...updatedArray[index], value };
      return { ...prevFormData, [field]: updatedArray };
    });
  };

  const handleTransliterationChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value },
    }));
  };

  

  const getBackgroundImage = () => {
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
        return "Ma1rriage Biodata Template-16.png";
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
        return "default-bg.png";
    }
  };

  const backgroundImage = getBackgroundImage();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "जानेवारी",
    "फेब्रुवारी",
    "मार्च",
    "एप्रिल",
    "मे",
    "जून",
    "जुलै",
    "ऑगस्ट",
    "सप्टेंबर",
    "ऑक्टोबर",
    "नोव्हेंबर",
    "डिसेंबर",
  ];

  const monthIndexMap = {
    "जानेवारी": 0,
    "फेब्रुवारी": 1,
    "मार्च": 2,
    "एप्रिल": 3,
    "मे": 4,
    "जून": 5,
    "जुलै": 6,
    "ऑगस्ट": 7,
    "सप्टेंबर": 8,
    "ऑक्टोबर": 9,
    "नोव्हेंबर": 10,
    "डिसेंबर": 11,
  };
  const varr = ["सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार"];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["पहाटे", "सकाळी", "दुपारी", "संध्याकाळी", "रात्री"];

  const selectOptions = {
    रंग: ["गोरापान", "गोरा", "गहूवर्णीय", "सावळा", "काळा"],
    रक्तगट: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    ऊंची: [
      "4 फूट 4 इंच",
      "4 फूट 5 इंच",
      "4 फूट 6 इंच",
      "4 फूट 7 इंच",
      "4 फूट 8 इंच",
      "4 फूट 9 इंच",
      "4 फूट 10 इंच",
      "4 फूट 11 इंच",
      "5 फूट 0 इंच",
      "5 फूट 1 इंच",
      "5 फूट 2 इंच",
      "5 फूट 3 इंच",
      "5 फूट 4 इंच",
      "5 फूट 5 इंच",
      "5 फूट 6 इंच",
      "5 फूट 7 इंच",
      "5 फूट 8 इंच",
      "5 फूट 9 इंच",
      "5 फूट 10 इंच",
      "5 फूट 11 इंच",
      "6 फूट 0 इंच",
      "6 फूट 1 इंच",
      "6 फूट 2 इंच",
      "6 फूट 3 इंच",
      "6 फूट 4 इंच",
      "6 फूट 5 इंच",
      "6 फूट 6 इंच",
      "6 फूट 7 इंच",
      "6 फूट 8 इंच" 
  ],
    नाडी: ["आदि", "मध्य", "अन्त्य"],
    गण: ["देव", "मनुष्य", "राक्षस"],
    रास: ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"],
    नक्षत्र: ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्रेषा", "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी", "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूला", "पूर्वाषाढा", "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शततारका", "पूर्वाभाद्रपद", "उत्तराभाद्रपद", "रेवती"],
    गोत्र: ["कश्यप", "भारद्वाज", "अत्रि", "वशिष्ठ", "विश्वामित्र", "जमदग्नि", "गौतम", "शांडिल्य"],
    };

  return (
    <div
      className="input-form-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      
    >
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-header">
        <div className="image-preview">
    <img src={imagePreview} alt="Preview" className="form-image" />
    <button type="button" onClick={() => setIsPopupOpen(true)}>आपल्या कुलदैवताचा फोटो</button>
  </div>

  {isPopupOpen && (
  <div className="image-popup">
    <div className="image-popup-content">
      <button type="button" className="close-popup" onClick={() => setIsPopupOpen(false)}>X</button>
      {predefinedImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Predefined ${index}`}
          onClick={() => {
            setImagePreview(img);
            setIsPopupOpen(false);
          }}
          style={{ cursor: "pointer" }}
        />
      ))}
    <input type="file" accept="image/*" onChange={handleImageChange} />

    </div>
  </div>
)}
          <div className="center-text-input">
            <input
              type="text"
              id="centerText"
              value={centerText}
              onChange={(e) => setCenterText(e.target.value)}
              placeholder="Center Text"
            />
          </div>
          
        </div>
        
        {Object.entries(formData).map(([field, fieldData]) => {
          const titleOptions = fieldData.titleOptions || [field];
          const type = fieldData.type;
          const restrictNumbers = fieldData.restrictNumbers;


          if (Array.isArray(fieldData) && (field === "भाऊ" || field === "बहीण")) {
            return (
              <div key={field} className="multiple-input-container">
                {fieldData.map((item, index) => (
                  <div key={index} className="input-group">
                    <TransliterationInput
                      value={item.value}
                      onChange={(value) =>
                        handleArrayChange(
                          { target: { value, name: `${field}-${index}-value` } },
                          index,
                          field
                        )
                      }
                      placeholder={field}
                      inputType="text"
                      restrictNumbers={true}
                    />
                    <select
                      name={`${field}-${index}-maritalStatus`}
                      value={item.maritalStatus || ""}
                      onChange={(e) => handleArrayChange(e, index, field)}
                      className="elvish"
                    >
                      <option value="">Marital Status</option>
                      <option value="विवाहित">विवाहित</option>
                      <option value="अविवाहित">अविवाहित</option>
                      <option value="विधुर/विधवा">विधुर/विधवा</option>
                    </select>
                    {fieldData.length > 1 && (
                      <button
                        type="button"
                        className="add-button"
                        onClick={() => handleDeleteField(field, index)}
                      >
                        -
                      </button>
                    )}
                    {index === fieldData.length - 1 && (
                      <button
                        type="button"
                        className="add-button"
                        onClick={() => handleAddField(field)}
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            );
          }
          else if (Array.isArray(fieldData)) {
            return (
              <div key={field} className="multiple-input-container">
                {titleOptions.length > 1 ? (
                  <label>
                    <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                      {titleOptions.map((title, index) => (
                        <option key={index} value={title}>{title}</option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label>{titleOptions[0]}</label>
                )}
                {fieldData.map((item, index) => (
                  <div key={index} className="input-group">
                    <TransliterationInput
                      value={item.value}
                      onChange={(value) =>
                        handleArrayChangee(
                          { target: { value } },
                          index,
                          field
                        )
                      }
                    placeholder={titleOptions[0]}
                    inputType="text"
                    restrictNumbers={true}

                    />
                      {fieldData.length > 1 && (
              <button
                type="button"
                className="add-button"
                onClick={() => handleDeleteField(field, index)}
              >
                -
              </button>
            )}
            {index === fieldData.length - 1 && (
              <button
                type="button"
                className="add-button"
                onClick={() => handleAddField(field)}
              >
                +
              </button>
            )}
                  </div>
                ))}
              </div>
            );
          } 
          if (fieldData.type === "date") {
            return (
              <div key={field} className="form-group date-select">
              {titleOptions.length > 1 ? (
                <label>
                  <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                    {titleOptions.map((title, index) => (
                      <option key={index} value={title}>{title}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <label>{titleOptions[0]}</label>
              )}
              <div className="date-time-select">
                <select
                  name={`${field}-day`}
                  value={fieldData.day}
                  onChange={handleChange}
                >
                  <option value="">दिवस</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-month`}
                  value={fieldData.month}
                  onChange={handleChange}
                >
                  <option value="">महिना</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-year`}
                  value={fieldData.year}
                  onChange={handleChange}
                >
                  <option value="">वर्ष</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-varr`}
                  value={fieldData.varr}
                  onChange={handleChange}
                  disabled
                >
                  <option value="">वार</option>
                  {varr.map((varr, index) => (
                    <option key={index} value={varr}>
                      {varr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            );
          } else if (fieldData.type === "time") {
            return (
              <div key={field} className="form-group time-select">
                {titleOptions.length > 1 ? (
                  <label>
                    <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                      {titleOptions.map((title, index) => (
                        <option key={index} value={title}>{title}</option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label>{titleOptions[0]}</label>
                )}
                <div className="date-time-select">
                  <select
                    name={`${field}-hour`}
                    value={fieldData.hour}
                    onChange={handleChange}
                  >
                    <option value="">तास</option>
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <select
                    name={`${field}-minute`}
                    value={fieldData.minute}
                    onChange={handleChange}
                  >
                    <option value="">मिनिट</option>
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <select
                    name={`${field}-period`}
                    value={fieldData.period}
                    onChange={handleChange}
                  >
                    <option value="">प्रहर</option>
                    {periods.map((period, index) => (
                      <option key={index} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          } 
          else if (field === "वडिलांचे_नाव") {
            return (
              <>

<div className="section-heading">
                <h3 >कौटुंबिक माहिती</h3>
                </div>
                <div key={field} className="form-group">
                
                  {titleOptions.length > 1 ? (
                    <label>
                      <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                        {titleOptions.map((title, index) => (
                          <option key={index} value={title}>{title}</option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <label>{titleOptions[0]}</label>
                  )}
                  <TransliterationInput
                    value={fieldData.value}
                    onChange={(value) => handleTransliterationChange(field, value)}
                    placeholder={titleOptions[0]}
                    inputType={type}
                    restrictNumbers={restrictNumbers}
                  />
                </div>
              </>
            );
          }
          else if (field === "पत्ता") {
            return (
              <>
                <div className="section-heading">
                  <h3>संपर्क</h3>
                </div>
                <div key={field} className="form-group">
                  {titleOptions.length > 1 ? (
                    <label>
                      <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                        {titleOptions.map((title, index) => (
                          <option key={index} value={title}>{title}</option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <label>{titleOptions[0]}</label>
                  )}
                  <TransliterationInput
                    value={fieldData.value}
                    onChange={(value) => handleTransliterationChange(field, value)}
                    placeholder={titleOptions[0]}
                    inputType={type}
                    restrictNumbers={restrictNumbers}
                  
                  />
                </div>
              </>
            );
          }
          
          
          else if (fieldData.type === "select" && selectOptions[field]) {
            return (
              <div key={field} className="form-group">
                {titleOptions.length > 1 ? (
                  <label>
                    <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                      {titleOptions.map((title, index) => (
                        <option key={index} value={title}>{title}</option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label>{titleOptions[0]}</label>
                )}
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value=""> {field} निवडा</option>
                  {selectOptions[field].map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            );
          } else {

        
            
            return (
              <div key={field} className="form-group">
                {titleOptions.length > 1 ? (
                  <label>
                    <select name={`${field}-title`} value={fieldData.title} onChange={handleChange}>
                      {titleOptions.map((title, index) => (
                        <option key={index} value={title}>{title}</option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label>{titleOptions[0]}</label>
                )}
                <TransliterationInput
                  value={fieldData.value}
                  onChange={(value) => handleTransliterationChange(field, value)}
                  placeholder={titleOptions[0]}
                  inputType={type}
                  restrictNumbers={restrictNumbers}

                />
              </div>
            );
          }
        })}
        <div className="additional-image-upload">
            <label htmlFor="additionalImageUpload" className="image-label">
            <svg enable-background="new 0 0 32 32" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="#1c1c1c"><path d="m16 12c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 11c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/><path d="m28 9c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0 3c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"/><path d="m16 9c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 17c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/><path d="m30 7h-7v-2c0-1.105-.895-2-2-2h-10c-1.105 0-2 .895-2 2v2h-7c-1.105 0-2 .895-2 2v18c0 1.105.895 2 2 2h28c1.105 0 2-.895 2-2v-18c0-1.105-.895-2-2-2zm1 19c0 1.105-.895 2-2 2h-26c-1.105 0-2-.895-2-2v-16c0-1.105.895-2 2-2h7v-1-1c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v1 1h7c1.105 0 2 .895 2 2z"/></g></svg> तुमचा फोटो जोडा
              
            </label>
            <ImageCropComponent handleCroppedImageChange={handleAdditionalImageChange} />

          </div>
        <button type="submit" className="ssbutton">बायोडाटा पहा</button>
      </form>
      {missingFields.length > 0 && (
        <div className="popup">
          <p>Missing Fields </p>
       
       
            {missingFields.map((field, index) => (
              <p key={index}>{field},</p>
            ))}
  
          <button onClick={() => setMissingFields([])}>Close</button>
        </div>
      )}
    </div>
  );
  
};

export default InputFormPage;