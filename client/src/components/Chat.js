import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InputBar from './InputBar';
import InfoBar from './InfoBar';
import Messages from './Messages';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { ThemeProvider } from '@livechat/ui-kit';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersList, setUsers] = useState([]);
  const ENDPOINT = '/';

  useEffect(() => {

    const {name, room} = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit('join', {name, room}, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [messages, usersList]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    };
  };

  const closeChat = (e) => {
    socket.emit('disconnect');
    socket.off();
  };

  return (
    <Container className="chat-cont p-4">
      <div className="wrapper">
        <ThemeProvider>
          <InfoBar room={room} closeChat={closeChat} />
          <Messages messages={messages} name={name} />
          <InputBar message={message} sendMessage={sendMessage} setMessage={setMessage} />
        </ThemeProvider>
      </div>
      <div className="users m-3">
        <h4>Members</h4>
        {usersList.map((user, i) => <div key={i}><h5>{user.name}</h5></div>)}
      </div>
    </Container>
  );
}

export default Chat;