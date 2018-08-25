import React from 'react';
import {
  Card, CardBody, CardTitle, Button,
} from 'reactstrap';

const RequestCard = ({
  description,
  complete,
  recipient,
  value,
  approvalCount,
  handleApproval,
  handleCompletion,
}) => (
  <Card className="mb-2">
    <CardBody>
      <CardTitle>{description}</CardTitle>
      <div
        style={{
          fontSize: 12,
        }}
      >
        <div>
          Requesting to send
          {' '}
          <code>
            {value}
            {' '}
ETH
          </code>
          {' '}
to
          {' '}
          <code>{recipient}</code>
        </div>

        <div>
          Approvals received:
          {approvalCount}
        </div>
      </div>

      <div className="pt-2">
        {!complete ? (
          <Button onClick={handleApproval} size="sm">
            Approve
          </Button>
        ) : (
          <Button color="success" size="sm" onClick={handleCompletion}>Disburse</Button>
        )}
      </div>
    </CardBody>
  </Card>
);

export default RequestCard;
