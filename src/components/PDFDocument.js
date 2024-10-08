import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import NotoSansDevanagariRegular from './NotoSansDevanagari-Regular.ttf'; // Adjust the path as needed
import NotoSansDevanagariBold from './NotoSansDevanagari-Bold.ttf'; // Adjust the path as needed

// Register the fonts with react-pdf
Font.register({
  family: 'NotoSansDevanagari',
  fonts: [
    { src: NotoSansDevanagariRegular, fontWeight: 'normal' },
    { src: NotoSansDevanagariBold, fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansDevanagari',
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
    paddingTop: 10,
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 0,
    textDecorationColor: 'red',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 1,
    marginBottom: 1,
    color: '#ff7300',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    width: '26%',
  },
  value: {
    fontSize: 14,
    width: '70%',
    marginLeft: '10px'
  },
  colon: {
    fontSize: 14,
    marginRight: 3, // Adjust the spacing as needed
  },
  additionalImageContainer: {
    position: 'absolute',
    top: 150,
    right: 45,
    width: 180, // Adjust the size as needed
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  imagePreviewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    marginTop: 25,
  },
  imagePreview: {
    width: 60, // Adjust the size as needed
    height: 60,
  },
});

// Dynamic styles for additionalImageContainer with border conditionally applied
const getAdditionalImageContainerStyle = (additionalImage) => ({
  ...styles.additionalImageContainer,
  borderWidth: additionalImage ? 2 : 0, // Apply border only if additionalImage exists
  borderColor: additionalImage ? '#ff7300' : 'transparent', // Border color
  borderStyle: 'solid',
});

const PDFDocument = ({ formData, templateId, additionalImage, imagePreview, centerText }) => {
  const getBackgroundImage = () => {
    switch (templateId) {
      case "1":
        return "Marriage Biodata Template-01.png";
      // other cases...
      default:
        return "border.png";
    }
  };

  const backgroundImage = getBackgroundImage();

  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    const { day, month, year, varr } = dateObj;
    return `${varr} ${day}-${month}-${year}`;
  };

  const formatTime = (timeObj) => {
    if (!timeObj) return '';
    const { hour, minute, period } = timeObj;
    return `${period} ${hour} वा. ${minute} मि.`;
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
        return value.some(item => item.value) ? value.map(item => item.value).join(', ') : '';
      default:
        return value && value.value ? value.value : '';
    }
  };

  const formatLabel = (label) => {
    return label.replace(/_/g, ' ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} src={backgroundImage} />
          <View style={styles.content}>
            <View style={styles.imagePreviewContainer}>
              <Image style={styles.imagePreview} src={imagePreview} />
            </View>
            <Text style={styles.sectionHeader}>{centerText}</Text>
            <Text style={styles.sectionHeader}>बायोडाटा</Text>
            {additionalImage && (
              <View style={getAdditionalImageContainerStyle(additionalImage)}>
                <Image style={styles.additionalImage} src={additionalImage} />
              </View>
            )}

            {Object.entries(formData).map(([key, value]) => (
              !['वडिलांचे_नाव', 'वडिलांचा_व्यवसाय', 'आईचे_नाव', 'बहीण', 'भाऊ', 'मामा', 'चूलते', 'दाजी', 'पत्ता', 'मोबाईल_नं', 'नातेसंबंध'].includes(key) ? (
                formatValue(value, key) ? (
                  <View key={key} style={styles.line}>
                    <Text style={styles.label}>{formatLabel(value.title || key)}</Text>
                    <Text style={styles.colon}>: </Text>
                    <Text style={styles.value}>{formatValue(value, key)}</Text>
                  </View>
                ) : null
              ) : null
            ))}

            <Text style={styles.sectionHeader}>कौटुंबिक माहिती</Text>
            {Object.entries(formData).map(([key, value]) => (
              ['वडिलांचे_नाव', 'वडिलांचा_व्यवसाय', 'आईचे_नाव', 'बहीण', 'भाऊ', 'मामा', 'चूलते', 'दाजी', 'नातेसंबंध'].includes(key) ? (
                formatValue(value, key) ? (
                  <View key={key} style={styles.line}>
                    <Text style={styles.label}>{formatLabel(value.title || key)}</Text>
                    <Text style={styles.colon}>: </Text>
                    <Text style={styles.value}>{formatValue(value, key)}</Text>
                  </View>
                ) : null
              ) : null
            ))}

            <Text style={styles.sectionHeader}>संपर्क</Text>
            {Object.entries(formData).map(([key, value]) => (
              ['पत्ता', 'मोबाईल_नं'].includes(key) ? (
                formatValue(value, key) ? (
                  <View key={key} style={styles.line}>
                    <Text style={styles.label}>{formatLabel(value.title || key)}</Text>
                    <Text style={styles.colon}>: </Text>
                    <Text style={styles.value}>{formatValue(value, key)}</Text>
                  </View>
                ) : null
              ) : null
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
