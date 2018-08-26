import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink,
} from 'reactstrap';
import About from './components/About';
import Campaign from './components/Campaign';
import CampaignPage from './components/CampaignPage';
import Home from './components/Home';
import NewCampaign from './components/NewCampaign';
import Verfied from './components/Verified';

const App = () => (
  <Fragment>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">ETHCollective</NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/campaigns">Campaigns</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/campaigns/new">New Campaign</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <Switch>
      <Route exact path="/" component={Campaign} />
      <Route exact path="/campaigns" component={Campaign} />
      <Route exact path="/about" component={About} />
      <Route exact path="/campaigns/new" component={NewCampaign} />
      <Route path="/verified/:publicAddress" component={Verfied} />
      <Route path="/campaigns/:campaignId" component={CampaignPage} />
    </Switch>
  </Fragment>
);

export default App;
