import React, { useState } from "react";
import {Anchor,Button} from '@mantine/core';

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real signup logic / API call
    console.log("Signup data:", form);
    alert("Signed up (demo) — check console for data");
  };

  return (
    <>
      <div className="signup-page">
        <form className="signup-card" onSubmit={handleSubmit}>
          <h2>Create account</h2>

          <label>
            Username
            <input
              name="username" 
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
              placeholder="johndoe"
            />
          </label>

          <label>
            Fullname
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </label>

          <Anchor href="/courses" sx={{ display: 'block' }}>
                    <Button fullWidth mt="xl" size="md" radius="md">
                      Signup
                    </Button>
           </Anchor>

           
        </form>
      </div>

 <style>{`.signup-page {
          min-height: 100vh;
          display: flex;
           /* align-items: center; */
          justify-content: right;
          background-image: url("https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg");
          background-size: cover;
          background-position: center;
          /* padding: 32px; */
          box-sizing: border-box;
        }

        .signup-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.95);
          padding: 28px;
         /* border-radius: 12px; */
         /* box-shadow: 0 10px 30px rgba(2,6,23,0.35); */
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .signup-card h2 {
          margin: 0 0 6px 0;
          font-size: 20px;
          text-align: center;
        }

        .signup-card label {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          color: #222;
          font-weight: 500;

        }

        .signup-card input {
          margin-top: 6px;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: box-shadow 120ms, border-color 120ms;
        }

        .signup-card input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.08);
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 20px;
            border-radius: 8px;
          }
        }
`}</style>
</>
  );
    
   
}
 