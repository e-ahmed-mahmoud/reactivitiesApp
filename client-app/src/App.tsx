import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Header, List } from 'semantic-ui-react';


const urlAddress = 'https://localhost:5001/api/activities';

function App() {

  //state
  const [activities , setActivities] = useState([]);

  useEffect(()=> {
    axios.get(urlAddress).then(response => {
      console.log(response);
      setActivities(response.data);
    })
  },[]);

  return (
    <div className="ui header">
      <Header as={'h2'} icon={'users'} content={'Activities'} color='teal' />
        <List items={activities}>
          {activities.map((activity:any) => 
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          )}
        </List>
    </div>
  );
}

export default App;
