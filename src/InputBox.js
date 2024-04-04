import { SendHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import './InputBox.css'; // Import CSS file for styling
import { VFInteract } from './VoiceflowInteractions'


const InputBox = ({ addMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addMessage(inputValue);
        setInputValue('');
        let VFAnswers = VFInteract("test", inputValue);

        VFAnswers.then((res) => {
            console.log(res);
            addMessage(res);
        }, (err) => {
            console.log(err);
        });

        console.log(VFAnswers)
        setInputValue('');
    };

    return (
        <form className="input-box" onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleChange} placeholder="Type a message..." />
            <button type="submit"><SendHorizontal /></button>
        </form>
    );
};

export default InputBox;
