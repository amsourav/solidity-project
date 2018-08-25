import React, { Component, Fragment } from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import { getCampaignSummary, contributeToCampaign } from '../../apis';
import './CampaignPage.css';

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { campaignId },
      },
    } = this.props;
    const summary = await getCampaignSummary(campaignId);
    this.setState(
      {
        campaign: summary,
      },
      () => {
        const { campaign } = this.state;
        console.log('got campaigns ==>', campaign);
      },
    );
  }

  handleContribution = async (e) => {
    e.preventDefault();

    const {
      match: {
        params: { campaignId },
      },
    } = this.props;
    const { campaign } = this.state;
    await contributeToCampaign(campaignId, campaign.campaignMinimum.toString());
  };

  render() {
    const { campaign } = this.state;

    return campaign ? (
      <Fragment>
        <div
          style={{
            width: '100%',
            height: 300,
          }}
          className="campaignBackcover"
        >
          <img
            style={{
              width: '100%',
              height: 300,
              filter: 'blur(2px)',
            }}
            alt="coverimage"
            src="https://picsum.photos/1024/300"
          />
          <div
            style={{
              position: 'absolute',
              top: 56,
              width: '100%',
              height: '300px',
            }}
          />
        </div>
        <Container
          style={{
            position: 'relative',
            top: '-250px',
          }}
        >
          <Row>
            <Col md={10}>
              <div className="campaign-details">
                <div className="left">
                  <img
                    className="campaign-image"
                    style={{
                      width: '200px',
                    }}
                    src={campaign.campaignImage}
                    alt={campaign.capaignSubject}
                  />
                </div>
                <div className="right pl-2">
                  <h1
                    style={{
                      textTransform: 'uppercase',
                    }}
                    className="title"
                  >
                    {campaign.campaignTitle}
                  </h1>
                  <h2
                    style={{
                      textTransform: 'capitalize',
                    }}
                    className="subject"
                  >
                    {campaign.campaignSubject}
                  </h2>
                  <h4
                    style={{
                      textTransform: 'capitalize',
                    }}
                    className="contractAddress"
                  >
                    {campaign.contractAddress}
                  </h4>
                  <div className="contribution">
                    {'Min contribution: '}
                    {campaign.campaignMinimum}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <Button onClick={this.handleContribution} size="lg" color="success">
                Contribute
              </Button>
            </Col>
          </Row>
        </Container>
      </Fragment>
    ) : (
      <div>making api call</div>
    );
  }
}

export default CampaignPage;
