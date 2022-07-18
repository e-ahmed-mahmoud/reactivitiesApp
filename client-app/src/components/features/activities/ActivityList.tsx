import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../app/models/Activity';

interface Props {
    activities:Activity[];
    selectActivity: (id :string) => void;
    deleteActivity: (id : string) => void;
}
 
//Segment used for adding some margin and padding among items
//<Item.Group /> Group of items devided mean horizental items
//Item: Item define Grid where all data wrapper inside <Item.Content> and
    //Item provides nested component  as <Header, Descripation, Meta, Extra > 
export default function ActivityList ({activities , selectActivity, deleteActivity} : Props) {
    return (
            <Segment>                       
            <Item.Group divided>         
                    {activities.map(activity =>
                        <Item key={activity.id} >
                            <Item.Content>
                                <Item.Header as='a' content={activity.title}/>
                                <Item.Meta content={activity.date} />
                                <Item.Description >
                                    <div> {activity.description} </div>
                                    <div> {activity.city}, {activity.venue}  </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={()=> selectActivity(activity.id)} content='view' floated='right' color='blue' />
                                    <Button onClick={()=> deleteActivity(activity.id)} content='Delete' floated='right' color='red' />
                                    <Label content={activity.category}  basic/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                )}
            </Item.Group>
        </Segment> 
     );
}
 