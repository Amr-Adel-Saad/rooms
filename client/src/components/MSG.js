import React from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Message, MessageText } from '@livechat/ui-kit';
import ReactEmoji from 'react-emoji';

const MSG = ({ message: {user, text}, name }) => {

    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ?   (
                <Message isOwn authorName={user}>
                    <MessageText className="own-message">{ReactEmoji.emojify(text)}</MessageText>
                </Message>
            )
            :   (
                <Message authorName={user}>
                    <MessageText className="msg">{ReactEmoji.emojify(text)}</MessageText>
                </Message>
            )
    );
}

export default MSG;