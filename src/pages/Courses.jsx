import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fetchCourses = async () => {
  const response = await fetch("/api/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
};

const enrollInCourse = async (courseId) => {
  const response = await fetch(`/api/enroll/${courseId}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to enroll in course");
  }
  return response.json();
};

const Courses = () => {
  const queryClient = useQueryClient();
  const { data: courses, error, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const mutation = useMutation({
    mutationFn: enrollInCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast("Successfully enrolled in course!");
    },
    onError: () => {
      toast("Failed to enroll in course");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div className="text-center">
      <h1 className="text-3xl">Courses</h1>
      <p>Explore our coding courses.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded">
            <h2 className="text-xl">{course.title}</h2>
            <p>{course.description}</p>
            <Button
              className="mt-2"
              onClick={() => mutation.mutate(course.id)}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Enrolling..." : "Enroll"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;