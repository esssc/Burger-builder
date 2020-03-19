import { useState, useEffect } from 'react';



export default httpClient => {
    const [errorState, setErrorState] = useState();

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setErrorState(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setErrorState(err);
    });


    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);



    const errorConfirmedHandler = () => {
        setErrorState(null);
    };
    return [errorState, errorConfirmedHandler];
}