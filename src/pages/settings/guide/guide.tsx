import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import SearchGuide from '../../../assets/images/SearchGuide.png';
import GuideImg from '../../../assets/images/guide.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

export const Guide = () => {
  return (
    <Page
      contentClassName="flex min-h-full flex-col gap-4 bg-gray-50 p-6 pt-20"
      header={<AppBar title="راهنما"></AppBar>}
    >
      <Link to={paths.settings.searchTypeGuide} className="w-full">
        <img src={SearchGuide} className="w-full"></img>
      </Link>
      <Link to={paths.settings.communicationGuide} className="w-full">
        <img src={GuideImg} className="w-full"></img>
      </Link>
    </Page>
  );
};
