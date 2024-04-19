import { Row, Col, Card, Image, ListGroup } from 'react-bootstrap'

import LandPlotInfo from './LandPlotInfo.component';


const UserCard = ({ userInfo }) => {
  // Extract data
  const { landPlots } = userInfo;

  return (
    <Col xs={12} md={6}>
      <Card>
        <Card.Header >
          <Row >
            <Col xs={4} md={5} lg={3} sm={3} className="overflow-hidden">
              <Image src={userInfo.photo} style={{ maxHeight: "100px", width: "auto" }} />
            </Col>
            <Col xs={8} md={7} lg={9} sm={9}>
              <h4>{`${userInfo.firstName} ${userInfo.lastName}`}</h4>
              <Row>
                <Col >
                  Ділянки: {landPlots.map(landPlot => landPlot.number).join(', ')}
                </Col>
              </Row>
              <Row>
                <Col >
                  Тел.: {userInfo.phoneNumber}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup>
          {landPlots.map(landPlot => (
            <LandPlotInfo key={landPlot.number} landPlot={landPlot} />
          ))}
        </ListGroup>
      </Card>
    </Col>
  )
}

export default UserCard
