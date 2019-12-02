import React from 'react';

import { useQuery } from '../hooks';
import ContentHolder from '../components/content-holder';

function About() {
  const customTitle = useQuery('title');

  return (
    <ContentHolder centered fullHeight>
      {customTitle || <h1>About page</h1>}
    </ContentHolder>
  );
}

export default About;
