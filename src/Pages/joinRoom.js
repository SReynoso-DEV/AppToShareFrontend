import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Swal from 'sweetalert2';
import axios from "axios";
import CheckboxGroup from 'react-checkbox-group'


const JoinRoom = (props) => {
  const {
    buttonLabel,
    className,
    object
  } = props;

  const [features, setFeatures] = useState(['MAC', 'Apple Tv'])

  const [modal, setModal] = useState(false);

  const toggle = () => {
    console.log(object)
    setModal(!modal);
  }  

  function send(){
    console.log(features);        
    

    let json = {
      "features":features
    }
    toggle();

    Swal.fire({
        title: 'Ingresando al Cubiculo',
        text: 'Estamos reservandote un asiento...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        }
    })
    axios.post('api/reservation/public/'+ object.data._id, json,{
      headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
  })
        .then(response => {
            Swal.close()
            console.log(response.data);
            Swal.fire({
              icon: 'success',
              title: 'Has ingresado al cubiculo satisfactoriamente',
              html: `Cubiculo: ${object.data.room.code}<br/>Topic: ${object.data.theme}<br/>Inicio: ${object.data.start}<br/>Fin: ${object.data.end}`,
              showConfirmButton: true
          }).then(function (result){
            if (result.value){ 
              window.location.reload(false);
            }
        })
        })
        .catch(error => {
            Swal.hideLoading()
            console.log(error.response)
            Swal.fire({
                icon: 'error',
                title: 'Error :(',
                html: `${error.response.data.description.message}`,
                showConfirmButton: true
            })
        })
  }  
  
  return (
    <div className="d-inline-block">
      <Button color="info" onClick={toggle}><i class="fas fa-share"></i>&nbsp;{buttonLabel}</Button>&nbsp;
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Ingresando al cubiculo {object.data.room.code} | Topic: {object.data.theme}</ModalHeader>
        <ModalBody>        
        <CheckboxGroup name="features" value={features} onChange={setFeatures}>
      {(Checkbox) => (
        <>
          <label className="mr-2 mt-2">
            <Checkbox value="MAC" /> MAC
          </label>
          <label className="mr-2 mt-2">
            <Checkbox value="Apple Tv" /> Apple Tv
          </label>          
        </>
      )}
    </CheckboxGroup>

        </ModalBody>        
         <ModalFooter>
          <Button color="primary" onClick={send}>Ingresar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default JoinRoom;