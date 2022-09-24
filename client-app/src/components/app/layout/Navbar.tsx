import { Container, Menu, Button } from 'semantic-ui-react';
import { useStore } from '../statemanagement/store';


export default function Navbar() {
    const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src="/assets/images/logo.png" alt="logo" style={{ marginRight: "8px" }} />
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={() => activityStore.openActivityForm()}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
