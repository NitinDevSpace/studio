import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">My Resume</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          A summary of my professional experience, skills, and educational background.
          Dedicated to crafting high-quality software solutions.
        </p>
        <Button asChild className="mt-6">
          <Link href="/placeholder-resume.pdf" target="_blank" download>
            <Download className="mr-2 h-4 w-4" />
            Download Resume (PDF)
          </Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center">
            <Briefcase className="mr-3 h-6 w-6" /> Professional Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
            <p className="text-muted-foreground">Tech Solutions Inc. | Jan 2020 - Present</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-foreground/90">
              <li>Led development of a scalable microservices architecture for a flagship product.</li>
              <li>Mentored junior engineers and conducted code reviews to ensure high-quality standards.</li>
              <li>Collaborated with product managers and designers to define and implement new features.</li>
              <li>Improved application performance by 30% through optimization and refactoring.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Software Developer</h3>
            <p className="text-muted-foreground">Innovatech Ltd. | Jun 2017 - Dec 2019</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-foreground/90">
              <li>Developed and maintained full-stack web applications using React and Node.js.</li>
              <li>Participated in Agile development cycles, including sprint planning and retrospectives.</li>
              <li>Contributed to the design and implementation of RESTful APIs.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center">
            <GraduationCap className="mr-3 h-6 w-6" /> Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Master of Science in Computer Science</h3>
            <p className="text-muted-foreground">University of Technology | 2015 - 2017</p>
            <p className="text-foreground/90">Specialized in Artificial Intelligence and Machine Learning.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Bachelor of Science in Software Engineering</h3>
            <p className="text-muted-foreground">State University | 2011 - 2015</p>
            <p className="text-foreground/90">Graduated with Honors.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center">
            <Star className="mr-3 h-6 w-6" /> Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Programming Languages</h4>
              <p className="text-foreground/90">JavaScript, TypeScript, Python, Java, C#</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Frameworks & Libraries</h4>
              <p className="text-foreground/90">React, Next.js, Node.js, Express, Angular, Spring Boot, .NET</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Databases</h4>
              <p className="text-foreground/90">MongoDB, PostgreSQL, MySQL, Firebase Firestore, Redis</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Tools & Platforms</h4>
              <p className="text-foreground/90">Git, Docker, Kubernetes, AWS, Google Cloud, Azure, Jenkins</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Methodologies</h4>
              <p className="text-foreground/90">Agile, Scrum, DevOps, TDD, CI/CD</p>
            </div>
             <div>
              <h4 className="text-lg font-semibold mb-2">Other Skills</h4>
              <p className="text-foreground/90">Problem Solving, System Design, API Design, Cloud Architecture, Team Leadership</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
