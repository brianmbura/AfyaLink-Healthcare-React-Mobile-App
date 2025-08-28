import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface OnboardingData {
  phoneNumber: string;
  name: string;
  age: string;
  gender: string;
  language: string;
  role: string;
}

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    phoneNumber: '',
    name: '',
    age: '',
    gender: '',
    language: '',
    role: '',
  });

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const languageOptions = ['English', 'Hindi', 'Swahili', 'French', 'Spanish'];
  const roleOptions = [
    { id: 'patient', title: 'Patient', subtitle: 'Seeking medical care' },
    { id: 'doctor', title: 'Doctor', subtitle: 'Medical practitioner' },
    { id: 'pharmacist', title: 'Pharmacist', subtitle: 'Medication specialist' },
    { id: 'therapist', title: 'Therapist', subtitle: 'Mental health provider' },
  ];

  const handleNext = () => {
    if (step === 1 && (!data.phoneNumber || !data.name)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (step === 2 && (!data.age || !data.gender)) {
      Alert.alert('Error', 'Please select your age and gender');
      return;
    }
    if (step === 3 && !data.language) {
      Alert.alert('Error', 'Please select a language');
      return;
    }
    if (step === 4 && !data.role) {
      Alert.alert('Error', 'Please select your role');
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Store user data (in real app, would sync with backend)
    console.log('User data:', data);
    router.replace('/(tabs)');
  };

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Welcome to AfyaLink</Text>
      <Text style={styles.stepSubtitle}>Let's start with your basic information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number *</Text>
        <View style={styles.phoneInput}>
          <Text style={styles.phoneCode}>+254</Text>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="701234567"
            placeholderTextColor="#37474F"
            value={data.phoneNumber}
            onChangeText={(value) => updateData('phoneNumber', value)}
            keyboardType="phone-pad"
            maxLength={9}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your full name"
          placeholderTextColor="#37474F"
          value={data.name}
          onChangeText={(value) => updateData('name', value)}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Details</Text>
      <Text style={styles.stepSubtitle}>Help us personalize your experience</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Age *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your age"
          placeholderTextColor="#37474F"
          value={data.age}
          onChangeText={(value) => updateData('age', value)}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gender *</Text>
        <View style={styles.optionsGrid}>
          {genderOptions.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.optionButton,
                data.gender === gender && styles.selectedOption,
              ]}
              onPress={() => updateData('gender', gender)}
            >
              <Text style={[
                styles.optionText,
                data.gender === gender && styles.selectedOptionText,
              ]}>
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Language Preference</Text>
      <Text style={styles.stepSubtitle}>Choose your preferred language</Text>

      <View style={styles.optionsList}>
        {languageOptions.map((language) => (
          <TouchableOpacity
            key={language}
            style={[
              styles.languageOption,
              data.language === language && styles.selectedLanguageOption,
            ]}
            onPress={() => updateData('language', language)}
          >
            <Text style={[
              styles.languageText,
              data.language === language && styles.selectedLanguageText,
            ]}>
              {language}
            </Text>
            {data.language === language && (
              <Ionicons name="checkmark" size={20} color="#2E7D32" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select Your Role</Text>
      <Text style={styles.stepSubtitle}>How will you use AfyaLink?</Text>

      <View style={styles.rolesList}>
        {roleOptions.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleOption,
              data.role === role.id && styles.selectedRoleOption,
            ]}
            onPress={() => updateData('role', role.id)}
          >
            <View style={styles.roleContent}>
              <Text style={[
                styles.roleTitle,
                data.role === role.id && styles.selectedRoleTitle,
              ]}>
                {role.title}
              </Text>
              <Text style={[
                styles.roleSubtitle,
                data.role === role.id && styles.selectedRoleSubtitle,
              ]}>
                {role.subtitle}
              </Text>
            </View>
            {data.role === role.id && (
              <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E7D32" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="medical" size={32} color="#2E7D32" />
          <Text style={styles.logoText}>AfyaLink</Text>
        </View>
        
        {step > 1 && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setStep(step - 1)}
          >
            <Ionicons name="chevron-back" size={24} color="#37474F" />
          </TouchableOpacity>
        )}
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{step} of 4</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === 4 ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.7,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    paddingVertical: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#37474F',
    opacity: 0.7,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 8,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  phoneCode: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  phoneNumberInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#37474F',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#37474F',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    borderColor: '#2E7D32',
    backgroundColor: '#2E7D32' + '15',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
  },
  selectedOptionText: {
    color: '#2E7D32',
  },
  optionsList: {
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  selectedLanguageOption: {
    borderColor: '#2E7D32',
    backgroundColor: '#2E7D32' + '15',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
  },
  selectedLanguageText: {
    color: '#2E7D32',
  },
  rolesList: {
    gap: 12,
  },
  roleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  selectedRoleOption: {
    borderColor: '#2E7D32',
    backgroundColor: '#2E7D32' + '15',
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  selectedRoleTitle: {
    color: '#2E7D32',
  },
  roleSubtitle: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
  },
  selectedRoleSubtitle: {
    color: '#2E7D32',
    opacity: 0.8,
  },
  navigationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nextButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});