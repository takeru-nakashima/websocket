import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";

import React from 'react'

export const InputArea = (props) => {
  const {value, onChange, placeholder, onClick, buttonText} = props;
  return (
    <div>
      <Flex aligin="center" justifyContent="center"> 
        <Input placeholder={placeholder} value={value} onChange={onChange} />
        <button onClick={onClick} disabled={!value}>{buttonText}</button>
      </Flex>
    </div>
  )
}
