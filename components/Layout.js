import React from 'react';
import Head from 'next/head';
import Navigation from './navigation';

const Layout = ({children, pageConfig}) =>{
    //console.log(pageConfig);
    const {title} = pageConfig;

    return (
        <div>
            <Head>
                <title> {title} </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navigation />
            {children}
        </div>
    );
}

export default Layout;
