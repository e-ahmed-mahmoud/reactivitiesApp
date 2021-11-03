
import * as React from 'react';

import { Person } from './demo';

export interface ICounter{
    increament: number;
}

export interface Props {
    objNum : ICounter;
    Person: Person;
}

const Counter = (  {objNum, Person} : Props ) => {

    const [state,setState] = React.useState(1);

    function increamentNum(){
        return setState(state +1);
    }

    return(
        <div>
            <button onClick={()=> { increamentNum() }}>
                increamnet
            </button>
            <span style={{height:'20',width:'40'}}> { state } </span>
            <span style={{height:'20',width:'40'}}> { Person.age } </span>
        </div>
    );
}

export default Counter;