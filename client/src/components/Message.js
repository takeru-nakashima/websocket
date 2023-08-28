import React from 'react'

export const Message = (props) => {
    const {key, name, text} = props;
  return (
    <div>
      <p>{name}：{text}</p>
    </div>
  )
}
