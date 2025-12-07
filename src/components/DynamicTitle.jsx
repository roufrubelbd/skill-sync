import { useEffect } from "react";
import { useLocation } from "react-router";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let pageTitle = "Skill Sync";

    switch (location.pathname) {
      case "/":
        pageTitle = "Home | Skill Sync";
        break;
      case "/lessons":
        pageTitle = "Lessons | Skill Sync";
        break;
      case "/dashboard/my-lessons":
        pageTitle = "My Lessons | Skill Sync";
        break;
      case "/dashboard/add-lesson":
        pageTitle = "Add Lesson | Skill Sync";
        break;
      default:
        pageTitle = "Skill Sync";
    }

    document.title = pageTitle;
  }, [location]);

  return null; 
};

export default DynamicTitle;
