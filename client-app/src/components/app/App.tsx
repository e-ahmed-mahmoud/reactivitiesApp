import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import Navbar from './layout/Navbar';
import ActivitiesDashboard from '../features/activities/ActivitiesDashboard';
import LoadingComponent from './layout/LoadingCompnent';
import { useStore } from './statemanagement/store';
import { observer } from 'mobx-react-lite';

function App() {

  const store = useStore();

  useEffect(() => { store.activityStore.loadingActivities() }, [store.activityStore]);

  return (store.activityStore.loading) ? <LoadingComponent /> :
    (
      <>
        <Navbar />
        <Container style={{ marginTop: "7em" }} >
          <ActivitiesDashboard />
        </Container>

      </>
    );
}

export default observer(App);
