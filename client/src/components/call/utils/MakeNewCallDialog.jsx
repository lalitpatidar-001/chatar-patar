import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react'
import CreateNewGroupForm from './CreateNewGroupForm';
import { X } from 'phosphor-react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';

const MakeNewCallDialog = ({ makeNewCallDialogOpen, setMakeNewCallDialogOpen }) => {

    const handleClose = () => {
        setMakeNewCallDialogOpen(false);
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
            open={makeNewCallDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"

        >
            <div className='flex flex-col gap-3 '>
                <DialogTitle
                >
               <div className='flex justify-between items-center font-semibold '>
                <span> Start New Call</span>
                <X
                className='text-xl text-gray-500 cursor-pointer'
                 onClick={handleClose}/>
               </div>
                </DialogTitle>

                <DialogContent >
                    <DialogContentText >
                        <div className='flex flex-col gap-2 w-full '>
                        {/* saerch bar */}
                         <SearchBar />

                        {/* list of contacts */}
                        <ContactList/>
                        </div>
                        {/* create new group form */}
                        

                    </DialogContentText>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default MakeNewCallDialog