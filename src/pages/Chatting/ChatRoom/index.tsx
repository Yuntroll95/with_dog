import io from 'socket.io-client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import TitleBar from './components/TitleBar';
import Messages from './components/Messages';
import Input from './components/Input';
import { UserDataProps, ChatRoomProps, MessagesProps } from 'types/type';
import signInbg from 'assets/images/bg2.png';

let socket;

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [currentTime, SetCurrentTime] = useState('');

  const ENDPOINT = 'localhost:3000';
  // const ENDPOINT = 'http://54.180.89.143:8000';

  const storeData = useSelector((state: RootState) => state);
  const { nickname }: UserDataProps = storeData.user.userData;
  const room: ChatRoomProps = storeData.chat.id;
  const userMbti = storeData.user.userData.mbti;

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const currentHour = hours > 12 ? `오후 ${hours - 12}` : `오전 ${hours}`;

    SetCurrentTime(`${currentHour}:${minutes}`);
  }, [message]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { nickname, room });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('add_message', message => {
      const newMessage: MessagesProps = message;
      setMessages(messages => [...messages, newMessage]);
    });
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit(
        'send_message',
        message,
        nickname,
        room,
        currentTime,
        userMbti,
        () => {
          setMessage('');
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  return (
    <ChatRoomContainer>
      <TitleBar />
      <Messages messages={messages} nickname={nickname} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  ${props => props.theme.flex.flexBox('column')}
  justify-content: stretch;
  height: 100vh;
  background-image: url(${signInbg});
  background-size: cover;
  background-repeat: no-repeat;
`;

export default ChatRoom;
