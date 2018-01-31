import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Currencies from '../currencies'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <header>
          <Navbar color="faded" light expand="md">
            <NavbarBrand href="/">Crypto</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/"><NavLink>Currencies List</NavLink></Link>
                  {/* <Link to="/about-us">About</Link> */}
                </NavItem>
                <NavItem>
                  <Link to="/details"><NavLink>Details</NavLink></Link>
                  {/* <Link to="/">Home</Link> */}

                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem>
                      Option 1
                  </DropdownItem>
                    <DropdownItem>
                      Option 2
                  </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={Currencies} />
        </main>
      </div>
    );
  }
}


export default App
