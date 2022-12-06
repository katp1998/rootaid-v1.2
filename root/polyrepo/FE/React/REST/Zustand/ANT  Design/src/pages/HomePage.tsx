
import useStore from '../store/store';



export default function HomePage() {

  const user = useStore((state:any) => state.user.name)

  return (
    <div>
    <h3>
      Welcome {user}
    </h3>
    </div>


  )
}
