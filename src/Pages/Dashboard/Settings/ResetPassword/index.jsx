import { Button, Form, Input } from "antd";
import { LuArrowLeftToLine } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="text-[#101010]">
      <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate(-1)}>
        <LuArrowLeftToLine size={18} />
        <p className="font-bold">Back</p>
      </div>
      <Form
        layout="vertical"
        className="max-w-lg"
        onFinish={onFinish}
      >
        <Form.Item
          label='Enter old password'
          name="oldPassword"
          rules={[{ required: true, message: 'Please enter your old password!' }]}
        >
          <Input.Password placeholder="Enter old password" className="p-2" />
        </Form.Item>
        <Form.Item
          label='Enter new password'
          name="newPassword"
          rules={[{ required: true, message: 'Please enter your new password!' }]}
        >
          <Input.Password placeholder="Enter new password" className="p-2" />
        </Form.Item>
        <Form.Item
          label='Confirm new password'
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" className="p-2" />
        </Form.Item>
        <Button block className="p-2 h-auto font-bold" type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
