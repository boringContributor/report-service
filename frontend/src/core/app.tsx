/* Copyright (c) 2020 CLOUDPILOTS Software & Consulting GmbH */

import { FC } from 'react';
import './app.css';
import ReportOverview from 'pages/report-overview';
import ReportDetails from 'pages/report-details';
import ProviderStack from './provider-stack';
import { Route, Switch } from 'react-router-dom';

const App: FC = () => (
  <ProviderStack>
    <Switch>
      <Route exact path="/" component={ReportOverview} />
      <Route exact path="/:reportId" component={ReportDetails} />
      <Route path="*" component={ReportOverview} />
    </Switch>
  </ProviderStack>
);

export { App as default };
