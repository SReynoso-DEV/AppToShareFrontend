import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,Table } from 'reactstrap';



const RoomDetail = (props) => {
  const {
    buttonLabel,
    className,
    object
  } = props;

  const [modal, setModal] = useState(false);


  const toggle = () => {
    console.log(object)
    setModal(!modal);
  }

  function recorriendo(seat) {
        let features = ""  
        if (seat.features == null)
        {
          return ""
        }
        else{
          seat.features.map(f =>
            features += f + ", "
        )
        features = features.slice(0, -2);
        return features
        }      
        
    }
  
  return (
    <div className="d-inline-block">
      <Button color="danger" onClick={toggle}><i class="fas fa-info"></i>&nbsp;{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered={true}>
        <ModalHeader toggle={toggle}>Cubiculo {object.data.room.code} | Capacidad {object.data.seats.length}/{object.data.room.seats} | {object.data.theme}</ModalHeader>
        <ModalBody>
        <div className="mb-4">        
          <Button className="text-center mr-1" color="info"><i class="fas fa-info-circle"></i>&nbsp;Ayuda</Button>&emsp;
          <Button className="text-center mr-1" color="info"><i class="far fa-clipboard"></i>&nbsp;Copiar ID</Button>&emsp;          
          <Button className="text-center" color="info"><i class="fas fa-door-open"></i>&nbsp;Salir</Button>         
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center">Nombre y Apellido</th>
              <th className="text-center">TIU</th>
              <th className="text-center">Recursos</th>
            </tr>
          </thead>
          <tbody>
            {object.data.seats.map((seat, index) => 
              <tr key = {seat.userCode}>
                <th scope="row">{index+1}</th>
                <td className="text-center">{seat.name}</td>
                <td className="text-center">{seat.userCode}</td>
                <td>{recorriendo(seat)}</td>
                
              </tr>
            )}
          </tbody>
        </Table>

        </ModalBody>
      </Modal>
    </div>
  );
}

export default RoomDetail;