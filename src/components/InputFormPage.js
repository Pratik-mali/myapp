import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./InputFormPage.css";

const InputFormPage = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [formData, setFormData] = useState({
    नाव: { value: "", type: "text" },
    जन्मतारीख: { date: "", month: "", year: "", type: "date" },
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

  useEffect(() => {
    if (window.google && window.google.elements) {
      const transliterationControl = new window.google.elements.transliteration.TransliterationControl({
        sourceLanguage: 'en',
        destinationLanguage: ['mr'],
        transliterationEnabled: true,
      });

      transliterationControl.makeTransliteratable(['centerText', 'bioDataType', ...Object.keys(formData).map(field => field.value)]);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split("-");

    if (subfield) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], [subfield]: value },
      }));
    } else if (formData[field]?.type === "select") {
      setFormData((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], value: value },
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
        return "Marriage Biodata Template-16.png";
      case "17":
        return "Marriage Biodata Template-17.png";
      case "18":
        return "Marriage Biodata Template-18.png";
      default:
        return "border.png";
    }
  };

  return (
    <div
      className="input-form-container"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <div className="form-header">
        <img src={imagePreview} alt="Profile" className="form-image" />
        <div className="form-group image-upload">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="marathi-input"
            id="image"
          />
        </div>
        <div className="form-group center-text-input">
          <input
            type="text"
            name="centerText"
            value={centerText}
            onChange={(e) => setCenterText(e.target.value)}
            className="marathi-input"
            placeholder="|| श्री गणेशाय नम: ||"
          />
        </div>
        <div className="form-group">
          <label>बायोडेटाप्रकार:</label>
          <select
            name="बायोडेटाप्रकार"
            value={bioDataType}
            onChange={(e) => setBioDataType(e.target.value)}
            className="marathi-input"
            required
          >
            <option value="" disabled>
              निवडा
            </option>
            <option value="बायोडेटा">बायोडेटा</option>
            <option value="परिचय पत्र">परिचय पत्र</option>
            <option value="वैयक्तिक माहिती">वैयक्तिक माहिती</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([field, data], index) => (
          <div key={index} className="form-group">
            <label>{field}:</label>
            {Array.isArray(data) ? (
              data.map((item, i) => (
                <div key={i} className="array-group">
                  <input
                    type="text"
                    name={`${field}-${i}`}
                    value={item.value}
                    onChange={(e) => handleArrayChange(e, i, field)}
                    className="marathi-input"
                  />
                </div>
              ))
            ) : data.type === "select" ? (
              <select
                name={field}
                value={data.value}
                onChange={handleChange}
                className="marathi-input"
              >
                {/* Populate select options as per requirement */}
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={data.value}
                onChange={handleChange}
                className="marathi-input"
              />
            )}
            {Array.isArray(data) && (
              <button type="button" onClick={() => handleAddField(field)}>
                Add {field}
              </button>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputFormPage;
