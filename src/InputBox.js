import { SendHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import './InputBox.css'; // Import CSS file for styling
// import { VFInteract } from './VoiceflowInteractions'

const API_KEY = 'VF.DM.660dc8d6df5b4249cccd010b.tRWxpTLoHqZZ2HNp';

// const RUNTIME_API_URL = 'https://general-runtime.voiceflow.com/' // change this to whatever your API URL is

const VFInteract = async (user, message) => {
    const interractionUrl = `https://general-runtime.voiceflow.com/state/user/newer/interact`;
    console.log(interractionUrl);
    console.log(message);

    const payload = {
        "action": {
            "type": "text",
            "payload": message
        }
    };

    console.log(payload);

    let data = await fetch(interractionUrl, {
        headers: {
            Authorization: API_KEY, accept: "application/json", "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
    })
    let postRes = await data.json();
    console.log(postRes);
    let textResponses = [];
    for (let i = 0; i < postRes.length; i++) {
        if (postRes[i].type === "text") {
            textResponses.push(postRes[i].payload.message);
        }
    }
    console.log(textResponses);
    return textResponses;
}

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
