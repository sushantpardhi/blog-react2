import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiEdit2,
  FiCheck,
  FiPlus,
  FiX,
} from "react-icons/fi";
import "./PersonalInformation.css";

const PersonalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    displayName: "JohnDoe",
    headline: "Software Developer",
    dob: "2001-06-04",
    location: "India",
    languages: ["English", "Spanish"],
    about:
      "A passionate writer and technology enthusiast sharing insights about web development...",
    interests: [
      "Web Development",
      "JavaScript",
      "React",
      "Technical Writing",
      "UI/UX Design",
    ],
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const interestInputRef = useRef(null);
  const languageInputRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add debounce timer ref
  const debounceTimer = useRef(null);

  // Create debounced location handler
  const debouncedLocationSearch = useCallback((value) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.length > 2) {
      debounceTimer.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
              value
            )}&limit=5&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
          );
          const data = await response.json();
          const suggestions = data.features.map(
            (feature) => feature.properties.formatted
          );
          setLocationSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      }, 500); // 500ms delay
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  // Update the handleLocationInput function
  const handleLocationInput = (value) => {
    handleInputChange("location", value);
    debouncedLocationSearch(value);
  };

  // Add this function after handleLocationInput
  const selectLocation = (location) => {
    handleInputChange("location", location);
    setShowSuggestions(false);
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showInterestInput && interestInputRef.current) {
      interestInputRef.current.focus();
    }
  }, [showInterestInput]);

  useEffect(() => {
    if (showLanguageInput && languageInputRef.current) {
      languageInputRef.current.focus();
    }
  }, [showLanguageInput]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setProfileData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
      setShowInterestInput(false);
    }
  };

  const handleRemoveInterest = (interest) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }));
      setNewLanguage("");
      setShowLanguageInput(false);
    }
  };

  const handleRemoveLanguage = (language) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }));
  };

  return (
    <div className="profile-page">
      <div className="banner">
        <img
          src="https://placehold.co/1200x300"
          alt="Profile Banner"
          className="banner-image"
        />
      </div>

      <div className="profile-main">
        <div className={`profile-header ${isScrolled ? "scrolled" : ""}`}>
          <div className="profile-picture-container">
            <img
              src="https://placehold.co/150x150"
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <div className="profile-title">
            <h1>{profileData.displayName}</h1>
            <p className="headline">{profileData.headline}</p>
          </div>
        </div>

        <div className="profile-content">
          <button className="edit-toggle" onClick={toggleEdit}>
            {isEditing ? <FiCheck /> : <FiEdit2 />}
          </button>

          <section className="section bio-details">
            <h2 className="heading-secondary">Personal Details</h2>
            <div className="bio-grid">
              {Object.entries({
                "Full Name": "fullName",
                "Display Name": "displayName",
                "Date of Birth": "dob",
                Location: "location",
              }).map(([label, field]) => (
                <div key={field} className="bio-item">
                  <h3 className="heading-tertiary">{label}</h3>
                  {isEditing ? (
                    field === "location" ? (
                      <div
                        className="location-input-container"
                        ref={suggestionRef}
                      >
                        <input
                          type="text"
                          value={profileData[field]}
                          onChange={(e) => handleLocationInput(e.target.value)}
                          className="edit-input"
                          placeholder="Enter location"
                        />
                        {showSuggestions && locationSuggestions.length > 0 && (
                          <div className="location-suggestions">
                            {locationSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => selectLocation(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : field === "dob" ? (
                      <input
                        type="date"
                        value={profileData[field]}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                        className="edit-input"
                      />
                    ) : (
                      <input
                        type="text"
                        value={profileData[field]}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                        className="edit-input"
                      />
                    )
                  ) : (
                    <p>
                      {field === "dob"
                        ? formatDate(profileData[field])
                        : profileData[field]}
                    </p>
                  )}
                </div>
              ))}
              <div className="bio-item">
                <h3 className="heading-tertiary">Joined</h3>
                <p className="text-body">January 2023</p>
              </div>
            </div>
          </section>

          <section className="section languages">
            <h2 className="heading-secondary">Languages</h2>
            <div className="skills-container">
              {profileData.languages.map((language, index) => (
                <div key={index} className="skill-tag">
                  {language}
                  {isEditing && (
                    <button
                      className="remove-interest"
                      onClick={() => handleRemoveLanguage(language)}
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  className="add-interest"
                  onClick={() => setShowLanguageInput(true)}
                >
                  <FiPlus />
                  Add Language
                </button>
              )}
            </div>
            {showLanguageInput && (
              <div className="interest-input-container">
                <input
                  ref={languageInputRef}
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Enter language"
                  className="edit-input"
                />
                <div className="interest-actions">
                  <button
                    onClick={handleAddLanguage}
                    className="action-btn confirm"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => setShowLanguageInput(false)}
                    className="action-btn cancel"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="section about">
            <h2 className="heading-secondary">About</h2>
            {isEditing ? (
              <textarea
                value={profileData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                className="edit-input about-input"
                rows="4"
              />
            ) : (
              <p className="text-body">{profileData.about}</p>
            )}
          </section>

          <section className="section expertise">
            <h2 className="heading-secondary">Areas of Interest</h2>
            <div className="skills-container">
              {profileData.interests.map((interest, index) => (
                <div key={index} className="skill-tag">
                  {interest}
                  {isEditing && (
                    <button
                      className="remove-interest"
                      onClick={() => handleRemoveInterest(interest)}
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  className="add-interest"
                  onClick={() => setShowInterestInput(true)}
                >
                  <FiPlus />
                  Add Interest
                </button>
              )}
            </div>
            {showInterestInput && (
              <div className="interest-input-container">
                <input
                  ref={interestInputRef}
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Enter new interest"
                  className="edit-input"
                />
                <div className="interest-actions">
                  <button
                    onClick={handleAddInterest}
                    className="action-btn confirm"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => setShowInterestInput(false)}
                    className="action-btn cancel"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="section contact">
            <h2 className="heading-secondary">Connect With Me</h2>
            <div className="social-links">
              <a
                href="mailto:author@blog.com"
                className="social-link"
                title="Email"
              >
                <FiMail />
                <span>author@blog.com</span>
              </a>
              <a
                href="https://twitter.com/username"
                className="social-link"
                title="Twitter"
              >
                <FiTwitter />
                <span>@username</span>
              </a>
              <a
                href="https://linkedin.com/in/username"
                className="social-link"
                title="LinkedIn"
              >
                <FiLinkedin />
                <span>/in/username</span>
              </a>
              <a
                href="https://github.com/username"
                className="social-link"
                title="GitHub"
              >
                <FiGithub />
                <span>@username</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
