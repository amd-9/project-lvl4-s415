import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

const mapStateToProps = (state) => {
  const { chatUIState } = state;
  return { chatUIState };
};

@connect(mapStateToProps)
class StatusBar extends React.Component {
  render() {
    const { chatUIState: { connected } } = this.props;

    const alertClasses = cn({
      alert: true,
      'alert-danger': !connected,
      'alert-success': connected,
    });

    return (
      <div className="row mb-3">
        <div className="col-md-12">
          <span className={alertClasses}>
            { connected ? 'Connected' : 'Disconnected' }
          </span>
        </div>
      </div>
    );
  }
}


export default StatusBar;
