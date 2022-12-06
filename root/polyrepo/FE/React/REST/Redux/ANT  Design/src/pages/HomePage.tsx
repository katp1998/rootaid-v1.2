
import {  useAppSelector } from '../store/hooks';




export default function HomePage() {

  const {user} = useAppSelector((state) => state.auth)

  return (
    <>
    <div>
        <h1>
        Welcome {user?.name}
        </h1>
    </div>
    </>

  )
}
