import React from "react"
import { Table, TableBody, TableCell, TableRow, Paper, TableContainer } from "@mui/material"

interface Props {
  tableTitles: string[]
  tableData: (string | React.ReactNode)[]
}

const PatientTable = ({ tableTitles, tableData }: Props) => {
  const table = tableTitles.map((title, index) => {
    return { title, data: tableData[index] }
  })

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#F8F9FA",
        border: "1px solid #E4E7EB",
        borderRadius: 2,
        mt: 3
      }}
    >
      <Table>
        <TableBody>
          {table.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  border: "1px solid #E4E7EB",
                  fontWeight: 600,
                  width: "40%",
                }}
              >
                {row.title}
              </TableCell>
              <TableCell sx={{ border: "1px solid #E4E7EB" }}>
                {row.data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatientTable