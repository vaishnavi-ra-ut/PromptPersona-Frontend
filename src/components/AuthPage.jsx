import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../utils/authSlice";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isSignup ? "/auth/signup" : "/auth/login";

      const cleanedForm = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        gender: form.gender.trim().toLowerCase(),
      };

      const { data } = await API.post(url, cleanedForm);

      localStorage.setItem("token", data.token);
      dispatch(setCredentials({ user: data.user, token: data.token }));

      if (isSignup) navigate("/edit");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card w-full max-w-md shadow-lg bg-base-200 -mt-20">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-[#636ae8]">
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

            <button
              type="submit"
              className="btn bg-[#636ae8] w-full"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Sign Up"
                : "Login"}
            </button>
          </form>

          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {error}
            </div>
          )}

          <div className="text-center mt-4">
            <p className="text-md">
              {isSignup ? "Already have an account?" : "New user?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-[#636ae8] hover:underline font-medium"
              >
                {isSignup ? "Login here" : "Create account"}
              </button>
            </p>
          </div>
          <div className="text-center ">
  <p className="text-sm text-gray-600">or</p>
  <button
    type="button"
    className="w-28 mt-2 text-gray-600 text-sm hover:underline"
    onClick={() => navigate("/")}
  >
    Skip for now →
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;