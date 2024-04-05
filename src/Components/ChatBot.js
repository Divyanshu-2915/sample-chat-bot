import React, { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageInput, TypingIndicator, MessageList, Message  } from "@chatscope/chat-ui-kit-react";

const ChatPdf = () => {
    const [loading, setLoading] = useState(false);
    const [userMsg, setUserMsg] = useState([
        {
            message: '',
            sender: '',
            direction: '',
        }
    ])
    const [botMsg, setBotMsg] = useState([
        {
            message: '',
            sender: '',
            direction: '',
        }
    ]);
    const [chatHistory, setChatHistory] = useState([
        {
            message: 'Hello!, how can I assist you',
            sender: 'chat-bot',
            direction: 'incoming'
        }
    ])

    const handleSendMessage = (message) => {
        const userMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }
        
        const botMessage = {
            message: message,
            sender: 'chat-bot',
            direction: 'incoming'
        }
        const newChatHistory = [...chatHistory, userMessage]
        setChatHistory(newChatHistory);
        setUserMsg(userMessage);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setBotMsg(botMessage);
        },2000)
    }
  return (
    <>
        <section className='border-2 border-black h-screen w-full'>
            <div className='relative border-2 border-red-900 w-1/2 h-full'>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                        typingIndicator={loading ? <TypingIndicator content='typing...'/> : null}>
                        {chatHistory && chatHistory.map((message, index) => {
                            return(
                                <Message key={index} model={message}/>
                            )
                        })}
                            <Message model={userMsg} dir='outgoing'/>
                            <Message model={botMsg} dir='incoming'/>
                        </MessageList>
                        <MessageInput placeholder='Enter your question' onSend={handleSendMessage} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </section>
    </>
  )
}

export default ChatPdf