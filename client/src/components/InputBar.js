import React from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Input } from 'reactstrap';
import { Row, IconButton, SendIcon} from '@livechat/ui-kit';

const InputBar = ({ message, setMessage, sendMessage }) => {

  return (
    <InputGroup>
        <Input className="input" value={message}
        placeholder="Type a message..."
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
        <Row>
          <IconButton style={{textAlign: "center", width: "70px", background: "#0275d8"}} onClick={(e) => sendMessage(e)}>
            <SendIcon className="m-auto" color="white"/>
          </IconButton>
        </Row>
    </InputGroup>
  );
}

export default InputBar;