const fs = require('fs');
const path = require('path');

// Base content templates
const easyTemplates = [
  {
    title: "Basic English Practice",
    desc: "Fundamental typing exercise for beginners",
    difficulty: "easy",
    duration: 300,
    templates: [
      "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet. Practice typing it repeatedly to build muscle memory and improve your typing speed.",
      "Practice makes perfect when learning to type. Regular practice is the key to developing fast and accurate typing skills. Set aside time each day for typing exercises.",
      "Keep your wrists straight and eyes on the screen while typing. Looking at the keyboard will slow you down. Trust your fingers to find the right keys through muscle memory.",
      "Focus on accuracy before speed when learning to type. It is better to type slowly and correctly than quickly with many errors. Speed will come naturally with practice.",
      "The home row keys are the foundation of touch typing. Place your left fingers on A S D F and your right fingers on J K L semicolon. Always return to these keys.",
      "Consistency is key to improving your typing speed. Practice for at least fifteen minutes every day. You will see significant improvement within a few weeks of regular practice.",
      "Good posture is essential for comfortable and efficient typing. Sit up straight with your feet flat on the floor. Keep your elbows at a ninety degree angle.",
      "Your fingers should be curved and relaxed while typing. Avoid tensing up or pressing the keys too hard. Gentle, precise movements are more effective than forceful keystrokes.",
      "Take short breaks between typing practice sessions to prevent fatigue and injury. Stand up, stretch your fingers and wrists, and rest your eyes for a few moments."
    ]
  },
  {
    title: "Everyday Vocabulary",
    desc: "Practice common English words and phrases",
    difficulty: "easy",
    duration: 300,
    templates: [
      "The sun rises in the east and sets in the west each day. This natural cycle has been occurring for billions of years. The earth rotates on its axis, creating day and night.",
      "Water is essential for all forms of life on our planet. Humans need to drink water regularly to stay healthy and hydrated. Plants also require water to grow and thrive.",
      "Reading books is a wonderful way to learn new things and expand your knowledge. It also improves your vocabulary and comprehension skills. Make time for reading every day.",
      "Exercise is important for maintaining good physical and mental health. Regular physical activity strengthens your heart, muscles, and bones. It also reduces stress and anxiety.",
      "Eating a balanced diet provides your body with essential nutrients. Fruits, vegetables, whole grains, and lean proteins should be part of your daily meals. Stay away from processed foods.",
      "Getting enough sleep is crucial for your overall health and well-being. Adults should aim for seven to nine hours of quality sleep each night. Create a relaxing bedtime routine.",
      "Learning a new language opens up many opportunities for personal and professional growth. It also enhances your cognitive abilities and cultural understanding. Start with basic vocabulary.",
      "Traveling to new places broadens your perspective and creates lasting memories. You experience different cultures, cuisines, and ways of life. It is an enriching experience for everyone."
    ]
  }
];

const mediumTemplates = [
  {
    title: "Business Communication",
    desc: "Practice professional email and report writing",
    difficulty: "medium",
    duration: 360,
    templates: [
      "Dear team, I am writing to discuss the upcoming project deadline. We need to ensure all deliverables are completed on time. Please review the attached documents and provide your feedback by Friday. Thank you for your cooperation and dedication to this project. Your hard work is greatly appreciated on this important initiative.",
      "I wanted to follow up on our previous conversation regarding the new software implementation. The development team has made significant progress on the backend infrastructure. We anticipate completing the initial testing phase by next week. Please let me know if you have any questions or concerns about the timeline.",
      "Thank you for your prompt response to my inquiry about the quarterly budget. I have reviewed the numbers you provided and they look accurate. However, I noticed a discrepancy in the marketing expenses column. Could you please double check those figures and get back to me?",
      "This memo serves to inform all employees about the upcoming policy changes regarding remote work. Starting next month, team members may work from home up to three days per week. Please speak with your manager to determine a suitable schedule that meets department needs.",
      "I am pleased to announce that our company has been recognized as a top employer in our industry. This achievement reflects the hard work and dedication of every team member. Thank you for your continued commitment to excellence in everything you do."
    ]
  },
  {
    title: "Technical Writing",
    desc: "Practice typing technical documentation",
    difficulty: "medium",
    duration: 360,
    templates: [
      "The system architecture consists of three main layers: presentation, business logic, and data access. Each layer communicates with the others through well-defined interfaces. This separation of concerns makes the application easier to maintain and extend over time.",
      "To install the software, first download the installer package from our website. Run the executable file and follow the on-screen instructions. You will need administrator privileges to complete the installation. Restart your computer after the setup finishes.",
      "The database schema includes tables for users, products, orders, and payments. Foreign key relationships ensure data integrity across these tables. Indexes have been created on frequently queried columns to optimize performance for common operations.",
      "Error handling should be implemented at every level of your application. Use try-catch blocks to gracefully handle exceptions. Log errors to a centralized system for monitoring and debugging. Provide meaningful error messages to users when problems occur.",
      "API endpoints follow RESTful conventions for consistency and ease of use. GET requests retrieve resources, POST requests create new resources, PUT requests update existing resources, and DELETE requests remove resources from the system."
    ]
  }
];

