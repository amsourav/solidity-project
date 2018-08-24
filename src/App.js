import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {
  Container,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from 'reactstrap';
import Home from './components/Home';
import Campaign from './components/Campaign';
import About from './components/About';
import CampaignPage from './components/CampaignPage';
import NewCampaign from './components/NewCampaign';

const App = () => (
  <Fragment>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">GoFundMe</NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/campaigns">Campaigns</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/campaigns" component={Campaign} />
        <Route exact path="/about" component={About} />
        <Route exact path="/campaigns/new" component={NewCampaign} />
        <Route path="/campaigns/:campaignId" component={CampaignPage} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
