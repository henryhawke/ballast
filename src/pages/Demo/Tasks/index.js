import Avatar from "@material-ui/core/Avatar";
import Assignment from "@material-ui/icons/Assignment";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { ListPage } from "rmw-shell/lib/containers/Page";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { useAuth } from "base-shell/lib/providers/Auth/";

const fields = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "notes",
    label: "Notes",
  },
  {
    name: "windSpeed",
    label: "Wind Speed",
  },
  {
    name: "tentWidth",
    label: "Tent Width",
  },
  {
    name: "tentHeight",
    label: "Tent Height",
  },
  {
    name: "ridgeLength",
    label: "Ridge Length",
  },
];

const Row = ({ data, index, style }) => {
  const path = "tasks";
  const { title = "", helper = {}, key, owner = "" } = data;
  const history = useHistory();

  return (
    <div key={key} style={style}>
      <ListItem
        button
        alignItems='flex-start'
        style={{ height: 72 }}
        onClick={() => {
          history.push({ pathname: `${path}/${owner}/${key}`, state: data });
        }}>
        <ListItemAvatar>
          <Avatar>
            <Assignment />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={helper?.label} />
      </ListItem>
      <Divider variant='inset' />
    </div>
  );
};

const Tasks = (props) => {
  const { auth } = useAuth();
  const path = "tasks/" + auth.uid;
  console.log(path);
  const intl = useIntl();
  const history = useHistory();

  return (
    <ListPage
      fields={fields}
      path={path}
      createGrant='create_task'
      Row={Row}
      listProps={{ itemSize: 72 }}
      getPageProps={() => {
        return {
          pageTitle: intl.formatMessage({
            id: path,
            defaultMessage: "Saved Data",
          }),
        };
      }}
      onCreateClick={() => {
        history.push("/tools");
      }}
    />
  );
};

export default Tasks;
