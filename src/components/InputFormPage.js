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
  const [additionalImage, setAdditionalImage] = useState(null);
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

  const handleAdditionalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalImage(URL.createObjectURL(file));
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
        additionalImage,
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
          <div className="additional-image-upload">
            <label htmlFor="additionalImageUpload" className="image-label">
              Upload Additional Image
            </label>
            <input type="file" id="additionalImageUpload" onChange={handleAdditionalImageChange} />
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
          } else if (Array.isArray(fieldData)) {
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
                    />
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => handleAddField(field)}
                    >
                      +
                    </button>
                  </div>
                ))}
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
                  onChange={(value) =>
                    handleTransliterationChange(field, value)
                  }
                />
              </div>
            );
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputFormPage;
