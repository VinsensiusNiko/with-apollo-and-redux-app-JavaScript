import React from 'react';
import Navigation from '../components/navigation';
import Head from 'next/head';
import Layout from '../components/layout';

const aboutUs = () => {
    const pageConfig = {
        title : "--About Us--"
    }

    return (
        <Layout pageConfig = {pageConfig}>
            <div className="main">
                <h2>About Us</h2>
                <p>Lorep ipsum lorem ipsum natadecoco dugar milk coconut nata coco de burst</p>
            </div>
        </Layout>
    );
}

export default aboutUs;
