import React, { Component, Fragment } from 'react';
import { getCampaignSummary } from '../../apis';

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params: campaignId },
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

  render() {
    const { campaign } = this.state;

    return campaign ? (
      <Fragment>
        <img
          className="campaign-image"
          style={{
            width: 100,
          }}
          src={campaign.campaignImage}
          alt={campaign.capaignSubject}
        />
        <div>{campaign.campaignTitle}</div>
        <div>{campaign.campaignSubject}</div>
        <div>{campaign.contractAddress}</div>
        <div>
          Min contribution
          {campaign.campaignMinimum}
        </div>
      </Fragment>
    ) : (
      <div>making api call</div>
    );
  }
}

export default CampaignPage;
