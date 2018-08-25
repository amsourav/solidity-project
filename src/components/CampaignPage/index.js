import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Card,
  CardBody,
  CardTitle,
  Jumbotron,
} from 'reactstrap';
import RequestCard from '../RequestCard';
import ContributionModal from '../ContributionModal';
import RequestModal from '../RequestModal';
import {
  getCampaignSummary,
  contributeToCampaign,
  userIsMember,
  getPendingRequestCount,
  getRequests,
  createRequest,
} from '../../apis';
import './CampaignPage.css';

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null,
      isOpen: false,
      isRequestOpen: false,
      isMember: false,
      isContributeStart: false,
      pendingRequestCount: 0,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { campaignId },
      },
    } = this.props;
    const isMember = await userIsMember(campaignId);
    const campaign = await getCampaignSummary(campaignId);
    const pendingRequestCount = await getPendingRequestCount(campaignId);
    const requests = await getRequests(campaignId, pendingRequestCount);
    console.log(requests);
    await this.setState({
      campaign,
      isMember,
      pendingRequestCount,
      requests,
    });
  }

  handleModalOutput = async (value) => {
    const {
      match: {
        params: { campaignId },
      },
    } = this.props;
    this.setState({
      isOpen: false,
      isContributeStart: true,
    });
    await contributeToCampaign(campaignId, value.toString());
    this.setState({
      isContributeStart: false,
      isMember: true,
    });
  };

  handleRequestModalOutput = async (requestParams) => {
    console.log(requestParams);
    const {
      match: {
        params: { campaignId },
      },
    } = this.props;
    this.setState({
      isOpen: false,
      isContributeStart: true,
      isRequestOpen: false,
    });

    await createRequest(campaignId, requestParams);
    this.setState({
      isContributeStart: false,
    });
    // await contributeToCampaign(campaignId, value.toString());
  };

  triggerRequestModal = () => {
    this.setState({
      isRequestOpen: true,
    });
  };

  handleContribution = async (e) => {
    e.preventDefault();

    this.setState({
      isOpen: true,
    });
  };

  render() {
    const {
      campaign,
      isMember,
      isOpen,
      isContributeStart,
      pendingRequestCount,
      requests,
      isRequestOpen,
    } = this.state;
    return campaign ? (
      <Fragment>
        <Container>
          {isContributeStart && (
            <Alert color="warining">Please complete the transaction in MetaMask</Alert>
          )}
        </Container>
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
        <div
          style={{
            position: 'relative',
            top: '-250px',
          }}
        >
          <Container>
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
                      {campaign.campaignMinimum} {' ETH'}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={2}>
                {!isMember && (
                  <Button onClick={this.handleContribution} size="lg" color="success">
                    Contribute
                  </Button>
                )}
              </Col>
            </Row>
            <ContributionModal
              isOpen={isOpen}
              contribution={campaign.campaignMinimum}
              handleContribution={this.handleModalOutput}
            />
          </Container>
          <Container style={{ paddingTop: '80px' }}>
            {isMember ? (
              <Row>
                <Col md={2}>
                  <Card>
                    {' '}
                    <CardBody>
                      <CardTitle style={{ textAlign: 'center' }}>
                        <h1>{campaign.campaignBalance / 1000}</h1>
                        <br />
                        <div>' ETH' Balance</div>
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    {' '}
                    <CardBody>
                      <CardTitle style={{ textAlign: 'center' }}>
                        <h1>{pendingRequestCount}</h1>
                        <br />
                        <div>Pending</div>
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={2}>
                  <Card>
                    {' '}
                    <CardBody>
                      <CardTitle style={{ textAlign: 'center' }}>
                        <h1>{0}</h1>
                        <br />
                        <div>Approved</div>
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6}>
                  <div
                    style={{
                      border: '1px solid rgba(0,0,0,0.55)',
                      width: '100%',
                    }}
                  >
                    <div
                      className="py-2 px-2"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h4 className="px-2 py-2">Pending Requests</h4>
                      <Button onClick={this.triggerRequestModal} color="success">
                        New Request
                      </Button>

                      <RequestModal
                        isOpen={isRequestOpen}
                        handleRequestSubmit={this.handleRequestModalOutput}
                      />
                    </div>
                    <Container>
                      {requests.map(request => (
                        <RequestCard {...request} />
                      ))}
                    </Container>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Jumbotron
                  style={{
                    width: '100%',
                  }}
                  fluid
                >
                  <Container fluid>
                    <h1>Please contribute to unlock!</h1>
                  </Container>
                </Jumbotron>
              </Row>
            )}
          </Container>
        </div>
      </Fragment>
    ) : (
      <div>making api call</div>
    );
  }
}

export default CampaignPage;
