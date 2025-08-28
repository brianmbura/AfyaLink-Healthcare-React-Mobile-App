import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function MentalHealthScreen() {
  const [activeTab, setActiveTab] = useState<'chat' | 'resources'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to provide a safe, anonymous space to talk about how you\'re feeling. Everything you share with me is completely confidential. How are you doing today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const resources = [
    {
      id: 'stress',
      title: 'Coping with Stress',
      description: 'Learn healthy ways to manage daily stress',
      icon: 'leaf',
      color: '#2E7D32',
    },
    {
      id: 'anxiety',
      title: 'Anxiety Management',
      description: 'Techniques to reduce anxiety and worry',
      icon: 'shield-checkmark',
      color: '#1976D2',
    },
    {
      id: 'relaxation',
      title: 'Relaxation Exercises',
      description: 'Guided breathing and mindfulness exercises',
      icon: 'flower',
      color: '#009688',
    },
    {
      id: 'sleep',
      title: 'Better Sleep',
      description: 'Tips for improving sleep quality',
      icon: 'moon',
      color: '#7B1FA2',
    },
    {
      id: 'depression',
      title: 'Depression Support',
      description: 'Understanding and managing depression',
      icon: 'sunny',
      color: '#FF9800',
    },
    {
      id: 'crisis',
      title: 'Crisis Support',
      description: '24/7 emergency mental health resources',
      icon: 'call',
      color: '#F44336',
    },
  ];

  const sendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate supportive AI response
    setTimeout(() => {
      let response = '';
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('stressed') || lowerText.includes('stress')) {
        response = 'I hear that you\'re feeling stressed. That\'s completely understandable - stress is a natural response to challenging situations. Would you like to share what\'s been causing you stress lately? Sometimes talking about it can help.';
      } else if (lowerText.includes('anxious') || lowerText.includes('anxiety')) {
        response = 'Thank you for sharing that you\'re feeling anxious. Anxiety can be overwhelming, but you\'re not alone in experiencing it. Have you noticed any specific triggers for your anxiety? I\'m here to listen and support you.';
      } else if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('down')) {
        response = 'I\'m sorry you\'re feeling this way. It takes courage to reach out and share these feelings. Your emotions are valid, and it\'s okay to not feel okay sometimes. Would you like to tell me more about what\'s been weighing on you?';
      } else if (lowerText.includes('fine') || lowerText.includes('good') || lowerText.includes('okay')) {
        response = 'I\'m glad to hear that you\'re doing well. Even when things are going okay, it\'s important to check in with yourself. Is there anything on your mind that you\'d like to talk about or explore?';
      } else {
        response = 'Thank you for sharing that with me. I want you to know that your feelings are valid and important. This is a safe space where you can express yourself without judgment. Would you like to tell me more about how you\'ve been feeling?';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderChatTab = () => (
    <KeyboardAvoidingView 
      style={styles.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Anonymous Badge */}
      <View style={styles.anonymousBadge}>
        <Ionicons name="shield-checkmark" size={16} color="#2E7D32" />
        <Text style={styles.anonymousText}>Anonymous & Confidential</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.aiMessageContainer,
            ]}
          >
            {!message.isUser && (
              <View style={styles.supportAvatar}>
                <Ionicons name="heart" size={16} color="#FFFFFF" />
              </View>
            )}
            
            <View style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.supportMessage,
            ]}>
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.supportMessageText,
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTime,
                message.isUser ? styles.userMessageTime : styles.supportMessageTime,
              ]}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.supportAvatar}>
              <Ionicons name="heart" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.typingBubble}>
              <View style={styles.typingDots}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Share how you're feeling..."
            placeholderTextColor="#37474F"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          
          {inputText.trim() ? (
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={() => sendMessage(inputText.trim())}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="mic" size={20} color="#37474F" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const renderResourcesTab = () => (
    <ScrollView style={styles.resourcesContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.resourcesTitle}>Self-Help Resources</Text>
      <Text style={styles.resourcesSubtitle}>
        Professional tools and exercises to support your mental wellbeing
      </Text>

      <View style={styles.resourcesList}>
        {resources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceCard}
          >
            <View style={[styles.resourceIcon, { backgroundColor: resource.color + '15' }]}>
              <Ionicons name={resource.icon as any} size={24} color={resource.color} />
            </View>
            
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
            </View>
            
            <Ionicons name="chevron-forward" size={16} color="#37474F" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Emergency Contact */}
      <View style={styles.emergencySection}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="warning" size={20} color="#F44336" />
          <Text style={styles.emergencyTitle}>Need Immediate Help?</Text>
        </View>
        
        <Text style={styles.emergencyDescription}>
          If you're in crisis or having thoughts of self-harm, please reach out immediately.
        </Text>
        
        <TouchableOpacity style={styles.crisisButton}>
          <Ionicons name="call" size={20} color="#FFFFFF" />
          <Text style={styles.crisisButtonText}>Crisis Hotline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.emergencyConsultButton}
          onPress={() => router.push('/consultation')}
        >
          <Ionicons name="medical" size={20} color="#2E7D32" />
          <Text style={styles.emergencyConsultText}>Talk to Professional</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E7D32" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Mental Health</Text>
          <Text style={styles.headerSubtitle}>Safe space for support</Text>
        </View>

        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <Ionicons 
            name="chatbubbles" 
            size={20} 
            color={activeTab === 'chat' ? '#FFFFFF' : '#37474F'} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'chat' && styles.activeTabText
          ]}>
            Anonymous Chat
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'resources' && styles.activeTab]}
          onPress={() => setActiveTab('resources')}
        >
          <Ionicons 
            name="library" 
            size={20} 
            color={activeTab === 'resources' ? '#FFFFFF' : '#37474F'} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'resources' && styles.activeTabText
          ]}>
            Resources
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'chat' ? renderChatTab() : renderResourcesTab()}
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
  helpButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#2E7D32',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#37474F',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
  },
  anonymousBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32' + '15',
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  anonymousText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  supportAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userMessage: {
    backgroundColor: '#1976D2',
    borderBottomRightRadius: 4,
  },
  supportMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  supportMessageText: {
    color: '#37474F',
  },
  messageTime: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: '#FFFFFF',
    opacity: 0.7,
  },
  supportMessageTime: {
    color: '#37474F',
    opacity: 0.5,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 3,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#37474F',
    opacity: 0.4,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 15,
    color: '#37474F',
    paddingVertical: 4,
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  voiceButton: {
    padding: 4,
    marginLeft: 8,
  },
  resourcesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resourcesTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 8,
  },
  resourcesSubtitle: {
    fontSize: 16,
    color: '#37474F',
    opacity: 0.7,
    marginBottom: 24,
  },
  resourcesList: {
    gap: 12,
    marginBottom: 30,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 13,
    color: '#37474F',
    opacity: 0.7,
  },
  emergencySection: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#37474F',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#37474F',
    lineHeight: 20,
    marginBottom: 16,
  },
  crisisButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
  },
  crisisButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencyConsultButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  emergencyConsultText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
});