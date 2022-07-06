import React from 'react';
import PropTypes from 'prop-types';

export default class Overlay extends React.PureComponent {
  static propTypes = {
    timeout: PropTypes.number,
  };

  static defaultProps = {
    timeout: 5000,
  };

  constructor (props) {
    super(props);
    this.timer_ = null;
    this.state = {
      active: false
    };
  }

  componentWillUnmount () {
    this.clearTimer_();
  }

  componentDidUpdate (_, prevState) {
    if (prevState.active !== this.state.active) {
      if (this.state.active) {
        this.startTimer_();
      } else {
        this.clearTimer_();
      }
    }
  }

  render () {
    let classnames = 'OverlayContainer';
    if (this.state.active) {
      classnames += ' OverlayContainer_active';
    }
    return (
      <div
        className="Overlay"
        onPointerMove={() => this.setState({ active: true })}
      >
        <div className={classnames}>
          {this.props.children}
        </div>
      </div>
    );
  }

  startTimer_ () {
    this.clearTimer_();
    this.timer_ = setTimeout(() => this.setState({ active: false }), this.props.timeout);
  }

  clearTimer_ () {
    clearTimeout(this.timer_);
  }
}
