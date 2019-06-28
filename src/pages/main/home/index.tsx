import * as React from 'react'

export default class Home extends React.Component<{}, {}> {
  public componentDidMount () {
    // debugger
    const dom: any = document.getElementById('childB')
    dom.contentWindow.postMessage('主页面发给B页面消息', 
       'http://127.0.0.1:9001')

    window.addEventListener('message', (event) => {
      // debugger
      console.log('主页面', event);
      }, false);
    
  }
  public handleClick = () => {
    // debugger
    const dom: any = document.getElementById('childB')
    dom.contentWindow.postMessage('主页面发给B页面消息', 
       'http://127.0.0.1:9001')
  }
  public render () {
    return (
      <div className="home-main">
        <button id="button" onClick={this.handleClick}>发送</button>
        <iframe id="childB" className="main-frame" src="http://127.0.0.1:9001"></iframe>
      </div>
    )
  }
}