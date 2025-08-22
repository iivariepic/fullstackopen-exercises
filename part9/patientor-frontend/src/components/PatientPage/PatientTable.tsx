import { Table, TableBody, TableCell, TableRow, Paper, TableContainer } from "@mui/material"
import { Patient } from "../../types.ts"

interface Props {
  patient : Patient
}

const PatientTable = ({ patient }: Props) => {
  const tableTitles: string[] = ["Date Of Birth", "SSN", "Occupation"]
  const tableData: string[] = [patient.dateOfBirth, patient.ssn, patient.occupation]
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