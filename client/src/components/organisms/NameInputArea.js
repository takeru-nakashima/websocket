import React from "react";
import {InputArea} from "../molecules/InputArea"

export const NameInputArea = (props) => {
  const { value, onChange, onClick } = props;
  return (
    <div>
      <InputArea value={value} onChange={onChange} onClick={onClick} placeholder="名前を入力してください" buttonText="入室"/>
    </div>
  );
};
