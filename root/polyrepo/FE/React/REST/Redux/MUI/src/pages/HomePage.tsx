import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';
import {  useAppSelector } from '../store/hooks';




export default function HomePage() {

  const {user} = useAppSelector((state) => state.auth)

  return (
    <div>
      { user && (
        <Typography
        variant='h3'>
          Welcome {user.name}
        </Typography>
      )
      }

    </div>


  )
}
