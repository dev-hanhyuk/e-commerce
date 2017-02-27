import React from 'react'


class SquareButton extends React.Component {
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
    const { hoverStyle, leaveStyle } = this.props;
    const { hover } = this.state;

    const defaultHoverStyles = {
      background: 'transparent',
      color: 'rgba(0, 0, 0, 0.6)',
      border: '1px solid rgba(0, 0, 0, 0.6)',
      borderRadius: '2px',
      width: '100%',
      height: '3rem',
      fontSize: '0.8rem',
      lineHeight: '13px',
      verticalAlign: 'middle',
    };

    const defaultLeaveStyles = {
      background: '#e6e6e6',
      color: 'rgba(0, 0, 0, 0.6)',
      border: '1px solid transparent',
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


export default SquareButton;