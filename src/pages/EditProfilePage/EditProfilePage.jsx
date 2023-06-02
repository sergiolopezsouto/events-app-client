import { Container, Row, Col } from 'react-bootstrap'
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm'


const EditProfilePage = () => {

    return (

        < Container >
            <Row>
                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Edit Profile</h1>
                    <hr />
                    <EditProfileForm />
                </Col>
            </Row>
        </Container >

    )
}

export default EditProfilePage




