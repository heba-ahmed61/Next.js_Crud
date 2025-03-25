'use client';
import { signIn } from 'next-auth/react';
import './login.css';
const LoginPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      // redirect: false // Prevent automatic redirection
    });
    if (login?.error) {
      console.log('Login failed:', login.error); // Handle login failure
    } else {
      console.log('Login successful:', login); // Handle login success
    }
  };
  return (
    <div className="login-wrapper">
      <div className="blogs_header_layout"></div>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <input type="email" placeholder="enter email" name="email" required />
        </div>
        <div>
          <input
            type="password"
            placeholder="enter password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="submit button">
          login
        </button>
        <div>
          <button
            onClick={(e) => signIn('github')}
            style={{ cursor: 'pointer' }}
          >
            Login With Github
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
