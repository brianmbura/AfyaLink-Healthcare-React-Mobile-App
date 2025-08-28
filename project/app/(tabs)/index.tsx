import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { EmergencyButton } from '@/components/EmergencyButton';

export default function HomeScreen() {
  const [userRole] = useState('patient'); // This would come from user context/storage
  const [userName] = useState('John');

  const patientServices = [
    {
      id: 'consult',
      title: 'Consult a Doctor',
      icon: 'medical',
      color: '#1976D2',
      description: 'Chat, call or video with doctors',
      route: '/consultation',
    },
    {
      id: 'symptom',
      title: 'Symptom Checker',
      icon: 'search',
      color: '#009688',
      description: 'AI-powered health assessment',
      route: '/symptom-checker',
    },
    {
      id: 'mental',
      title: 'Mental Health Support',
      icon: 'heart',
      color: '#2E7D32',
      description: 'Anonymous support & resources',
      route: '/mental-health',
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Orders',
      icon: 'medical-outline',
      color: '#1976D2',
      description: 'Order medicines & prescriptions',
      route: '/pharmacy',
    },
  ];

  const providerServices = [
    {
      id: 'patients',
      title: 'My Patients',
      icon: 'people',
      color: '#1976D2',
      description: 'Manage patient consultations',
      route: '/patients',
    },
    {
      id: 'schedule',
      title: 'Schedule',
      icon: 'calendar',
      color: '#009688',
      description: 'View appointments & availability',
      route: '/schedule',
    },
    {
      id: 'prescriptions',
      title: 'Prescriptions',
      icon: 'document-text',
      color: '#2E7D32',
      description: 'Manage patient prescriptions',
      route: '/prescriptions',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: 'stats-chart',
      color: '#1976D2',
      description: 'View practice insights',
      route: '/analytics',
    },
  ];

  const services = userRole === 'patient' ? patientServices : providerServices;

  const handleServicePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E7D32" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userName}</Text>
          <Text style={styles.subGreeting}>
            {userRole === 'patient' ? 'How can we help you today?' : 'Ready to help your patients?'}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Alert */}
        {userRole === 'patient' && (
          <TouchableOpacity 
            style={styles.emergencyBanner}
            onPress={() => router.push('/emergency')}
          >
            <Ionicons name="call" size={20} color="#FFFFFF" />
            <Text style={styles.emergencyText}>Emergency Hotline</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>
            {userRole === 'patient' ? 'Health Services' : 'Dashboard'}
          </Text>
          
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceCard, { borderLeftColor: service.color }]}
                onPress={() => handleServicePress(service.route)}
                accessibilityLabel={service.title}
                accessibilityHint={service.description}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon as any} size={24} color={service.color} />
                </View>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#37474F" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Stats for Providers */}
        {userRole !== 'patient' && (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Today's Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Consultations</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Pending Orders</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {userRole === 'patient' && <EmergencyButton />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emergencyBanner: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  servicesContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 16,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
  },
  statsContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.7,
  },
});