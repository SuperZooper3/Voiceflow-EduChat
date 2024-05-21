import {SendHorizontal} from 'lucide-react';
import React, {useState} from 'react';
import './InputBox.css'; // Import CSS file for styling
import {vfInteract} from './VoiceflowInteractions';
import PropTypes from 'prop-types';


const InputBox = ({addMessage, userName}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMessage({sender: 'user', content: inputValue});
    setInputValue('');
    const userAction = {type: 'text', payload: inputValue};
    const VFAnswers = vfInteract(userName, userAction);

    VFAnswers.then((res) => {
      for (let i = 0; i < res.length; i++) {
        addMessage({sender: 'response', content: res[i]});
      }
    }, (err) => {
      console.log(err);
    });

    setInputValue('');
  };

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button type="submit"><SendHorizontal /></button>
    </form>
  );
};

InputBox.propTypes = {
  addMessage: PropTypes.func,
  userName: PropTypes.string,
};

export default InputBox;
