import React from 'react';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';
import connect from '../connect';

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
      <Row className="mb-3">
        <Col md={12}>
          <span className={alertClasses}>
            { connected ? 'Connected' : 'Disconnected' }
          </span>
        </Col>
      </Row>
    );
  }
}


export default StatusBar;
