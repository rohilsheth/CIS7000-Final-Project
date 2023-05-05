import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.png';

function NavBarIcon() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Clinical Note Generator
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarIcon;