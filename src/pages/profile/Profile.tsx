import { useState } from "react";
import { Link } from "react-router-dom";
import { default as Button } from "../../components/ui/Button";
import logo from "../../assets/images/logo.png";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "Male",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (parent === "address") {
        setProfile(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value,
          },
        }));
      }
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: Reset to original values
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
          <nav className="text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            / <span className="font-medium text-black">Profile</span>
          </nav>

          {/* Logo */}
          <div className="flex items-center mb-6">
            <img src={logo} alt="logo" className="h-8 w-auto mr-2" />
            <span className="text-xl text-[#272727]/20 font-sans font-extrabold">
              VR
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-[#272727]">
              MY PROFILE
            </h1>
            <Button
              text={isEditing ? "Cancel" : "Edit Profile"}
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              className="bg-[#272727] text-white hover:bg-[#272727]/90"
            />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8f8f8] p-6 text-center">
              <div className="w-32 h-32 bg-[#272727] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-[#272727] mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-[#272727]/70 mb-4">{profile.email}</p>
              {isEditing && (
                <Button
                  text="Change Photo"
                  className="w-full bg-[#d4d4d4] text-[#272727] hover:bg-[#d4d4d4]/80"
                />
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-[#272727] mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={e =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.firstName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={e =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.lastName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={e =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={e =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        value={profile.gender}
                        onChange={e =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.gender}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-xl font-bold text-[#272727] mb-6">
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Street Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.address.street}
                        onChange={e =>
                          handleInputChange("address.street", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.address.street}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.address.city}
                        onChange={e =>
                          handleInputChange("address.city", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.address.city}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.address.state}
                        onChange={e =>
                          handleInputChange("address.state", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.address.state}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      ZIP Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.address.zipCode}
                        onChange={e =>
                          handleInputChange("address.zipCode", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.address.zipCode}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#272727] mb-2">
                      Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.address.country}
                        onChange={e =>
                          handleInputChange("address.country", e.target.value)
                        }
                        className="w-full p-3 bg-[#d4d4d4] border-none outline-none focus:ring-2 focus:ring-[#272727]"
                      />
                    ) : (
                      <div className="p-3 bg-[#f8f8f8] text-[#272727]">
                        {profile.address.country}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button
                    text="Cancel"
                    onClick={handleCancel}
                    className="bg-[#d4d4d4] text-[#272727] hover:bg-[#d4d4d4]/80"
                  />
                  <Button
                    text="Save Changes"
                    onClick={handleSave}
                    className="bg-[#272727] text-white hover:bg-[#272727]/90"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
