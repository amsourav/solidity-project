import React, { Component } from 'react';
import {
  Row, Col, Card, Container, CardBody, CardTitle, CardText, CardImg,
} from 'reactstrap';

import { getAllVerifiedUsers } from '../../apis';

class Verified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      socialProfile: null,
      identityDocument: null,
      publicBlockchainAddress: null,
      currentUser: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { publicAddress },
      },
    } = this.props;
    const users = await getAllVerifiedUsers();
    const mutateUsers = Object.assign({}, ...users);
    // console.log(publicAddress, mutateUsers, mutateUsers[publicAddress]);
    this.setState(
      {
        currentUser: mutateUsers[publicAddress] || null,
      },
      () => {
        console.log(this.state);
      },
    );
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Container className="py-5">
        <Row>
          <Col md={4}>
            {currentUser ? (
              <Card>
                <CardImg
                  style={{
                    objectFit: 'cover',
                  }}
                  top
                  width="318px"
                  height="180px"
                  src={currentUser.identityDocument}
                  alt={currentUser.publicBlockchainAddress}
                />
                <CardBody>
                  <CardTitle>{currentUser.username}</CardTitle>
                  <CardText>
                    <div>
                      Social Profile:
                      <a target="_blank" href={currentUser.socialProfile}>
                        Link
                      </a>
                    </div>
                    <div>
                      {' '}
                      Etherscan:
                      {' '}
                      <a
                        target="_blank"
                        href={`https://ropsten.etherscan.io/address/${
                          currentUser.publicBlockchainAddress
                        }`}
                      >
                        Link
                      </a>
                      {' '}
                    </div>
                  </CardText>
                </CardBody>
              </Card>
            ) : (
              <div>User not verified</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Verified;
