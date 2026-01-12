'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Building2,
  FileText,
  Shield,
  Users,
  ChevronRight,
  Sparkles,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: QuickOption[];
}

interface QuickOption {
  label: string;
  value: string;
  icon: React.ElementType;
}

const initialOptions: QuickOption[] = [
  { label: 'Tender Enquiry', value: 'tender', icon: FileText },
  { label: 'Supply Chain Support', value: 'supply-chain', icon: Users },
  { label: 'SHEQ Information', value: 'sheq', icon: Shield },
  { label: 'General Enquiry', value: 'general', icon: Building2 },
];

const conversationFlows: Record<string, { response: string; options?: QuickOption[] }> = {
  tender: {
    response: `Thank you for your interest in tendering with Vale Southern. I'll help you submit an enquiry.

To proceed, I'll need a few details:

**1. Project Value Range:**
- Under £1M
- £1M - £5M
- £5M - £10M
- Over £10M

**2. Sector:**
- Education
- Healthcare
- Commercial
- Residential

**3. Tender Deadline**

Please share these details, or click below to speak with our Pre-Construction team directly.`,
    options: [
      { label: 'Under £1M', value: 'tender-under-1m', icon: FileText },
      { label: '£1M - £5M', value: 'tender-1-5m', icon: FileText },
      { label: 'Over £5M', value: 'tender-over-5m', icon: FileText },
      { label: 'Speak to Team', value: 'contact-precon', icon: Users },
    ]
  },
  'supply-chain': {
    response: `Welcome to Vale Southern Supply Chain Support. I can help with:

**Subcontractor Portal Access:**
Visit our portal at portal.valesouthern.co.uk to register or log in.

**Prequalification Requirements:**
- Valid public liability insurance (min. £5M)
- Employers' liability insurance (min. £10M)
- Professional indemnity (where applicable)
- Current SSIP accreditation (CHAS, SafeContractor, etc.)
- Right to work documentation

**Payment Terms:**
Standard 30-day payment terms from certified invoice date.

How else can I assist you?`,
    options: [
      { label: 'Portal Access', value: 'portal-access', icon: Users },
      { label: 'Insurance Queries', value: 'insurance', icon: Shield },
      { label: 'Payment Queries', value: 'payments', icon: FileText },
      { label: 'Speak to Team', value: 'contact-supply', icon: Users },
    ]
  },
  sheq: {
    response: `Vale Southern maintains the highest standards in Safety, Health, Environment, and Quality.

**Our Certifications:**
- ISO 9001:2015 (Quality Management)
- ISO 14001:2015 (Environmental Management)
- ISO 45001:2018 (Occupational Health & Safety)

**The Golden Thread:**
We maintain full digital traceability of all building safety information, ensuring compliance with the Building Safety Act 2022.

**Key Commitments:**
- Zero harm target
- Net zero carbon by 2030
- 95%+ waste diverted from landfill
- Community benefit on every project

What specific SHEQ information would you like?`,
    options: [
      { label: 'H&S Policy', value: 'hs-policy', icon: Shield },
      { label: 'Environmental', value: 'environment', icon: Building2 },
      { label: 'Golden Thread', value: 'golden-thread', icon: FileText },
      { label: 'Certifications', value: 'certifications', icon: Shield },
    ]
  },
  general: {
    response: `Thank you for contacting Vale Southern Construction.

**How to reach us:**
- Phone: 023 9200 0000
- Email: enquiries@valesouthern.co.uk
- Address: Vale House, Lakeside North Harbour, Portsmouth, PO6 3EN

**Office Hours:**
Monday - Friday: 8:00 AM - 5:30 PM

I'm here to answer questions about:
- Our projects and capabilities
- Career opportunities
- Partnership enquiries
- Media and press

What would you like to know?`,
    options: [
      { label: 'Our Projects', value: 'projects', icon: Building2 },
      { label: 'Careers', value: 'careers', icon: Users },
      { label: 'Media Enquiry', value: 'media', icon: FileText },
      { label: 'Visit Office', value: 'visit', icon: Building2 },
    ]
  },
  'portal-access': {
    response: `**Subcontractor Portal Registration:**

To register for our Supply Chain Portal:

1. Visit portal.valesouthern.co.uk/register
2. Complete the registration form with company details
3. Upload required documentation:
   - Company registration certificate
   - Insurance certificates
   - SSIP certificate
   - Key personnel CVs

4. Our team will review within 3 working days

**Already registered?**
Log in at portal.valesouthern.co.uk with your credentials.

Need help? Contact supply.chain@valesouthern.co.uk`,
  },
  'golden-thread': {
    response: `**The Golden Thread at Vale Southern**

The Golden Thread is the digital record of building safety information that must be managed throughout a building's lifecycle.

**Our Approach:**
- BIM Level 2 on all projects
- Digital O&M documentation
- Full product data specification
- Change control audit trail
- Handover to Building Safety Manager

**Compliance Framework:**
- Building Safety Act 2022
- Higher-Risk Buildings regulations
- BS 8644 (Digital Management of Fire Safety Information)

**Key Benefits:**
- Complete traceability of safety-critical information
- Real-time access for Accountable Persons
- Reduced liability risk
- Future-proofed building documentation

Would you like to discuss Golden Thread requirements for your project?`,
  },
  careers: {
    response: `**Careers at Vale Southern**

Join one of the South's leading construction companies.

**Current Opportunities:**
- Site Managers
- Quantity Surveyors
- Project Managers
- Design Managers
- Trainee positions

**What We Offer:**
- Competitive salary & benefits
- Professional development & training
- Clear career progression
- Flexible working options
- Health & wellbeing support

**Graduate & Apprentice Programmes:**
We invest in the next generation with structured development programmes.

View all vacancies at valesouthern.co.uk/careers or email careers@valesouthern.co.uk`,
  }
};

