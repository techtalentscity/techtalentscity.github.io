import { Button } from 'antd';

const PostAProject = () => {
  return (
    <div className="w-full bg-gray-100 p-9 rounded-lg text-center">
      <h2 className=" text-2xl xl:text-3xl font-bold">Post a Project</h2>
      <p className="text-sm xl:text-base my-6">Share your ideas and collaborate with tech talent to bring your vision to life!</p>
      <Button type="primary" block className='py-5 px-12 font-bold'>Post Your Project Now</Button>
    </div>
  );
};

export default PostAProject;
