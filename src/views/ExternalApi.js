import React, { useState } from "react";
import { Button } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';
import Loading from '../components/Loading';

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      setLoading(true);
      const token = await getTokenSilently();

          
      const { data } = await axios.get("http://localhost:3001/api/external", {
        headers : {
          Authorization: `Bearer ${token}`
        }
      });
      
      const { msg } = data;
      
      setShowResult(true);
      setLoading(false);
      setApiMessage({msg});
    } catch (error) {
      console.error(error);
      console.log('err')
      setLoading(false);
    }
  };
  console.log(loading)
  return (
    <>
      <div className="mb-5">
        <h1>External API</h1>
        <p>
          Ping an external API by clicking the button below. This will call the
          external API using an access token, and the API will validate it using
          the API's audience value.
        </p>

        <Button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </Button>
      </div>

      <div className="result-block-container">
        <div className={`result-block ${showResult && "show"}`}>
          <h6 className="muted">Result</h6>
          <Highlight>{JSON.stringify(apiMessage, null, 2)}</Highlight>
        </div>
      </div>
      {/* { loading && <Loading />} */}
    </>
  );
};

export default ExternalApi;
