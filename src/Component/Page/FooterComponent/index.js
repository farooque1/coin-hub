import React from "react";

const Footer = ({ lastUpdated }) => {
  return (
    <div className="bg-dark text-white">
      <footer className="text-center py-3 bg-secondary text-white">
        <p>Last Updated : {lastUpdated}</p>
      </footer>
    </div>
  );
};

export default Footer;
