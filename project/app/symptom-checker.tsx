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

export default function SymptomCheckerScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI health assistant. I can help you understand your symptoms and provide preliminary health insights. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickSymptoms = [
    'Headache',
    'Fever',
    'Cough',
    'Sore throat',
    'Fatigue',
    'Nausea',
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

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('headache')) {
        response = 'I understand you\'re experiencing a headache. Can you tell me more about it? When did it start? Is it mild, moderate, or severe? Are there any other symptoms like nausea or sensitivity to light?';
      } else if (lowerText.includes('fever')) {
        response = 'Fever can be concerning. Have you measured your temperature? Any other symptoms like chills, body aches, or fatigue? How long have you had the fever?';
      } else if (lowerText.includes('cough')) {
        response = 'I see you have a cough. Is it dry or are you coughing up mucus? Any chest pain or difficulty breathing? When did the cough start?';
      } else if (lowerText.includes('sore throat')) {
        response = 'A sore throat can be uncomfortable. Is it painful to swallow? Any swelling in your throat or neck? Do you see any white patches or redness?';
      } else {
        response = 'Thank you for sharing that information. To better help you, could you describe your symptoms in more detail? When did they start and how severe are they on a scale of 1-10?';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSymptom = (symptom: string) => {
    sendMessage(`I have a ${symptom.toLowerCase()}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009688" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>AI Symptom Checker</Text>
          <Text style={styles.headerSubtitle}>Get preliminary health insights</Text>
        </View>

        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
                <View style={styles.aiAvatar}>
                  <Ionicons name="medical" size={16} color="#FFFFFF" />
                </View>
              )}
              
              <View style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}>
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.isUser ? styles.userMessageTime : styles.aiMessageTime,
                ]}>
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </View>
          ))}

          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.aiAvatar}>
                <Ionicons name="medical" size={16} color="#FFFFFF" />
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

          {/* Quick Symptoms - Show only if chat is empty or at start */}
          {messages.length <= 1 && (
            <View style={styles.quickSymptomsContainer}>
              <Text style={styles.quickSymptomsTitle}>Common symptoms:</Text>
              <View style={styles.quickSymptomsList}>
                {quickSymptoms.map((symptom) => (
                  <TouchableOpacity
                    key={symptom}
                    style={styles.quickSymptomButton}
                    onPress={() => handleQuickSymptom(symptom)}
                  >
                    <Text style={styles.quickSymptomText}>{symptom}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="mic" size={20} color="#37474F" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInput}
              placeholder="Describe your symptoms..."
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
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={20} color="#37474F" />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            ⚠️ This is not a substitute for professional medical advice
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity 
          style={styles.consultButton}
          onPress={() => router.push('/consultation')}
        >
          <Ionicons name="medical" size={20} color="#FFFFFF" />
          <Text style={styles.consultButtonText}>Consult a Doctor</Text>
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
    backgroundColor: '#009688',
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
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
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
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#009688',
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
    backgroundColor: '#009688',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
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
  aiMessageText: {
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
  aiMessageTime: {
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
  quickSymptomsContainer: {
    marginTop: 20,
    paddingVertical: 16,
  },
  quickSymptomsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickSymptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  quickSymptomButton: {
    backgroundColor: '#009688' + '15',
    borderWidth: 1,
    borderColor: '#009688' + '30',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickSymptomText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#009688',
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
    marginBottom: 8,
  },
  voiceButton: {
    padding: 4,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 15,
    color: '#37474F',
    paddingVertical: 4,
  },
  sendButton: {
    backgroundColor: '#009688',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  cameraButton: {
    padding: 4,
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 11,
    color: '#37474F',
    opacity: 0.6,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  bottomAction: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  consultButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  consultButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});