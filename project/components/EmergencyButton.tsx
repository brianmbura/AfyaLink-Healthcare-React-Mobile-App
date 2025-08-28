import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const EmergencyButton = () => {
  const handleEmergencyCall = () => {
    const phoneUrl = 'tel:911';
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error('Error making emergency call:', err));
  };

  return (
    <TouchableOpacity
      style={styles.emergencyButton}
      onPress={handleEmergencyCall}
      accessibilityLabel="Emergency call button"
      accessibilityHint="Double tap to call emergency services"
    >
      <Ionicons name="call" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emergencyButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});