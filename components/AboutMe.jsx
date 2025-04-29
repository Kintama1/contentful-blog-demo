import React from "react";
import Image from 'next/image';
import RichContent from './RichContent';
import "./Components.css";

function AboutME({aboutme}) {
    if (!aboutme) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <div className="about-container">
            {aboutme.fields.profilePic && (
                <div className="bio-image-container">
                    <Image
                        src={`https:${aboutme.fields.profilePic.fields.file.url}`}
                        alt={aboutme.fields.profilePic.fields.title || 'Profile picture'}
                        width={400}
                        height={400}
                        className="bio-image rounded-full shadow-md"
                    />
                </div>
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center w-full">
                {aboutme.fields.title || "About Me"}
            </h1>
            
            {aboutme.fields.bio && (
                <div className="text-bio mb-8 border-2 border-amber-950 rounded-xl">
                    <RichContent content={aboutme.fields.bio} />
                </div>
            )}
            
            {aboutme.fields.skills && aboutme.fields.skills.length > 0 && (
                <div className="skills-section">
                    <h2 className="text-2xl font-bold text-gray-900 section-title">Skills</h2>
                    <div className="skills-container">
                        {aboutme.fields.skills.map(skill => (
                            <span
                                key={skill}
                                className="skill-tag"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AboutME;