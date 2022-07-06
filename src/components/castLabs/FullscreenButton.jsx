import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

export default class FullscreenButton extends React.PureComponent {
  static propTypes = {
    fullscreen: PropTypes.bool.isRequired,
    toggleFullscreen: PropTypes.func.isRequired,
  };

  render() {
    return (
      <IconButton onClick={() => this.props.toggleFullscreen()} style={{ color: '#fff' }}>
        {this.props.fullscreen ? <FullscreenExit /> : <FullScreen />}
      </IconButton>
    );
  }
}

const FullscreenExit = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-uia="control-fullscreen-exit"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 8H19V3H17V9V10H18H24V8ZM0 16H5V21H7V15V14H6H0V16ZM7 10H6H0V8H5V3H7V9V10ZM19 21V16H24V14H18H17V15V21H19Z" fill="currentColor"></path></svg>
  )
}

const FullScreen = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-uia="control-fullscreen-enter"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" fill="currentColor"></path></svg>
  )
}