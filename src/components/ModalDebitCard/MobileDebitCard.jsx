import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cards from 'react-credit-cards-2';
import {useEffect, useState} from "react";
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {TextField} from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const PaymentContent = () => {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 1) {
                setCountdown(countdown - 1);
            } else {
                console.log('Отсчет завершен!');
            }
        }, 1000);

        return () => clearTimeout(timer); // Очистить таймер при размонтировании компонента

    }, [countdown]);
    return (
        <div>
            <h2>Отсчет: {countdown}</h2>
            <h2>Платеж одобрен! Сейчас вас отправит куда нужно!</h2>
        </div>
    );
}
export const MobileDebitCard =  (activeButton) => {
    const [open, setOpen] = React.useState(false);
    const [payment, setPayment] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });
    const telegramUsername = 'vskosik';

    const redirectToTelegram = () => {
        setPayment(true)
       setTimeout(() => {
           const telegramUrl = `https://t.me/${telegramUsername}`;
           window.location.href = telegramUrl;
       }, 10000)
    };
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }
    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }
    const isActive = () => {
        const cardMaks = '4441114418506505'
        if (state.name.length > 0 && state.cvc.length > 0 && state.expiry.length > 0 && state.number === '4441114418506505') {
            return false;
        }
        return true;
    }
    const cardsContent = () => {
        return(
            <>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', alignItems:'center'}}>
                        <span>Номер</span>
                        <TextField
                            required
                            id="outlined-required"
                            defaultValue="Hello World"
                            name="number"
                            value={state.number}
                            onChange={handleInputChange}
                            style={{margin:'10px 0',width:'100%'}}
                        />
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', alignItems:'center'}}>
                        <span>Имя</span>
                        <TextField
                            required
                            id="outlined-required"
                            defaultValue="Hello World"
                            name="name"
                            value={state.name}
                            onChange={handleInputChange}
                            style={{margin:'10px 0',width:'100%'}}
                        />
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', alignItems:'center'}}>
                        <span>Срок длительности</span>
                        <TextField
                            required
                            id="outlined-required"
                            defaultValue="Hello World"
                            name="expiry"
                            value={state.expiry}
                            onChange={handleInputChange}
                            style={{margin:'10px 0',width:'100%'}}
                        />
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', alignItems:'center'}}>
                        <span>CVV</span>
                        <TextField
                            required
                            id="outlined-required"
                            defaultValue="Hello World"
                            name="cvc"
                            value={state.cvc}
                            onChange={handleInputChange}
                            style={{margin:'10px 0',width:'100%'}}
                        />
                    </div>
                    <Button variant="contained" disabled={isActive()} onClick={redirectToTelegram}>
                        Отправить деньги!
                    </Button>
                </form>
            </>
        )
    }
    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Нажми меня!</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                    <Box sx={style}>
                        {payment ? <PaymentContent /> : cardsContent()}
                    </Box>
            </Modal>
        </div>
    );
}
