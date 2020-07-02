import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from "axios";

const ModalExample2 = (props) => {
  const {
    buttonLabel,
    className,
    object
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function send() {    
      setModal(!modal);
      Swal.fire({
        title: 'Desea activar este cubiculo?',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        }
    })
    axios.put('api/reservation/'+object.id,{}, {
      headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
  })
        .then(response => {
            Swal.close()
            console.log(response.data);
            Swal.fire({
              icon: 'success',
              title: 'Cubiculo Activado Correctamente',
              showConfirmButton: true
          }).then(function (result){
            if (result.value){ 
              window.location.href = "/#/activation"
            }
        })
        })
        .catch(error => {
            Swal.close()
            console.log(error.response)
            Swal.fire({
              icon: 'error',
              title: 'Error :(',
              html: `${error.response}`,
              showConfirmButton: true
          }).then(function (result){
            if (result.value){ 
              window.location.href = "/#/activation"
            }
        })
        })
  }
 
  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Activar cubículo</ModalHeader>
        <ModalBody>
        <InputGroup>
                
            </InputGroup>
        </ModalBody>        
        <ModalFooter>
          <Button color="primary" onClick={() =>send()}>Activar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample2;