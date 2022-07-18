import { Container, Menu, Button } from 'semantic-ui-react';

interface Props {
    openForm: (id : undefined) => void;
    editMode: boolean;
}

export default function Navbar({ openForm, editMode }: Props) {
    function HandleopenForm() {
        editMode = true;
        openForm(undefined);
    }

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src="/assets/images/logo.png" alt="logo" style={{ marginRight: "8px" }} />
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={HandleopenForm}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
