import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransliterationInput from "./TransliterationInput";
import "./InputFormPage.css";

const InputFormPage = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [formData, setFormData] = useState({
    नाव: { value: "", type: "text" },
    जन्मतारीख: { day: "", month: "", year: "", type: "date" },
    जन्मवेळ: { hour: "", minute: "", period: "", type: "time" },
    जन्मस्थान: { value: "", type: "text" },
    जन्मनाव: { value: "", type: "text" },
    धर्म: { value: "", type: "text" },
    जात: { value: "", type: "text" },
    कुलदैवत: { value: "", type: "text" },
    गोत्र: { value: "", type: "select" },
    नक्षत्र: { value: "", type: "select" },
    राशी: { value: "", type: "select" },
    गण: { value: "", type: "select" },
    नाडी: { value: "", type: "select" },
    ऊंची: { value: "", type: "select" },
    रंग: { value: "", type: "select" },
    रक्तगट: { value: "", type: "select" },
    शिक्षण: { value: "", type: "text" },
    नोकरी: { value: "", type: "text" },
    पगार: { value: "", type: "text" },
    वडिलांचे_नाव: { value: "", type: "text" },
    वडिलांचा_व्यवसाय: { value: "", type: "text" },
    आईचे_नाव: { value: "", type: "text" },
    बहीण: [{ value: "", type: "text" }],
    भाऊ: [{ value: "", type: "text" }],
    मामा: [{ value: "", type: "text" }],
    दाजी: [{ value: "", type: "text" }],
    चूलते: [{ value: "", type: "text" }],
    नातेसंबंध: { value: "", type: "text" },
    पत्ता: { value: "", type: "text" },
    संपर्क: { value: "", type: "tel" },
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
  const periods = ["सकाळ", "दुपार", "संध्याकाळ", "रात्र"];

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
          if (fieldData.type === "date") {
            return (
              <div key={field} className="form-group date-select">
                <label>{field}</label>
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
                <label>{field}</label>
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
                <label>{field}</label>
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
                <label>{field}</label>
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
