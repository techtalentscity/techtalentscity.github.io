import { Link } from 'react-router-dom';
import IMAGE from '../../assets/images/signupbg.png';
import Container from '../../components/Container';
import logo from '../../assets/images/logo-black.png'
import { Button, Form, Input } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="w-full flex items-center h-screen bg-white">
      <div className="w-full lg:w-[50%] flex justify-center items-center overflow-y-auto scrollbar-hide md:h-screen pt-12 md:pt-0">
        <Container className={'md:!px-16 lg:!px-0 md:h-screen pt-6 md:pt-12 pb-12'}>
          <Link to={'/'}>
            <img src={logo} alt="logo" className="w-[250px] object-cover object-center" />
          </Link>
          <p className='font-bold text-4xl py-5'>Welcome back👋</p>
          <p className='text-[#A2A2A2]'>Login to access all your data</p>
          <Form layout='vertical' className='pt-8'>
            <Form.Item label="Email address" name="email" rules={[{ required: true, message: 'Email is required', type: "email" }]}>
              <Input placeholder="johndoe@email.com" className='p-2' />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
              <Input.Password placeholder='*********' className='p-2' />
            </Form.Item>
            <p className='pb-6 font-bold text-primary'>Forgot Password?</p>
            <Button type='primary' block className='p-2 !h-auto font-bold'>Log in</Button>
          </Form>
          <div className="mt-6 text-center">
            <p>Don&apos;t have an account? <Link to='/signup' className='text-primary font-bold'>Register with us</Link></p>
            <p className="my-4">Or</p>
            <Button className='mb-4 h-auto p-2' block>Register with Google <FcGoogle size={17} /></Button>
            <Button className='mb-2 h-auto p-2' block>Register with LinkedIn <FaLinkedin size={17} color='#0288D1' /></Button>
            {/* <Button block> with Microsoft</Button> */}
          </div>
        </Container>
      </div>
      <div className="hidden lg:w-[50%] h-full lg:flex justify-center items-center rounded-l-[60px] relative">
        <img src={IMAGE} alt="login" className='w-full h-full object-cover rounded-l-[60px]' />
        <div className="absolute top-40 left-20 2xl:left-40 inset-0 flex flex-col justify-center items-center bg-white bg-opacity-20 w-[400px] xl:w-[500px] h-[350px] text-white p-8 ">
          <h2 className="text-3xl xl:text-5xl font-bold mb-4">Community and Network Building</h2>
          <p className="text-lg text-[#F6F6F8]">Creating opportunity to develop and earn TechTalents badges faster by creating and collaborating featured projects</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
