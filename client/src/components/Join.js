import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, InputGroup, Input, Container } from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Container className="join-cont">
      <h1>Rooms :)</h1>
      <InputGroup className="my-5">
          <Input placeholder="name" type="text" onChange={e => setName(e.target.value)}/>
      </InputGroup>
      <InputGroup className="my-5">
          <Input placeholder="room" type="text" onChange={e => setRoom(e.target.value)}/>
      </InputGroup>
      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <Button className="col-3" color="primary" size="large" type="submit" >Join</Button>
      </Link>
    </Container>
  );
}

export default Join;