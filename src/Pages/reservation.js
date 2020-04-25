import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroupText, Input, InputGroupAddon, InputGroup } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    object
  } = props;

  const [modal, setModal] = useState(false);
  const [tiu, setTiu] = useState();
  const [hours, setHours] = useState();
  const [json, setJson] = useState([]);

  const toggle = () => setModal(!modal);

  const entryTiu = (e) => {
    setTiu(e.target.value);
  }

  const entryHours = (e) => {
    setHours(e.target.value);
  }
  const send = () => {    
    setJson({
              "room": {
                  "office" : object.office,
                  "code" : object.code
              },
              "hours" : hours,
              "userSecondayCode" : tiu,
              "start" : object.start
          }) 
      setModal(!modal);
  }
  console.log(json)
  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Usuario Activador</ModalHeader>
        <ModalBody>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>TIU</InputGroupText>
                </InputGroupAddon>
            <Input name= "tiu" onChange = {(e) => entryTiu(e)}/>
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText># Horas</InputGroupText>
                </InputGroupAddon>
            <Input name= "hours" type="number" onChange = {(e) => entryHours(e)}/>
            </InputGroup>
        </ModalBody>        
        <ModalFooter>
          <Button color="primary" onClick={send}>Reservar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;