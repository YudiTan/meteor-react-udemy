import React from 'react';
import PropTypes from 'prop-types'

export default class TitleBar extends React.Component {
  renderSubtitle() {
    if (this.props.subtitle){
      return <h2 className="title-bar__subtitle">{this.props.subtitle}</h2>;
    } else{
      return null;
    }
  }


  render() {
    return (
      <div className="title-bar">
        <div className="wrapper">
          <h1> {this.props.title}</h1>
          {this.renderSubtitle()}
        </div>
      </div>
    )
  }
};
// in react, the props passed into the main.js component is automatically added in here as this.props.propname

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string, //this is called typechecking for component props
};

TitleBar.defaultProps = {
}
