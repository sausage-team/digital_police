import * as React from 'react'

export default class Home extends React.Component<{}, {}> {
  public iframe: React.RefObject<any>

  constructor (props: any) {
    super(props)
    this.iframe = React.createRef()
  }

  public componentDidMount () {
    debugger
    console.log(this.iframe.current)
    this.iframe.current.contentWindow.postMessage('主页面发给B页面消息', 'http://127.0.0.1:9001')

    window.addEventListener('message', (event) => {
      debugger
      console.log('主页面', event);
      }, false);
    
  }
  public render () {
    return (
      <div className="home-main">
        {/* <iframe ref={this.iframe} id="childB" className="main-frame" src="http://10.73.92.144:9777/api/custom_sso/acs?domain=wh&user_info={%22username%22:%22mypcs%22}&token=19FEBBCC189A6AE7ECF1A01406C0A90B&RelayState=embed/dashboard.html?dashId=dsh_82d8dea75ae7945f015c195a6dada43f"></iframe> */}
        <iframe ref={this.iframe} id="childB" className="main-frame" src="http://127.0.0.1:9001"></iframe>
      </div>
    )
  }
}