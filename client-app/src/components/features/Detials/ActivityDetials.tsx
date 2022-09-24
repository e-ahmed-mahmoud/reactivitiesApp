import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingCompnent';
import { useStore } from '../../app/statemanagement/store';


export default observer(function ActivityDetials() {

    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { deleteActivity, selectedActivity, openActivityForm, cancelSelectedActivity, deleting } = activityStore;

    function handleDeleteActivity(event: SyntheticEvent<HTMLButtonElement>, id?: string) {
        setTarget(event.currentTarget.name);
        id && deleteActivity(id);
    }

    if (!selectedActivity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/images/categoryImages/${selectedActivity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='3'>
                    <Button basic color='blue' content="Edit" onClick={() => openActivityForm(selectedActivity.id)} />
                    <Button loading={deleting && target === selectedActivity.id} basic color='green' content="Delete"
                        name={selectedActivity.id} onClick={(ev) => handleDeleteActivity(ev, selectedActivity.id)} />
                    <Button basic color='red' content="Cancel" onClick={() => cancelSelectedActivity()} />
                </Button.Group>
            </Card.Content>
        </Card>
    );
});

