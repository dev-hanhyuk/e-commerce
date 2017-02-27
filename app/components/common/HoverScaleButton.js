import React from 'react'


class HoverScaleButton extends React.Component {
  constructor (props) {
    super(props);
    this.handleHoverButton = this.handleHoverButton.bind(this);
    this.handleLeaveButton = this.handleLeaveButton.bind(this);
    this.state = { hover: false };
  }

  handleHoverButton () {
    event.preventDefault();
    this.setState({ hover: true });
  }

  handleLeaveButton () {
    event.preventDefault();
    this.setState({ hover: false });
  }

  genderButtonStyle () {
    const { hoverStyle, leaveStyle, scale, color } = this.props;
    const { hover } = this.state;

    const defaultHoverStyles = {
      background: 'transparent',
      color: `${color}`,
      border: `1px solid ${color}`,
      borderRadius: '2px',
      width: '100%',
      height: '3rem',
      fontSize: '0.8rem',
      lineHeight: '13px',
      verticalAlign: 'middle',
      transform: `scale(${scale})`,
      transition: `all .1s ease-in-out`
    };

    const defaultLeaveStyles = {
      background: `${color}`,
      color: '#fff',
      border: `1px solid ${color}`,
      borderRadius: '2px',
      width: '100%',
      height: '3rem',
      fontSize: '0.8rem',
      lineHeight: '13px',
      verticalAlign: 'middle'
    }

    const hoverButtonStyle = Object.assign(defaultHoverStyles, hoverStyle);
    const leaveButtonStyle = Object.assign(defaultLeaveStyles, leaveStyle);

    if (hover) return hoverButtonStyle;
    return leaveButtonStyle;

  }

  render () {
    return (
      <button
        style={this.genderButtonStyle()}
        onMouseEnter={this.handleHoverButton}
        onMouseLeave={this.handleLeaveButton}
        onClick={this.props.handleClick}
      >
        {this.props.title}
      </button>
    )
  }
}


export default HoverScaleButton;