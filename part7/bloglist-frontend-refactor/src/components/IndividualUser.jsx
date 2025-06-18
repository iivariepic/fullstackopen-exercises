import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const IndividualUser = () => {
  const id = useParams().id
  const userList = useSelector(state => state.userList)
  const user = userList.find(user => user.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default IndividualUser;
