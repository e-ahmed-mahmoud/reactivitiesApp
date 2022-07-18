import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../app/models/Activity';

interface Props {
    activity: Activity;
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivityDetials: Function = ({ activity, cancelSelectedActivity, openForm, deleteActivity }: Props) => {
    return (
        <Card fluid>
            <Image src={`/assets/images/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='3'>
                    <Button basic color='blue' content="Edit" onClick={() => openForm(activity.id)} />
                    <Button basic color='green' content="Delete" onClick={() => deleteActivity(activity.id)} />
                    <Button basic color='red' content="Cancel" onClick={cancelSelectedActivity} />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetials;