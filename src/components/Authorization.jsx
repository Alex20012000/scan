import React from "react";
import "../styles/authorization.css";
import AuthorizationForm from "./AuthorizationForm";

function Authorization() {
  return (
    <div className="authorization__section">
      <div className="authorization__section-1">
        <h1 className="authorization__heading">
          Для оформления подписки <br /> на тариф, необходимо <br />
          авторизоваться.
        </h1>
        <img className="heading__img" src="./img/Characters.png" alt="" />
      </div>
      <AuthorizationForm />
    </div>
  );
}

export default Authorization;
