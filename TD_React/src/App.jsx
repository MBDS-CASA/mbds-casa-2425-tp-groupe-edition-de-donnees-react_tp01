import { useState } from 'react';
import university from './assets/azurelogo.png';
import './App.css';
import data from './../../data.json';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";
function ShowData({ data, menuItem }) {
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [searchQuery, setSearchQuery] = useState(""); 

  
  let filteredData;

  switch (menuItem) {
    case "Notes":
      filteredData = data.map(({ course, student, grade, date }) => ({
        course,
        student: `${student.firstname} ${student.lastname}`,
        grade,
        date,
      }));
      break;
    case "Etudiants":
      filteredData = data.map(({ student }) => ({
        firstname: student.firstname,
        lastname: student.lastname,
        id: student.id,
      }));
      break;
    case "Matières":
      filteredData = data.map(({ course }) => ({ course }));
      break;
    default:
      filteredData = [];
  }

  
  if (searchQuery) {
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      
  <TextField
  label="Rechercher"
  variant="outlined"
  fullWidth
  margin="normal"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    backgroundColor: "white",  
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",  
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "black",  
    },
    "& .MuiInputLabel-root": {
      color: "blue",  
    },
  }}
/>





      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(filteredData[0] || {}).map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, idx) => (
                  <TableCell key={idx}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
  component="div"
  count={filteredData.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  
/>
      </TableContainer>

    


</div>
  );
}


function Header({ title1, title2, logo }) {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <h1>{title1}</h1>
      <h2>{title2}</h2>
    </header>
  );
}
function Footer({annee, nom, prenom}) {
  return (
    <footer>
      
      © {annee} - {prenom}.{nom}, Tous droits réservés.
    
    </footer>
  )
}
function MainContent({jour, mois, annee, heure, minute, seconde}) {
  return (
    <main>
      <p>
      Bonjour, on est le {jour}, {mois}, {annee} et il est {heure}:{minute}:{seconde}
      </p>
    </main>
  )
}
function DataExtract({ data }) {
  const [note, setNote] = useState(null);

  const handleRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setNote(data[randomIndex]);
  };

  return (
    <div className="item-display"  >
      <button onClick={handleRandomNote}>Tirer une note aléatoire</button>
      {note ? (
        <div>
          <h2>Course: {note.course}</h2>
          <p>Student: {note.student.firstname} {note.student.lastname}</p>
          <p>Grade: {note.grade}</p>
          <p>Date: {note.date}</p>
        </div>
      ) : (
        <p>Aucune note sélectionnée</p>
      )}
    </div>
  );
}

function HamburgerMenu({ menuItems, onSelect, ...props }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
    setMenuOpen(false); 
  };

  return (
    <div className="hamburger-menu" {...props}>
      
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      
      {menuOpen && (
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className={`menu-item ${item === activeItem ? "active" : ""}`} 
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState("Notes");

  const handleMenuSelect = (item) => {
    setCurrentPage(item);
  };
  return (
    <>
      <HamburgerMenu
        menuItems={["Notes", "Etudiants", "Matières", "A propos"] }
        onSelect={handleMenuSelect}
      />
      <main>
        <p>Vous êtes dans la page : {currentPage}</p>
      </main>

      <div>
        <Header
          title1="Introduction à React"
          title2="A la découverte des premières notions de React"
          logo={university}
        />
        
        
        <MainContent jour='Lundi' mois='Decembre' annee='2024' heure='16' minute='30' seconde='00' />
        <DataExtract data={data} />
      </div>
      
      <div className="card">
      <button onClick={() => setCount((count) => (count > 0 ? count - 1 : count))}>
          -
        </button>
        <button>
          count is {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          +
        </button>
        
        
      </div>
      <ShowData data={data} menuItem={currentPage} />
      <Footer annee='2024' nom='EL RHRIB' prenom='Oussama'/>
    </>
  );
}

export default App;
