
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Star, Download, Zap, Settings, Code, Code2, ExternalLink, Lightbulb, Tool, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Programming Languages": ["Java", "JavaScript", "TypeScript", "C++", "Python"],
  "Web Technologies": ["React.js", "Next.js", "Node.js", "HTML5", "CSS3", "RESTful APIs", "Tailwind CSS"],
  "Backend Frameworks": ["Node.js", "Express.js", "Django (Python)", "Firebase"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Microsoft SQL Server"],
  "Development Tools": ["Git", "GitHub", "Docker", "VS Code", "IntelliJ IDEA", "Xcode", "Genkit"],
  "Soft Skills": ["Problem Solving", "Team Collaboration", "Agile Methodologies", "Communication", "Adaptability"],
};

const projectsOnResume = [
  {
    title: "Amazon Clone",
    description: [
      "Developed a responsive e-commerce website using React.js, Node.js and javascript, featuring a dynamic shopping cart, product filtering, and secure payment integration (Stripe).",
      "Implemented user authentication and real-time order management with Firebase and Redux, ensuring seamless user sessions and efficient state management.",
      "Optimized performance and scalability, deploying the front-end and database on Firebase, with SEO enhancements for better discoverability."
    ],
    tools: ["React.js", "Stripe", "Node.js", "CSS", "Firebase", "Redux"],
    liveDemoUrl: "#" 
  },
  {
    title: "E-commerce Store",
    description: [
      "Designed and developed a full-stack fashion e-commerce platform with end-to-end order management.",
      "Built a responsive frontend for seamless product browsing and user-friendly checkout.",
      "Integrated secure backend functionality for order placement, user authentication, and address management.",
      "Implemented a structured database to handle product inventory, customer data, and order history."
    ],
    tools: ["HTML5", "CSS", "JavaScript"],
    liveDemoUrl: "#"
  }
];


export default function ResumePage() {
  return (
    <div className="section-padding fade-in-page container mx-auto px-4">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-4">
          My <span className="text-glow-primary">Professional Journey</span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto animate-slideInUp delay-200">
          A detailed overview of my experience, skills, and educational background. Committed to building innovative software and continuously learning.
        </p>
        <Button asChild className="mt-8 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-base animate-slideInUp delay-400">
          <Link href="/Nitin_Kumar_Resume.pdf" target="_blank" download>
            <Download className="mr-2.5 h-5 w-5" />
            Download Resume (PDF)
          </Link>
        </Button>
      </header>

      {/* Experience Section */}
      <Card className="glassmorphism-card mb-8 sm:mb-12 animate-slideInUp delay-300">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-secondary" /> Professional Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6 sm:p-8">
          <div className="animate-slideInUp delay-400" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">GET in R&D</h3>
            <p className="text-muted-foreground mb-1">YKK India Pvt. Ltd. | Bawal, Haryana | March 2024 - Oct 2024</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 text-foreground/80 pl-2">
              <li>Led a small development team in designing and prototyping innovative solutions in R&D, ensuring efficient product development under tight deadlines.</li>
              <li>Oversaw end-to-end development of key projects, balancing rapid prototyping with strategic planning to meet business and technical requirements.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Technical Proficiency Section */}
      <Card className="glassmorphism-card mb-8 sm:mb-12 animate-slideInUp delay-400">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Star className="mr-3 h-7 w-7 text-secondary" /> Technical Proficiency
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          {Object.entries(skillsData).map(([category, skillsList], index) => (
            <div key={category} className="animate-slideInUp" style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity:0 }}>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-foreground/90 flex items-center">
                {category === "Programming Languages" && <Code className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Web Technologies" && <Zap className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Backend Frameworks" && <Settings className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Databases" && <Briefcase className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Development Tools" && <Tool className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Soft Skills" && <Users className="mr-2.5 h-5 w-5 text-accent" />}
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 py-1.5 px-3 rounded-lg shadow-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Projects from Resume Section */}
      <Card className="glassmorphism-card mb-8 sm:mb-12 animate-slideInUp delay-500">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Lightbulb className="mr-3 h-7 w-7 text-secondary" /> Key Projects
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-1">Highlighted projects from my resume. For more, see the main portfolio page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6 sm:p-8">
          {projectsOnResume.map((project, index) => (
            <div key={project.title} className="animate-slideInUp" style={{ animationDelay: `${0.4 + index * 0.15}s`, opacity:0 }}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{project.title}</h3>
                {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
                  <Button variant="link" size="sm" asChild className="text-accent hover:text-primary p-0 h-auto">
                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
              <ul className="list-disc list-inside mt-2 space-y-1.5 text-foreground/80 pl-2">
                {project.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div className="mt-3">
                <span className="text-sm font-semibold text-muted-foreground mr-2">Tools Used:</span>
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="mr-1.5 mb-1.5 text-xs bg-muted/50 border-border/50 text-muted-foreground hover:bg-secondary/20 hover:text-secondary-foreground transition-colors duration-200 py-1 px-2.5 rounded-md">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="glassmorphism-card animate-slideInUp delay-600">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <GraduationCap className="mr-3 h-7 w-7 text-secondary" /> Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="animate-slideInUp delay-500" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">B.Tech. in Mechanical Engineering</h3>
            <p className="text-muted-foreground mb-1">Maharshi Dayanand University | Sept 2019 - May 2023</p>
            <p className="text-foreground/80">Percentage: 70%</p>
          </div>
          <div className="animate-slideInUp delay-600" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Software Development</h3>
            <p className="text-muted-foreground mb-1">Scaler Academy | Sept 2024 - Oct 2025</p>
            <p className="text-foreground/80">Relevant Coursework: Computer Architecture, DSA, Full Stack Development, RDBMS, Java, Projects, Low Level Design, High Level Design.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
