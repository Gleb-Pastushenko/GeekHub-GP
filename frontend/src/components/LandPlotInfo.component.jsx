import { Card, Row, Col, ListGroup } from 'react-bootstrap'


const LandPlotInfo = ({ landPlot }) => {
  return (
    <>
      <Card.Body style={{ background: "#eeeeee", fontWeight: "bold" }}>
        {`Ділянка ${landPlot.number}:`}
      </Card.Body>
      <ListGroup.Item>
        <Row>
          <Col xs={4} sm={3} md={4}>
            {"Ел.енергія.:"}
          </Col>
          <Col xs={8} sm={9} md={8}>
            {landPlot.electricity || '-'}
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={3} md={4}>
            {"Вода:"}
          </Col>
          <Col xs={8} sm={9} md={8}>
            {landPlot.well || '-'}
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={3} md={4}>
            {"Огорожа:"}
          </Col>
          <Col xs={8} sm={9} md={8}>
            {landPlot.fencing || '-'}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

export default LandPlotInfo
