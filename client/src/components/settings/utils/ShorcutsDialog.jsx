import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Stack, Typography } from '@mui/material';
import React from 'react'
import { shortcut_list } from './shortcut_list';

const ShorcutsDialog = ({shortuctDialogOpen, setShortuctDialogOpen}) => {

     const handleClose = () => {
        setShortuctDialogOpen(false);
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
            maxWidth="md"
            open={shortuctDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
    <DialogTitle>Keyboard Shorcuts</DialogTitle>
    <DialogContent>
        <Grid container spacing={3}>
            {
                shortcut_list.map(({key ,title , combination})=>(
                        <Grid key={key} container item sx={6}>
                            <Stack sx={{width:"100%"}}
                            justifyContent="space-between"
                           spacing={3}
                           direction="row" 
                           alignContent="center"
                            >
                            <Typography variant='caption' sx={{fontSize:14}}>{title}</Typography>
                        <Stack spacing={2} direction="row">
                            {combination.map((el)=>(
                                <>
                                  <Button disabled variant='contained' sx={{color:"#212121"}}>
                                    {el}
                                  </Button>  
                                </>
                            ))}
                        </Stack>
                            </Stack>
                        </Grid>
                ))
            }
        </Grid>
    </DialogContent>

            <DialogActions>
                <button className='bg-blue-600 text-white py-1 px-2 mr-4 rounded font-semibold' onClick={handleClose}>Ok</button>
            </DialogActions>
        </Dialog>
    );

   }

export default ShorcutsDialog