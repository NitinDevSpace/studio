import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Star, Download, Zap, Settings, Brain, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "C#"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express", "Angular", "Spring Boot", ".NET", "TailwindCSS", "ShadCN UI"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Firebase Firestore", "Redis"],
  "Tools & Platforms": ["Git", "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "Jenkins", "Genkit"],
  "Methodologies": ["Agile", "Scrum", "DevOps", "TDD", "CI/CD"],
  "Other Skills": ["Problem Solving", "System Design", "API Design", "Cloud Architecture", "Team Leadership", "AI Integration"]
};

export default function ResumePage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12 fade-in-page">
      <header className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-4 animate-slideInUp">My Resume</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-slideInUp delay-200">
          A summary of my professional experience, skills, and educational background.
          Dedicated to crafting high-quality software solutions and pushing technological boundaries.
        </p>
        <Button asChild className="mt-8 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-base animate-slideInUp delay-400">
          <Link href="/placeholder-resume.pdf" target="_blank" download>
            <Download className="mr-2.5 h-5 w-5" />
            Download Resume (PDF)
          </Link>
        </Button>
      </header>

      <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-300 transform hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-accent" /> Professional Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6 sm:p-8">
          <div className="animate-slideInUp delay-400" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">Senior Software Engineer</h3>
            <p className="text-muted-foreground mb-1">Tech Solutions Inc. | Jan 2020 - Present</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 text-foreground/80 pl-2">
              <li>Led development of a scalable microservices architecture for a flagship product, improving deployment frequency by 50%.</li>
              <li>Mentored junior engineers, conducted code reviews, and fostered a culture of high-quality standards and continuous learning.</li>
              <li>Collaborated with product managers and designers to define and implement new features, resulting in a 20% increase in user engagement.</li>
              <li>Improved application performance by 30% through optimization, refactoring, and implementation of caching strategies.</li>
            </ul>
          </div>
          <div className="animate-slideInUp delay-500" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">Software Developer</h3>
            <p className="text-muted-foreground mb-1">Innovatech Ltd. | Jun 2017 - Dec 2019</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 text-foreground/80 pl-2">
              <li>Developed and maintained full-stack web applications using React and Node.js, serving over 100,000 active users.</li>
              <li>Participated actively in Agile development cycles, including sprint planning, daily stand-ups, and retrospectives.</li>
              <li>Contributed to the design and implementation of RESTful APIs, enhancing system modularity and third-party integrations.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-400 transform hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <GraduationCap className="mr-3 h-7 w-7 text-accent" /> Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="animate-slideInUp delay-500" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">Master of Science in Computer Science</h3>
            <p className="text-muted-foreground mb-1">University of Technology | 2015 - 2017</p>
            <p className="text-foreground/80">Specialized in Artificial Intelligence and Machine Learning. Thesis on "Optimizing NLP models for low-resource languages".</p>
          </div>
          <div className="animate-slideInUp delay-600" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">Bachelor of Science in Software Engineering</h3>
            <p className="text-muted-foreground mb-1">State University | 2011 - 2015</p>
            <p className="text-foreground/80">Graduated with Honors. Capstone project on "Real-time Collaborative Code Editor".</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-500 transform hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Star className="mr-3 h-7 w-7 text-accent" /> Skills & Expertise
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          {Object.entries(skillsData).map(([category, skillsList], index) => (
            <div key={category} className="animate-slideInUp" style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity:0 }}>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-primary-foreground/90 flex items-center">
                {category === "Programming Languages" && <Code className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Frameworks & Libraries" && <Zap className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Databases" && <Settings className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Tools & Platforms" && <Briefcase className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Methodologies" && <GraduationCap className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Other Skills" && <Brain className="mr-2.5 h-5 w-5 text-accent" />}
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm bg-secondary/70 text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 py-1.5 px-3 rounded-md shadow-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
