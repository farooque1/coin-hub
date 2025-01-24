import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomCard = ({ icon, iconClass, title, content, cardClass }) => {
  return (
    <div className={`card mb-4 shadow-sm ${cardClass || "border-primary"}`}>
      <div className="card-body">
        <p>
          <strong>
            <FontAwesomeIcon icon={icon} className={`me-2 ${iconClass}`} />
          </strong>{" "}
          {title}
        </p>
        <h4 className="card-text text-black">{content}</h4>
      </div>
    </div>
  );
};

export default CustomCard;
