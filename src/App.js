import OauthPopup from './popup';
import React, {useState} from 'react';

if (!localStorage.getItem("url")) {
  localStorage.setItem("url", "http://(enter server url here):8002/otdsws/login")
}

function App(props) {
  const payload = {
    "client_id": "test_2",
    "scope": "resource:Content+Server",
    "response_type": "code",
    "redirect_uri": "http://localhost:3000/",
    "code_challenge": "NSAwrZ0kmgyBeb3VsPdECogO1_nGjnKVy6Q_vA3rxzQ",
    "code_challenge_method": "S256"
  }
  const [serverUrl, setServerUrl] = useState(localStorage.getItem("url"));
  const [token, setToken] = useState("")
  var url = null
  var error = null
  try {
    url = new URL(localStorage.getItem("url") + '?' + new URLSearchParams(payload));
  } catch (e) {
    error = e
  }

  return (
    <div className="App">
      <span>url:</span>
      <input style={{width: "90%"}} onChange={el => {
        const value = el.target.value;
        localStorage.setItem("url", value)
        setServerUrl(value)
      }} value={serverUrl}/>
      <OauthPopup
        url={url}
        onCode={setToken}
        onClose={code => {}}
      >
        <button>Click to Login</button>
      </OauthPopup>
      <span>returned token:</span><br/>
      <textarea
        style={{width: "90%", height: "300px"}}
        value={error || token}
        rows={5}
        cols={5}
      />
    </div>
  );
}

export default App;
