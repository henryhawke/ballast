import Form from "../../../components/Forms/Task";
import { useAuth } from "base-shell/lib/providers/Auth/";
import React, { useEffect } from "react";
import { FormPage } from "rmw-shell/lib/containers/Page";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useLists } from "rmw-shell/lib/providers/Firebase/Lists";

const singular = "task";

const Task = (props) => {
  const { key } = props.datakey || {};
  const history = useHistory();
  const intl = useIntl();

  const { auth } = useAuth();
  const path = "tasks/" + auth.uid + "/" + key;
  console.log(path);
  const { watchList, unwatchList, getList } = useLists();

  useEffect(() => {
    watchList("users");

    return () => unwatchList("users");
  }, [watchList, unwatchList]);

  const users = getList("users");

  const initialValues = { helper: "", title: "" };

  return (
    <FormPage
      path={path}
      uid={key}
      initialValues={initialValues}
      getPageProps={(values) => {
        return {
          pageTitle: intl.formatMessage({
            id: path,
            defaultMessage: "Calculations",
          }),
        };
      }}
      handleSubmit={(values, newUid) => {
        console.log("values", values);
        if (newUid) {
          history.push({
            pathname: `/${path}/${newUid}`,
            state: { values: values },
          });
        } else {
          history.push({ pathname: `/${path}`, state: { values: values } });
        }
      }}
      handleDelete={() => {
        history.push(`/${path}`);
      }}
      formProps={{ users }}
      Form={Form}
      grants={{
        create: `create_${singular}`,
        delete: `delete_${singular}`,
      }}
      deleteDialogProps={{
        title: intl.formatMessage({
          id: `delete_${singular}_dialog_title`,
          defaultMessage: "Delete Calculation?",
        }),
        message: intl.formatMessage({
          id: `delete_${singular}_dialog_message`,
          defaultMessage: "Calculation will be deleted permanently?",
        }),
        action: intl.formatMessage({
          id: `delete_${singular}_dialog_action`,
          defaultMessage: "DELETE CALCULATION",
        }),
      }}
    />
  );
};

export default Task;
