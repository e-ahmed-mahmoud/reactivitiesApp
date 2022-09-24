import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/statemanagement/store';
 
//Segment used for adding some margin and padding among items
//<Item.Group /> Group of items devided mean horizental items
//Item: Item define Grid where all data wrapper inside <Item.Content> and
    //Item provides nested component  as <Header, Descripation, Meta, Extra > 
export default observer( function ActivityList () {

    const [target , setTarget] = useState('');
    const {activityStore} = useStore();

    function handleDeleteActivity(event : SyntheticEvent<HTMLButtonElement> , id : string) {
        setTarget(event.currentTarget.name);
        activityStore.deleteActivity(id);
    }
    return (
            <Segment>                       
            <Item.Group divided>         
                    {activityStore.activityByDate.map(activity =>
                        <Item key={activity.id} >
                            <Item.Content>
                                <Item.Header as='a' content={activity.title}/>
                                <Item.Meta content={activity.date} />
                                <Item.Description >
                                    <div> {activity.description} </div>
                                    <div> {activity.city}, {activity.venue}  </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={()=> activityStore.setSelectedActivity(activity.id)}
                                        content='view' floated='right' color='blue' />
                                    <Button loading={activityStore.deleting && target === activity.id} name={activity.id}
                                        onClick={(ev)=> handleDeleteActivity(ev ,activity.id)} content='Delete' floated='right' color='red' />
                                    <Label content={activity.category}  basic/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                )}
            </Item.Group>
        </Segment> 
     );
});
 