import Satyam from "../../public/images/satyam.jpg";
import Somya from "../../public/images/som.jpg";
import Palak from "../../public/images/p.jpg";



const founders = [
  {
    name: "Palak Bansal",
    role: "CEO & Co-Founder",
    image: Palak,
    bio: "Palak is a visionary entrepreneur with a deep passion for Indian rituals and technology. She leads the company with innovation and a focus on customer satisfaction.",
  },
  {
    name: "Somya Tiwari",
    role: "COO & Co-Founder",
    image: Somya,
    bio: "Somya manages the day-to-day operations, ensuring smooth service delivery and building strong relationships with our Pandit network.",
  },
  {
    name: "Satyam Singhal",
    role: "CTO & Co-Founder",
    image: Satyam,
    bio: "Satyam makes sure that every booking, calendar, flow of tech, management and interaction runs flawlessly.",
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Our platform simplifies the process of booking trusted and experienced Pandits for all types of poojas and rituals. We bridge tradition with technology, ensuring authenticity, convenience, and transparency. Whether its a wedding, Griha Pravesh, or festival, we help you find the right Pandit Ji with ease.        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className="bg-white border rounded-2xl shadow-sm p-6 space-y-4 text-center"
          >
            <img
              src={founder.image}
              alt={founder.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border"
            />
            <h3 className="text-xl font-semibold">{founder.name}</h3>
            <p className="text-orange-600 font-medium">{founder.role}</p>
            <p className="text-muted-foreground text-sm">{founder.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
