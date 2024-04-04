const API_KEY = 'VF.DM.660dc8d6df5b4249cccd010b.tRWxpTLoHqZZ2HNp';

const RUNTIME_API_URL = 'https://general-runtime.voiceflow.com/'

const VFInteract = async (user, message) => {
    const interractionUrl = `https://general-runtime.voiceflow.com/state/user/newester/interact`;
    console.log(interractionUrl);
    console.log(message);

    const payload = {
        "action": {
            "type": "text",
            "payload": message
        }
    };

    let data = await fetch(interractionUrl, {
        headers: {
            Authorization: API_KEY, accept: "application/json", "content-type": "application/json", 'versionID': 'production'
        },
        method: "POST",
        body: JSON.stringify(payload),
    })
    let postRes = await data.json();
    let textResponses = [];
    for (let i = 0; i < postRes.length; i++) {
        if (postRes[i].type === "text") {
            textResponses.push(postRes[i].payload.message);
        }
    }
    return textResponses;
}

export { VFInteract };
