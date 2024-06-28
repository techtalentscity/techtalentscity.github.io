import Container from "../../components/Container"
import image from '../../assets/images/aboutImage.png'

const About = () => {
  return (
    <Container className={'pt-9 px-4 lg:px-20 xl:px-32'}>
        <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold pb-6">About</h1>
            <p>Welcome to TechTalents City, the pulsating core of innovation and growth in the tech sector. Our story is one of passion, dedication, and a relentless pursuit of excellence in nurturing and accelerating development within the dynamic world of technology.</p>
        </div>
        <img src={image} alt="about image" className="w-full object-cover pt-12 pb-12 md:pb-16 lg:pb-28" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
                <div className="bg-[#F5F5FA] p-9 rounded-3xl">
                    <p className="font-bold pb-8 text-2xl">Our Journey</p>
                    <p>Embarking on this journey, we envisioned TechTalents City as more than just a platform; it&apos;s a thriving ecosystem. From its inception, our goal has been to create a space where tech professionals, emerging leaders, and industry key players converge to shape the future of technology.</p>
                </div>
                <div className="bg-[#F5F5FA] p-9 rounded-3xl">
                    <p className="font-bold pb-8 text-2xl">Our Vision</p>
                    <p>At the heart of TechTalents City beats a vision to be the leading platform that nurtures the growth and success of tech professionals. We&apos;re dedicated to fostering a community where learning, skill recognition, and career advancement opportunities seamlessly converge.</p>
                </div>
            </div>
            <div className="text-lg text-white flex justify-center items-center bg-gradient-to-br from-[#461fdf] to-[#5f30ac] rounded-3xl py-16 px-9">
                <p>In the coming years, our focus is on fostering a community that not only learns but also thrives, connecting ambitions with opportunities. By consistently enhancing our programs, expanding career pathways, and cultivating a dynamic network, we aim to redefine the landscape of tech excellence. <br /><br />Together, let&apos;s ascend, achieve, and advance as we shape the future of technology.</p>
            </div>
        </div>
    </Container>
  )
}

export default About