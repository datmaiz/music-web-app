import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from "@/components/elements";
import { loginBackground } from "@/assets/images";
import { register } from "@/services";
import { ErrorResponse } from "@/utils";
import { LoadingIcon } from "@/assets/icons/filled";

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isShowPasswordField, setIsShowPasswordField] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }, [])

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(value)
  }, [])

  const handleRegister = async () => {
    setLoading(true)
    const response = await register(email, password)
    setLoading(false)
    if (response instanceof ErrorResponse) {
      toast.error(response.error)
      return
    }

    navigate('/login')
  }

  return <section className='w-full flex justify-center items-center h-dvh p-5 relative'>
    <div
      className='flex flex-col gap-8 px-8 py-12 shadow-2xl max-w-[500px] w-full rounded-lg bg-[#fffh] backdrop-blur-md'>
      <h1 className='text-center text-2xl font-bold sm:text-3xl md:text-4xl xl:text-5xl text-white'>Create Account</h1>

      <Input
        label={'Email:'}
        alignContent={'vertical'}
        placeholder={'Enter your email'}
        labelColor={'text-white'}
        value={email}
        onValueChange={onEmailChange}
        sizeof={'lg'}
      />
      <Input
        label={'Password:'}
        alignContent={'vertical'}
        placeholder={'Enter your password'}
        labelColor={'text-white'}
        value={password}
        onValueChange={onPasswordChange}
        sizeof={'lg'}
        type={isShowPasswordField ? 'text' : 'password'}
      />

      <div className={'justify-start text-white'}>
        <input
          type="checkbox"
          id={'show-password'}
          onChange={() => setIsShowPasswordField(!isShowPasswordField)}
        />
        <label
          htmlFor="show-password"
          className={'ml-2 select-none'}
        >Show password</label>
      </div>

      {loading ? <div className={'flex justify-center'}><LoadingIcon color={'white'} /></div>
        : <Button
          size={'full'}
          shape={'rounded'}
          onClick={handleRegister}
        >Create new account</Button>}

      <Link to={'/register'} className={'text-white'}>Already have account</Link>
    </div>
    <img src={loginBackground} alt="login background"
         className={'absolute inset-0 w-full h-full object-cover z-[-1]'} />
  </section>
}
