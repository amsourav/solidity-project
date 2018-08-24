import React, { PureComponent } from 'react';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import { v4 as uuid } from 'uuid';

export default class CampaignCard extends PureComponent {
  static defaultProps = {
    campaignURL: `/campaigns/${uuid()}`,
    campaignImage:
      'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    campaignTitle: 'Card title',
    campaignSubject:
      "Some quick example text to build on the card title and make up the bulk of the card's content."
  };

  render() {
    const {
      campaignImage,
      campaignTitle,
      campaignSubject,
      contractAddress
    } = this.props;
    return (
      <Col md="3" sm="12">
        <div className="py-3">
          <Card>
            <CardImg top width="100%" src={campaignImage} alt={campaignTitle} />
            <CardBody>
              <CardTitle>{campaignTitle}</CardTitle>
              <CardText>{campaignSubject}</CardText>
              <Button href={`/campaigns/${contractAddress}`}>Donate Now</Button>
            </CardBody>
          </Card>
        </div>
      </Col>
    );
  }
}
