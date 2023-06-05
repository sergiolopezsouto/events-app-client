import { Container, Tabs, Tab } from 'react-bootstrap';


function FeedPage() {



    return (

        <Container className='mt-5'>
            <Tabs defaultActiveKey="assisting" id="justify-tab-example" className="mb-5 mt-5" justify>
                <Tab eventKey="assisting" title="Is assisting">
                    Your friends are assisting...
                </Tab>
                <Tab eventKey="created" title="Has created">
                    your friends has created...
                </Tab>
            </Tabs>
        </Container>
    )
}

export default FeedPage;