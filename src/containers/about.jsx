import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../routes';
import { useQuery } from '../hooks';
import ContentHolder from '../components/content-holder';

function About() {
  const customTitle = useQuery('title');

  return (
    <ContentHolder centered fullHeight>
      {routes.about.routes.map(({ path, navTitle }) => (
        <Link key={path} to={path}>{navTitle}</Link>
      ))}
      {customTitle || <h1>About page</h1>}
    </ContentHolder>
  );
}

export default About;
