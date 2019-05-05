import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default function Training(props) {
    console.log(props.practice);
    const { practice } = props;
    const full = (practice.allowed === practice.enrolled);
    return (
        <Card style={{margin: "10px 0"}}>
            <CardContent>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>
                            {practice.start} - {practice.end}
                    </div>
                    <div>
                        <strong style={{color: full ? "red" : ''}}>
                            {practice.enrolled} / {practice.allowed}
                        </strong>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>{practice.date}</div>
                    <div>{practice.location}</div>
                </div>
                {
                    practice.enrollPossible ? null : 
                        <div style={{textAlign: 'center'}}>
                            <i>Enrolling not possible</i>
                        </div>
                }
            </CardContent>
        </Card>
    )
}

