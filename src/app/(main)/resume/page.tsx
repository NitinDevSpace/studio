
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Star, Download, Zap, Settings, Code, ExternalLink, Lightbulb, Users, Wrench, Edit3, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Programming Languages": ["Java", "JavaScript", "TypeScript", "C++", "Python"],
  "Web Technologies": ["React.js", "Next.js", "Node.js", "HTML5", "CSS3", "RESTful APIs", "Tailwind CSS"],
  "Backend Frameworks": ["Node.js", "Express.js", "Django (Python)", "Firebase"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Microsoft SQL Server"],
  "Development Tools": ["Git", "GitHub", "Docker", "VS Code", "IntelliJ IDEA", "Xcode", "Genkit"],
  "Other Skills": ["Video Editing (Adobe Premiere Pro, Final Cut Pro)"],
  "Soft Skills": ["Problem Solving", "Team Collaboration", "Agile Methodologies", "Communication", "Adaptability"],
};

const experienceData = [
  {
    period: "March 2024 - Oct 2024",
    role: "GET in R&D",
    company: "YKK India Pvt. Ltd.",
    location: "Bawal, Haryana",
    descriptionPoints: [
      "Led a small development team in designing and prototyping innovative solutions in R&D, ensuring efficient product development under tight deadlines.",
      "Oversaw end-to-end development of key projects, balancing rapid prototyping with strategic planning to meet business and technical requirements.",
    ],
  },
  {
    period: "Approx. Early 2021 - Early 2024", // Approx. 3 years prior to March 2024
    role: "Video Editor (Part-time/Freelance)",
    company: "Remote",
    location: "Freelance",
    descriptionPoints: [
      "Leveraged 3 years of part-time experience in video editing to produce and edit engaging video content for diverse clients, focusing on promotional materials, tutorials, and social media content.",
    ],
  },
];


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
    <div className="section-padding fade-in-page container mx-auto px-4 bg-gradient-to-br from-background via-sky-50/5 dark:via-sky-900/10 to-indigo-100/5 dark:to-indigo-900/10 min-h-[calc(100vh-10rem)]">
      <header className="text-center mb-12 sm:mb-16 animate-slideInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-3 text-foreground">
          My <span className="text-primary">Professional Journey</span>
        </h1>
        <p className="text-md text-muted-foreground max-w-xl mx-auto leading-relaxed animate-slideInUp delay-200">
          A detailed overview of my experience, skills, and educational background. Committed to building innovative software and continuously learning.
        </p>
        <Button asChild className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 px-7 py-3 text-base animate-slideInUp delay-400">
          <Link href="/Nitin_Kumar_Resume.pdf" target="_blank" download>
            <Download className="mr-2 h-4 w-4" />
            Download Resume (PDF)
          </Link>
        </Button>
      </header>

      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        {/* Experience Section - Timeline */}
        <Card className="bg-card/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl animate-slideInUp delay-300">
          <CardHeader className="p-5 sm:p-6 border-b border-border/50">
            <CardTitle className="font-headline text-xl sm:text-2xl text-primary flex items-center">
              <Briefcase className="mr-2.5 h-6 w-6 text-secondary" /> Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <div className="relative flex overflow-x-auto scrollbar-hide py-4 -my-4"> {/* Horizontal scroll container */}
              {experienceData.map((exp, index) => (
                <div 
                  key={index} 
                  className="animate-slideInUp flex-shrink-0 w-72 md:w-[330px] bg-muted/30 dark:bg-background/70 p-5 rounded-lg shadow-md mr-4 last:mr-0 relative border border-border/30"
                  style={{ animationDelay: `${0.4 + index * 0.15}s`}}
                >
                  <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-md shadow-lg">
                    {exp.period}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground/90 mt-5">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-foreground/80 pl-1 leading-relaxed">
                    {exp.descriptionPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Proficiency Section */}
        <Card className="bg-card/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl animate-slideInUp delay-400">
          <CardHeader className="p-5 sm:p-6 border-b border-border/50">
            <CardTitle className="font-headline text-xl sm:text-2xl text-primary flex items-center">
              <Star className="mr-2.5 h-6 w-6 text-secondary" /> Technical Proficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 space-y-5">
            {Object.entries(skillsData).map(([category, skillsList], index) => (
              <div key={category} className="animate-slideInUp" style={{ animationDelay: `${0.5 + index * 0.05}s`}}>
                <h4 className="text-md font-semibold mb-2 text-foreground/90 flex items-center">
                  {category === "Programming Languages" && <Code className="mr-2 h-5 w-5 text-accent" />}
                  {category === "Web Technologies" && <Zap className="mr-2 h-5 w-5 text-accent" />}
                  {category === "Backend Frameworks" && <Settings className="mr-2 h-5 w-5 text-accent" />}
                  {category === "Databases" && <Briefcase className="mr-2 h-5 w-5 text-accent" />}
                  {category === "Development Tools" && <Wrench className="mr-2 h-5 w-5 text-accent" />}
                  {category === "Other Skills" && <Edit3 className="mr-2 h-5 w-5 text-accent" />}
                  {category === "Soft Skills" && <Users className="mr-2 h-5 w-5 text-accent" />}
                  {category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs bg-muted/60 dark:bg-card dark:text-foreground dark:border-border/70 text-muted-foreground hover:bg-secondary/10 dark:hover:bg-muted hover:text-secondary-foreground transition-colors duration-200 py-1 px-2 rounded-md shadow-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Projects from Resume Section */}
        <Card className="bg-card/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl animate-slideInUp delay-500">
          <CardHeader className="p-5 sm:p-6 border-b border-border/50">
            <CardTitle className="font-headline text-xl sm:text-2xl text-primary flex items-center">
              <Lightbulb className="mr-2.5 h-6 w-6 text-secondary" /> Key Projects
            </CardTitle>
            <CardDescription className="text-muted-foreground pt-0.5 text-sm">Highlighted projects from my resume. For more, see the main portfolio page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-5 sm:p-6">
            {projectsOnResume.map((project, index) => (
              <div key={project.title} className="animate-slideInUp" style={{ animationDelay: `${0.4 + index * 0.1}s`}}>
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground/90">{project.title}</h3>
                  {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
                    <Button variant="link" size="sm" asChild className="text-accent hover:text-primary p-0 h-auto text-xs">
                      <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-sm text-foreground/80 pl-1">
                  {project.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="mt-2.5">
                  <span className="text-xs font-semibold text-muted-foreground mr-1.5">Tools:</span>
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="mr-1 mb-1 text-xs bg-muted/60 dark:bg-card dark:text-foreground dark:border-border/70 text-muted-foreground py-0.5 px-1.5 rounded-md shadow-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="bg-card/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl animate-slideInUp delay-600">
          <CardHeader className="p-5 sm:p-6 border-b border-border/50">
            <CardTitle className="font-headline text-xl sm:text-2xl text-primary flex items-center">
              <GraduationCap className="mr-2.5 h-6 w-6 text-secondary" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="animate-slideInUp delay-500">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground/90">Software Development</h3>
              <p className="text-sm text-muted-foreground mb-0.5">Scaler Academy | Sept 2024 - Oct 2025 (Expected)</p>
              <p className="text-sm text-foreground/80">Relevant Coursework: Computer Architecture, DSA, Full Stack Development, RDBMS, Java, Projects, Low Level Design, High Level Design.</p>
            </div>
            <div className="animate-slideInUp delay-600">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground/90">B.Tech. in Mechanical Engineering</h3>
              <p className="text-sm text-muted-foreground mb-0.5">Maharshi Dayanand University | Sept 2019 - May 2023</p>
              <p className="text-sm text-foreground/80">Percentage: 70%</p>
            </div>
             <div className="animate-slideInUp delay-700">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground/90">Higher Secondary Certificate (HSC/12th Grade)</h3>
              <p className="text-sm text-muted-foreground mb-0.5">Example Sr. Sec. School, Example City | CBSE | 2019</p>
              <p className="text-sm text-foreground/80">Percentage: 85% (Example)</p>
            </div>
            <div className="animate-slideInUp delay-800">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground/90">Secondary School Certificate (SSC/10th Grade)</h3>
              <p className="text-sm text-muted-foreground mb-0.5">Example High School, Example City | CBSE | 2017</p>
              <p className="text-sm text-foreground/80">CGPA: 9.2 (Example)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
