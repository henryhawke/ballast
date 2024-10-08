import React from "react";
import AppBar from "@material-ui/core/AppBar";

const Footer = () => {
  return (
    <React.Fragment>
      <div
        style={{
          height: "400px",
          //width: '100%',
          backgroundImage:
            "url(https://source.unsplash.com/collection/43247403)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}></div>
      <AppBar
        position='relative'
        style={{
          //position: 'absolute',
          width: "100%",
          padding: 18,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        id='footer-text'>
        {`© ${new Date().getFullYear()} IFAI Tent Rental Division`}
      </AppBar>
    </React.Fragment>
  );
};

export default Footer;
