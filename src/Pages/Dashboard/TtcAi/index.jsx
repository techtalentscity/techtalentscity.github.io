import { Input } from "antd";
import { useState, useRef, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";

const TtcAi = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Welcome to TechTalent City AI Career Path. How can I assist you today?' },
    { id: 2, sender: 'user', text: 'I need help with my React project.' },
    { id: 3, sender: 'ai', text: 'Sure, I can help with that. What specific issues are you facing?' },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-105px)] bg-white relative">
      {messages.length >= 0 && (
        <div className="text-center mb-4 flex flex-col justify-center items-center w-full pt-24 text-[#000606]">
          <p className="text-3xl md:text-4xl font-bold max-w-lg">Welcome to TechTalent City AI Career Path</p>
          <p className="max-w-xl pt-3 text-sm md:text-base">Use TTC AI to get project recommendations tailored to your field of interest and access past projects, learning and resources to fast-track your success in your tech talent journey.</p>
        </div>
      )}
      {/* <div className="flex-grow flex flex-col rounded-lg shadow-inner overflow-y-auto p-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-2 p-2 rounded-lg max-w-[75%] inline-block ${message.sender === 'ai' ? 'bg-blue-100 self-start' : 'bg-green-100 self-end'} text-sm`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} className="mb-20" />
      </div> */}
      <div className="absolute bottom-0 left-0 right-0 bg-white flex items-center p-4">
        <div className='w-full rounded-[52px] border bg-transparent flex justify-between items-start py-2 px-5'>
          <Input
            placeholder="Chat with the TTC AI Career Paths Agent"
            className="flex-grow border-none mr-2 custom-ai-input"
          />
          <div className="w-8 pt-2 rounded-full flex justify-center items-center">
            <AiOutlineSend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TtcAi;
