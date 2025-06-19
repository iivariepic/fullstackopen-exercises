import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography
} from '@mui/material'

const UserList = () => {
  const userList = useSelector(state => state.userList)

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography>User's Name</Typography></TableCell>
              <TableCell><Typography>Blogs Created</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map(user =>
              <TableRow key={user.id} className="blog">
                <TableCell><Link to={`/users/${user.id}`}><Typography>{user.name}</Typography></Link></TableCell>
                <TableCell><Typography>{user.blogs.length}</Typography></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
