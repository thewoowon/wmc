import ButtonBig from '@components/ButtonBig'
import { FormError } from '@components/FormError'
import styled from '@emotion/styled'
import { Input } from '@mantine/core'
import { User } from '@prisma/client'
import { IconBrandGoogle, IconBrandNextjs, IconLogin } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  LiteralUnion,
  ClientSafeProvider,
  useSession,
} from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Image from 'next/image'

export type ILoginForm = {
  email: string
  password: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders()
  return {
    props: {
      providers: await providers,
    },
  }
}

export default function SignIn({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider | null
  >
}) {
  const [myProviders, setMyProviders] = useState([])
  const { data: session } = useSession()
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  })

  const onSubmit = async () => {
    try {
      const { email, password } = getValues()

      const response = await signIn('signInWithEmail', {
        email,
        password,
        redirect: false,
        callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/signin`,
      })
        .then((res) => {
          if (res?.status === 200) {
            toast.success('로그인에 성공했습니다.', {
              icon: '👏',
              position: 'top-right',
            })
          } else {
            toast.error('로그인에 실패했습니다.', {
              icon: '👏',
              position: 'top-right',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex flex-col font-sans-kr py-36">
        {session ? (
          <div
            style={{ height: '500px' }}
            className="flex flex-col justify-center items-center font-sans-kr-light"
          >
            <div
              className="relative text-5xl text-white"
              style={{ fontFamily: 'Kashie-Mercy' }}
            >
              We Make the Code
            </div>
            <div className="relative font-sans-kr-light text-xl py-3">WMC</div>
            <div className="text-xl">
              안녕하세요! {session.user?.name}님 😆😆😆
            </div>
            <div className="flex flex-col justify-center items-center py-3 text-blue-500">
              <Link
                className="border-b-2 border-b-white hover:border-b-blue-500 cursor-pointer"
                href="/"
              >
                {'-> '} 메인으로 이동하기
              </Link>
              <Link
                className="border-b-2 border-b-white hover:border-b-blue-500 cursor-pointer"
                href="/auth/signout"
              >
                {'-> '}로그아웃하기
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex border-2 border-white p-5 rounded-md bg-white">
            <div style={{ width: '500px' }} className="p-5">
              <Image
                width={'952'}
                height={'1075'}
                src={'/assets/figure/wmc_4_1.png'}
                alt={''}
              ></Image>
            </div>
            <div className="p-5 flex flex-col justify-center items-center">
              <div className="font-sans-kr-light text-xl font-bold">
                We Make the Code! WMC와 함께 시작해보세요.
              </div>
              <form
                className="grid gap-2 mt-8 mb-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="font-bold">📨 이메일</div>
                <label
                  htmlFor="email"
                  className="flex justify-between items-center"
                >
                  <input
                    {...register('email', {
                      required: '이메일을 입력해주세요',
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요."
                    required
                    className="w-full h-12 border border-zinc-800 px-4 ouline-none focus:outline-none"
                    autoComplete="true"
                  />
                </label>
                {(errors.email?.type === 'pattern' && (
                  <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
                )) ||
                  (errors.email?.message && (
                    <FormError errorMessage={errors.email?.message} />
                  ))}
                <div className="font-bold">⚙️ 비밀번호</div>
                <input
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    pattern:
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
                  })}
                  name="password"
                  type="password"
                  required
                  placeholder="비밀번호를 입력하세요."
                  className="w-full h-12 border border-zinc-800 px-4 ouline-none focus:outline-none"
                  autoComplete="true"
                />
                {errors.password?.type === 'pattern' && (
                  <FormError errorMessage="대소문자, 숫자, 특수문자 8-14자리를 입력해주세요" />
                )}
                {errors.password?.message && (
                  <FormError errorMessage={errors.password?.message} />
                )}
                <ButtonLogin
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full my-2 flex justify-center items-center shadow-lg text-white login-button"
                  style={{ border: '2px solid rgba(99,102,241,0.8)' }}
                >
                  <span className="px-2 font-bold">이메일 로그인</span>
                </ButtonLogin>
              </form>
              <ButtonBig
                className="text-white bg-blue-500 border-2 border-blue-500 w-full my-2 flex justify-center items-center shadow-lg hover:bg-blue-600"
                onClick={() => signIn('google')}
              >
                <span className="px-2 font-bold">Google 로그인</span>
              </ButtonBig>
              {/* <ButtonBig
              className="m-2 flex justify-center items-center shadow-lg hover:bg-yellow-500 bg-yellow-400 text-white"
              onClick={() => signIn('kakao')}
            >
              <IconBrandKickstarter color="white" stroke={2} size={25}></IconBrandKickstarter>
              <span className="px-2">카카오 로그인</span>
            </ButtonBig> */}
              <ButtonBig
                className="text-white bg-green-500 border-2 border-green-500 w-full my-2 flex justify-center items-center shadow-lg hover:bg-green-600"
                onClick={() => signIn('naver')}
              >
                <span className="px-2 font-bold">NAVER 로그인</span>
              </ButtonBig>
              <div className="flex justify-center items-center">
                아직 회원이 아니신가요?
                <Link
                  className="text-blue-500 px-2 my-4 border-b-blue-500 hover:border-b "
                  href="/auth/new-user"
                >
                  회원가입하기
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ButtonLogin = styled.button`
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`
