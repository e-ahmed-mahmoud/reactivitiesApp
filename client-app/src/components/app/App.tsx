import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from './models/Activity';
import Navbar from './layout/Navbar';
import ActivitiesDashboard from '../features/activities/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';

const urlAddress = 'https://localhost:5001/api/activities';

function App() {

  //state
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>(urlAddress).then(response => {
      setActivities(response.data);
    })
  }, []);

  function HandleSelectedActivity(id: String) {
    setSelectedActivity(activities.find(act => act.id === id));
    setEditMode(false);
  }

  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  function openActivityForm(id?: string) {
    id ? HandleSelectedActivity(id) : setSelectedActivity(undefined);
    setEditMode(true);
  }

  function closedActivityForm() {
    setEditMode(false);
  }

  function createOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(act => act.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function deleteActivity (id : string ){
    setActivities([...activities.filter(act => act.id !== id)]);
    setSelectedActivity(undefined);
    
  }

  return (
    <>
      <Navbar openForm={openActivityForm} editMode={editMode} />

      <Container style={{ marginTop: "7em" }} >
        <ActivitiesDashboard
          activities={activities} 
          selectActivity={HandleSelectedActivity}
          selectedActivity={selectedActivity} 
          cancelSelectedActivity={cancelSelectedActivity}
          openForm={openActivityForm} 
          closeForm={closedActivityForm} 
          createOrEditActivity = {createOrEditActivity}
          deleteActivity = {deleteActivity}
          editMode={editMode}
        />
      </Container>

    </>
  );
}

export default App;
