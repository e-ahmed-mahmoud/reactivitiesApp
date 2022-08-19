import { Grid } from "semantic-ui-react";
import { Activity } from "../../app/models/Activity";
import ActivityDetials from "../Detials/ActivityDetials";
import CreateActivity from "../Forms/CreateActivity";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    selectedActivity: Activity | undefined;
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
    deleting: boolean;
}

export default function ActivitiesDashboard({ activities, selectActivity,
    selectedActivity, cancelSelectedActivity, openForm, closeForm, editMode,
    createOrEditActivity, deleteActivity, submitting , deleting}: Props) {
    return (
        <Grid >
            <Grid.Column width={10} >
                <ActivityList activities={activities}
                    selectActivity={selectActivity} 
                    deleteActivity={deleteActivity} deleting={deleting}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetials activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity}
                        openForm={openForm} deleteActivity={deleteActivity} deleting={deleting} />
                }
                {
                    // when in edit mode
                    editMode &&
                    <CreateActivity selectedActivity={selectedActivity} 
                    closeForm={closeForm} 
                    createOrEditActivity={createOrEditActivity} 
                    submitting = {submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    );
}