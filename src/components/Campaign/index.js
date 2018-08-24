import React, { Component } from "react";
import Card from "../Card";
import { Row } from "reactstrap";
import { getAllContractsSummary } from "../../apis";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: []
    };
  }
  async componentDidMount() {
    const campaigns = await getAllContractsSummary();
    console.log(campaigns)
    this.setState(
      {
        campaigns
      },
      () => {
        console.log("got campaigns");
      }
    );
  }

  render() {
    const { campaigns } = this.state;
    const campaignCards = campaigns.map(
      ({
        contractAddress,
        campaignImage,
        campaignSubject,
        campaignTitle
        // campaignMinimum, also available
        // campaignOwner, also available  
      }) => {
        return (
          <Card
            campaignImage={campaignImage}
            campaignTitle={campaignTitle}
            campaignSubject={campaignSubject}
            key={contractAddress}
            contractAddress={contractAddress}
          />
        );
      }
    );

    return campaigns.length > 0 ? (
      <div className="Campaign">
        <Row>{campaignCards}</Row>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Campaign;
