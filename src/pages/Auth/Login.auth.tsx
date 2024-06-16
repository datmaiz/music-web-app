import React, { useMemo, useState } from "react";
import { Button, Input } from "../../components/elements";
import { loginBackground } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services";
import { ErrorResponse } from "@/utils";
import { toast } from "react-toastify";
import { LoadingIcon } from "@/assets/icons/filled";
import { useLocalStorage, useSessionStorage } from "@/hooks";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isRemembered, setIsRemembered] = useState<boolean>(false)
  const [isShowPasswordField, setIsShowPasswordField] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const { saveToSessionStorage } = useSessionStorage()
  const { setItem } = useLocalStorage()

  const onEmailChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }, [])

  const onPasswordChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(value)
  }, [])

  const onRememberChange = () => {
    setIsRemembered(!isRemembered)
  }

  const handleSignIn = async () => {
    setLoading(true)
    const response = await login(email, password)
    setLoading(false)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
      return
    }
    const user = response.data

    if (isRemembered) {
      setItem('user', { ...user })
    } else {
      saveToSessionStorage('user', { ...user })
    }

    if (user?.isAdmin) navigate('/admin/users-management')
    else navigate('/dashboard')
  }

  return <section className='w-full flex justify-center items-center h-dvh p-5 relative'>
    <div
      className='flex flex-col gap-8 px-8 py-12 shadow-2xl max-w-[500px] w-full rounded-lg bg-[#fffh] backdrop-blur-md'>
      <h1 className='text-center text-2xl font-bold sm:text-3xl md:text-4xl xl:text-5xl text-white'>Login</h1>

      <Input
        label={'Email:'}
        alignContent={'vertical'}
        placeholder={'Enter your email'}
        labelColor={'text-white'}
        sizeof={'lg'}
        value={email}
        onValueChange={onEmailChange}
      />
      <Input
        label={'Password:'}
        alignContent={'vertical'}
        placeholder={'Enter your password'}
        labelColor={'text-white'}
        sizeof={'lg'}
        value={password}
        onValueChange={onPasswordChange}
        type={isShowPasswordField ? 'text' : 'password'}
      />

      <div className={'justify-start text-white'}>
        <input
          type="checkbox"
          id={'show-password'}
          checked={isShowPasswordField}
          onChange={() => setIsShowPasswordField(!isShowPasswordField)}
        />
        <label
          htmlFor="show-password"
          className={'text-body-small ml-2 select-none'}
        >Show password</label>
      </div>

      {loading ? <div className={'flex justify-center'}><LoadingIcon color={'white'} /></div>
        : <Button
          size={'full'}
          shape={'rounded'}
          onClick={handleSignIn}
          className={`inline-flex justify-center`}
        >Sign In</Button>}

      <div className="flex items-center gap-2">
        <input type="checkbox" id={'remember'} checked={isRemembered} onChange={onRememberChange} />
        <label htmlFor="remember" className={'text-white select-none'}>Remember me</label>
      </div>

      <Link to={'/register'} className={'text-white'}>Don't have account?</Link>
    </div>
    <img src={loginBackground} alt="login background"
         className={'absolute inset-0 w-full h-full object-cover z-[-1]'} />
  </section>
}
