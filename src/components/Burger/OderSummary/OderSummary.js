import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const OderSummary = props => {


        const ingriedentSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>);
            });
        return (
            <Aux>
                <h3>Your oder</h3>
                <p>A delicious burger with fallowing ingredients:</p>
                <ul>
                    {ingriedentSummary}
                </ul>
                <p><strong>Total Price: {props.totalPrice.toFixed(2)} £</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
};


export default OderSummary;