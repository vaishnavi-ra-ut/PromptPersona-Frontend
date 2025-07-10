import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../utils/axios";

const CreatePersona = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    description : "" ,
    avatar: "",
    gender: "other",
    category: "Your Personas",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.prompt || !form.description) return alert("Name , Description and Prompt are required");

    try {
      setLoading(true);
      await API.post("/personas/custom", form);
      navigate("/"); 
    } catch (err) {
      console.error("Error creating persona", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Please log in to create a persona.</p>
        <button className="btn mt-4 bg-[#636ae8] text-white hover:bg-[#4a54c4] transition-all duration-200" onClick={() => navigate("/auth")}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-16 ">
      <h1 className="text-xl flex justify-center font-semibold mb-6 text-[#636ae8]">Create Custom AI Persona</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Persona Name"
          className="input input-bordered w-full"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Persona Description"
          className="textarea textarea-bordered w-full"
          rows={1}
          value={form.description}
          onChange={handleChange}
        />

        <textarea
          name="prompt"
          placeholder="Persona Prompt"
          className="textarea textarea-bordered w-full"
          rows={2}
          value={form.prompt}
          onChange={handleChange}
        />

        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          className="input input-bordered w-full"
          value={form.avatar}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <select
            name="gender"
            className="select select-bordered w-full"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="other">Other</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Persona"}
        </button>
      </form>
    </div>
  );
};

export default CreatePersona;
