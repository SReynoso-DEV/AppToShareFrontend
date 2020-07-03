import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroupText, Input, InputGroupAddon, InputGroup, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from "axios";
import CheckboxGroup from 'react-checkbox-group'


const MakePublic = (props) => {
  const {
    buttonLabel,
    className,
    object
  } = props;

  const [features, setFeatures] = useState(['MAC', 'Apple Tv'])

  const [modal, setModal] = useState(false);
  const [topic, setTopic] = useState();

  const toggle = () => {
    console.log(object)
    setModal(!modal);
  }

  const entryTopic = (e) => {
    setTopic(e.target.value);
  }

  function send(){
    console.log(topic);
    console.log(features);        
    

    let json = {
      "features":features,
      "theme": topic
    }
    toggle();

    Swal.fire({
        title: 'Compartiendo Cubiculo',
        text: 'Estamos compartiendo el cubiculo para todos...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        }
    })
    axios.put('api/reservation/share/'+ object.data._id, json,{
      headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
  })
        .then(response => {
            Swal.close()
            console.log(response.data);
            Swal.fire({
              icon: 'success',
              title: 'Cubiculo compartido satisfactoriamente',
              html: `Ahora cualquier alumno podra ingresar a tu cubiculo :D`,
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
                html: `${error.response.data.description}`,
                showConfirmButton: true
            })
        })


  }


  
  
  return (
    <div className="d-inline-block">
      <Button color="info" onClick={toggle}><i class="fas fa-share"></i>&nbsp;{buttonLabel}</Button>&nbsp;
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Seleccione el tema y recursos a compartir</ModalHeader>
        <ModalBody>
        <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Topic</InputGroupText>
                </InputGroupAddon>
            <Input name= "topic" onChange = {(e) => entryTopic(e)}/>
        </InputGroup>
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
          <Button color="primary" onClick={send}>Publicar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MakePublic;