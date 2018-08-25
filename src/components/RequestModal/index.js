import React, { PureComponent } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';

export default class RequestModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      recipient: null,
      value: 0,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;

    this.setState({
      [name]: value,
    });
  };

  render() {
    // description, recipient, value
    const { isOpen, handleRequestSubmit } = this.props;
    const { description, recipient, value } = this.state;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Create expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input onChange={this.handleChange} name="description" id="description" type="text" />
            </FormGroup>
            <FormGroup>
              <Label for="recipient">Recipient</Label>
              <Input onChange={this.handleChange} name="recipient" id="recipient" type="string" />
            </FormGroup>
            <FormGroup>
              <Label for="value">Value (ETH)</Label>
              <Input onChange={this.handleChange} name="value" id="value" min="0" type="number" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleRequestSubmit({
              description,
              value,
              recipient,
            })
            }
            disabled={!(description && recipient && value)}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
