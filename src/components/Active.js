import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Salesorder from "./Salesorder";

function Active() {

  const navigate = useNavigate();

  const gotToSalesOrder = () => {
    navigate("/salesorder");
  };


  return (

   <div class="mt-20 mx-10">

<TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>These are your Active Orders</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Customer Name</Th>
        <Th>Price</Th>
        <Th>Last Modified</Th>
        <Th>Edit/View</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>1</Td>
        <Td>JOHN PARKER</Td>
        <Td >25.4</Td>
        <Td >12.4.24</Td>
        <Td >
        <Button   onClick={() => gotToSalesOrder()} colorScheme='teal'>Edit</Button>
        </Td>

      </Tr>
      <Tr>
        <Td>2</Td>
        <Td>ANDREW TATE</Td>
        <Td >30.48</Td>
        <Td >25.4</Td>
        <Td >
        <Button  onClick={() => gotToSalesOrder()}  colorScheme='teal'>Edit</Button>
        </Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

<Routes>
        <Route path="/Salesorder" element={<Salesorder />} />
      </Routes>

   </div>
  )
}

export default Active