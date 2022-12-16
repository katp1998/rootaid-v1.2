
import useStore from '../store/store';



export default function HomePage() {

  const user = useStore((state:any) => state.user)

  return (
    <div>
        <h3>
            Welcome {user?.name}
        </h3>
        

    </div>


  )
}
