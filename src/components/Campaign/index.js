import React, { Component } from 'react';
import Card from '../Card';
import { Row } from 'reactstrap';

class Campaign extends Component {
  render() {
    const campaignCards = new Array(2).fill(<Card />);
    campaignCards.push(<Card campaignURL="/campaigns/new" />);
    return (
      <div className="Campaign">
        <Row>{campaignCards}</Row>
      </div>
    );
  }
}

export default Campaign;
