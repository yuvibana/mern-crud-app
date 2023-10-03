import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Students from "./components/Students";
import CreateStudent from "./components/CreateStudent";
import UpdateStudent from "./components/UpdateStudent";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="nav-link">crudapp</Link>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Link to={"/create"} className="nav-link">Add Student</Link>
            <Link to={"/"} className="nav-link">Student List</Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="py-4"></div>

      {/* app routes  */}
      <Routes>
        <Route exact path="/" element={<Students />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
      </Routes>
    </div>
  );
}
export default App;
