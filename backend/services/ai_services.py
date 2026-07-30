def analyze_resume(resume, job_description):
    return {
        "match_score": 85, 
        "matching_skills": [
            "Python", 
            "FastAPI",
            "Git"
        ],
        "missing_skills": [
            "Docker", 
            "Azure"
        ],
        "suggestions": [
            "Mention Azure Experience.",
            "Highlight REST API projects"
        ]
    }