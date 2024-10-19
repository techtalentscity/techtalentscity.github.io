
import { Card } from 'antd';
import Archs from '../../../assets/images/TechArchs.png';
import Dev from '../../../assets/images/TechDev.png';
import Leads from '../../../assets/images/TechLeads.png';
import PO from '../../../assets/images/TechPO.png';
import Pro from '../../../assets/images/TechPro.png';
import QA from '../../../assets/images/TechQA.png';
import { useNavigate } from 'react-router-dom';


const UserCard = ({ user }) => {
  const { name, role,  badge, slug } = user;

  const navigate = useNavigate()

  const getBadge = (badgeType) => {
    switch (badgeType) {
      case 'TechPro':
        return Pro;
      case 'TechArch':
        return Archs;
      case 'TechPO':
        return PO;
      case 'TechLead':
        return Leads;
      case 'TechMentor':
        return Dev;
      case 'TechDev':
        return Dev;
      case 'TechQA':
        return QA;
      default:
        return null;
    }
  };

  const badgeInfo = getBadge(badge);

  return (
    <Card
      hoverable
      className="w-full rounded-3xl bg-[#f2f2f2]"
      onClick={() => navigate(`/recruit/${slug}`)}
    >
      <div className='flex items-center justify-center relative'>
        <img src={'https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={name} className='w-40 h-40 rounded-full object-cover object-center relative' />
        {badgeInfo && <img src={badgeInfo} alt={badge} className='w-12 h-12 absolute bottom-4 right-16 md:-right-2 rounded-full' />}
      </div>
      <div className="text-center text-[#131518] mt-3">
        <p className='font-bold text-2xl'>{name}</p>
        <p>{role}</p>
      </div>
    </Card>
  );
};

export default UserCard;
