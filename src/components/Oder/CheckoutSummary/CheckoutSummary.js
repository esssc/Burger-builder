import React from 'react';

import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css';
import Burger from "../../Burger/Burger";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} style={{width: "80%"}}>
            <h1>We hope it taste well!!</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutContinued} btnType="Success">CONTINUE</Button>
        </div>
    );
};


export default checkoutSummary;