import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../app/models/Activity';

interface Props {
    activity: Activity;
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
    deleteActivity: (id: string) => void;
    deleting: boolean;
}

const ActivityDetials: Function = ({ activity, cancelSelectedActivity, openForm, deleteActivity, deleting }: Props) => {
    
    const [target , setTarget] = useState('');
    
    function handleDeleteActivity(event : SyntheticEvent<HTMLButtonElement> , id : string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }
    
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
                    <Button loading={deleting && target === activity.id} basic color='green' content="Delete" 
                        name={activity.id} onClick={(ev) => handleDeleteActivity(ev,activity.id)} />
                    <Button basic color='red' content="Cancel" onClick={cancelSelectedActivity} />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetials;