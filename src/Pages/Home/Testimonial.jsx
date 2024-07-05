import user1 from '../../assets/images/user1.png';
import user2 from '../../assets/images/user2.png';
import user3 from '../../assets/images/user3.png';
import Container from '../../components/Container';

const testimonials = [
  {
    id: 1,
    rating: 4,
    text: "As a tech entrepreneur, I'm excited about this platform and its potential for innovative tech solutions across various domains.",
    name: "Temitope Ajibola",
    // role: "Designer",
    image: user2
  },
  {
    id: 2,
    rating: 4,
    text: "As a professional accountant and analyst, I'm excited about this platform and its potential for transitioning into technology.",
    name: "Peter Adeniran",
    // role: "Designer",
    image: user1
  },
  {
    id: 3,
    rating: 4,
    text: "As an AI/ML researcher, I'm intrigued on how this platform will connect the right talent to skill-customized AI projects.",
    name: "Suma Movva",
    // role: "Designer",
    image: user3
  }
];

const Testimonials = () => {
  return (
    <div className="bg-[#f8f8f8]">
        <Container className={'py-28'}>
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold">What Our Users Say</h2>
                <p className="text-gray-500 mt-2 max-w-[378px] text-center mx-auto">Explore what users are saying about their journey with TechTalents City!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg border boreder-[#DEDEDE]">
                    <div className="flex justify-start mb-4">
                    {[...Array(5)].map((star, index) => (
                        <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        // fill={index < testimonial.rating ? "gold" : "gray"}
                        className="w-6 h-6"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.617h3.8c.969 0 1.371 1.24.588 1.81l-3.074 2.234 1.175 3.617c.3.921-.755 1.688-1.539 1.118l-3.074-2.234-3.074 2.234c-.784.57-1.838-.197-1.539-1.118l1.175-3.617-3.074-2.234c-.784-.57-.381-1.81.588-1.81h3.8l1.175-3.617z" stroke="#FAD200" strokeWidth="1" fill={index < testimonial.rating ? "gold" : "white"}/>
                        </svg>
                    ))}
                    </div>
                    <p className="text-[#737373] mb-4">{testimonial.text}</p>
                    <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <p className="text-[#4C4DFF] font-bold">{testimonial.name}</p>
                        <p className="text-[#101010] font-bold">{testimonial.role}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </Container>
    </div>
  );
};

export default Testimonials;
