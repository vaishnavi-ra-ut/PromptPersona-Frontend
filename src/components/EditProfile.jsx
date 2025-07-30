import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../utils/authSlice";
import API from "../utils/axios";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    navigate("/auth");
  }
}, [user, navigate]);


  const [form, setForm] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || ""
  });

  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const saveProfile = async () => {
    try {

      const res = await API.put("/profile/edit", form, {
        withCredentials: true
      });

      dispatch(setCredentials({ user: res.data, token: localStorage.getItem("token") }));
       setToast(true);
    setTimeout(() => {
      setToast(false);
      navigate("/"); 
    }, 3000);

    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to update");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
  };

  return (
    <div className="mt-8 flex items-center justify-center bg-base-100 px-4 py-8">
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-md z-50 animate-slide-in">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center  mb-2">{error}</div>
      )}

      <div className="card w-full max-w-xl bg-base-200 shadow-md p-6 border border-[#636ae8] rounded-lg">
        <h2 className="text-xl font-bold text-center mb-6 text-[#636ae8]">Edit Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="input input-bordered w-full"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <div className="flex justify-between gap-4 mr-4">
            <button type="button" className="btn w-1/2 " onClick={() => navigate("/")}>
              Do It Later
            </button>
            <button type="submit" className="btn bg-[#4b5bbf] w-1/2 hover:bg-[#636ae8] text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
