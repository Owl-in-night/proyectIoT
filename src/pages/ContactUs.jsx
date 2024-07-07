import React, { useState } from 'react';
import { useLanguage } from "../context/LanguageContext";
function ContactUs() {
  const { language, translations } = useLanguage();
  const texts = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí deberías agregar la lógica para enviar el formulario por correo electrónico.
    // Normalmente, esto requeriría un backend para manejar el envío seguro del correo electrónico.

    const { name, email, subject, message } = formData;

    // Ejemplo de cómo podrías enviar los datos a un backend para manejar el envío de correo
    const dataToSend = {
      name,
      email,
      subject,
      message
    };

    try {
      // Aquí podrías usar fetch() u otra librería para enviar los datos al servidor
      // fetch('/api/sendEmail', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(dataToSend)
      // });

      alert('Mensaje enviado correctamente!');
      // Puedes agregar una redirección o alguna otra acción después de enviar el correo
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    
      <div className="relative mt-10 mb-10 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-[#F0F4F9] dark:bg-[#1E1F20] shadow-lg sm:rounded-3xl sm:p-20">
        <h1 className="text-3xl font-semibold text-[#434343] dark:text-gray-200 mb-6 text-center">{texts.contactus.contact}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-[#434343] dark:text-gray-200">{texts.contactus.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-[#434343] dark:text-gray-200">{texts.contactus.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="text-[#434343] dark:text-gray-200">{texts.contactus.subject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-[#434343] dark:text-gray-200">{texts.contactus.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4 w-full"
            >
              {texts.contactus.sendmessage}
            </button>
          </form>
        </div>
      </div>
    
  );
}

export default ContactUs;
