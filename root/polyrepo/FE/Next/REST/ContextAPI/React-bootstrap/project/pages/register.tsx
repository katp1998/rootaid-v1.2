import RegisterForm from "../components/registerForm"
import styles from '../styles/Home.module.css'

const register = () => {
  return (
    <>
      <h2 className={styles.title}>Register</h2>
      <RegisterForm />
    </>
  )
}
export default register