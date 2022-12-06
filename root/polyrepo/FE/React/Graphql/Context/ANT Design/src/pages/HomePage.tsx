
import { useAuth } from '../contexts/AuthContext'



export default function HomePage() {

  const {user} = useAuth()
  console.log(user?.name)
  return (
    <>
    <div>
      <h3>
      Welcome {user?.name}
      </h3>



    </div>
    </>
  )
}
