import { useState } from "react";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignup ? "Signup Data:" : "Login Data:", form);
    // Call login/signup API based on `isSignup`
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 ">
      <div className="card w-full max-w-md shadow-xl bg-base-300 border-1 border-gray-400 -mt-[7rem]">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-[#057dcd]">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <button type="submit" className="btn bg-[#057dcd] w-full ">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              {isSignup ? "Already have an account?" : "New user?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-[#057dcd] hover:underline"
              >
                {isSignup ? "Login here" : "Create account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
