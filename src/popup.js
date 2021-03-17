import * as React from 'react'

export default class OauthPopup extends React.PureComponent {
  static defaultProps = {
    onClose: () => { },
    width: 500,
    height: 500,
    url: "",
    title: ""
  };

  externalWindow;
  codeCheck;

  createPopup = () => {
    const { url, title, width, height, onCode } = this.props;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    this.externalWindow = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    this.codeCheck = setInterval(() => {
      try {
        const params = new URL(this.externalWindow.location).searchParams;
        const code = params.get("code");
        if (!code) {
          return;
        }
        clearInterval(this.codeCheck);
        onCode(code, params);
        this.externalWindow.close();
      } catch (e) { }
    }, 20);

    this.externalWindow.onbeforeunload = () => {
      this.props.onClose();
      clearInterval(this.codeCheck);
    }
  };

  render() {
    return <div onClick={this.createPopup}> {this.props.children} </div>;
  }

  componentWillUnmount() {
    if (this.externalWindow) {
      this.externalWindow.close();
    }
  }
}