const hardTemplates = [
  {
    title: "Advanced Technical Concepts",
    desc: "Practice complex technical terminology",
    difficulty: "hard",
    duration: 420,
    templates: [
      "The implementation of blockchain technology in supply chain management has created unprecedented levels of transparency and traceability. This distributed ledger system allows all parties to verify transactions without intermediaries, reducing costs and increasing trust between stakeholders in the ecosystem.",
      "Neural networks utilize backpropagation algorithms to optimize weight matrices through gradient descent. This iterative process minimizes the loss function by adjusting parameters in the direction of steepest descent, enabling complex pattern recognition capabilities in artificial intelligence systems.",
      "Quantum computing leverages the principles of superposition and entanglement to perform calculations that would be impossible for classical computers. Qubits can represent multiple states simultaneously, allowing exponential parallelism in solving certain classes of mathematical problems.",
      "The integration of Internet of Things devices with edge computing infrastructure enables real-time data processing at the source. This reduces latency and bandwidth requirements compared to cloud-centric architectures, making autonomous systems more responsive and efficient in operation.",
      "Machine learning models must be carefully validated to avoid overfitting and ensure generalization to unseen data. Cross-validation techniques, regularization methods, and appropriate train-test splits are essential tools for developing robust predictive systems."
    ]
  },
  {
    title: "Scientific Writing",
    desc: "Practice typing scientific content",
    difficulty: "hard",
    duration: 420,
    templates: [
      "The double helix structure of DNA was discovered by James Watson and Francis Crick in 1953. This breakthrough revolutionized our understanding of genetics and heredity. DNA contains the genetic instructions used in the development and functioning of all known living organisms.",
      "Photosynthesis is the process by which plants convert light energy into chemical energy. Chlorophyll molecules capture photons and use their energy to split water molecules. Oxygen is released as a byproduct while carbon dioxide is fixed into organic compounds like glucose.",
      "The theory of evolution by natural selection, proposed by Charles Darwin in 1859, explains how species adapt to their environments over generations. Individuals with advantageous traits are more likely to survive and reproduce, passing those traits to their offspring.",
      "General relativity, Einstein's theory of gravitation, describes gravity as a curvature of spacetime caused by mass and energy. This theory has been confirmed by numerous experiments, including the observation of gravitational waves and the bending of light around massive objects.",
      "Plate tectonics explains the movement of Earth's lithosphere, which is divided into several large plates. These plates move slowly over the asthenosphere, causing earthquakes, volcanic activity, and the formation of mountain ranges at their boundaries."
    ]
  }
];

// Generate all exercises
const exercises = [];
let id = 1;

