import React, { ReactNode, useEffect } from 'react';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Button from '@material-ui/core/Button';

// components
import { Div } from './Layout';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>) {
    return <Slide direction="down" ref={ref} {...props} />;
});

type ModalProps = {show: boolean, title?: ReactNode, body?: ReactNode, onClose: Function, onEscape?: Function, onOk?: Function};

const Modal = (props: ModalProps) => {

    const handleClose = () => props.onClose();
    const handleEscapeKey = () => props.onEscape && props.onEscape();

    const handleOk = () => {
        props.onOk && props.onOk();
        handleClose();
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscapeKey, false);
        return () => document.removeEventListener("keydown", handleEscapeKey, false);
    }, []);
    
    return (
        <Dialog
            open={props.show}
            TransitionComponent={Transition}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="lg"
        >
            <Div relative>
                {props.title}
                {props.body}
            </Div>

            <DialogActions>
                <Button onClick={handleClose} color="default">
                    {
                        // For semantic reasons: 
                        // if the 'Close' button is juxtaposed with 'OK' button, it should say 'Cancel'
                        props.onOk ? 'Cancel' : 'Close'
                    }
                </Button>
                {
                    props.onOk &&
                    <Button onClick={handleOk} color="default">
                        OK
                    </Button>
                }                
            </DialogActions>
            
        </Dialog>
    )
}

export default Modal;