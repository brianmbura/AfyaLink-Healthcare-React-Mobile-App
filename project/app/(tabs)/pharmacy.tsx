import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PharmacyScreen() {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: 1,
      orderNumber: 'PH001',
      status: 'delivered',
      items: ['Paracetamol 500mg', 'Vitamin D3'],
      total: 450,
      date: 'Dec 18, 2024',
      pharmacy: 'MedPlus Pharmacy',
    },
    {
      id: 2,
      orderNumber: 'PH002',
      status: 'processing',
      items: ['Omeprazole 20mg', 'Multivitamin'],
      total: 680,
      date: 'Dec 20, 2024',
      pharmacy: 'Apollo Pharmacy',
    },
    {
      id: 3,
      orderNumber: 'PH003',
      status: 'pending',
      items: ['Blood Pressure Monitor'],
      total: 2500,
      date: 'Dec 21, 2024',
      pharmacy: 'MedPlus Pharmacy',
    },
  ];

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: 'Dec 15, 2024',
      medications: ['Amoxicillin 500mg', 'Ibuprofen 400mg'],
      status: 'active',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: 'Dec 10, 2024',
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      status: 'expired',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#2E7D32';
      case 'processing':
        return '#FF9800';
      case 'pending':
        return '#1976D2';
      case 'active':
        return '#2E7D32';
      case 'expired':
        return '#F44336';
      default:
        return '#37474F';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009688" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pharmacy</Text>
          <Text style={styles.headerSubtitle}>Orders & prescriptions</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="bag-outline" size={24} color="#FFFFFF" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#37474F" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines, products..."
          placeholderTextColor="#37474F"
        />
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'orders' && styles.activeTabText
          ]}>
            Orders
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'prescriptions' && styles.activeTab]}
          onPress={() => setActiveTab('prescriptions')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'prescriptions' && styles.activeTabText
          ]}>
            Prescriptions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'upload' && styles.activeTab]}
          onPress={() => setActiveTab('upload')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upload' && styles.activeTabText
          ]}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Ionicons name="camera" size={20} color="#009688" />
            </View>
            <Text style={styles.actionTitle}>Upload Prescription</Text>
            <Text style={styles.actionSubtitle}>Take photo & order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Ionicons name="location" size={20} color="#009688" />
            </View>
            <Text style={styles.actionTitle}>Nearby Pharmacies</Text>
            <Text style={styles.actionSubtitle}>Find closest stores</Text>
          </TouchableOpacity>
        </View>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) + '15' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(order.status) }
                    ]}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.pharmacyName}>{order.pharmacy}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
                
                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <Text key={index} style={styles.orderItem}>• {item}</Text>
                  ))}
                </View>
                
                <View style={styles.orderFooter}>
                  <Text style={styles.orderTotal}>₹{order.total}</Text>
                  <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>My Prescriptions</Text>
            
            {prescriptions.map((prescription) => (
              <View key={prescription.id} style={styles.prescriptionCard}>
                <View style={styles.prescriptionHeader}>
                  <Text style={styles.doctorName}>{prescription.doctor}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(prescription.status) + '15' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(prescription.status) }
                    ]}>
                      {getStatusText(prescription.status)}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.prescriptionDate}>{prescription.date}</Text>
                
                <View style={styles.medicationsList}>
                  {prescription.medications.map((med, index) => (
                    <Text key={index} style={styles.medication}>• {med}</Text>
                  ))}
                </View>
                
                {prescription.status === 'active' && (
                  <TouchableOpacity style={styles.orderButton}>
                    <Ionicons name="bag-add" size={16} color="#FFFFFF" />
                    <Text style={styles.orderButtonText}>Order Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Upload Prescription</Text>
            
            <View style={styles.uploadCard}>
              <Ionicons name="cloud-upload-outline" size={48} color="#009688" />
              <Text style={styles.uploadTitle}>Upload Your Prescription</Text>
              <Text style={styles.uploadDescription}>
                Take a photo or select from gallery
              </Text>
              
              <View style={styles.uploadButtons}>
                <TouchableOpacity style={styles.uploadButton}>
                  <Ionicons name="camera" size={20} color="#FFFFFF" />
                  <Text style={styles.uploadButtonText}>Take Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.uploadButton, styles.galleryButton]}>
                  <Ionicons name="image" size={20} color="#009688" />
                  <Text style={[styles.uploadButtonText, { color: '#009688' }]}>From Gallery</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.uploadNote}>
                Ensure prescription is clearly visible and readable
              </Text>
            </View>

            {/* Delivery Options */}
            <View style={styles.deliveryOptions}>
              <Text style={styles.sectionTitle}>Delivery Options</Text>
              
              <TouchableOpacity style={styles.deliveryCard}>
                <Ionicons name="bicycle" size={24} color="#009688" />
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryTitle}>Home Delivery</Text>
                  <Text style={styles.deliverySubtitle}>Free delivery above ₹500</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#37474F" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.deliveryCard}>
                <Ionicons name="storefront" size={24} color="#009688" />
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryTitle}>Store Pickup</Text>
                  <Text style={styles.deliverySubtitle}>Collect from nearest pharmacy</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#37474F" />
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#009688',
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
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F44336',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#37474F',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#009688',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
  },
  activeTabText: {
    color: '#FFFFFF',
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
  actionCard: {
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
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#009688' + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.7,
    textAlign: 'center',
  },
  tabContent: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
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
  pharmacyName: {
    fontSize: 14,
    color: '#009688',
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.6,
    marginBottom: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    fontSize: 13,
    color: '#37474F',
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#37474F',
  },
  reorderButton: {
    backgroundColor: '#009688',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  reorderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  prescriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
  },
  prescriptionDate: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.6,
    marginBottom: 12,
  },
  medicationsList: {
    marginBottom: 12,
  },
  medication: {
    fontSize: 13,
    color: '#37474F',
    marginBottom: 2,
  },
  orderButton: {
    backgroundColor: '#009688',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: '#37474F',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#009688',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  galleryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#009688',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadNote: {
    fontSize: 12,
    color: '#37474F',
    opacity: 0.6,
    textAlign: 'center',
  },
  deliveryOptions: {
    marginBottom: 20,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  deliverySubtitle: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
  },
});