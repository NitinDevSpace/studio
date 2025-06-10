
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Star, Download, Zap, Settings, Brain, Code, Code2, Link as LinkIcon, ExternalLink } from "lucide-react"; // Added Code2, LinkIcon, ExternalLink
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Programming Languages": ["Java", "JavaScript", "TypeScript", "C++", "Python"],
  "Web Technologies": ["React.js", "Next.js", "Node.js", "HTML5", "CSS3", "RESTful APIs"],
  "Backend Frameworks": ["Node.js", "Express.js", "Django (Python)", "Firebase"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Microsoft SQL Server"],
  "Development Tools": ["Git", "GitHub", "Docker", "VS Code", "IntelliJ IDEA", "Xcode"],
  // "Methodologies": ["Agile", "Scrum", "DevOps", "TDD", "CI/CD"], // From old template, not in PDF
  // "Other Skills": ["Problem Solving", "System Design", "API Design", "Cloud Architecture", "Team Leadership", "AI Integration"] // From old template
};

const projectsOnResume = [
  {
    title: "Amazon Clone",
    description: [
      "Developed a responsive e-commerce website using React.js, Node.js and javascript, featuring a dynamic shopping cart, product filtering, and secure payment integration (Stripe).",
      "Implemented user authentication and real-time order management with Firebase and Redux, ensuring seamless user sessions and efficient state management.",
      "Optimized performance and scalability, deploying the front-end and database on Firebase, with SEO enhancements for better discoverability."
    ],
    tools: ["React.js", "Stripe", "Node.js", "React-dom", "CSS", "Firebase"],
    liveDemoUrl: "#" // Add actual URL if available
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
    liveDemoUrl: "#" // Add actual URL if available
  }
];


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
          <Link href="/Nitin_Kumar_Resume.pdf" target="_blank" download>
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
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">GET in R&D</h3>
            <p className="text-muted-foreground mb-1">YKK India Pvt. Ltd. | Bawal, Haryana | March 2024 - Oct 2024</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5 text-foreground/80 pl-2">
              <li>Led a small development team in designing and prototyping innovative solutions in R&D, ensuring efficient product development under tight deadlines.</li>
              <li>Oversaw end-to-end development of key projects, balancing rapid prototyping with strategic planning to meet business and technical requirements.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-500 transform hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Star className="mr-3 h-7 w-7 text-accent" /> Technical Proficiency
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          {Object.entries(skillsData).map(([category, skillsList], index) => (
            <div key={category} className="animate-slideInUp" style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity:0 }}>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-primary-foreground/90 flex items-center">
                {category === "Programming Languages" && <Code className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Web Technologies" && <Zap className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Backend Frameworks" && <Settings className="mr-2.5 h-5 w-5 text-accent" />}
                {category === "Databases" && <Briefcase className="mr-2.5 h-5 w-5 text-accent" />} {/* Re-using Briefcase, consider a more DB specific icon */}
                {category === "Development Tools" && <Code2 className="mr-2.5 h-5 w-5 text-accent" />}
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
      
      <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-400 transform hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="p-6 sm:p-8 border-b border-border/30">
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-accent" /> Projects
          </CardTitle>
          <CardDescription className="text-foreground/70 pt-1">Key projects highlighted in my resume. For a full list, please see the main projects page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6 sm:p-8">
          {projectsOnResume.map((project, index) => (
            <div key={project.title} className="animate-slideInUp" style={{ animationDelay: `${0.4 + index * 0.15}s`, opacity:0 }}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">{project.title}</h3>
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
                {project.tools.map((tool, i) => (
                  <Badge key={tool} variant="outline" className="mr-1.5 mb-1.5 text-xs bg-secondary/30 text-secondary-foreground hover:bg-accent/20 hover:text-accent-foreground transition-colors duration-200 py-1 px-2.5 rounded-md">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
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
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">B.Tech. in Mechanical Engineering</h3>
            <p className="text-muted-foreground mb-1">Maharshi Dayanand University | Sept 2019 - May 2023</p>
            <p className="text-foreground/80">Percentage: 70%</p>
          </div>
          <div className="animate-slideInUp delay-600" style={{opacity:0}}>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">Software Development</h3>
            <p className="text-muted-foreground mb-1">Scaler Academy | Sept 2024 - Oct 2025</p>
            <p className="text-foreground/80">Relevant Coursework: Computer Architecture, DSA, Full Stack Development, RDBMS, Java, Projects, Low Level Design, High Level Design.</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
