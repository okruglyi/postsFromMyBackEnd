import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';

export const SimpleDialog = ({title, text, openDialog, handleCloseDialog}) => {
    /*  const [open, setOpen] = useState(openDialog)

      const handleClose = () => {
          setOpen(false)
      }*/

    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onMouseUp={() => handleCloseDialog(true)}>Да</Button>
                <Button autoFocus onMouseUp={() => handleCloseDialog(false)}>Нет</Button>
            </DialogActions>
        </Dialog>
    )
}