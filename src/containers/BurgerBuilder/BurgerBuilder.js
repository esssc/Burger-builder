import React, {useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';


import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OderSummary from "../../components/Burger/OderSummary/OderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import axios from "../../axios-oders";


export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);


   const ings = useSelector( state => {
       return state.burgerBuilder.ingredients;
   });
    const price = useSelector( state =>  state.burgerBuilder.totalPrice );
    const error = useSelector( state =>  state.burgerBuilder.error );
    const isAuthenticated = useSelector( state =>  state.auth.token !== null );


    const dispatch = useDispatch();
    const onIgredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemove = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectionPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);


    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };


    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push("/auth");
        }

    };
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };
    const purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push("price=" + this.state.totalPrice);
        //
        // const queryString = queryParams.join("&");
        onInitPurchase();
        props.history.push({
            pathname: "/checkout"
            //search: "?" + queryString
        })
    };


    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let oderSummary = null;
    let burger = error ? <p style={{textAlign: "center"}}>Can't reach ingredients now </p> : <Spinner/>;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredientAdded={onIgredientAdded}
                    ingredientRemove={onIngredientRemove}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    price={price}
                    isAuth={isAuthenticated}
                    ordered={purchaseHandler}/>
            </Aux>
        );
        oderSummary = <OderSummary
            ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            totalPrice={price}
        />;
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {oderSummary}
            </Modal>
            {burger}
        </Aux>

    )


};


export default withErrorHandler(BurgerBuilder, axios);