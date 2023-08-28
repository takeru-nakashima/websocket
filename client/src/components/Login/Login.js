import React, { useState } from 'react'
import { NameInputArea } from '../organisms/NameInputArea';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [name, setName] = useState('');
  const navigation = useNavigate();

  // 名前エリアの文字が変更された時の処理
  const onChangeName = (e) => {
    setName(e.target.value)
  }

  // 名前が登録された時の処理
  const onClickJoin = () => {
    navigation("/mainChat", {state: {name : name}})
  }

  return (
    <div>
      <h2>ログインページ</h2>
      <NameInputArea onChange={onChangeName} onClick={onClickJoin} value={name} />
    </div>
  )
}
