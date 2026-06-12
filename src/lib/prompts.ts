export function buildAnalysisPrompt(jobDescription: string, cvText: string): string {
  return `You are an expert ATS system and senior recruiter with 15 years of experience.

Analyze this CV against the job description and return ONLY a valid JSON object with no markdown, no explanation, no code blocks. Just raw JSON.

JOB DESCRIPTION:
${jobDescription}

CV:
${cvText}

Return this exact JSON structure:
{
  "overallScore": <0-100 integer>,
  "atsScore": <0-100 integer — how well it passes ATS systems>,
  "keywordsFound": [<keywords from job description present in CV>],
  "keywordsMissing": [<important keywords from job description missing in CV>],
  "strengths": [<3-5 specific strengths>],
  "improvements": [<3-5 specific actionable improvements>],
  "sections": {
    "summary": { "score": <0-100>, "feedback": "<specific feedback>", "rewrite": "<improved version>" },
    "experience": { "score": <0-100>, "feedback": "<specific feedback>" },
    "skills": { "score": <0-100>, "feedback": "<specific feedback>" },
    "education": { "score": <0-100>, "feedback": "<specific feedback>" }
  },
  "topRecommendation": "<single most impactful change they can make>",
  "estimatedInterviewChance": "<low|moderate|high|very high>"
}

Be specific, honest, and actionable. Reference actual content from the CV and job description.`
}
