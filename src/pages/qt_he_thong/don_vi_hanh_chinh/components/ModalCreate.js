import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormCreate from './FormCreate';

export default function FormDialog(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>THÊM MỚI HỌC VIÊN</DialogTitle>
        <DialogContent>
          <FormCreate />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Huỷ
          </Button>
          <Button onClick={handleClose} color='primary'>
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