export default function ValeConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Welcome to Vale Southern Construction. I'm the Vale Concierge, here to assist you.

How can I help you today?`,
      timestamp: new Date(),
      options: initialOptions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: QuickOption) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option.label,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const flow = conversationFlows[option.value];
      if (flow) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: flow.response,
          timestamp: new Date(),
          options: flow.options
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `Thank you for your enquiry about "${option.label}". A member of our team will be in touch shortly.

In the meantime, you can reach us at:
- Phone: 023 9200 0000
- Email: enquiries@valesouthern.co.uk

Is there anything else I can help with?`,
          timestamp: new Date(),
          options: initialOptions
        };
        setMessages(prev => [...prev, botMessage]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Thank you for your message. I've noted your enquiry:

"${inputValue}"

For detailed assistance, our team will review this and respond within 1 working day.

**Urgent enquiries:**
Please call 023 9200 0000

Is there anything specific I can help with in the meantime?`,
        timestamp: new Date(),
        options: initialOptions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-[#002147] text-white rounded-full shadow-lg hover:bg-[#003366] transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <div className="relative">
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c5a572] rounded-full agent-pulse"></span>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-[#002147] text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center mr-3">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold flex items-center">
                Vale Concierge
                <Sparkles className="h-4 w-4 ml-2 text-[#c5a572]" />
              </div>
              <div className="text-xs text-gray-400 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Online
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-[#003366] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === 'user'
                      ? 'bg-[#002147] text-white rounded-2xl rounded-br-md'
                      : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                  } px-4 py-3`}
                >
                  <div className="flex items-start">
                    {message.type === 'bot' && (
                      <Bot className="h-4 w-4 text-[#002147] mt-1 mr-2 flex-shrink-0" />
                    )}
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                    {message.type === 'user' && (
                      <User className="h-4 w-4 ml-2 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Options */}
              {message.type === 'bot' && message.options && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-left text-sm text-gray-700 hover:bg-gray-50 hover:border-[#002147] transition-colors group"
                    >
                      <div className="flex items-center">
                        <option.icon className="h-4 w-4 text-[#707070] mr-3" />
                        {option.label}
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#002147] transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#707070] rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-[#707070] rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-[#707070] rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-[#002147] text-white rounded-xl hover:bg-[#003366] transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-center text-gray-400 flex items-center justify-center">
            <Clock className="h-3 w-3 mr-1" />
            Response time: Typically under 1 hour
          </div>
        </div>
      </div>
    </>
  );
}
