import React, { useEffect, useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageInput, TypingIndicator, MessageList, Message  } from "@chatscope/chat-ui-kit-react";
import { Viewer } from '@react-pdf-viewer/core';

const ChatPage = () => {
    const [file, setFile] = useState('');
    useEffect(() => {
      const fileUrl = window.localStorage.getItem('url');
      const data = JSON.parse(fileUrl);
      setFile(data);
    }, [])
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
        <section className='border-2 border-black h-screen w-full flex flex-row gap-0'>
            <div className='relative border-2 border-red-900 w-1/2 h-screen flex flex-col gap-0'>
              <div className='h-1/2 w-full border-b-[1px] border-gray-400'>
                <Viewer fileUrl={file}/>
              </div>
              <div className='h-1/2 w-full border-t-[1px] border-gray-400 text-center font-mono font-bold overflow-y-scroll'>
                <h1 className='text-3xl p-2'>PDF Summary</h1>
                <p className='text-xl text-wrap p-8'>Lorem ipsum dolor,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum consequatur voluptate numquam quod officia ratione voluptates blanditiis, sit accusamus veniam doloremque officiis amet vitae pariatur nisi odit possimus eos? A! sit amet consectetur adipisicing elit. Quis nihil, atque animi distinctio dignissimos corporis harum. Rem sed a corporis minus laudantium, nobis accusamus error saepe quaerat repellendus aspernatur autem.</p>
              </div>
            </div>
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
                        <MessageInput placeholder='Enter your question' onSend={handleSendMessage} unselectable='on' />
                    </ChatContainer>
                </MainContainer>
            </div>
        </section>
    </>
  )
}

export default ChatPage