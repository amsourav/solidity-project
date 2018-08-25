import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Card from "../Card";

class NewCampaign extends Component {
  render() {
    const newCampaignForm = (
      <Form>
        <FormGroup row>
          <Label sm={2} for="title">
            Title
          </Label>
          <Col sm={10}>
            <Input id="title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="subject">
            Subject
          </Label>
          <Col sm={10}>
            <Input type="textarea" id="subject" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="image">
            Image
          </Label>
          <Col sm={10}>
            <Input id="image" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="minContribution">
            Minimum contribution
          </Label>
          <Col sm={10}>
            <Input type="number" id="minContribution" />
          </Col>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
    return (
      <div className="pt-2">
        <div className="py-3">Create new campaign</div>
        <Row>
          <Col md={8}>{newCampaignForm}</Col>
          <Col md={4}>
            <Card />
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewCampaign;
