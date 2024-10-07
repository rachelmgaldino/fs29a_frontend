import styled from 'styled-components';
import Menu from '../../layouts/Menu';
import { Row, Col, Card } from 'react-bootstrap'
import Layout from '../../layouts/Layout';
import Grafico from '../../components/Grafico';
function Painel() {
    const TitleH1 = styled.h4`
      color: #444;
      border-bottom: 1px solid #ccc;
      padding: 12px;
    `
    return (
      <Layout>
        
        <TitleH1>Dashboard</TitleH1>
        <Row className='mt-4'>
          <Col md={6}>
            <Card>
              <Card.Header>Gráfico de Barras</Card.Header>
              <Card.Body>
                <Grafico />
              </Card.Body>
            </Card>
          </Col>
        
          <Col md={6}>
            <Card>
              <Card.Header>Gráfico de Pizza</Card.Header>
              <Card.Body />
            </Card>
          </Col>  
        </Row>
      </Layout>
    )
}

const css = {
  background: 'red',
  color: 'white',
}

export default Painel;

