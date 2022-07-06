import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import { Tooltip } from '@material-ui/core';

const PrettoSlider = withStyles({
  root: {
    color: '#3bd4ae',
    height: 8,
    marginTop: 7
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#3bd4ae',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} style>
      {children}
    </Tooltip>
  );
}

export default class Timeline extends React.PureComponent {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    onSeek: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      currentTime: null
    };
  }

  render () {
    return (
      <PrettoSlider
        valueLabelDisplay="auto" 
        min={this.props.startTime}
        max={this.props.endTime}
        value={this.state.currentTime !== null ? this.state.currentTime : this.props.currentTime}
        onChange={(_, value) => {this.setState({ currentTime: value })}}
        onChangeCommitted={async (_, value) => {
          try {
            await this.props.onSeek(value);
          } finally {
            this.setState({ currentTime: null });
          }
        }}
        ValueLabelComponent={ValueLabelComponent}

        valueLabelFormat={(value) => {
          return (
            <div style={{ textAlign: "center" }}>
              {parseInt(value / 3600)} : {padWithZero(parseInt(value / 60))} : {padWithZero(parseInt(value % 60))}
            </div>
          );
        }}
      />
    );
  }
}

function padWithZero(number) {
  const string = number.toString();
  if (number < 10) {
    return "0" + string;
  }
  return string;
}