// Generate 120 easy exercises (id 1-120)
for (let i = 0; i < 120; i++) {
  const template = easyTemplates[i % easyTemplates.length];
  const templateText = template.templates[i % template.templates.length];
  const exerciseNum = i + 1;
  
  exercises.push({
    id: id++,
    title: `${template.title} ${Math.floor(i / 10) + 1} - Exercise ${exerciseNum}`,
    description: `${template.desc} - Level ${exerciseNum}`,
    difficulty: "easy",
    duration: 300,
    content: `${templateText} This is practice exercise number ${exerciseNum} of 350 in the NexType typing program. Continue typing to build your speed and accuracy. Focus on maintaining proper finger placement and good posture. Take regular breaks to prevent fatigue. Practice daily for consistent improvement. Remember that every expert typist was once a beginner. Your dedication to practice will pay off over time. Stay motivated and track your progress. Celebrate small improvements along the way. You have the ability to become an excellent typist. Keep pushing forward with your typing practice. The more you type, the faster and more accurate you will become. This exercise is designed to help you build a strong foundation. Master the basics before moving on to more challenging content. Good luck on your typing journey. Repeat this process for each exercise to build muscle memory. Consistency is the key to success in typing. You will see significant improvement with regular practice. Set aside time each day for typing exercises. Your hard work will be rewarded with faster typing speeds. Enjoy the process of learning and improving. Each exercise brings you closer to your goals. Stay focused and keep typing. You are making progress with every keystroke. Believe in yourself and your ability to learn. This typing program is designed to help you succeed. Follow the exercises in order for best results. Master each level before moving to the next. Your speed will naturally increase with practice. Accuracy should remain your top priority. Speed will follow as you become more comfortable. Remember to keep your eyes on the screen. Looking at the keyboard will slow you down. Trust your fingers to find the right keys. Muscle memory develops through repetition. Each typing session builds upon the last. You are creating new neural pathways in your brain. This process takes time and consistent effort. Be patient with yourself as you learn. Everyone progresses at their own pace. Focus on your own improvement rather than comparing to others. Celebrate your personal best scores and achievements. Keep challenging yourself to type a little faster. Small daily improvements add up over time. You will be amazed at your progress after a few months. Stay committed to your typing practice routine. Make typing practice a daily habit. Even ten minutes per day makes a difference. Consistency beats intensity when learning new skills. You can do this. Keep typing and improving every day. Your future self will thank you for the effort you put in now.`
  });
}

// Generate 120 medium exercises (id 121-240)
for (let i = 0; i < 120; i++) {
  const template = mediumTemplates[i % mediumTemplates.length];
  const templateText = template.templates[i % template.templates.length];
  const exerciseNum = i + 121;
  
  exercises.push({
    id: id++,
    title: `${template.title} ${Math.floor(i / 10) + 1} - Exercise ${exerciseNum}`,
    description: `${template.desc} - Intermediate Level ${exerciseNum - 120}`,
    difficulty: "medium",
    duration: 360,
    content: `${templateText} This intermediate exercise number ${exerciseNum} is designed to challenge your developing typing skills. You should now be comfortable with basic finger placement and ready to focus on increasing speed. Pay attention to punctuation and capitalization as you type. These elements are important for professional typing accuracy. Continue practicing regularly to see continued improvement in your typing abilities. The content in this exercise includes more sophisticated vocabulary and sentence structures. Challenge yourself to maintain high accuracy while increasing your typing speed. Remember that accuracy is still more important than raw speed. Speed will come naturally as your fingers become more familiar with key positions. Take your time and focus on getting each character correct. You are building the foundation for fast, accurate typing. Each exercise brings you closer to your typing goals. Stay motivated and keep practicing every day. Your dedication will pay off with improved speed and accuracy. Track your progress and celebrate your achievements along the way. You have the ability to become an excellent typist. Keep pushing yourself to improve with each exercise. The more you practice, the more natural typing will feel. Your fingers will learn to find the right keys automatically. This is the goal of touch typing practice. Trust the process and keep working hard. You will reach your typing goals with consistent effort. Every typing session brings you closer to mastery. Stay focused on your technique and form. Good posture and finger placement are essential for speed. Keep your wrists straight and your fingers curved. Type with a light touch to avoid fatigue. Take breaks when you feel tired or sore. Your health and well-being are important. Listen to your body and rest when needed. You can always come back to practice later. Consistency matters more than marathon sessions. Short daily practice is better than long weekly sessions. Make typing practice a part of your daily routine. You will be amazed at your progress over time. Keep typing and improving every single day. Your future self will thank you for the effort you put in now. This exercise is part of your journey to typing excellence. Master it and move on to the next challenge. Each completed exercise is a victory worth celebrating. You are making real progress with every keystroke. Keep up the excellent work and stay motivated. Your typing speed and accuracy will continue to improve. Believe in yourself and your ability to learn. You have everything you need to succeed at touch typing. The tools are here, and the path is clear. All you need is consistent practice and dedication. You can do this. Keep typing and improving every day.`
  });
}

