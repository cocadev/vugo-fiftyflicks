import React from 'react';
import PropTypes from 'prop-types';
import clpp from '../../clpp/clpp';
import Controls from './Controls';
import Overlay from './Overlay';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { withRouter } from 'react-router-dom'

class Player extends React.PureComponent {
  
  static propTypes = {
    config: PropTypes.object.isRequired,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  constructor (props) {
    super(props);
    this.video_ = React.createRef();
    this.container_ = React.createRef();
    this.onFullscreenChangeBound_ = this.onFullscreenChange_.bind(this);
    this.onStateChangeBound_ = this.onStateChange_.bind(this);
    this.onTimeupdateBound_ = this.onTimeupdate_.bind(this);
    this.clppPlayer_ = null;
    this.state = {
      fullscreen: false,
      paused: true,
      startTime: 0,
      endTime: 0,
      currentTime: 0,
      isLive: false,
      muted: false,
    };
  }

  componentDidMount () {
    document.addEventListener('fullscreenchange', this.onFullscreenChangeBound_);
    try {
      this.clppPlayer_ = new clpp.Player(this.video_.current, this.props.config);
      window.player = this.clppPlayer_;
      this.clppPlayer_.use(clpp.dash.DashComponent);
      this.clppPlayer_.use(clpp.hls.HlsComponent);
      this.clppPlayer_.use(clpp.smooth.SmoothComponent);
      this.clppPlayer_.on(clpp.events.STATE_CHANGED, this.onStateChangeBound_);
      this.clppPlayer_.on('timeupdate', this.onTimeupdateBound_);
      this.load_();
    } catch (err) {
      console.error('Player initialization failed', err);
    }
  }

  componentWillUnmount () {
    document.removeEventListener('fullscreenchange', this.onFullscreenChangeBound_);
    if (this.clppPlayer_) {
      this.clppPlayer_.off(clpp.events.STATE_CHANGED, this.onStateChangeBound_);
      this.clppPlayer_.off('timeupdate', this.onTimeupdateBound_);
      this.clppPlayer_.destroy();
      this.clppPlayer_ = null;
      delete window.player;
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.src !== this.props.src) {
      this.load_();
    }
  }

  async load_ () {
    if (!this.clppPlayer_ || !this.props.src) {
      return;
    }
    try {

      await this.clppPlayer_.load(this.props.src);

      this.clppPlayer_.seek(parseInt(this.props.progress));

      this.onTimeupdate_();
      this.setState({ isLive: this.clppPlayer_.isLive() });
    } catch (err) {
      console.error('Player load failed', err);
    }
  }

  onClose () {
    this.props.history.goBack()
    
    // const { currentTime, endTime } = this.state;
    // this.props.onClose();
    // const saveProgress = (currentTime === endTime) ? 0 : currentTime;
    // localStorage.setItem(this.props.code, saveProgress);
  }
  
  render () {
    const { currentTime, endTime, muted } = this.state;
    let playerClasses = 'Player';
    if (this.state.fullscreen) {
      playerClasses += ' Player_fullscreen';
    }

    if(currentTime === endTime && currentTime !== 0) {
      this.onClose();
    }

    return (
      <div style={{ width: '100%' }}>
        <IconButton 
          style={{ color: '#fff', zIndex: 1000, position: 'fixed', top: 20, left: '49%'}}
          onClick={() => this.onClose()}
        >
          <CloseIcon style={{ fontSize: 30}}/>
        </IconButton>
        <div ref={this.container_} className={playerClasses}>
          <video ref={this.video_} className="Video" muted={muted}/>
          <Overlay>
            <Controls
              fullscreen={this.state.fullscreen}
              toggleFullscreen={() => this.toggleFullscreen_()}
              paused={this.state.paused}
              muted={muted}
              togglePlay={() => this.togglePlay_()}
              togglePrev10={() => this.togglePrev10(currentTime)}
              toggleNext10={() => this.toggleNext10(currentTime)}
              toggleMuted={() => this.setState({muted: !muted})}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              currentTime={currentTime}
              onSeek={async (time) => await this.seek_(time)}
              isLive={this.state.isLive}
              title={this.props.title}
            />
          </Overlay>
        </div>
      </div>
    );
  }

  onStateChange_ (e) {
    let paused;
    switch (e.detail.currentState) {
      case clpp.Player.State.PAUSED:
      case clpp.Player.State.IDLE:
      case clpp.Player.State.ENDED:
        paused = true;
        break;
      case clpp.Player.State.PLAYING:
        paused = false;
        break;
      default:
        break;
    }

    if (typeof paused === 'boolean') {
      this.setState({ paused });
    }
  }

  onTimeupdate_ () {
    if (!this.clppPlayer_) {
      return;
    }
    const seekRange = this.clppPlayer_.getSeekRange();
    const currentTime = this.clppPlayer_.getPosition();
    this.setState({
      currentTime,
      startTime: seekRange.start,
      endTime: seekRange.end,
    });
  }

  toggleFullscreen_ () {
    if (this.state.fullscreen) {
      document.exitFullscreen();
    } else {
      this.container_.current.requestFullscreen();
    }
  }

  onFullscreenChange_ () {
    this.setState({
      fullscreen: document.fullscreenElement === this.container_.current
    });
  }

  async togglePlay_ () {
    if (!this.clppPlayer_) {
      return;
    }
    try {
      if (this.state.paused) {
        await this.clppPlayer_.play();
      } else {
        await this.clppPlayer_.pause();
      }
    } catch (err) {
      console.error('Toggle play failed', err);
    }
  }

  togglePrev10 (e) {
    this.seek_(e-10)
  }

  toggleNext10 (e) {
    this.seek_(e + 10)
  }

  async seek_ (time) {
    if (!this.clppPlayer_) {
      return;
    }
    try {
      await this.clppPlayer_.seek(time);
    } catch (err) {
      console.error('Seek failed', err);
    }
  }
}

export default withRouter(Player);