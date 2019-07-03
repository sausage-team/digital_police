import * as React from 'react'
import { Modal } from 'antd'

interface AddCoopProps {
  visible: boolean
  close: () => void
}

class AddCoop extends React.Component<AddCoopProps, {}> {
  constructor (props: any) {
    super(props)
  }

  public ok = () => {
    console.log(1)
  }

  public cancel = () => {
    this.props.close()
  }

  public render () {
    const { visible } = this.props

    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={this.ok}
        onCancel={this.cancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}

export default AddCoop