import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { getAllContractsSummary } from '../../apis';
import Card from '../Card';

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
    };
  }

  async componentDidMount() {
    const campaigns = await getAllContractsSummary();
    // console.log(campaigns);
    this.setState({
      campaigns,
    });
  }

  render() {
    const { campaigns } = this.state;
    const campaignCards = campaigns.map(
      ({
        contractAddress,
        campaignImage,
        campaignSubject,
        campaignTitle,
        // campaignMinimum, also available
        // campaignOwner, also available
      }) => (
        <Col key={contractAddress} md={4} sm={6}>
          <Card
            campaignImage={campaignImage}
            campaignTitle={campaignTitle}
            campaignSubject={campaignSubject}
            key={contractAddress}
            contractAddress={contractAddress}
          />
        </Col>
      ),
    );

    return (
      <Container>
        {campaigns.length > 0 ? (
          <div className="py-3">
            <Row>{campaignCards}</Row>
          </div>
        ) : (
          <div className="py-3">
            <Row>
              <Col key={1} md={4} sm={6}>
                <Card isLoading />
              </Col>
              <Col key={2} md={4} sm={6}>
                <Card isLoading />
              </Col>
              <Col key={3} md={4} sm={6}>
                <Card isLoading />
              </Col>
              <Col key={4} md={4} sm={6}>
                <Card isLoading />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    );
  }
}

export default Campaign;
