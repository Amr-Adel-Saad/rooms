import React from 'react';
import MSG from './MSG';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { MessageList } from '@livechat/ui-kit';

const Messages = ({ messages, name }) => (
    <MessageList className="messages">
        {messages.map((message, id) => <div key={id}><MSG message={message} name={name} /></div>)}
    </MessageList>
);

export default Messages;