const API_KEY = 'VF.DM.660dc8d6df5b4249cccd010b.tRWxpTLoHqZZ2HNp';

const vfInteract = async (user, userAction) => {
  const interractionUrl = `https://general-runtime.voiceflow.com/state/user/${user}/interact`;
  console.log(interractionUrl, userAction);

  const payload = {
    action: userAction,
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
  // const botResponses = [];
  // for (let i = 0; i < postRes.length; i++) {
  //   if (postRes[i].type === 'text') {
  //     botResponses.push(postRes[i].payload.message);
  //   }
  // }
  return postRes;
};

export {vfInteract};
