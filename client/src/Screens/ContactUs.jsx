import React from "react";
import Layout from "./../Layout/Layout";
import Head from "./../Components/Head";
import { FiMail, FiPhoneCall, FiMapPin } from "react-icons/fi";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "Send us an email for any inquiries",
      icon: FiMail,
      contact: "dkhuong5102003@gmail.com",
      type: "email"
    },
    {
      id: 2,
      title: "Call Us",
      info: "Call us for immediate support",
      icon: FiPhoneCall,
      contact: "+84 395 099 722",
      type: "phone"
    },
    {
      id: 3,
      title: "Location",
      info: "Visit our office",
      icon: FiMapPin,
      contact: "Thanh Xuan, Ha Noi City, Viet Nam",
      type: "address"
    },
  ];

  const handleContact = (contact, type) => {
    switch (type) {
      case "email":
        window.location.href = `mailto:${contact}`;
        break;
      case "phone":
        window.location.href = `tel:${contact}`;
        break;
      case "address":
        window.open(`https://maps.google.com/?q=${contact}`, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid md:grid-cols-2 gap-6 lg:my-20 mt-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-[#404040] flex flex-col items-center p-8 bg-main rounded-lg text-center hover:bg-[#1f1f1f] transition duration-300 cursor-pointer shadow-xl"
              onClick={() => handleContact(item.contact, item.type)}
            >
              <div className="w-20 h-20 rounded-full bg-dry bg-opacity-10 flex items-center justify-center mb-4">
                <item.icon className="text-3xl text-[#E50914]" />
              </div>
              <h5 className="text-xl font-semibold mb-2 text-white">{item.title}</h5>
              <p className="mb-4 text-sm text-[#808080] leading-7">{item.info}</p>
              <p className="text-[#E50914] font-medium hover:underline">
                {item.contact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
