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

export default class ContributionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minimum: props.contribution || 0,
      contribution: props.contribution || 0,
      isOpen: props.isOpen || false,
    };
  }

  handleChange = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({
      contribution: value,
    });
  };

  render() {
    const { isOpen, handleContribution, minimum } = this.props;
    const { contribution } = this.state;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>How much would you like to contribute</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="contribute">Contribute (ETH)</Label>
              <Input
                minimum={minimum}
                onChange={this.handleChange}
                value={contribution}
                name="contribute"
                label="Contribute"
                type="number"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={contribution < minimum}
            size="lg"
            color="success"
            onClick={() => handleContribution(contribution)}
          >
            Contribute
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
