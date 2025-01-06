import { useState, useEffect } from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function MainContent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = currentDate.toLocaleDateString("fr-FR", options);
  const timeString = currentDate.toLocaleTimeString("fr-FR");

  return (
    <p>
      Bonjour, on est le {dateString} et il est {timeString}.
    </p>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const authorName = "Ayman EL KARROUSSI , Omar NASSIB , Safae HASSIB";

  return (
    <p>
      © {currentYear} - {authorName}, Tous droits réservés.
    </p>
  );
}

function Header() {
  return (
    <header>
      <img
        src="https://emsi.ma/wp-content/uploads/2020/07/logo.png"
        alt="Logo Emsi"
        style={{ width: "100%", maxWidth: "300px", height: "auto" }}
      />
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}

function Menu({ onMenuChange }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const handleClick = (item) => {
    setActiveItem(item);
    onMenuChange(item);
  };

  return (
    <nav style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item} style={{ margin: "10px 0" }}>
            <button
              style={{
                backgroundColor: activeItem === item ? "#0056b3" : "#007BFF",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Notes = ({ data, onAdd, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    unique_id: null,
    course: "",
    grade: "",
    student: { firstname: "", lastname: "" },
    date: "",
  });

  const handleOpen = (item = null) => {
    setFormData(
      item || {
        unique_id: null,
        course: "",
        grade: "",
        student: { firstname: "", lastname: "" },
        date: "",
      }
    );
    setOpen(true);
  };

  const handleSave = () => {
    if (formData.unique_id) {
      onEdit(formData);
    } else {
      onAdd({ ...formData, unique_id: Date.now() });
    }
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleOpen()}>Add Note</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {formData?.unique_id ? "Edit Note" : "Add Note"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Matière"
            fullWidth
            value={formData.course}
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
          />
          <TextField
            label="Note"
            fullWidth
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
          />
          <TextField
            label="Prénom"
            fullWidth
            value={formData.student.firstname}
            onChange={(e) =>
              setFormData({
                ...formData,
                student: { ...formData.student, firstname: e.target.value },
              })
            }
          />
          <TextField
            label="Nom"
            fullWidth
            value={formData.student.lastname}
            onChange={(e) =>
              setFormData({
                ...formData,
                student: { ...formData.student, lastname: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Matière</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.unique_id}>
                <TableCell>{item.unique_id}</TableCell>
                <TableCell>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(item)}>Edit</Button>
                  <Button onClick={() => onDelete(item.unique_id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const Etudiants = ({ data, onAdd, onEdit, onDelete }) => {
  // Extract unique students
  const students = Array.from(
    new Map(
      data
        .filter((item) => item.student) // Ensure only items with valid student data are considered
        .map((item) => [item.student.id, item.student])
    ).values()
  );

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    firstname: "",
    lastname: "",
  });

  const handleOpen = (item = null) => {
    setFormData(item || { id: null, firstname: "", lastname: "" }); // Initialize formData
    setOpen(true);
  };

  const handleSave = () => {
    if (formData.id) {
      onEdit(formData); // Edit existing student
    } else {
      onAdd({ ...formData, id: Date.now() }); // Add new student
    }
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstname || "N/A"}</TableCell>
                <TableCell>{student.lastname || "N/A"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(student)}>Edit</Button>
                  <Button onClick={() => onDelete(student.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => handleOpen()}>Add Student</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {formData.id ? "Edit Student" : "Add Student"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Prénom"
            fullWidth
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
          />
          <TextField
            label="Nom"
            fullWidth
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Matieres = ({ data, onAdd, onEdit, onDelete }) => {
  const courses = Array.from(new Set(data.map((item) => item.course)));
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleOpen = (item = null) => {
    setFormData(item || "");
    setOpen(true);
  };

  const handleSave = () => {
    if (formData) {
      if (courses.includes(formData)) {
        onEdit(formData);
      } else {
        onAdd(formData);
      }
    }
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matières</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(course)}>Edit</Button>
                  <Button onClick={() => onDelete(course)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => handleOpen()}>Add Subject</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData ? "Edit Subject" : "Add Subject"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de la Matière"
            fullWidth
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const APropos = () => (
  <div style={{ margin: "20px auto", width: "80%" }}>
    <h2>À Propos</h2>
    <p>
      Cette application React a été développée pour illustrer les concepts
      fondamentaux de React.
    </p>
    <p>Auteur : Ayman EL KARROUSSI , Omar NASSIB , Safae HASSIB. Merci de votre visite !</p>
  </div>
);

function App() {
  const [data, setData] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Notes");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) =>
        console.error("Erreur lors du chargement des données:", error)
      );
  }, []);

  const handleAdd = (newItem) => setData((prev) => [...prev, newItem]);
  const handleEdit = (updatedItem) =>
    setData((prev) =>
      prev.map((item) =>
        item.unique_id === updatedItem.unique_id ? updatedItem : item
      )
    );
  const handleDelete = (id) =>
    setData((prev) => prev.filter((item) => item.unique_id !== id));

  const renderContent = () => {
    switch (activeMenu) {
      case "Notes":
        return (
          <Notes
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "Etudiants":
        return (
          <Etudiants
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "Matières":
        return (
          <Matieres
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "A propos":
        return <APropos />;
      default:
        return null;
    }
  };

  return (
    <>
      <Menu onMenuChange={setActiveMenu} />
      <Header />
      <MainContent />
      <div>{renderContent()}</div>
      <Footer />
    </>
  );
}

export default App;
