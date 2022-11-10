import React, { Component } from 'react'
import FieldContext from './FieldContext'

export default function Field(props) {
  const {children, name} = props

  const {
    getFieldValue, 
    setFieldsValue,
    registerFieldEntities
  } = React.useContext(FieldContext)

  const [, forceUpdate] = React.useReducer(x => x + 1, 0)

  React.useLayoutEffect(() => {
    const unregister = registerFieldEntities({
      props,
      onStoreChange: forceUpdate
    })

    return unregister
  }, [])

  const getControlled = () => {
      const {name} = props
  
      return {
        value: getFieldValue(name), // get value
        onChange: (e) => {
          // set value
          const newValue = e.target.value
          setFieldsValue({[name]: newValue})
        }
      }
    }

    const returnChildNode = React.cloneElement(children, getControlled())

    return returnChildNode
}

// export default class Field extends Component {
//   static contextType = FieldContext

//   componentDidMount() {
//     this.unregister = this.context.registerFieldEntities(this)
//   }

//   componentWillUnmount() {
//     this.unregister()
//   }

//   onStoreChange = () => {
//     this.forceUpdate()
//   }

//   getControlled = () => {
//     const {getFieldValue, setFieldsValue} = this.context
//     const {name} = this.props

//     return {
//       value: getFieldValue(name), // get value
//       onChange: (e) => {
//         // set value
//         const newValue = e.target.value
//         setFieldsValue({[name]: newValue})
//       }
//     }
//   }

//   render() {
//     const children = this.props.children

//     const returnChildNode = React.cloneElement(children, this.getControlled())

//     return returnChildNode
//   }
// }
