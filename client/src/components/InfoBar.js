import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, IconButton, CloseIcon} from '@livechat/ui-kit';
import { Link } from 'react-router-dom';
import '../App.css';

const InfoBar = ({ room, closeChat }) => {

  return (
    <div className="info-bar py-1 px-3">
        <h4>{room}</h4>
        <Link to="/">
          <Row>
            <IconButton onClick={(e) => closeChat(e)}>
              <CloseIcon color="white" />
            </IconButton>
          </Row>
        </Link>
    </div>
  );
}

export default InfoBar;