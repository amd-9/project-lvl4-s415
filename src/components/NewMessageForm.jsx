import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Alert,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import UserNameContext from '../context';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { channelsUIState: { currentChannelId } } = state;
  return {
    currentChannelId,
  };
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})
class NewMessageForm extends React.Component {
  static contextType = UserNameContext;

  addMessage = async (values) => {
    const { currentChannelId, addMessage, reset } = this.props;
    const message = {
      ...values,
      name: this.context,
      date: new Date(),
    };
    await addMessage(currentChannelId, message);
    reset();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.addMessage)}>
        <InputGroup>
          <Field disabled={submitting} name="text" placeholder="Type your message here" className="form-control" required component="input" type="text" />
          <InputGroup.Append>
            <Button variant="primary" disabled={pristine || submitting} type="submit">
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Row className="mt-2">
          <Col md={12}>
            { error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default NewMessageForm;
