import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const XbtnBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Xbtn = styled.button`
  color: #adb5bd;
  background-color: white;
  border: none;
  font-size: 20px;
  flex-direction: column;
`;
const BtnBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const btnStyle = {
  bgcolor: '#9775fa',
  '&:hover': {
    backgroundColor: '#9775fa',
    color: '#fff',
  },
};

function PopUp({ YN = false, comment, title, handleClose }) {
  return (
    <div>
      <Modal open={YN} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between', top: '50%', left: '50%' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {title}
            </Typography>
            <XbtnBlock>
              <Xbtn onClick={handleClose}>X</Xbtn>
            </XbtnBlock>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            {comment}
          </Typography>
          <BtnBlock>
            <Button variant="contained" sx={btnStyle} size="medium" onClick={handleClose}>
              닫기
            </Button>
          </BtnBlock>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUp;
