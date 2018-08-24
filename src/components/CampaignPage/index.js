import React, { Component } from "react";
import {getCampaignSummary} from '../../apis'

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null
    };
  }

  async componentDidMount() {
    const { campaignId } = this.props.match.params;
    const summary = await getCampaignSummary(campaignId);
    this.setState(
      {
        campaign: summary
      },
      () => {
        console.log("got campaigns");
      }
    );
  }

  render() {
    return <div className="CampaignPage">I am CampaignPage page</div>;
  }
}

export default CampaignPage;
