import React from "react";
import MarkdownPage from "rmw-shell/lib/containers/MarkdownPage";
import { useIntl } from "react-intl";

const Page = () => {
  const intl = useIntl();
  return (
    <div>
      <MarkdownPage
        pageProps={{
          pageTitle: intl.formatMessage({
            id: "about",
            defaultMessage: "About",
          }),
        }}
        path={
          "https://raw.githubusercontent.com/henryhawke/ballastpublic/master/documentation/getting_started.md"
          // 'https://raw.githubusercontent.com/TarikHuber/react-most-wanted/master/documentation/getting_started.md'
        }
      />
    </div>
  );
};

export default Page;
