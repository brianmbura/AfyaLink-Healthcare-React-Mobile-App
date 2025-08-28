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

export default function ConsultationsScreen() {
  const consultations = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      date: 'Today, 2:30 PM',
      status: 'scheduled',
      avatar: '👩‍⚕️',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: 'Yesterday, 4:00 PM',
      status: 'completed',
      avatar: '👨‍⚕️',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      date: 'Dec 15, 10:00 AM',
      status: 'completed',
      avatar: '👩‍⚕️',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#2E7D32';
      case 'completed':
        return '#009688';
      case 'cancelled':
        return '#F44336';
      default:
        return '#37474F';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Consultations</Text>
          <Text style={styles.headerSubtitle}>Your medical appointments</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/consultation')}
          >
            <Ionicons name="videocam" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Start Consultation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#009688' }]}
            onPress={() => router.push('/symptom-checker')}
          >
            <Ionicons name="search" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Symptom Checker</Text>
          </TouchableOpacity>
        </View>

        {/* Consultations List */}
        <View style={styles.consultationsList}>
          <Text style={styles.sectionTitle}>Recent Consultations</Text>
          
          {consultations.map((consultation) => (
            <TouchableOpacity
              key={consultation.id}
              style={styles.consultationCard}
              onPress={() => router.push(`/consultation/${consultation.id}`)}
            >
              <View style={styles.doctorAvatar}>
                <Text style={styles.avatarEmoji}>{consultation.avatar}</Text>
              </View>
              
              <View style={styles.consultationInfo}>
                <Text style={styles.doctorName}>{consultation.doctorName}</Text>
                <Text style={styles.specialty}>{consultation.specialty}</Text>
                <Text style={styles.consultationDate}>{consultation.date}</Text>
              </View>
              
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(consultation.status) + '15' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(consultation.status) }
                  ]}>
                    {getStatusText(consultation.status)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#37474F" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State for new users */}
        {consultations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="medical-outline" size={48} color="#37474F" opacity={0.3} />
            <Text style={styles.emptyTitle}>No Consultations Yet</Text>
            <Text style={styles.emptyDescription}>
              Book your first consultation with a healthcare provider
            </Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => router.push('/consultation')}
            >
              <Text style={styles.bookButtonText}>Book Consultation</Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: '#1976D2',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  addButton: {
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1976D2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  consultationsList: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 16,
  },
  consultationCard: {
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
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  consultationInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
    marginBottom: 4,
  },
  consultationDate: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.6,
  },
  statusContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#37474F',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});