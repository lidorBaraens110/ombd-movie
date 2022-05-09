import  { FC } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { IModal } from '../interface/movie.interface';
import './modal.css';
import { defaultImg } from '../constant';



const ModalMovie:FC<IModal>=({open,modalMovie,toggle})=> {


    return (
      
        <Modal size='lg' isOpen={open} toggle={toggle}>
          <ModalHeader toggle={toggle}>{modalMovie?.Title}</ModalHeader>
          <ModalBody>
            <div className="details">
           <p><span className='span'>Plot:</span> {modalMovie?.Plot||'no data'}</p>
           <p><span className='span'>Actors:</span> {modalMovie?.Actors||'no data'}</p>
          <p><span className='span'>Released Date:</span> {modalMovie?.Released||'no data'}</p>
           <p><span className='span'>Awards:</span> {modalMovie?.Awards||'no data'}</p>
           <p><span className='span'>Directors:</span> {modalMovie?.Director||'no data'}</p>
           <p><span className='span'>Writers:</span> {modalMovie?.Writer||'no data'}</p>
           <p><span className='span'>Rate:</span> {modalMovie?.imdbRating||'no data'}</p>
            </div>
            <img src={modalMovie?.Poster||defaultImg}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>ok</Button>
          </ModalFooter>
        </Modal>
      
    );
  
}

export default ModalMovie;