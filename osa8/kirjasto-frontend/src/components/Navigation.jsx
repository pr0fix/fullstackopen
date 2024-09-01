import { Link } from "react-router-dom";

const Navigation = ({ token, logout }) => {
  const linkStyle = {
    borderRadius: "2px",
    backgroundColor: "#f2f2f2",
    padding: "2px 3px",
    textDecoration: "none",
    color: "#000",
    fontWeight: "400",
    fontSize: "15px",
    border: "solid",
    borderColor: "#000",
    borderWidth: "1px",
  };
  return (
    <nav>
      <div style={{marginBottom:"20px"}}>
        <Link to="/" style={linkStyle}>
          Books
        </Link>

        <Link to="/authors" style={linkStyle}>
          Authors
        </Link>

        {token ? (
          <>
            <Link to="/addBook" style={linkStyle}>
              Add book
            </Link>

            <button style={linkStyle} onClick={logout}>Log out</button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
