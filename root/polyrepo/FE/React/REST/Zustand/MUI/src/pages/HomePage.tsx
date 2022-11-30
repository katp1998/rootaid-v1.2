
import useStore from '../store/store';

import {Box, Typography, TextField, Button,AppBar,Toolbar} from '@mui/material/';

export default function HomePage() {

  const user = useStore((state:any) => state.user)

  return (
    <div>
      <Typography
      variant='h3'>
        Welcome {user?.name}
      </Typography>
    </div>


  )
}
