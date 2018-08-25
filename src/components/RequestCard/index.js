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
  totalUser,
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
          <code>
            <a href={`/verified/${recipient}`}>{recipient}</a>
          </code>
        </div>

        <div>
          Approvals received:
          {approvalCount}
        </div>

        {!complete && (
          <div>
            Approval:
            {(approvalCount / (totalUser * 1.0)) * 100}
            {' '}
%
          </div>
        )}
      </div>

      <div className="pt-2">
        {complete && (
          <Button size="sm" disabled>
            Funds disbursed
          </Button>
        )}

        {!complete
          && (approvalCount < totalUser / 2 ? (
            <Button onClick={handleApproval} size="sm">
              Approve
            </Button>
          ) : (
            <Button color="success" size="sm" onClick={handleCompletion}>
              Disburse
            </Button>
          ))}
      </div>
    </CardBody>
  </Card>
);

export default RequestCard;
