import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const {user} = useAuth();

  //  Fetch all lessons
  const { data: allLessons = [], isLoading: isAllLessonsLoading } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/all-lessons`);
      return result.data;
    },
  });

  //  Fetch creator
  const { data: userData = [], isLoading: isLoadingUserData } = useQuery({
    queryKey: ["creator-data"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  // DB logged in user
  const dbLoggedInUser = userData.find(
    dbUser => dbUser.email === user.email
  );

  console.log(dbLoggedInUser, user)

//   const lessonsByCreator = allLessons.filter(
//     (lesson) => lesson.createdByEmail === creator.email
//   );
  // console.log(lessonsByCreator.length);


    return (
        <div>
            profile page
        </div>
    );
};

export default Profile;