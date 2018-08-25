import React from 'react';
import {
  Card, CardBody, CardTitle, CardText,
} from 'reactstrap';

const RequestCard = ({
  description, complete, recipient, value, approvalCount,
}) => (
  <Card className="mb-2">
    <CardBody>
      <CardTitle>{description}</CardTitle>
      <div
        style={{
          fontSize: 12,
        }}
      >
        Requesting to send
        {' '}
        <code>
          {value / 1000.0}
          {' '}
ETH
        </code>
        {' '}
to
        {' '}
        <code>{recipient}</code>
      </div>
    </CardBody>
  </Card>
);

export default RequestCard;
