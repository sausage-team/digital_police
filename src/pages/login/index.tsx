import { observer, inject } from 'mobx-react'
import * as React from 'react'
import { 
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd'
import { RouteComponentProps } from 'react-router'

export interface LoginProps extends RouteComponentProps<{}> {
  form: any
}

@inject()
@observer
class Login extends React.Component<LoginProps, {}> {
  constructor (props: any) {
    super(props)
  }

  public login = (e: any): void => {
    e.preventDefault()
  }

  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-main">
        <div className="login-form">
          <div className="login-logo">
            <i></i>
            <span>武汉市公安局数字派出所管理平台</span>
          </div>
          <Form className="form-con" onSubmit={this.login}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [{
                    message: '用户名不能为空',
                    required: true
                  }]
                })(
                  <Input 
                    prefix={<Icon type="user" className="placeholder-color" />}
                    placeholder="请输入用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{
                    message: '密码不能为空',
                    required: true
                  }]
                })(
                  <Input
                    prefix={<Icon type="lock" className="placeholder-color" />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <div className="forgot-box">
                {
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(
                  <Checkbox>记住密码</Checkbox>)
                }
              </div>
              <div className="sub-box">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                <Button type="primary" className="login-form-button">
                  PKI登录
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
