const API_KEY = 'VF.DM.660dc8d6df5b4249cccd010b.tRWxpTLoHqZZ2HNp';

const vfInteract = async (user, message) => {
  const interractionUrl = `https://general-runtime.voiceflow.com/state/user/${user}/interact`;
  console.log(interractionUrl, message);

  const payload = {
    'action': {
      'type': 'text',
      'payload': message,
    },
  };

  const data = await fetch(interractionUrl, {
    headers: {
      'Authorization': API_KEY,
      'accept': 'application/json',
      'content-type': 'application/json',
      'versionID': 'production',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const postRes = await data.json();
  const textResponses = [];
  for (let i = 0; i < postRes.length; i++) {
    if (postRes[i].type === 'text') {
      textResponses.push(postRes[i].payload.message);
    }
  }
  return textResponses;
};

export {vfInteract};
