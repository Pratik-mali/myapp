import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransliterationInput from "./TransliterationInput";
import "./InputFormPage.css";

const InputFormPage = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [formData, setFormData] = useState({
    नाव: { value: "", type: "text", titleOptions: ["नाव", "मुलाचे नाव", "मुलीचे नाव"] },
    जन्मतारीख: { day: "", month: "", year: "", type: "date", titleOptions: ["जन्मतारीख", "जन्मदिनांक"] },
    जन्मवेळ: { hour: "", minute: "", period: "", type: "time" },
    जन्मस्थान: { value: "", type: "text", titleOptions: ["जन्म स्थान", "जन्म ठिकाण"] },
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
    पगार: { value: "", type: "text", titleOptions: ["पगार"] },
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
  const [centerText, setCenterText] = useState("|| श्री गणेशाय नम: ||");
  const [bioDataType, setBioDataType] = useState("");

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

    const updatedArray = [...formData[field]];
    updatedArray[index] = { ...updatedArray[index], value };
    setFormData({ ...formData, [field]: updatedArray });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      बायोडेटाप्रकार: { value: bioDataType, type: "select" },
    };
    navigate("/preview", {
      state: {
        formData: completeFormData,
        templateId,
        imagePreview,
        centerText,
      },
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
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["पहाटे", "सकाळ", "दुपार", "संध्याकाळ", "रात्र"];

  // Dropdown options for specific fields
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const heights = ["4'0\"", "4'1\"", "4'2\"", "4'3\"", "4'4\"", "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\"", "6'10\"", "6'11\"", "7'0\""];
  const nadis = ["आदि", "मध्य", "अन्त"];
  const gans = ["देव", "मानव", "राक्षस"];
  const rashis = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"];
  const nakshatras = ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशीर्ष", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढा", "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वाभाद्रपद", "उत्तराभाद्रपद", "रेवती"];
  const gotras = ["अत्रि", "कश्यप", "भारद्वाज", "गौतम", "वशिष्ठ", "विश्वामित्र", "जमदग्नि", "विष्णु", "अंगिरस", "पुलस्त्य", "पुलह", "क्रतु", "मरीचि", "शांडिल्य"];
  const colors = ["गोर", "सांवळा", "गहू", "काळा"];

  return (
    <div
      className="input-form-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-header">
          <img src={imagePreview} alt="Preview" className="form-image" />
          <div className="image-upload">
            <label htmlFor="imageUpload" className="image-label">
              Upload Image
            </label>
            <input type="file" id="imageUpload" onChange={handleImageChange} />
          </div>
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
        <label htmlFor="biodataType">BioData Type:</label>
        <select
          id="biodataType"
          value={bioDataType}
          onChange={(e) => setBioDataType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Marathi">Marathi</option>
          <option value="English">English</option>
        </select>
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
                    <option value="">Day</option>
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
                    <option value="">Month</option>
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
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
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
                    <option value="">Hour</option>
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
                    <option value="">Minute</option>
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
                    <option value="">Period</option>
                    {periods.map((period, index) => (
                      <option key={index} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          } else if (field === "रक्तगट") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {bloodGroups.map((bloodGroup, index) => (
                    <option key={index} value={bloodGroup}>
                      {bloodGroup}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "ऊंची") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {heights.map((height, index) => (
                    <option key={index} value={height}>
                      {height}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "नाडी") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {nadis.map((nadi, index) => (
                    <option key={index} value={nadi}>
                      {nadi}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "गण") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {gans.map((gan, index) => (
                    <option key={index} value={gan}>
                      {gan}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "राशी") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {rashis.map((rashi, index) => (
                    <option key={index} value={rashi}>
                      {rashi}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "नक्षत्र") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {nakshatras.map((nakshatra, index) => (
                    <option key={index} value={nakshatra}>
                      {nakshatra}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "गोत्र") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {gotras.map((gotra, index) => (
                    <option key={index} value={gotra}>
                      {gotra}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field === "रंग") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <select
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (Array.isArray(formData[field])) {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                {formData[field].map((item, index) => (
                  <div key={index} className="array-item">
                    <input
                      type="text"
                      name={`${field}-${index}`}
                      value={item.value}
                      onChange={(e) => handleArrayChange(e, index, field)}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddField(field)}>
                  Add {field}
                </button>
              </div>
            );
          } else if (field === "संपर्क") {
            return (
              <div key={field} className="form-group">
                <label>{titleOptions[0]}</label>
                <input
                  type="tel"
                  name={field}
                  value={fieldData.value}
                  onChange={handleChange}
                />
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
    </div>
  );
};

export default InputFormPage;
