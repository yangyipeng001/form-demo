import React, { Component } from 'react'
import FieldContext from './FieldContext'

export default class Field extends Component {
  static contextType = FieldContext

  componentDidMount() {
    this.unrregister = this.context.registerFieldEntities(this)
  }

  componentWillUnmount() {
    this.unrregister()
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getControlled = () => {
    const {getFieldValue, setFieldsValue} = this.context
    const {name} = this.props

    return {
      value: getFieldValue(name), // get value
      onChange: (e) => {
        // set value
        const newValue = e.target.value
        setFieldsValue({[name]: newValue})
      }
    }
  }

  render() {
    const children = this.props.children

    const returnChildNode = React.cloneElement(children, this.getControlled())

    return returnChildNode
  }
}
