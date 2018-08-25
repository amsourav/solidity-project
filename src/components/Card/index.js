import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';
import {
  Button, Card, CardBody, CardImg, CardText, CardTitle,
} from 'reactstrap';

const CardLoaderComponent = props => (
  <ContentLoader
    height={336}
    width={348}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" width="380" height="180" />
    <rect x="20" y="200" rx="4" ry="4" width="300" height="24" />
    <rect x="20" y="234" rx="4" ry="4" width="280" height="15" />
    <rect x="20" y="260" rx="4" ry="4" width="260" height="15" />
    <rect x="20" y="290" rx="4" ry="4" width="250" height="15" />
  </ContentLoader>
);

export default class CampaignCard extends PureComponent {
  static defaultProps = {
    isLoading: false,
    contractAddress: null,
    campaignImage: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    campaignTitle: 'Card title',
    campaignSubject:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  };

  render() {
    const {
      campaignImage,
      campaignTitle,
      campaignSubject,
      contractAddress,
      isLoading,
    } = this.props;
    return (
      <div className="pb-3">
        {!isLoading ? (
          <Card>
            <CardImg
              style={{
                objectFit: 'cover',
              }}
              top
              width="318px"
              height="180px"
              src={campaignImage}
              alt={campaignTitle}
            />
            <CardBody>
              <CardTitle>{campaignTitle}</CardTitle>
              <CardText>{campaignSubject}</CardText>
              <Button
                disabled={!contractAddress}
                href={contractAddress ? `/campaigns/${contractAddress}` : null}
              >
                Contribute Now
              </Button>
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardLoaderComponent />
          </Card>
        )}
      </div>
    );
  }
}
