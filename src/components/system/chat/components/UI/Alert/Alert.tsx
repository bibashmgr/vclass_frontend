import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./Alert.scss";

interface MessageAlert {
  payload: {
    user: string;
    msg: string;
  };
}

interface AlertProps {
  messageAlert: MessageAlert;
}

const Alert: React.FC<AlertProps> = ({ messageAlert }) => {
  return (
    <div className="message-alert-popup">
      <div className="alert-header">
        <FontAwesomeIcon className="icon" icon={faCommentAlt} />
        <h3>{messageAlert.payload.user}</h3>
      </div>
      <p className="alert-msg">{messageAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;
