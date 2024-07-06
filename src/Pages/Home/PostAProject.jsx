import { Button } from 'antd';

const PostAProject = () => {
  return (
    <div className="w-full bg-gray-100 p-9 rounded-lg text-center">
      <h2 className=" text-2xl xl:text-3xl font-bold">Post a Project</h2>
      <p className="text-sm xl:text-base my-6">Every day, 10,000+ clients visit our website. Connect with top talent by posting your projects today</p>
      <Button type="primary" block className='py-5 px-12 font-bold'>Post a Project</Button>
    </div>
  );
};

export default PostAProject;
