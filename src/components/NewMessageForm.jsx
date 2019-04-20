import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.addMessage)}>
        <div className="input-group">
          <Field disabled={submitting} name="text" placeholder="Type your message here" className="form-control" required component="input" type="text" />
          <span className="input-group-append">
            <input disabled={pristine || submitting} type="submit" className="btn btn-primary" value="Send" />
          </span>
        </div>
      </form>
    );
  }
}

export default NewMessageForm;
