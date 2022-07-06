import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import PlayButton from './PlayButton';
import FullscreenButton from './FullscreenButton';
import { formatTime } from '../../shared/utils/formatters';
import Timeline from './Timeline';

export default class Controls extends React.PureComponent {
  static propTypes = {
    togglePlay: PropTypes.func.isRequired,
    togglePrev10: PropTypes.func.isRequired,
    toggleNext10: PropTypes.func.isRequired,
    paused: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    onSeek: PropTypes.func.isRequired,
    fullscreen: PropTypes.bool.isRequired,
    toggleFullscreen: PropTypes.func.isRequired,
    isLive: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTime: null
    };
  }

  render() {
    return (
      <div className="Controls">
        <div style={{ margin: '0 10px 0 15px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Timeline {...this.props} /><span style={{ margin: '7px 2px 0 16px'}}>{this.renderTimeLabel_()}</span>
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <PlayButton {...this.props} />
          </Grid>
          <Grid item xs>
            <div className='titles'>{this.props.title}</div>
          </Grid>
          <Grid item>
            <FullscreenButton {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }

  renderTimeLabel_() {
    return this.props.isLive
      ? <div><span className="Dot" />live</div>
      : (
        <div>
          {formatTime(this.props.currentTime)}
          {' / '}
          {formatTime(this.props.endTime)}
        </div>
      );
  }
}
