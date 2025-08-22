import React, { useEffect, useState, useMemo } from "react"
import { Box } from "@mui/material"
import { Diagnosis, Entry } from "../../types.ts"
import PatientTable from "./PatientTable.tsx"
import diagnosisService from "../../services/diagnoses";
import WorkIcon from '@mui/icons-material/Work';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const EntryTable = ({ entry }: { entry: Entry }) => {
  const matchTypeToIcon = (type: Entry["type"]) => {
    switch (type) {
      case "OccupationalHealthcare":
        return <WorkIcon />
      case "HealthCheck":
        return <MonitorHeartIcon />
      case "Hospital":
        return <LocalHospitalIcon />
      default:
        assertNever(type)
    }
  }

  const tableTitles: string[] = ["Type", "Date", "Description"]
  const tableData: (string | React.ReactNode)[] =
    [matchTypeToIcon(entry.type), entry.date, entry.description]
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const allDiagnoses = await diagnosisService.getAll()
      setDiagnoses(allDiagnoses)
    }
    fetchDiagnoses()
  }, [])

  const diagnosesMap = useMemo(
    () => Object.fromEntries(diagnoses.map(d => [d.code, d])),
    [diagnoses]
  )

  switch (entry.type) {
    case "OccupationalHealthcare":
      tableTitles.push("Employer")
      tableData.push(entry.employerName)

      if (entry.sickLeave) {
        tableTitles.push("Granted Sick Leave")
        tableData.push(`From ${entry.sickLeave.startDate} To ${entry.sickLeave.endDate}`)
      }
      break
    case "HealthCheck":
      tableTitles.push("Health Rating")
      const hearts: React.ReactNode[] = []

      for (let i = 0; i < 4; i++) {
        if (i < 4 - entry.healthCheckRating) {
          hearts.push(<FavoriteIcon key={i} sx={{ color: '#7B1818' }} />)
        } else {
          hearts.push(<FavoriteBorderIcon key={i} />)
        }
      }

      tableData.push(<Box display="flex" gap={0.5}>{hearts}</Box>)
      break
    case "Hospital":
      tableTitles.push("Discharge Date", "Discharge Criteria")
      tableData.push(entry.discharge.date, entry.discharge.criteria)
      break
    default:
      assertNever(entry)
  }

  if (entry.diagnosisCodes) {
    tableTitles.push("Diagnosis Codes")
    tableData.push(
      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
        {entry.diagnosisCodes.map(code => (
          <li key={code}>
            <b>{code}</b>: {diagnosesMap[code]?.name || ""}
          </li>
        ))}
      </ul>
    )
  }

  return <PatientTable tableTitles={tableTitles} tableData={tableData} />
}

export default EntryTable