// Generate 110 hard exercises (id 241-350)
for (let i = 0; i < 110; i++) {
  const template = hardTemplates[i % hardTemplates.length];
  const templateText = template.templates[i % template.templates.length];
  const exerciseNum = i + 241;
  
  exercises.push({
    id: id++,
    title: `${template.title} ${Math.floor(i / 10) + 1} - Exercise ${exerciseNum}`,
    description: `${template.desc} - Advanced Level ${exerciseNum - 240}`,
    difficulty: "hard",
    duration: 420,
    content: `${templateText} This advanced exercise number ${exerciseNum} is designed for experienced typists seeking to push their speed and accuracy to professional levels. The vocabulary and sentence structures are intentionally complex to challenge your typing abilities. Pay close attention to technical terminology and specialized vocabulary. These words and phrases appear frequently in professional and academic contexts. Mastering them will significantly enhance your typing versatility and marketability. Continue practicing with these advanced exercises to develop expert-level typing skills. Focus on maintaining high accuracy even as you increase your typing speed. Professional typists balance speed and precision in everything they type. Strive to achieve this balance through dedicated practice with challenging content. The skills you develop here will serve you well in any typing-intensive profession. Legal transcription, medical reporting, software development, and academic research all require fast, accurate typing. You are preparing yourself for success in these fields. Each advanced exercise builds upon the previous ones. Complete them in order for the most effective learning progression. Challenge yourself to type each passage without looking at the keyboard. Trust your muscle memory to guide your fingers to the correct keys. This is the hallmark of an expert typist. You have developed the foundation through earlier exercises. Now it is time to refine your skills and push your limits. Set ambitious but achievable goals for each practice session. Track your words per minute and accuracy percentage. Celebrate when you reach new personal best scores. Your progress is a testament to your dedication and hard work. Keep pushing yourself to improve with each exercise. You have come so far on your typing journey. From the basic home row exercises to these advanced passages. Your improvement has been remarkable. Continue building on this momentum. Master these advanced exercises and you will be ready for any typing challenge. Professional typing positions require speeds of sixty to eighty words per minute. You are well on your way to achieving and exceeding these standards. Stay focused on your technique as you type these passages. Pay attention to finger placement, posture, and rhythm. These fundamentals remain important even at advanced levels. Never sacrifice accuracy for speed. The best typists are both fast and precise. You have the ability to join their ranks with continued practice. Believe in yourself and your capacity for improvement. Keep typing, keep practicing, and keep getting better. Your dedication will open doors to new opportunities. Fast, accurate typing is a valuable professional skill. You are investing in your future success. Every keystroke brings you closer to your goals. Stay motivated and continue your typing practice journey. You have what it takes to become an expert typist. Your hard work and dedication will pay off. Keep pushing forward and never give up. You are capable of amazing things. Your typing journey is just beginning. There is so much more to learn and achieve. Stay excited about the possibilities ahead. Keep typing and keep improving every single day.`
  });
}

// Create the final JSON object
const output = {
  language: "english",
  totalExercises: exercises.length,
  exercises: exercises
};

// Write to file
const outputPath = path.join(__dirname, '../src/data/english-exercises.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`✅ Generated ${exercises.length} exercises successfully!`);
console.log(`📁 File saved to: ${outputPath}`);
console.log(`📊 Easy: 120, Medium: 120, Hard: 110`);