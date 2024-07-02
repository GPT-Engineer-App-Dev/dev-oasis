import { useQuery } from "@tanstack/react-query";

const fetchProfile = async () => {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
};

const Profile = () => {
  const { data: profile, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="text-center">
      <h1 className="text-3xl">Profile</h1>
      <p>Manage your profile settings.</p>
      <div className="mt-4">
        <h2 className="text-2xl">Enrolled Courses</h2>
        <ul className="list-disc list-inside">
          {profile.enrolledCourses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;