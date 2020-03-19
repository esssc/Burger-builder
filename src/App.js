import React, { useEffect, Suspense } from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import * as actions from './store/actions/index';



const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Orders = React.lazy(() => {
    return import('./containers/Oders/Orders')
});

const App = props => {

    const { onTryAutoSignUp } = props;
    useEffect(() => {
       onTryAutoSignUp();
    }, [onTryAutoSignUp]);

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (props.isAuthenticated){
           routes = (
               <Switch>
                   <Route path="/checkout" component={(props) => <Checkout {...props} />}/>
                   <Route path="/orders" render={(props) => <Orders {...props}/>}/>
                   <Route path="/logout" component={Logout} />
                   <Route path="/auth" render={(props) => <Auth {...props}/>} />
                   <Route path="/" exact component={BurgerBuilder}/>
                   <Redirect to='/'/>
               </Switch>
           );
        }
        return (
            <div>
                <Layout>
                    <Suspense fallback={<p>Loading...</p>} >{routes}</Suspense>
                </Layout>
            </div>
        );

};
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  }
};
const mapDispatchToProps = dispatch => {
  return {
      onTryAutoSignUp: () => dispatch( actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
