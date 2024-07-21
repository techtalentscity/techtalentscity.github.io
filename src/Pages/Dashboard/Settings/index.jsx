import { Link } from "react-router-dom"

const Settings = () => {
  return (
    <div className="flex flex-col gap-10 font-medium text-[#000606]">
        <p><Link to={'/settings/edit-profile'}>Edit profile details</Link></p>
        <p><Link to={'/settings/reset-password'}>Reset password</Link></p>
        <p className="text-[#D72911]">Delete account</p>
    </div>
  )
}

export default Settings