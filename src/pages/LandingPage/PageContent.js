import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Paper from "@material-ui/core/Paper";

const PackageCard = ({ title, command, description, icons }) => {
  return (
    <Card elevation={4} style={{ margin: 18, maxWidth: 350 }}>
      <CardContent>
        <Typography gutterBottom variant='h4' component='h2'>
          {title}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F3F4F4",
            padding: 8,
          }}>
          <Typography
            gutterBottom
            variant='body1'
            color='textSecondary'
            component='h2'>
            {command}
          </Typography>
          <IconButton
            aria-label='Icon button'
            onClick={() => {
              if (window.clipboardData) {
                // Internet Explorer
                window.clipboardData.setData("Text", command);
              } else {
                try {
                  navigator.clipboard.writeText(command);
                } catch (error) {}
              }
            }}>
            {icons}
          </IconButton>
        </div>
        <br />
        <Typography variant='body2' component='div'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const PageContent = ({ setComponents }) => {
  return (
    <React.Fragment>
      <div style={{ height: 20 }} />
      <Typography
        variant='h3'
        //color="textSecondary"
        style={{ margin: 16, textAlign: "center" }}>
        Wind Overturn Resistance Application
      </Typography>
      <Typography
        variant='h5'
        component='div'
        color='textSecondary'
        style={{ margin: 16, textAlign: "center" }}>
        Calculation of overturn moment due to horizontal wind force
      </Typography>
      <div style={{ height: 30 }} />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "space-around",
          flexWrap: "wrap",
        }}>
        <PackageCard
          title={"Customizable Security"}
          command={
            "Your data, by default, is private. Easily add and update other user's access at any time."
          }
          description={"Only users you authorize can access your data."}
          icons={<LockIcon />}
        />
        <PackageCard
          title={"Communication"}
          command={
            "Communicate from anywhere. Private, built in chat helps you problem solve from anywhere. Chats feature text messaging, sending current location or pictures."
          }
          description={
            "You can enable notifications to stay aware of new messages."
          }
          icons={<GroupIcon />}
        />
        <PackageCard
          title={"Reuse, Save & Search"}
          command={
            "Already setup a similar tent before? Save, timestamp, and label your calculations inputs."
          }
          description={
            "Search all data from your saved calculations and compare your data."
          }
          icons={<AccountTreeIcon />}
        />
      </div>
      <div style={{ height: 30 }} />
      {/* <div
        ref={(r) => {
          if (r) {
            setComponents(r);
          }
        }}
        style={{
          //height: 400,
          backgroundColor: "#2D2D2D",
          backgroundImage: "radial-gradient( #4F4F4F,#242424)",
        }}>
        <div style={{ height: 30 }} />
        <Typography
          variant='h3'
          //color="textSecondary"
          style={{ margin: 16, textAlign: "center", color: "white" }}>
          Not just a template
        </Typography>
        <Typography
          variant='h5'
          component='div'
          style={{ margin: 16, textAlign: "center", color: "grey" }}>
          But also not a framework.
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}>
          <TrackChanges style={{ fontSize: 150, color: "white" }} />
        </div>
        <Typography
          variant='h5'
          component='div'
          style={{ margin: 16, textAlign: "center", color: "grey" }}>
          You start easy like with every other template but you can also update
          the template parts over the time. And with the updates you don't only
          update the components but also get new features and get bugfixes.
        </Typography>
        <div style={{ height: 50 }} />
      </div> */}

      <div style={{ height: 30 }} />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}>
        <Paper>
          {" "}
          <img
            src='logo_tent_header.jpg'
            href='https://www.clemson.edu/centers-institutes/cuimse/index.html'
            alt='CU-iMSE'
            style={{
              width: 210,
              backgroundColor: "#2D2D2D",
              backgroundImage: "radial-gradient( #4F4F4F,#242424)",
            }}
          />
        </Paper>
        <Paper>
          {" "}
          <img
            src='imse-logo.png'
            href='https://tent.ifai.com/'
            alt='IFAI - Tent Rental Division'
            style={{ width: 210, backgroundColor: "#424242" }}
          />
        </Paper>
      </div>
      <div style={{ height: 50 }} />
    </React.Fragment>
  );
};

export default PageContent;
