import React from 'react';
import Header from '../components/Header';
import Trainingen from '../components/Trainingen';

export default function Home(props) {
    return (
        <>
            <Header title="Practices" />
            <Trainingen />
        </>
    )
}
