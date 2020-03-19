import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";


const controls = [
    {label: " Salad", type: "salad"},
    {label: " Bacon", type: "bacon"},
    {label: " Cheese", type: "cheese"},
    {label: " Meat", type: "meat"}

];

const buildControls =(props) => (

    <div className={classes.BuildControls}>
        <p>Current Price: <strong> {props.price.toFixed(2)} £</strong></p>

        {controls.map(ctrl => (
            <BuildControl key={ctrl.label}
                          label={ctrl.label}
                          added={() => props.ingredientAdded(ctrl.type)}
                          removed={() => props.ingredientRemove(ctrl.type)}
                          disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            disabled={!props.purchasable}
            onClick={props.ordered}
            className={classes.OrderButton}>{props.isAuth ? "ODER NOW" : "SIGN IN TO ORDER"}</button>
    </div>
);


export default buildControls;