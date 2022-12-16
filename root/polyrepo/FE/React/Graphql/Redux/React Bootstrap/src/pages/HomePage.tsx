
import {  useAppSelector } from '../store/hooks';




export default function HomePage() {

  const {user} = useAppSelector((state) => state.auth)

  return (
    <div>
      { user && (
        <h3>
          Welcome {user.name}
        </h3>

      )
      }

    </div>


  )
}
