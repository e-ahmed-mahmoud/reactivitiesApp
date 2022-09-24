import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../app/statemanagement/store";

// interface Props {
//     createOrEditActivity : (activity : Activity) => void;
// }

export default observer( function CreateActivity() {
    const {activityStore} = useStore();
    const initialState = activityStore.selectedActivity ?? { id: '', title: '', date: '', description: '', category: '', city: '', venue: '' }
    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        
        activityStore.createOrEditActivity(activity);
        //setActivity({ ...activity, category: '' });
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target ;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleChange} />
                <Form.TextArea placeholder="Descriptiom" value={activity.description} name='description' onChange={handleChange} />
                <Form.Input placeholder="Catagory" value={activity.category} name='category' onChange={handleChange} />
                <Form.Input type="date" placeholder="Date" value={activity.date} name='date' onChange={handleChange} />
                <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleChange} />

                <Button floated="right" loading={activityStore.submitting} size="small" positive content="Save" type="submit" />
                <Button floated="right" type="button" size="small" content="Cancel" onClick={() => activityStore.closedActivityForm()} />

            </Form>
        </Segment>
    );
});
