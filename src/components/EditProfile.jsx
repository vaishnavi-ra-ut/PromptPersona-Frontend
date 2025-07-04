import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const EditProfile = () => {

  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState({
  name: user?.name || "",
  age: user?.age || "",
  gender: user?.gender || "",
  imageUrl: ""
});

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/profile/");
        setForm({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          imageUrl: data.profileImage || ""
        });
        setPreview(data.profileImage || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchUser();
  }
}, [user]);


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("age", form.age);
      formData.append("gender", form.gender);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      } else if (form.imageUrl) {
        formData.append("imageUrl", form.imageUrl);
      }

      await API.put("/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center">
        {/* EDIT FORM */}
        <div className="card w-full md:w-1/2 bg-base-200 shadow-md p-6">
          <h2 className="text-xl font-bold text-center mb-4">Edit Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
              <label className="text-sm font-medium block">Upload Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />

              <p className="text-center text-sm mt-2">or paste image URL</p>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={(e) => {
                  handleChange(e);
                  setPreview(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-between gap-4">
              <button type="button" className="btn btn-outline w-1/2" onClick={() => navigate("/")}>
                Do It Later
              </button>
              <button type="submit" className="btn bg-[#057dcd] w-1/2">
                Save
              </button>
            </div>
          </form>
        </div>

        {/* LIVE PREVIEW */}
        <div className="card w-full md:w-1/4 bg-base-200 shadow-md p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-8">Your Profile</h2>

          <div className="avatar mb-5">
            <div className="w-48 rounded-full ring ring-[#057dcd] ring-offset-base-100 ring-offset-2">
              {preview ? (
                <img src={preview} alt="Profile Preview" />
              ) : (
                <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500">
                  ?
                </div>
              )}
            </div>
          </div>

          <p className="text-lg font-semibold">{form.name || "Your Name"}</p>
          <p className="text-sm text-base-content/70">
            {form.age ? `${form.age} years old` : "Age not set"}
          </p>
          <p className="text-sm text-base-content/70 capitalize">{form.gender || "Gender not selected"}</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
