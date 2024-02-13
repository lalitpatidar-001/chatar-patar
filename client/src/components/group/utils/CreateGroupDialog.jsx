import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react'
import CreateNewGroupForm from './CreateNewGroupForm';
import { X } from 'phosphor-react';

const CreateGroupDialog = ({ createGroupDialogOpen, setCreateGroupDialogOpen }) => {

    const handleClose = () => {
        setCreateGroupDialogOpen(false);
    };

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={createGroupDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"

        >
            <div className='flex flex-col gap-3'>
                <DialogTitle
                >
               <div className='flex justify-between items-center '>
                <span> Create New Group</span>
                <X
                className='text-xl text-gray-500 cursor-pointer'
                 onClick={handleClose}/>
               </div>
                </DialogTitle>

                <DialogContent >
                    <DialogContentText >

                        {/* create new group form */}
                        <CreateNewGroupForm />

                    </DialogContentText>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default CreateGroupDialog