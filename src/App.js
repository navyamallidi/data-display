import "./App.css";
import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";
import Completed from "./components/Completed";
import Active from "./components/Active";
import Salesorder from "./components/Salesorder";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const gotToActive = () => {
    navigate("/Active");
  };
  const gotToCompleted = () => {
    navigate("/completed");
  };
  const gotToSalesOrder = () => {
    navigate("/salesorder");
  };
  
  return (
    <div>
      <div className="App">
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <div className="flex space-x-4">
          {/* active sales button */}
          <Button onClick={() => gotToActive()}>Active sales Order</Button>
          {/* completed sales button */}
          <Button onClick={() => gotToCompleted()}>Completed sales order</Button>
        </div>
        {/* sales order button */}
        <Button onClick={() => gotToSalesOrder()}>
          <MdOutlineAdd />
          Sales Order
        </Button>
      </div>
      <Routes>
        <Route path="/Active" element={<Active />} />
        <Route path="/Completed" element={<Completed />} />
        <Route path="/Salesorder" element={<Salesorder />} />
      </Routes>
    </div>
  );
}

export default App;
