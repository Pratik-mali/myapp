import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sanscript from "@indic-transliteration/sanscript";
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

  const [translatedText, setTranslatedText] = useState({});
  const [imagePreview, setImagePreview] = useState("/ganesha.png");
  const [centerText, setCenterText] = useState("|| श्री गणेशाय नम: ||");
  const [bioDataType, setBioDataType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const transliteratedValue = Sanscript.t(value, "itrans", "devanagari");
    const [field, subfield] = name.split("-");

    if (subfield) {
      // Handle subfields like 'date', 'month', 'year' for जन्मतारीख and जन्मवेळ
      setFormData((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], [subfield]: value },
      }));
      setTranslatedText((prevState) => ({
        ...prevState,
        [name]: transliteratedValue,
      }));
    } else if (formData[field]?.type === "select") {
      // Handle dropdowns
      setFormData((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], value: value },
      }));
      setTranslatedText((prevState) => ({
        ...prevState,
        [name]: transliteratedValue,
      }));
    } else if (Array.isArray(formData[field])) {
      // Handle arrays
      const updatedArray = [...formData[field]];
      updatedArray[subfield] = { ...updatedArray[subfield], value };
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedArray,
      }));
      setTranslatedText((prevState) => ({
        ...prevState,
        [name]: transliteratedValue,
      }));
    } else {
      // Handle other types of input fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], value },
      }));
      setTranslatedText((prevState) => ({
        ...prevState,
        [name]: transliteratedValue,
      }));
    }
  };

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    const transliteratedValue = Sanscript.t(value, "itrans", "devanagari");
    const updatedArray = [...formData[field]];
    updatedArray[index] = { ...updatedArray[index], value };
    setTranslatedText({ ...translatedText, [field]: transliteratedValue });
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

  const handleTranslationClick = (field) => {
    const translatedValue = translatedText[field];
    if (translatedValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: { ...prevFormData[field], value: translatedValue },
      }));
    }
  };

  const handleArrayTranslationClick = (field, index) => {
    const translatedValue = translatedText[field];
    if (translatedValue) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = { ...updatedArray[index], value: translatedValue };
      setFormData({ ...formData, [field]: updatedArray });
    }
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
          <div
            className="translation-hint"
            onClick={() => setBioDataType(translatedText["बायोडेटाप्रकार"])}
          >
            {translatedText["बायोडेटाप्रकार"]} (क्लिक करा वापरण्यासाठी)
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([field, data], index) => (
          <div key={index} className="form-group">
            <label>{field}:</label>
            {field === "जन्मतारीख" ? (
              <div className="apple">
                <select
                  name={`${field}-date`}
                  value={data.date}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    दिनांक
                  </option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-month`}
                  value={data.month}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    महिना
                  </option>
                  {[
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
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-year`}
                  value={data.year}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    वर्ष
                  </option>
                  {[...Array(100)].map((_, i) => (
                    <option key={i} value={1920 + i}>
                      {1920 + i}
                    </option>
                  ))}
                </select>
              </div>
            ) : field === "जन्मवेळ" ? (
              <div className="apple">
                <select
                  name={`${field}-hour`}
                  value={data.hour}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    तास
                  </option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-minute`}
                  value={data.minute}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    मिनिट
                  </option>
                  {[...Array(60)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <select
                  name={`${field}-period`}
                  value={data.period}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    कालावधी
                  </option>
                  {["सकाळ", "दुपार", "संध्याकाळ", "रात्र"].map(
                    (period, index) => (
                      <option key={index} value={period}>
                        {period}
                      </option>
                    )
                  )}
                </select>
              </div>
            ) : data.type === "select" ? (
              <div>
                <select
                  name={field}
                  value={data.value}
                  onChange={handleChange}
                  className="marathi-input"
                  required
                >
                  <option value="" disabled>
                    निवडा
                  </option>
                  {/* Add your options here based on the field */}
                  {field === "गोत्र" &&
                    [
                      "अत्री",
                      "वत्त्स",
                      "गार्ग्य",
                      "वशिष्ठ",
                      "जमदग्नी",
                      "लोकाक्ष",
                      "विश्वामित्र",
                      "भारद्वाज",
                      "मुद्गल",
                      "काश्यप",
                      "मौनस",
                      "लोहिताक्ष",
                      "कौशिक",
                      "कृष्णात्र",
                      "हरितस्य",
                      "पराशर",
                      "शांडील्य",
                      "धनंजय",
                      "बाद्रायण",
                      "वाद्रायण",
                      "कौडीण्य",
                      "विष्णुवृद्ध",
                      "भार्गव",
                      "सौभारायण",
                      "गौतम",
                    ].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  {field === "नक्षत्र" &&
                    [
                      "अश्विनी",
                      "भरणी",
                      "कृत्तिका",
                      "रोहिणी",
                      "मृगशीर्ष",
                      "आर्द्रा",
                      "पुनर्वसू",
                      "पुष्य",
                      "आश्लेषा",
                      "मघा",
                      "पूर्वा फाल्गुनी",
                      "उत्तरा फाल्गुनी",
                      "हस्त",
                      "चित्रा",
                      "स्वाती",
                      "विशाखा",
                      "अनुराधा",
                      "ज्येष्ठा",
                      "मूळ",
                      "पूर्वाषाढा",
                      "उत्तराषाढा",
                      "श्रवण",
                      "धनिष्ठा",
                      "शततारका",
                      "पूर्वा भाद्रपदा",
                      "उत्तरा भाद्रपदा",
                      "रेवती",
                    ].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  {field === "राशी" &&
                    [
                      "मेष",
                      "वृषभ",
                      "मिथुन",
                      "कर्क",
                      "सिंह",
                      "कन्या",
                      "तुला",
                      "वृश्चिक",
                      "धनु",
                      "मकर",
                      "कुंभ",
                      "मीन",
                    ].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  {field === "गण" &&
                    ["देव", "मनुष्य", "राक्षस"].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  {field === "नाडी" &&
                    ["आदि", "मध्य", "अंत्य"].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  {field === "ऊंची" &&
                    [
                      "4 फूट 1 इंच",
                      "4 फूट 2 इंच",
                      "4 फूट 3 इंच",
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
                    ].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  {field === "रंग" &&
                    ["गोरा", "निमगोरा", "गव्हाळ", "सावळा", "काळा सावळा"].map(
                      (option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  {field === "रक्तगट" &&
                    ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      )
                    )}
                </select>
              </div>
            ) : Array.isArray(data) ? (
              data.map((item, idx) => (
                <div key={idx} className="array-input-group">
                  <input
                    type="text"
                    name={`${field}-${idx}`}
                    value={item.value}
                    onChange={(e) => handleArrayChange(e, idx, field)}
                    className="marathi-input"
                    required
                  />
                  <div
                    onClick={() => handleArrayTranslationClick(field, idx)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {translatedText[field]} (क्लिक करा वापरण्यासाठी)
                  </div>
                </div>
              ))
            ) : (
              <input
                type={data.type}
                name={field}
                value={data.value}
                onChange={handleChange}
                className="marathi-input"
                required
              />
            )}
            {!Array.isArray(data) &&
              !["जन्मतारीख", "जन्मवेळ"].includes(field) && (
                <div
                  onClick={() => handleTranslationClick(field)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {translatedText[field]} (क्लिक करा वापरण्यासाठी)
                </div>
              )}
            {Array.isArray(data) && (
              <button
                type="button"
                className="more-button"
                onClick={() => handleAddField(field)}
              >
                Add {field}
              </button>
            )}
          </div>
        ))}
        <button type="submit">प्रिव्ह्यू तयार करा</button>
      </form>
    </div>
  );
};

export default InputFormPage;
