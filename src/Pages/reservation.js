import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroupText, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from "axios";

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    object
  } = props;

  const [modal, setModal] = useState(false);
  const [tiu, setTiu] = useState();
  const [hours, setHours] = useState();
  // const [json, setJson] = useState([]);

  const toggle = () => setModal(!modal);

  const entryTiu = (e) => {
    setTiu(e.target.value);
  }

  const entryHours = (e) => {
    setHours(e.target.value);
  }
  function send() {    
    let json = {
              "room": {
                  "office" : object.office,
                  "code" : object.code
              },
              "hours" : parseInt(hours),
              "userSecondaryCode" : tiu,
              "start" : object.start
          }
      setModal(!modal);
      Swal.fire({
        title: 'Reservando Cubiculo',
        text: 'Espera separando el cubiculo para ti.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        }
    })
    axios.post('api/reservation', json, {
      headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
  })
        .then(response => {
            Swal.close()
            console.log(response.data);
            Swal.fire({
              icon: 'success',
              title: 'Cubiculo Reservado Satisfactoriamente',
              html: `Sede: ${response.data.room.office}<br/>Codigo: ${response.data.room.code}<br/>Asientos: ${response.data.room.seats}<br/>Inicio: ${response.data.start}<br/>
                    Fin: ${response.data.end}<br/>Creador: ${response.data.userCode}<br/>Activador: ${response.data.userSecondaryCode}`,
              showConfirmButton: true
          }).then(function (result){
            if (result.value){ 
              window.location.href = "/cpublics"
            }
        })
        })
        .catch(error => {
            Swal.hideLoading()
            console.log(error.response)
            Swal.fire({
                icon: 'error',
                title: 'Error :(',
                html: `${error.response.data.description}`,
                showConfirmButton: true
            })
        })
  }
 
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