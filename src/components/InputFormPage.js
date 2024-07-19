import React, { useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TransliterationInput from "./TransliterationInput";
import "./InputFormPage.css";

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
    नाव: { value: "", type: "text", titleOptions: ["नाव", "मुलाचे नाव", "मुलीचे नाव"] },
    जन्मतारीख: { day: "", month: "", year: "", type: "date", titleOptions: ["जन्मतारीख", "जन्मदिनांक"] },
    जन्मवेळ: { hour: "", minute: "", period: "", type: "time" },
    जन्मस्थान: { value: "", type: "text", titleOptions: ["जन्म स्थळ", "जन्म ठिकाण"] },

    जन्मनाव: { value: "", type: "text", titleOptions: ["जन्मनाव", "नावरस नाव", "रास नाव"] },
    धर्म: { value: "", type: "text", titleOptions: ["धर्म"] },
    जात: { value: "", type: "text", titleOptions: ["जात"] },
    कुलदैवत: { value: "", type: "text", titleOptions: ["कुलदैवत"] },
    गोत्र: { value: "", type: "select", titleOptions: ["गोत्र"] },
    नक्षत्र: { value: "", type: "select", titleOptions: ["नक्षत्र"] },
    राशी: { value: "", type: "select", titleOptions: ["राशी"] },
    गण: { value: "", type: "select", titleOptions: ["गण"] },
    नाडी: { value: "", type: "select", titleOptions: ["नाडी"] },
    ऊंची: { value: "", type: "select", titleOptions: ["ऊंची"] },
    रंग: { value: "", type: "select", titleOptions: ["रंग", "वर्ण"] },
    रक्तगट: { value: "", type: "select", titleOptions: ["रक्तगट"] },
    शिक्षण: { value: "", type: "text", titleOptions: ["शिक्षण"] },
    नोकरी: { value: "", type: "text", titleOptions: ["नोकरी"] },
    पगार: { value: "", type: "text", titleOptions: ["पगार", "वेतन" , "उत्पन्न"] },
    वडिलांचे_नाव: { value: "", type: "text", titleOptions: ["वडिलांचे_नाव"] },
    वडिलांचा_व्यवसाय: { value: "", type: "text", titleOptions: ["वडिलांचा_व्यवसाय"] },
    आईचे_नाव: { value: "", type: "text", titleOptions: ["आईचे_नाव"] },
    बहीण: [{ value: "", type: "text", titleOptions: ["बहीण"] }],
    भाऊ: [{ value: "", type: "text", titleOptions: ["भाऊ"] }],
    मामा: [{ value: "", type: "text", titleOptions: ["मामा"] }],
    दाजी: [{ value: "", type: "text", titleOptions: ["दाजी"] }],
    चूलते: [{ value: "", type: "text", titleOptions: ["चूलते"] }],
    नातेसंबंध: { value: "", type: "text", titleOptions: ["नातेसंबंध"] },
    पत्ता: { value: "", type: "text", titleOptions: ["पत्ता"] },
    संपर्क: { value: "", type: "tel", titleOptions: ["संपर्क"] },
  });
  

  const [imagePreview, setImagePreview] = useState("/ganesha.png");
  const [additionalImage, setAdditionalImage] = useState(null);
  const [centerText, setCenterText] = useState("|| श्री गणेशाय नम: ||");
  const [missingFields, setMissingFields] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const predefinedImages = [
    "/ganesha.png",
    "/lakshmi.png",
    "/bismillah.png",
    "/christ.png",
    "/ganesha.png"
  ];
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split("-");

    if (subfield) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], [subfield]: value },
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
    const { value } = e.target;
  
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[field]];
      updatedArray[index] = { ...updatedArray[index], value };
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
  

  const handleAdditionalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = Object.entries(formData)
      .filter(([key]) => !["चूलते", "दाजी", "भाऊ", "बहीण", "मामा"].includes(key))
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
  const varr = ["सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार"];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["पहाटे", "सकाळ", "दुपार", "संध्याकाळ", "रात्र"];

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
    राशी: ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"],
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
    <input type="file" accept="image/*" onChange={handleImageChange} />
    <button type="button" onClick={() => setIsPopupOpen(true)}>Select from predefined images</button>
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
          <div className="additional-image-upload">
            <label htmlFor="additionalImageUpload" className="image-label">
              Upload Photograph
            </label>
            <input type="file" id="additionalImageUpload" onChange={handleAdditionalImageChange} />
          </div>
        </div>
        
        {Object.entries(formData).map(([field, fieldData]) => {
          const titleOptions = fieldData.titleOptions || [field];
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

                  />
                </div>
              </>
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
                        handleArrayChange(
                          { target: { value } },
                          index,
                          field
                        )
                      }
                    placeholder={titleOptions[0]}

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
          } else if (fieldData.type === "select" && selectOptions[field]) {
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

                />
              </div>
            );
          }
        })}
        <button type="submit">Preview</button>
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