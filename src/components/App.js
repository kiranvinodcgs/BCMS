import React from "react";
import { Routes, Route } from "react-router-dom";
import Curia from "./Curia";
import Homepage from "./Pages/Homepage";
import CourtLogin from "./Pages/CourtLogin";
import JudgeLogin from "./Pages/JudgeLogin";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import AdminEdit from "./Pages/AdminEdit";
import PetitionerFile from "./Pages/Petitioner/File";
import Petitioner from "./Pages/Petitioner";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login/court" element={<CourtLogin />} />
      <Route path="/login/judge" element={<JudgeLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/edit" element={<AdminEdit />} />
      <Route path="/curia" element={<Curia />} />
      <Route path="/petitioner/file" element={<PetitionerFile />} />
      <Route path="/petitioner" element={<Petitioner />} />

    </Routes>
  );
};

export default App;
