import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import TiroDevanagariMarathi from './TiroDevanagariMarathi-Regular.ttf'; // Adjust the path as needed

// Register the font with react-pdf
Font.register({
  family: 'TiroDevanagariMarathi',
  src: TiroDevanagariMarathi,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'TiroDevanagariMarathi',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 1.0, // Adjust opacity to make sure text is readable
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 80,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  line: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    width: '30%',
  },
  value: {
    fontSize: 17,
    width: '70%',
  },
  additionalImage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100, // Adjust the size as needed
    height: 100,
  },
  imagePreviewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 150, // Adjust the size as needed
    height: 150,
  },
});

const PDFDocument = ({ formData, templateId, additionalImage, imagePreview }) => {
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

  const backgroundImage = getBackgroundImage();

  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    const { day, month, year } = dateObj;
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeObj) => {
    if (!timeObj) return '';
    const { hour, minute, period } = timeObj;
    return `${period} ${hour}वा ${minute}मि`;
  };

  const formatValue = (value, key) => {
    switch (key) {
      case 'जन्मतारीख':
        return formatDate(value);
      case 'जन्मवेळ':
        return formatTime(value);
      case 'बहीण':
      case 'भाऊ':
      case 'मामा':
      case 'चूलते':
      case 'दाजी':
        return value.map(item => item.value).join(', ');
      default:
        return value && value.value ? value.value : '';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} src={backgroundImage} />
          <View style={styles.content}>
            <Text style={styles.header}>|| श्री गणेशाय नम: ||</Text>
            <Text style={styles.header}>बायोडाटा</Text>
            {additionalImage && (
              <Image style={styles.additionalImage} src={additionalImage} />
            )}
            <View style={styles.imagePreviewContainer}>
              <Image style={styles.imagePreview} src={imagePreview} />
            </View>
            {Object.entries(formData).map(([key, value]) => (
              value ? (
                <View key={key} style={styles.line}>
                  <Text style={styles.label}>{value.title || key}:</Text>
                  <Text style={styles.value}>
                    {formatValue(value, key)}
                  </Text>
                </View>
              ) : null
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
