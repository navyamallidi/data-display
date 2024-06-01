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
} from '@chakra-ui/react'

function Completed() {
  return (
    <div class="mt-20 mx-10">

<TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>These are your Completed Orders</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Customer Name</Th>
        <Th>Price</Th>
        <Th>Last Modified</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>1</Td>
        <Td>JOHN PARKER</Td>
        <Td >25.4</Td>
        <Td >12.4.24</Td>

      </Tr>
      <Tr>
        <Td>2</Td>
        <Td>ANDREW TATE</Td>
        <Td >30.48</Td>
        <Td >13.5.23</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

   </div>
  )
}

export default Completed