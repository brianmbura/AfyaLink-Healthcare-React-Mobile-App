import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function EmergencyScreen() {
  const emergencyContacts = [
    {
      id: 'ambulance',
      title: 'Emergency Ambulance',
      number: '911',
      description: 'Life-threatening emergencies',
      icon: 'medical',
      color: '#F44336',
    },
    {
      id: 'police',
      title: 'Police Emergency',
      number: '999',
      description: 'Safety & security emergencies',
      icon: 'shield',
      color: '#1976D2',
    },
    {
      id: 'fire',
      title: 'Fire Department',
      number: '998',
      description: 'Fire & rescue emergencies',
      icon: 'flame',
      color: '#FF9800',
    },
    {
      id: 'poison',
      title: 'Poison Control',
      number: '+254-700-123-456',
      description: 'Poisoning & overdose help',
      icon: 'warning',
      color: '#9C27B0',
    },
  ];

  const mentalHealthContacts = [
    {
      id: 'crisis',
      title: 'Mental Health Crisis Line',
      number: '+254-700-789-123',
      description: '24/7 suicide prevention & crisis support',
      icon: 'heart',
      color: '#2E7D32',
    },
    {
      id: 'counseling',
      title: 'Crisis Counseling',
      number: '+254-700-456-789',
      description: 'Immediate emotional support',
      icon: 'chatbubbles',
      color: '#009688',
    },
  ];

  const makeCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error('Error making call:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F44336" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Emergency</Text>
          <Text style={styles.headerSubtitle}>Get immediate help</Text>
        </View>

        <View style={styles.locationButton}>
          <Ionicons name="location" size={20} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Emergency Button */}
        <View style={styles.mainEmergencyContainer}>
          <TouchableOpacity 
            style={styles.mainEmergencyButton}
            onPress={() => makeCall('911')}
          >
            <View style={styles.emergencyIcon}>
              <Ionicons name="call" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.emergencyButtonText}>EMERGENCY CALL</Text>
            <Text style={styles.emergencyNumber}>911</Text>
          </TouchableOpacity>
          
          <Text style={styles.emergencyNote}>
            Tap for immediate emergency assistance
          </Text>
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => makeCall(contact.number)}
            >
              <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                <Ionicons name={contact.icon as any} size={24} color="#FFFFFF" />
              </View>
              
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{contact.title}</Text>
                <Text style={styles.contactDescription}>{contact.description}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              
              <View style={styles.callButton}>
                <Ionicons name="call" size={20} color={contact.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mental Health Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mental Health Support</Text>
          
          {mentalHealthContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => makeCall(contact.number)}
            >
              <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                <Ionicons name={contact.icon as any} size={24} color="#FFFFFF" />
              </View>
              
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{contact.title}</Text>
                <Text style={styles.contactDescription}>{contact.description}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              
              <View style={styles.callButton}>
                <Ionicons name="call" size={20} color={contact.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/consultation')}
            >
              <Ionicons name="medical" size={24} color="#1976D2" />
              <Text style={styles.quickActionText}>Consult Doctor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/mental-health')}
            >
              <Ionicons name="heart" size={24} color="#2E7D32" />
              <Text style={styles.quickActionText}>Mental Health</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/pharmacy')}
            >
              <Ionicons name="medical-outline" size={24} color="#009688" />
              <Text style={styles.quickActionText}>Find Pharmacy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="location" size={24} color="#FF9800" />
              <Text style={styles.quickActionText}>Share Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Important Information</Text>
          
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color="#1976D2" />
            <Text style={styles.infoText}>
              Always call emergency services first in life-threatening situations
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Ionicons name="time" size={20} color="#1976D2" />
            <Text style={styles.infoText}>
              All emergency hotlines are available 24/7
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={20} color="#1976D2" />
            <Text style={styles.infoText}>
              Your location may be shared with emergency services for faster response
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F44336',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  locationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainEmergencyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  mainEmergencyButton: {
    backgroundColor: '#F44336',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 16,
  },
  emergencyIcon: {
    marginBottom: 8,
  },
  emergencyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emergencyNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  emergencyNote: {
    fontSize: 14,
    color: '#37474F',
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#37474F',
    textAlign: 'center',
    marginTop: 8,
  },
  infoSection: {
    marginTop: 30,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#37474F',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});