import React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import "./Styles/TermsConditions.css";
function Message(props) {
  return (
    <>
      <label className="terms-agrement">
        Clients have the option to choose between a 50% downpayment or full
        upfront payment once the sketch is approved. Please note that refunds or
        cancellations are not permitted after payment has been made. The
        turnaround time for completing artwork is dependent on the complexity of
        the requested art, and pricing may vary accordingly. The finished
        artwork will be delivered via email. Additional charges apply for extra
        characters at $5 or Php 250, while flat backgrounds are provided free of
        charge, with a $3 fee for detailed backgrounds. To ensure a smooth
        process, it's essential to read and comprehend these terms of service.
        Begin by contacting us via Twitter, Facebook, or Instagram, and provide
        clear references along with a detailed description of your request. Upon
        confirmation of all details, you can proceed with either an upfront
        payment or a 50% downpayment of the total price. We will commence work
        upon payment receipt. Prior to coloring, rough sketches will be
        submitted for your approval, with only one revision permitted. We will
        keep you informed with periodic updates on the progress of your
        commission. Once the commission is finalized, a PNG file will be sent to
        you via email.
      </label>
      <h3 style={{ marginTop: 30, fontWeight: "normal", fontSize: 17 }}>
        By clicking proceed you have agreed to the terms of services
      </h3>
      <div>
        <h3>You can follow and contact us on:</h3>
        <a className="link" href="https://www.instagram.com/missartarchive/">
          <Instagram></Instagram>@missartarchive
        </a>
        <a className="link" href="https://web.facebook.com/MissArtCommission">
          <Facebook></Facebook>@missartcommission
        </a>
        <a className="link" href="https://twitter.com/MissARTarchive">
          <Twitter></Twitter>@missartarchive
        </a>
      </div>
    </>
  );
}

export default Message;
