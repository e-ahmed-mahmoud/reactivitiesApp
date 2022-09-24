import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/statemanagement/store";
import ActivityDetials from "../Detials/ActivityDetials";
import CreateActivity from "../Forms/CreateActivity";
import ActivityList from "./ActivityList";

export default observer(function ActivitiesDashboard() {
    const {activityStore} = useStore();    
    const {editMode , selectedActivity} = activityStore;
    return (
        <Grid >
            <Grid.Column width={10} >
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetials  />
                }
                {
                    // when in edit mode
                    editMode && 
                    <CreateActivity />
                }
            </Grid.Column>
        </Grid>
    );
})