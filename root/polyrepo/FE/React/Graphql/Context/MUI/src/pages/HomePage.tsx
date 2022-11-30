
import { useAuth } from '../contexts/AuthContext'

import { Typography } from '@mui/material'

export default function HomePage() {

  const {user} = useAuth()
  console.log(user?.name)
  return (
    <>
    <div>
      <Typography
      variant='h3'>

        Welcome {user?.name}
      </Typography>
    </div>
    </>
  )
}
