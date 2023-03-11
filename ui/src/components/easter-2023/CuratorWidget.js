import React from 'react';

export default class CuratorWidget extends React.Component {
  constructor(props) {
    super(props);
    this.loadScript = this.loadScript.bind(this)
  }

  loadScript(src, libraryId) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.id = libraryId;
      document.body.appendChild(script);

      script.onload = () => {
        // add a small timeout to give it time to load
        setTimeout(() => {
          resolve(true);
        }, 100);
      };
    });
  }

  componentDidMount() {
    this.loadScript('https://cdn.curator.io/published/' + this.props.feedId + '.js');
  }

  render() {
    return <div data-crt-feed-id={this.props.feedId}></div>;
  }
}