import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const profileOptions = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Manage your profile details',
      icon: 'person-outline',
      route: '/profile/personal',
    },
    {
      id: 'medical',
      title: 'Medical History',
      subtitle: 'View your health records',
      icon: 'medical-outline',
      route: '/profile/medical',
    },
    {
      id: 'family',
      title: 'Family Members',
      subtitle: 'Add family profiles',
      icon: 'people-outline',
      route: '/profile/family',
    },
    {
      id: 'insurance',
      title: 'Insurance',
      subtitle: 'Health insurance details',
      icon: 'shield-outline',
      route: '/profile/insurance',
    },
  ];

  const settingsOptions = [
    {
      id: 'language',
      title: 'Language',
      subtitle: 'English',
      icon: 'language-outline',
      route: '/settings/language',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Control your data',
      icon: 'lock-closed-outline',
      route: '/settings/privacy',
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'FAQs and contact',
      icon: 'help-circle-outline',
      route: '/settings/help',
    },
    {
      id: 'about',
      title: 'About AfyaLink',
      subtitle: 'Version 1.0.0',
      icon: 'information-circle-outline',
      route: '/settings/about',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#37474F" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>J</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userDetails}>25 years • Male • Patient</Text>
            <Text style={styles.userPhone}>+1 (555) 123-4567</Text>
          </View>
          <TouchableOpacity style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Consultations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          {profileOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => router.push(option.route as any)}
            >
              <View style={styles.optionIcon}>
                <Ionicons name={option.icon as any} size={20} color="#37474F" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#37474F" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {/* Notification Toggle */}
          <View style={styles.optionCard}>
            <View style={styles.optionIcon}>
              <Ionicons name="notifications-outline" size={20} color="#37474F" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Notifications</Text>
              <Text style={styles.optionSubtitle}>Push notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#2E7D32' + '50' }}
              thumbColor={notificationsEnabled ? '#2E7D32' : '#FFFFFF'}
            />
          </View>

          {/* Location Toggle */}
          <View style={styles.optionCard}>
            <View style={styles.optionIcon}>
              <Ionicons name="location-outline" size={20} color="#37474F" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Location Services</Text>
              <Text style={styles.optionSubtitle}>Find nearby pharmacies</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#E0E0E0', true: '#2E7D32' + '50' }}
              thumbColor={locationEnabled ? '#2E7D32' : '#FFFFFF'}
            />
          </View>

          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => router.push(option.route as any)}
            >
              <View style={styles.optionIcon}>
                <Ionicons name={option.icon as any} size={20} color="#37474F" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#37474F" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => router.push('/emergency')}
          >
            <Ionicons name="call" size={24} color="#FFFFFF" />
            <Text style={styles.emergencyText}>Emergency Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

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
    backgroundColor: '#37474F',
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
  },
  editButton: {
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
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitials: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
  },
  verifiedBadge: {
    marginLeft: 8,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
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
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
  },
  emergencySection: {
    marginTop: 30,
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  bottomPadding: {
    height: 20,
  },
});