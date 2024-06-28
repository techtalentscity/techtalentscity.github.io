import badgePO from '../../assets/images/TechPO.png';
import badgeQA from '../../assets/images/TechQA.png';
import badgeDev from '../../assets/images/TechDev.png';
import badgeLeads from '../../assets/images/TechLeads.png';
import badgeArchs from '../../assets/images/TechArchs.png';
import badgePro from '../../assets/images/TechPro.png';

import Container from "../../components/Container";

const badges = [
    {
      id: 1,
      image: badgePO,
      title: 'TechPO',
      description: (
        <>
          Awarded to <strong>Product Owners</strong> after the successful completion of each collaborative project.
        </>
      ),
      bg: '#F3F3FF'
    },
    {
      id: 2,
      image: badgeQA,
      title: 'TechQA',
      description: (
        <>
          Awarded to <strong>Quality Testers</strong> after the successful completion of each collaborative project.
        </>
      ),
      bg: '#f6fff0'
    },
    {
      id: 3,
      image: badgeDev,
      title: 'TechDev',
      description: (
        <>
          Awarded to <strong>Coding Developers</strong> after the successful completion of each collaborative project.
        </>
      ),
      bg: '#FBF2F2'
    },
    {
      id: 4,
      image: badgeLeads,
      title: 'TechLeads',
      description: (
        <>
          Awarded to <strong>Non-Technical Professionals</strong> after the successful completion of each collaborative project.
        </>
      ),
      bg: '#FFFBF2'
    },
    {
      id: 5,
      image: badgeArchs,
      title: 'TechArchs',
      description: (
        <>
          Awarded to <strong>Low/No-Coding Developers</strong> after the successful completion of each collaborative project.
        </>
      ),
      bg: '#F4F3FC'
    },
    {
      id: 6,
      image: badgePro,
      title: 'TechGuard',
      description: (
        <>
          Awarded to <strong>Network and Cybersecurity professionals</strong> after the successful completion of each collaborative project.
        </>
      ),
      bg: '#F2F2F2'
    },
  ];
  

const TechBadges = () => {
  return (
    <Container className="bg-white my-12 md:my-24 py-16 !px-4 lg:!px-20 xl:!px-32">
      <h2 className="text-3xl font-semibold text-center mb-4">Tech Badges</h2>
      <p className="text-center mb-12 text-[#737373] max-w-xl mx-auto">
        Advance your career with our innovative TechTalents Badge System, spotlighting key milestones and tackling tech industry challenges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map(badge => (
          <div key={badge.id} className={`px-6 py-10 rounded-lg text-center`} style={{ backgroundColor: badge.bg }}>
            <img src={badge.image} alt={badge.title} className="mx-auto mb-8 w-20 h-[86px] object-center" />
            <h3 className="text-xl font-bold mb-5">{badge.title}</h3>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TechBadges;
