
import React, { useState } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I\'m here to help you with your dashboard. What would you like to know?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const faqs = [
    {
      question: 'How do I add new data?',
      answer: 'Currently, the dashboard uses mock data for demonstration. In a future version, you\'ll be able to manually input data or connect to external sources like Google Sheets.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Data export functionality is planned for a future release. You\'ll be able to export charts and summaries as PDF reports.'
    },
    {
      question: 'How accurate are the tracking features?',
      answer: 'The tracking features use sample data to demonstrate functionality. When connected to real data sources, accuracy will depend on consistent data input.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! All data is stored locally in your browser or can be connected to secure cloud services. We prioritize data privacy and security.'
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);

    // Simple FAQ matching
    const faq = faqs.find(faq => 
      inputValue.toLowerCase().includes(faq.question.toLowerCase().split(' ')[0]) ||
      inputValue.toLowerCase().includes('export') ||
      inputValue.toLowerCase().includes('data') ||
      inputValue.toLowerCase().includes('secure')
    );

    setTimeout(() => {
      const botResponse = faq 
        ? { type: 'bot', content: faq.answer }
        : { type: 'bot', content: 'Thanks for your question! This is a demo chatbot. For detailed support, please refer to the documentation or contact support.' };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleFAQClick = (faq: any) => {
    const userMessage = { type: 'user', content: faq.question };
    const botMessage = { type: 'bot', content: faq.answer };
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold">Dashboard Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">Quick questions:</p>
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq)}
                    className="block w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
