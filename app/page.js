"use client";

import { useState,useEffect } from "react";
import AboutME from "@/components/AboutMe";
import { getAboutMe } from "@/lib/api";

export default function Home() {
  const [aboutMe, setAboutMe] = useState(null);
  useEffect(() => {
    async function fetchData(){
      const response = await getAboutMe();
      setAboutMe(response[0]);
    }
    fetchData();
  }, []);
  console.log(aboutMe);
  

  return (
    <>
    <AboutME aboutme = {aboutMe}/>
    </>
  );
}
