import React, { Component } from 'react';
import {
  Button, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import Card from '../Card';
import { createCampaign } from '../../apis';

const validUrl = new RegExp(
  "^(http|https)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9-._?,'/\\+&amp;%$#=~])*$",
);

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      subject: null,
      image: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    createCampaign(this.state);
  };

  handleChange = async (event) => {
    const {
      name,
      target: { value },
    } = event;
    await this.setState({
      [name]: value,
    });
    // console.log(this.state);
  };

  validateImage = async (event) => {
    // console.log(event);
    const {
      target: { value },
    } = event;
    // const { value }
    // console.log(value, validUrl.test(value));
    return validUrl.test(value);
  };

  render() {
    const newCampaignForm = (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label sm={2} for="title">
            Title
          </Label>
          <Col sm={10}>
            <Input name="title" onChange={this.handleChange} id="title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="subject">
            Subject
          </Label>
          <Col sm={10}>
            <Input name="subject" onChange={this.handleChange} type="textarea" id="subject" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="image">
            Image
          </Label>
          <Col sm={10}>
            <Input
              name="image"
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                this.validateImage(e) && this.handleChange(e);
              }}
              id="image"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="minContribution">
            Minimum contribution
          </Label>
          <Col sm={10}>
            <Input
              name="minContribution"
              onChange={this.handleChange}
              type="number"
              id="minContribution"
            />
          </Col>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
    const { image, title, subject } = this.state;
    return (
      <div className="pt-2">
        <div className="py-3">Create new campaign</div>
        <Row>
          <Col md={8}>{newCampaignForm}</Col>
          <Col md={4}>
            <Card campaignImage={image} campaignTitle={title} campaignSubject={subject} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewCampaign;
