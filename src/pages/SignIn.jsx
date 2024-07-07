import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/_partials/Alert";
import { useLanguage } from "../context/LanguageContext";

function SignIn() {
  const { language, translations } = useLanguage();
  const texts = translations[language];

  const [user, setUser] = useState({ email: "", password: "" });
  const { signin, SigninWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Verificar si el correo electrónico tiene el dominio permitido
      if (!user.email.endsWith('@uvg.edu.gt')) {
        throw new Error('Solo se permite el acceso con correos de @uvg.edu.gt');
      }

      // Iniciar sesión con correo y contraseña
      await signin(user.email, user.password);
      navigate("/app");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await SigninWithGoogle();
      navigate("/app");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Please enter your email");
    try {
      await resetPassword(user.email);
      setError("We sent you an email with the link to reset your password");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: `url('/Images/SI.png')` }}>
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex-1 p-1">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">{texts.signin.signIn}</h1>
        </div>
        {error && <Alert message={error} />}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {texts.signin.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@uvg.edu.gt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {texts.signin.passwordLabel}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {texts.signin.signInButton}
            </button>
            <a
              href="#!"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleResetPassword}
            >
              {texts.signin.forgotPassword}
            </a>
          </div>

          <p className="text-sm text-center text-gray-600">
            {texts.signin.noAccount}{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-800">
              {texts.signup.signUp}
            </Link>
          </p>
        </form>
        <button
          className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full"
          onClick={handleGoogleSignin}
        >
          {texts.signin.signInWithGoogle}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
