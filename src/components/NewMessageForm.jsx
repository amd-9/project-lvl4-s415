import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class NewMessageForm extends React.Component {
  handleSubmit = (values) => {
    const { addMessage, reset } = this.props;
    const message = { ...values };
    addMessage({ message });
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group-mx-3">
          <Field name="text" required component="input" type="text" />
        </div>
        <input type="submit" className="btn btn-primary btn-sm" value="Send" />
      </form>
    );
  }
}

const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(NewMessageForm);

export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
