"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient, UserSession } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import {
  User,
  Calendar,
  Phone,
  LogOut,
  Edit3,
  CheckCircle2,
  X,
  Camera,
  Mail,
  ShieldCheck,
  Building,
  Sparkles,
  Loader2
} from "lucide-react";

export default function ProfilePage() {
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userProperties, setUserProperties] = useState<Property[]>([]);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("user");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadUserSession() {
      const activeSession = authClient.getSession();
      setSession(activeSession);

      if (activeSession?.user?.id) {
        // Fetch fresh profile from NestJS API
        const freshUser = await authClient.fetchProfile(activeSession.user.id);
        if (freshUser) {
          populateForm(freshUser);
        } else {
          populateForm(activeSession.user);
        }

        // Fetch user's listings
        const properties = await apiClient.getProperties();
        const mine = properties.filter(
          (p) => p.broker?.id === activeSession.user.id || p.phone === activeSession.user.phone
        );
        setUserProperties(mine);
      }
    }

    loadUserSession();

    window.addEventListener("delala_auth_change", loadUserSession);
    return () => window.removeEventListener("delala_auth_change", loadUserSession);
  }, []);

  function populateForm(u: UserSession) {
    const names = (u.fullName || "").split(" ");
    setFirstName(u.firstName || names[0] || "");
    setLastName(u.lastName || names.slice(1).join(" ") || "");
    setPhone(u.phone || "");
    setAvatarUrl(u.avatarUrl || "");
    setBio(u.bio || "");
    setRole(u.role || "user");
  }

  const handleLogOut = () => {
    authClient.signOut();
    setSession(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setLoading(true);
    setErrorMsg("");
    setSaveSuccess(false);

    try {
      const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
      const res = await authClient.updateProfile(session.user.id, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName,
        phone: phone.trim(),
        avatarUrl: avatarUrl.trim(),
        bio: bio.trim(),
        role,
      });

      if (res.user) {
        setSession({ ...session, user: res.user });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
        setIsEditing(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile details.");
    } finally {
      setLoading(false);
    }
  };

  const user = session?.user;

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* User Profile Banner Header */}
        {user ? (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4C061D] via-[#736F4E] to-[#B4C292]" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
              <div className="relative group">
                {user.avatarUrl && user.avatarUrl.startsWith("http") ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#ECE7DA] shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#4C061D] text-white font-serif-display text-3xl font-light flex items-center justify-center border-4 border-[#ECE7DA] shadow-sm">
                    {user.fullName ? user.fullName.slice(0, 2).toUpperCase() : "US"}
                  </div>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-[#ECE7DA] text-[#4C061D] shadow-xs hover:bg-[#FAF8F4] transition-colors"
                  title="Change avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-[#1c1b12]">
                    {user.fullName || user.email}
                  </h1>
                  <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 px-3 py-1 rounded-full border border-[#B4C292]/50 font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {user.role} ACCOUNT
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#736F4E] font-mono-label mb-2">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#4C061D]" /> {user.email}
                  </span>
                  {user.phone ? (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#4C061D]" /> {user.phone}
                    </span>
                  ) : (
                    <span className="text-[#736F4E]/60 italic">No phone number added</span>
                  )}
                </div>

                {user.bio && (
                  <p className="text-xs text-[#1C1B12]/80 max-w-2xl bg-[#FAF8F4] p-3 rounded-2xl border border-[#ECE7DA] mt-2">
                    "{user.bio}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 z-10 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#ECE7DA] pt-4 sm:pt-0">
              <button
                onClick={() => {
                  populateForm(user);
                  setIsEditing(true);
                }}
                className="px-6 py-3 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors flex items-center gap-2 shadow-xs"
              >
                <Edit3 className="w-4 h-4" />
                <span>EDIT PROFILE</span>
              </button>

              <button
                onClick={handleLogOut}
                className="px-5 py-3 rounded-full bg-red-50 border border-red-200 text-xs font-mono-label text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>LOG OUT</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-xl mx-auto mb-12 shadow-sm space-y-4">
            <User className="w-12 h-12 text-[#4C061D] mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              Account Authentication Required
            </h2>
            <p className="text-xs text-[#736F4E] max-w-md mx-auto">
              Please sign in with your email and password or create a new account to access your user profile dashboard.
            </p>
            <Link
              href="/auth/signin?callbackUrl=/profile"
              className="inline-block px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B0416] transition-colors"
            >
              Sign In / Sign Up →
            </Link>
          </div>
        )}

        {/* Save Success Alert Banner */}
        {saveSuccess && (
          <div className="mb-8 bg-[#B4C292]/20 border border-[#B4C292] text-[#4C061D] px-6 py-4 rounded-2xl flex items-center justify-between text-xs font-mono-label font-bold animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Your profile details have been saved successfully!</span>
            </div>
            <button onClick={() => setSaveSuccess(false)} className="text-[#4C061D] hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* User Listings & Activity Dashboard */}
        {user && (
          <div className="space-y-12">
            
            {/* Published Properties Section */}
            <div>
              <div className="flex items-center justify-between border-b border-[#ECE7DA] pb-4 mb-6">
                <div>
                  <span className="font-mono-label text-[10px] text-[#4C061D] block font-bold mb-0.5">
                    MY PROPERTY PORTFOLIO
                  </span>
                  <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                    My Published Property Listings
                  </h2>
                </div>

                <Link
                  href="/publish"
                  className="px-5 py-2.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] hover:bg-[#4C061D] hover:text-white transition-all text-xs font-mono-label font-bold flex items-center gap-1.5"
                >
                  <Building className="w-4 h-4" />
                  <span>+ PUBLISH NEW PROPERTY</span>
                </Link>
              </div>

              {userProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {userProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] text-center max-w-md mx-auto space-y-3">
                  <Building className="w-10 h-10 text-[#736F4E]/40 mx-auto" />
                  <h3 className="font-serif-display text-xl text-[#1C1B12]">No Properties Posted Yet</h3>
                  <p className="text-xs text-[#736F4E]">
                    You haven't listed any properties yet. Post your house or apartment directly on Delala to reach thousands of buyers across Ethiopia.
                  </p>
                  <Link
                    href="/publish"
                    className="inline-block px-6 py-2.5 rounded-full bg-[#4C061D] text-white text-xs font-mono-label font-bold"
                  >
                    Post First Property →
                  </Link>
                </div>
              )}
            </div>

            {/* Scheduled Walkthrough Appointments */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#ECE7DA] pb-4">
                <div>
                  <span className="font-mono-label text-[10px] text-[#4C061D] font-bold block mb-0.5">
                    FIELD VISIT SCHEDULE
                  </span>
                  <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                    Scheduled Field Walkthroughs
                  </h2>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE7DA] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center font-bold">
                    <Calendar className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="font-mono-label text-[10px] text-[#4C061D] font-bold mb-0.5">
                      ACTIVE VISIT BOOKING
                    </div>
                    <h3 className="font-serif-display text-xl font-light text-[#1c1b12]">
                      Property Inspection & Verification
                    </h3>
                    <p className="text-xs text-[#736F4E]">
                      Contact property listers directly via phone call on property cards to inspect physical houses.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link
                    href="/search"
                    className="px-5 py-2.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] text-xs font-mono-label font-bold hover:bg-white transition-colors"
                  >
                    Explore Properties →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#ECE7DA] shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FAF8F4] text-[#736F4E] hover:text-[#1C1B12] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="font-mono-label text-[10px] text-[#4C061D] font-bold block mb-1">
                  ACCOUNT MANAGEMENT
                </span>
                <h2 className="font-serif-display text-3xl font-light text-[#1C1B12]">
                  Edit Profile Details
                </h2>
                <p className="text-xs text-[#736F4E] mt-1">
                  Update your contact phone, full name, avatar, bio, and account role.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs font-mono-label">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Abebe"
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm focus:outline-none focus:border-[#4C061D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Tesfaye"
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm focus:outline-none focus:border-[#4C061D]"
                    />
                  </div>
                </div>

                {/* Contact Phone Number */}
                <div>
                  <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +251 911 000 000"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm focus:outline-none focus:border-[#4C061D]"
                  />
                </div>

                {/* Avatar URL */}
                <div>
                  <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    Avatar Image URL
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm focus:outline-none focus:border-[#4C061D]"
                  />
                  {avatarUrl && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={avatarUrl} alt="Avatar preview" className="w-10 h-10 rounded-full object-cover border border-[#ECE7DA]" />
                      <span className="text-[11px] text-[#736F4E]">Live Preview</span>
                    </div>
                  )}
                </div>

                {/* Account Type / Role */}
                <div>
                  <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    Account Role / User Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm focus:outline-none focus:border-[#4C061D]"
                  >
                    <option value="user">Buyer & Tenant</option>
                    <option value="owner">Property Owner</option>
                    <option value="broker">Real Estate Agent / Broker</option>
                  </select>
                </div>

                {/* Bio / About Me */}
                <div>
                  <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    Bio / About Me
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell buyers or property owners a bit about yourself..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm focus:outline-none focus:border-[#4C061D] resize-none"
                  />
                </div>

                {/* Submit buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#ECE7DA]">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label font-bold text-[#736F4E] hover:text-[#1C1B12] transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Save Profile Changes</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
