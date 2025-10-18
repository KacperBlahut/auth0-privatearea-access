import "./PrivateArea.css";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivateArea = () => {
  const location = useLocation();
  const { code } = queryString.parse(location.search);

  const [privateareaData, setPrivateAreaData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    fetch(`http://localhost:3001/privatearea?code=${code}`)
      .then((res) => {
        if (!res.ok) throw new Error("No permission");
        return res.json();
      })
      .then((res) => setPrivateAreaData(res))
      .catch(() => setError("Access denied — insufficient permissions"));
  }, [code]);

  return (
    <div className="PrivateArea-body">
      <h3>Private Area</h3>

      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : !privateareaData ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-box">
          <img
            src={privateareaData.picture}
            alt="avatar"
            className="profile-picture"
          />
          <p><b>Name:</b> {privateareaData.name}</p>
          <p><b>Email:</b> {privateareaData.email}</p>
          <p><b>Verified:</b> {privateareaData.email_verified ? "Yes" : "No"}</p>
          <p><b>User ID:</b> {privateareaData.sub}</p>
        </div>
      )}
    </div>
  );
};

export default PrivateArea;
