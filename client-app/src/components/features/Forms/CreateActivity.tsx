import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/Activity";

interface Props {
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    createOrEditActivity : (activity : Activity) => void;
}

export default function CreateActivity({ closeForm, selectedActivity, createOrEditActivity }: Props) {

    const initialState = selectedActivity ?? { id: '', title: '', date: '', description: '', category: '', city: '', venue: '' }
    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEditActivity(activity);
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
                <Form.Input placeholder="Data" value={activity.date} name='date' onChange={handleChange} />
                <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleChange} />

                <Button floated="right" size="small" positive content="Save" type="submit" />
                <Button floated="right" size="small" content="Cancel" onClick={closeForm} />

            </Form>
        </Segment>
    );
};
