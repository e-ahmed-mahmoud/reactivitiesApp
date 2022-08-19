import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from './models/Activity';
import Navbar from './layout/Navbar';
import ActivitiesDashboard from '../features/activities/ActivitiesDashboard';
import { v4 as uuid } from 'uuid';
import agent from './api/axiosagnet';
import LoadingComponent from './layout/LoadingCompnent';

function App() {

  //state
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting , setDeleting] = useState(false);
  

  useEffect(() => {
    agent.Activities.list().then(res => {
      let activities: Activity[] = [];
      res.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
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
    //update
    if (activity.id) {
      setSubmitting(true);
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(act => act.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    //create
    else {
      setSubmitting(true);
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity }]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function deleteActivity(id: string) {
    setDeleting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(act => act.id !== id)]);
      setSelectedActivity(undefined);
      setDeleting(false);
    }).catch(error => alert(error));

  }
  return (loading) ? <LoadingComponent /> :
    (
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
            createOrEditActivity={createOrEditActivity}
            deleteActivity={deleteActivity}
            editMode={editMode}
            submitting={submitting}
            deleting={deleting}
          />
        </Container>

      </>
    );
}

export default App;
