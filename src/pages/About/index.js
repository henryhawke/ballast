import React, { useEffect, useState } from "react";
import Page from "material-ui-shell/lib/containers/Page/Page";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar";
import ReactMarkdown from "react-markdown";

import { useIntl } from "react-intl";

const loadData = async (path) => {
  const data = await fetch(path);
  const text = await data.text();
  return text;
};

const MarkdownPage = ({ path, pageProps }) => {
  const [source, setSource] = useState(null);

  useEffect(() => {
    loadData(path).then((text) => {
      setSource(text);
    });
  }, [path]);

  return (
    <Page {...pageProps}>
      <Scrollbar>
        <div style={{ backgroundColor: "white", padding: 12 }}>
          {source && (
            <ReactMarkdown
              className='markdown-body'
              source={source}
              escapeHtml
            />
          )}
        </div>
      </Scrollbar>
    </Page>
  );
};
const About = () => {
  const intl = useIntl();
  return (
    <MarkdownPage
      pageProps={{
        pageTitle: intl.formatMessage({
          id: "about",
          defaultMessage: "About",
        }),
      }}
      path={
        "https://raw.githubusercontent.com/henryhawke/ballastpublic/main/README.md"
      }
    />
  );
};

export default About;
