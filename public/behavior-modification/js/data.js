/* ============================================================
   BehaviorMod Pro — data.js
   Curriculum for Miltenberger, Behavior Modification, 7th ed.
   Units = 25 chapters (5 parts). Sections = 5-9 per chapter.
   Each section key maps to a quiz bank (see quizBank).
   ============================================================ */
(function () {
  'use strict';

  const PARTS = [
    { name: 'Part 1 · Measurement of Behavior & Behavior Change', color: '#1cb0f6' },
    { name: 'Part 2 · Basic Principles', color: '#58cc02' },
    { name: 'Part 3 · Procedures to Establish New Behavior', color: '#ce82ff' },
    { name: 'Part 4 · Increase Desirable / Decrease Undesirable Behavior', color: '#ff9600' },
    { name: 'Part 5 · Other Behavior Change Procedures', color: '#ff86c8' },
  ];

  /* One-line "bridge-in" hooks drawn from each chapter's opening case. */
  const UNIT_HOOKS = {
    1: 'Ted and Jane argued constantly until a behavioral contract changed their marriage. Tanisha pulled her hair into a bald spot. Francisco joined a fitness group and lost weight. What ties these stories together? The science of behavior modification.',
    2: 'How do we really know a behavior is changing? It starts with careful observation, clear definitions, and systematic recording.',
    3: 'A picture is worth a thousand data points — graphs reveal what is actually happening to behavior over time.',
    4: 'Why do we keep doing what we do? Because of what follows: reinforcement. Understanding it unlocks behavior change.',
    5: 'What happens when a behavior suddenly stops working? The surprising story of extinction — and the burst that comes first.',
    6: 'Consequences that decrease behavior exist — but they come with a price. Here is the full picture of punishment.',
    7: 'A red light stops you; a green light lets you go. That everyday example is stimulus control in action.',
    8: 'Pavlov’s dogs learned to salivate to a bell. The same process conditions your own emotional responses every day.',
    9: 'Teaching a child to speak, helping a woman walk again — the quiet power of shaping, one small step at a time.',
    10: 'Tee-ball players learn to hit the ball with a little extra help — and then the help is gradually faded away.',
    11: 'Every routine you have — brushing your teeth, making coffee — is a chain of behaviors linked together.',
    12: 'Children learned to escape abduction by practicing with instructors. Skills are trained, never assumed.',
    13: 'Why does a child tantrum in the store? Functional assessment finds the “why” behind a problem behavior.',
    14: 'Willy’s tantrums stopped when his parents changed exactly one thing — they applied extinction.',
    15: 'Mrs. Williams criticized constantly until an alternative, positive behavior took its place. That is differential reinforcement.',
    16: 'Marianne studied more and Cal ate better — both changed because their environment changed first. Antecedents matter.',
    17: 'Time-out and response cost: two ways of removing reinforcement to reduce problem behavior.',
    18: 'Aversive punishment procedures exist — but only as a treatment of last resort, wrapped in ethical safeguards.',
    19: 'A skill learned in one room should work in every room. That is generalization programming.',
    20: 'Murray wanted to run; Annette wanted to clean up. Both used self-management to change their own behavior.',
    21: 'Hair pulling, tics, stuttering — repetitive habits that habit reversal procedures can turn around.',
    22: 'Sammy earned tokens for adaptive behavior and rebuilt his life. Welcome to the token economy.',
    23: 'Stavros finished his dissertation with a written contract. Well-designed contracts change behavior.',
    24: 'Trisha feared public speaking; Allison feared spiders. Both overcame their fears with behavioral procedures.',
    25: 'Daniel learned to control his anger; Claire learned to pay attention in class. Thoughts drive behavior.',
  };

  const UNITS = [
    /* ---- PART 1 ---- */
    { id: 1, part: 0, icon: '🧠', title: 'Introduction to Behavior Modification', xp: 60,
      sections: ['Defining Human Behavior', 'Examples of Behavior', 'Defining Behavior Modification', 'Characteristics of Behavior Modification', 'Historical Roots & Major Figures', 'Areas of Application', 'Professional Practice, Certification & Ethics', 'New Directions & Structure'] },
    { id: 2, part: 0, icon: '📝', title: 'Observing and Recording Behavior', xp: 60,
      sections: ['Direct and Indirect Assessment', 'Defining the Target Behavior', 'The Logistics of Recording', 'Choosing a Recording Method', 'Continuous Recording & Product Recording', 'Sampling Methods', 'Choosing a Recording Instrument', 'Reactivity', 'Interobserver Agreement'] },
    { id: 3, part: 0, icon: '📈', title: 'Graphing Behavior and Measuring Change', xp: 60,
      sections: ['Components of a Graph', 'Graphing Behavioral Data', 'Level, Trend & Variability', 'The A–B Graph', 'Research Designs: Reversal & Multiple Baseline', 'Alternating Treatments & Changing Criterion'] },
    /* ---- PART 2 ---- */
    { id: 4, part: 1, icon: '⭐', title: 'Reinforcement', xp: 65,
      sections: ['Defining Reinforcement', 'Positive and Negative Reinforcement', 'Escape and Avoidance Behaviors', 'Conditioned and Unconditioned Reinforcers', 'Factors That Influence Reinforcement', 'Schedules of Reinforcement', 'Reinforcing Dimensions of Behavior', 'Concurrent & Multiple Schedules'] },
    { id: 5, part: 1, icon: '🕯️', title: 'Extinction', xp: 55,
      sections: ['Defining Extinction', 'Extinction Burst', 'Spontaneous Recovery', 'Procedural Variations of Extinction', 'A Common Misconception about Extinction', 'Factors That Influence Extinction'] },
    { id: 6, part: 1, icon: '🚫', title: 'Punishment', xp: 60,
      sections: ['Defining Punishment', 'A Common Misconception about Punishment', 'Positive and Negative Punishment', 'Unconditioned and Conditioned Punishers', 'Contrasting Reinforcement and Punishment', 'Factors That Influence Punishment', 'Problems with Punishment', 'Ethical Issues & Self-Assessment'] },
    { id: 7, part: 1, icon: '🚦', title: 'Stimulus Control: Discrimination & Generalization', xp: 60,
      sections: ['Examples of Stimulus Control', 'Defining Stimulus Control', 'Stimulus Discrimination Training', 'The Three-Term Contingency', 'Stimulus Control Research', 'Generalization', 'Stimulus Equivalence'] },
    { id: 8, part: 1, icon: '🔔', title: 'Respondent Conditioning', xp: 60,
      sections: ['Examples of Respondent Conditioning', 'Defining Respondent Conditioning', 'Timing of the Neutral & Unconditioned Stimulus', 'Higher-Order Conditioning', 'Conditioned Emotional Responses', 'Extinction of Conditioned Responses', 'Discrimination & Generalization of Respondent Behavior', 'Factors That Influence Respondent Conditioning', 'Operant vs. Respondent Conditioning'] },
    /* ---- PART 3 ---- */
    { id: 9, part: 2, icon: '🪜', title: 'Shaping', xp: 55,
      sections: ['An Example of Shaping', 'Defining Shaping', 'Applications of Shaping', 'Research on Shaping', 'How to Use Shaping', 'Shaping of Problem Behaviors'] },
    { id: 10, part: 2, icon: '📣', title: 'Prompting & Transfer of Stimulus Control', xp: 60,
      sections: ['An Example of Prompting and Fading', 'What Is Prompting?', 'What Is Fading?', 'Types of Prompts', 'Transfer of Stimulus Control', 'How to Use Prompting & Transfer', 'Prompting & Transfer in Autism Treatment', 'Verbal Behavior'] },
    { id: 11, part: 2, icon: '🔗', title: 'Chaining', xp: 55,
      sections: ['Examples of Behavioral Chains', 'Analyzing Stimulus–Response Chains', 'Task Analysis', 'Backward Chaining', 'Forward Chaining', 'Total Task Presentation', 'Other Strategies for Teaching Chains', 'How to Use Chaining Procedures'] },
    { id: 12, part: 2, icon: '🎭', title: 'Behavioral Skills Training Procedures', xp: 55,
      sections: ['Examples of Behavioral Skills Training', 'Components of the BST Procedure', 'Instructions & Modeling', 'Rehearsal & Feedback', 'Enhancing Generalization after BST', 'In Situ Assessment & Training', 'BST and the Three-Term Contingency', 'BST in Groups & Applications', 'How to Use BST Procedures'] },
    /* ---- PART 4 ---- */
    { id: 13, part: 3, icon: '🔍', title: 'Understanding Problem Behaviors through Functional Assessment', xp: 60,
      sections: ['Examples of Functional Assessment', 'Defining Functional Assessment', 'Functions of Problem Behaviors', 'Functional Assessment Methods: Indirect', 'Direct Observation Methods', 'Experimental Methods (Functional Analysis)', 'Functional Analysis Research', 'Conducting a Functional Assessment', 'Functional Interventions'] },
    { id: 14, part: 3, icon: '🕯️', title: 'Applying Extinction', xp: 55,
      sections: ['The Case of Willy', 'Using Extinction to Decrease a Problem Behavior', 'Taking Account of the Schedule of Reinforcement', 'Reinforcing Alternative Behaviors', 'Promoting Generalization & Maintenance', 'Research Evaluating the Use of Extinction'] },
    { id: 15, part: 3, icon: '⚖️', title: 'Differential Reinforcement', xp: 60,
      sections: ['Differential Reinforcement of Alternative Behavior (DRA)', 'Variations of DRA', 'Differential Reinforcement of Other Behavior (DRO)', 'Differential Reinforcement of Low Rates (DRL)', 'Implementing DRL Procedures'] },
    { id: 16, part: 3, icon: '🌅', title: 'Antecedent Interventions', xp: 60,
      sections: ['Examples of Antecedent Interventions', 'Defining Antecedent Interventions', 'Manipulating Discriminative Stimuli', 'Manipulating Motivating Operations', 'Manipulating Response Effort', 'Research on Antecedent Interventions', 'Using Antecedent Interventions'] },
    { id: 17, part: 3, icon: '⏸️', title: 'Using Punishment: Time-Out and Response Cost', xp: 55,
      sections: ['Time-Out', 'Types of Time-Out', 'Using Reinforcement with Time-Out', 'Considerations in Using Time-Out', 'Response Cost', 'Comparing Response Cost, Time-Out & Extinction', 'Considerations in Using Response Cost'] },
    { id: 18, part: 3, icon: '⚡', title: 'Positive Punishment & the Ethics of Punishment', xp: 55,
      sections: ['Punishment by Application of Aversive Activities', 'Positive Punishment: Treatment of Last Resort', 'Considerations in Using Positive Punishment', 'The Ethics of Punishment', 'Training, Supervision & Peer Review', 'Accountability: Preventing Misuse'] },
    { id: 19, part: 3, icon: '🌐', title: 'Promoting Generalization', xp: 55,
      sections: ['Examples of Generalization Programming', 'Defining Generalization', 'Reinforcing Generalization & Natural Contingencies', 'Modifying Natural Contingencies & Training Situations', 'Incorporating Common Stimuli & Multiple Responses', 'Providing Cues & Self-Generated Mediators', 'Implementing Generalization Strategies'] },
    /* ---- PART 5 ---- */
    { id: 20, part: 4, icon: '🎯', title: 'Self-Management', xp: 55,
      sections: ['Examples of Self-Management', 'Defining Self-Management Problems', 'Defining Self-Management', 'Types of Self-Management Strategies', 'Steps in a Self-Management Plan', 'Clinical Problems in Self-Management'] },
    { id: 21, part: 4, icon: '🌀', title: 'Habit Reversal Procedures', xp: 55,
      sections: ['Examples of Habit Behaviors', 'Defining Habit Behaviors', 'Habit Reversal Procedures', 'Applications of Habit Reversal', 'Why Do Habit Reversal Procedures Work?', 'Other Treatments for Habit Disorders'] },
    { id: 22, part: 4, icon: '🪙', title: 'The Token Economy', xp: 55,
      sections: ['Rehabilitating Sammy', 'Defining a Token Economy', 'Implementing a Token Economy', 'Practical Considerations', 'Applications of a Token Economy', 'Advantages & Disadvantages'] },
    { id: 23, part: 4, icon: '📜', title: 'Behavioral Contracts', xp: 55,
      sections: ['Examples of Behavioral Contracting', 'Defining the Behavioral Contract', 'Components of a Behavioral Contract', 'Types of Behavioral Contracts', 'Negotiating a Behavioral Contract', 'Why Do Contracts Influence Behavior?', 'Applications of Behavioral Contracts'] },
    { id: 24, part: 4, icon: '🕊️', title: 'Fear and Anxiety Reduction Procedures', xp: 55,
      sections: ['Examples of Fear and Anxiety Reduction', 'Defining Fear and Anxiety Problems', 'Relaxation Training', 'Fear Reduction Procedures: Exposure', 'Fear Reduction Procedures: Other Methods', 'Clinical Problems'] },
    { id: 25, part: 4, icon: '💭', title: 'Cognitive Behavior Modification', xp: 55,
      sections: ['Examples of Cognitive Behavior Modification', 'Defining Cognitive Behavior Modification', 'Cognitive Restructuring', 'Cognitive Coping Skills Training', 'Acceptance-Based Therapies', 'Clinical Problems'] },
  ];

  // total sections count check
  let totalSections = 0;
  UNITS.forEach(u => { totalSections += u.sections.length; });

  /* ------------------------- QUIZ BANK -------------------------
     Each section key: "U<unit>-S<index>" -> array of question objects.
     Types: mc (multiple choice), tf (true/false), match, type.
     Each quiz question: { q, type, options (mc), answer (index or array),
       pairs (match), text (type), hint, xp }
     At least 2 questions per section, written from the book content.
  ---------------------------------------------------------------- */
  const Q = {};

  /* ================= CHAPTER 1 ================= */
  Q['U1-S0'] = [
    { q: 'Which of the following is the best definition of behavior?', type: 'mc', options: ['An activity of living organisms that involves movement through space and time', 'A personality trait or personal characteristic', 'Anything a person feels or thinks privately', 'A label used to describe a diagnosis'], answer: 0, hint: 'Behavior involves action — movement through space and time.' },
    { q: 'True or False: Behavior can be observed, described, and recorded by others or by the person engaging in it.', type: 'tf', answer: true, hint: 'Because behavior is an action, its occurrence can be observed and recorded.' },
  ];
  Q['U1-S1'] = [
    { q: 'Behaviors have dimensions such as frequency, duration, intensity, and latency. These are known as:', type: 'mc', options: ['Behavioral traits', 'Dimensions of behavior', 'Behavioral excesses', 'Response classes'], answer: 1, hint: 'A dimension is a measurable aspect of the behavior.' },
    { q: 'A behavior is said to be "lawful" when:', type: 'mc', options: ['It is controlled by legal rules', 'Its occurrence is systematically influenced by environmental events', 'It follows moral principles', 'It is completely random'], answer: 1, hint: 'Behavioral principles describe functional relationships between behavior and environmental events.' },
  ];
  Q['U1-S2'] = [
    { q: 'Behavior modification is best described as:', type: 'mc', options: ['A set of punishments for bad behavior', 'The applied science concerned with analyzing and modifying human behavior', 'A form of psychoanalysis', 'The study of personality traits'], answer: 1, hint: 'It is the applied science and professional practice concerned with analyzing and modifying human behavior.' },
    { q: 'In behavior modification, "analyzing" behavior means:', type: 'mc', options: ['Labeling a person with a diagnosis', 'Identifying the functional relationship between environmental events and a particular behavior', 'Measuring personality', 'Asking the person to reflect on their feelings'], answer: 1, hint: 'Analyzing means identifying the functional relationship between environmental events and behavior.' },
  ];
  Q['U1-S3'] = [
    { q: 'Which of the following is a characteristic of behavior modification?', type: 'mc', options: ['Focus on labeling', 'Focus on behavior rather than personal characteristics or traits', 'Rejection of measurement', 'Emphasis on past events as the sole cause'], answer: 1, hint: 'Behavior modification focuses on behavior, not traits or labels.' },
    { q: 'Behavior modification procedures are designed to change:', type: 'mc', options: ['A person\'s personality', 'Socially significant behaviors', 'Unconscious motives', 'IQ scores'], answer: 1, hint: 'The focus is on socially significant behaviors, with the goal of improving some aspect of a person\'s life.' },
    { q: 'Behavior modification de-emphasizes labeling. For example, instead of changing "autism" (a label), behavior modification is used to change:', type: 'mc', options: ['The diagnosis', 'Problem behaviors exhibited by the person', 'Brain chemistry', 'Family dynamics'], answer: 1, hint: 'Behavior modification targets problem behaviors, not labels.' },
  ];
  Q['U1-S4'] = [
    { q: 'The law of effect was described by:', type: 'mc', options: ['B. F. Skinner', 'Ivan Pavlov', 'Edward L. Thorndike', 'John B. Watson'], answer: 2, hint: 'Thorndike described the law of effect from his famous cat-and-puzzle-box experiment.' },
    { q: 'Pavlov\'s experiment with dogs demonstrated which type of conditioning?', type: 'mc', options: ['Operant conditioning', 'Respondent (classical) conditioning', 'Observational learning', 'Insight learning'], answer: 1, hint: 'Pavlov paired a neutral stimulus (a metronome) with food until the sound alone produced salivation.' },
    { q: 'Which researcher is considered the founder of operant conditioning and the foundation of behavior modification?', type: 'mc', options: ['Ivan Pavlov', 'Edward Thorndike', 'B. F. Skinner', 'Sigmund Freud'], answer: 2, hint: 'Skinner\'s work elaborated the basic principles of operant behavior.' },
    { q: 'True or False: Behavior modification rejects hypothetical underlying causes of behavior, such as an unresolved Oedipus complex.', type: 'tf', answer: true, hint: 'Skinner called such explanations "explanatory fictions."' },
  ];
  Q['U1-S5'] = [
    { q: 'The use of behavior modification in business, industry, and human services is called:', type: 'mc', options: ['Industrial psychology', 'Organizational behavior modification or management', 'Human resource management', 'Clinical management'], answer: 1, hint: 'It is called organizational behavior modification or organizational behavior management.' },
    { q: 'Behavior modification has been applied to teach new skills to children with autism spectrum disorder. This is an application in the area of:', type: 'mc', options: ['Gerontology', 'Sports performance', 'Developmental disabilities and autism spectrum disorder', 'Community psychology'], answer: 2, hint: 'More behavior modification research has been conducted in this area than perhaps any other.' },
  ];
  Q['U1-S6'] = [
    { q: 'Professionals who typically develop and implement behavior modification procedures include:', type: 'mc', options: ['Board certified behavior analysts', 'Astronomers', 'Chefs', 'Accountants'], answer: 0, hint: 'Board certified behavior analysts (BCBAs) are professionals in this field.' },
    { q: 'Who often implements behavior modification procedures in everyday life?', type: 'mc', options: ['Only licensed psychologists', 'Teachers, parents, job supervisors, and others after sufficient training', 'Medical doctors', 'No one; procedures are self-administered only'], answer: 1, hint: 'People such as teachers, parents, and supervisors often implement procedures after training.' },
  ];
  Q['U1-S7'] = [
    { q: 'Which of the following is a hallmark of behavior modification?', type: 'mc', options: ['Avoiding all measurement', 'Measuring behavior before and after intervention to document change', 'Relying on intuition', 'Focusing only on private events'], answer: 1, hint: 'Measurement of behavior change is one of the hallmarks of behavior modification.' },
    { q: 'A behavioral excess is a behavior that:', type: 'mc', options: ['Occurs too little', 'Occurs too often or at too high a level', 'Is always good', 'Cannot be measured'], answer: 1, hint: 'Behavioral excesses and deficits are targets for change.' },
  ];

  /* ================= CHAPTER 2 ================= */
  Q['U2-S0'] = [
    { q: 'In a direct assessment, the observer:', type: 'mc', options: ['Relies on memory of past behavior', 'Directly and systematically observes and records the behavior as it occurs', 'Asks the person to describe their own behavior', 'Uses only questionnaires'], answer: 1, hint: 'Direct assessment involves observing and recording behavior as it occurs.' },
    { q: 'In an indirect assessment, information is gathered from:', type: 'mc', options: ['Direct observation', 'Interviews and questionnaires', 'Video recordings of the behavior', 'Only automated sensors'], answer: 1, hint: 'Indirect assessment uses interviews, questionnaires, and rating scales.' },
  ];
  Q['U2-S1'] = [
    { q: 'A target behavior is:', type: 'mc', options: ['Any behavior the person performs', 'The behavior to be modified', 'A behavior that cannot be observed', 'A personality trait'], answer: 1, hint: 'The target behavior is the specific behavior that will be changed.' },
    { q: 'A behavioral definition must be:', type: 'mc', options: ['Vague and general', 'Objective, unambiguous, and clear', 'Based on the person\'s feelings', 'Written only by a physician'], answer: 1, hint: 'The definition must be objective and clear so observers agree on what to record.' },
  ];
  Q['U2-S2'] = [
    { q: 'Which of the following is an example of a behavior dimension used in recording?', type: 'mc', options: ['Color', 'Height', 'Frequency (number of times it occurs)', 'Weight'], answer: 2, hint: 'Frequency is a measurable dimension of behavior.' },
    { q: 'When planning to record behavior, a key consideration is:', type: 'mc', options: ['Who the observer will be and when/where recording occurs', 'What color pen to use', 'The person\'s favorite food', 'How many pages to print'], answer: 0, hint: 'Logistics include the observer and when and where to record.' },
  ];
  Q['U2-S3'] = [
    { q: 'Which recording method records every occurrence of the behavior?', type: 'mc', options: ['Time sampling', 'Continuous recording', 'Interval recording', 'Product recording'], answer: 1, hint: 'Continuous recording involves recording each occurrence of the target behavior.' },
    { q: 'In product recording, the observer records:', type: 'mc', options: ['The behavior as it happens', 'The tangible outcome or result of the behavior', 'The person\'s mood', 'The number of observers'], answer: 1, hint: 'Product recording measures the permanent product of the behavior (e.g., pages written).' },
  ];
  Q['U2-S4'] = [
    { q: 'Recording the product of behavior (e.g., the number of completed homework problems) is called:', type: 'mc', options: ['Continuous recording', 'Product recording', 'Event recording', 'Time sampling'], answer: 1, hint: 'Product recording measures the permanent product of the behavior.' },
    { q: 'Continuous recording records:', type: 'mc', options: ['Only the beginning and end of the day', 'Every occurrence of the target behavior', 'Samples of behavior', 'Only the most intense behaviors'], answer: 1, hint: 'Continuous recording documents each occurrence.' },
  ];
  Q['U2-S5'] = [
    { q: 'In time sampling, the observer:', type: 'mc', options: ['Records behavior continuously for hours', 'Divides the observation period into intervals and records whether the behavior occurred during each interval', 'Only records the products of behavior', 'Asks the person to self-report'], answer: 1, hint: 'Time sampling involves dividing observation into intervals.' },
    { q: 'In interval recording, the observer records whether the behavior occurred:', type: 'mc', options: ['During each interval of the observation period', 'Only once at the end', 'Never', 'Before the observation began'], answer: 0, hint: 'Interval recording scores each interval for the occurrence of the behavior.' },
  ];
  Q['U2-S6'] = [
    { q: 'A common recording instrument is:', type: 'mc', options: ['A thermometer', 'A wrist counter or a data sheet', 'A stopwatch alone', 'A magnifying glass'], answer: 1, hint: 'Wrist counters and data sheets are commonly used recording instruments.' },
    { q: 'True or False: The choice of recording instrument does not matter as long as you record the behavior.', type: 'tf', answer: false, hint: 'The instrument must fit the recording method and the behavior.' },
  ];
  Q['U2-S7'] = [
    { q: 'Reactivity occurs when:', type: 'mc', options: ['The behavior changes because it is being observed', 'The observer makes an error', 'The behavior is recorded automatically', 'The behavior never changes'], answer: 0, hint: 'Reactivity is the effect of the observer on the behavior being observed.' },
    { q: 'Which of the following can reduce reactivity?', type: 'mc', options: ['Telling the person they are being filmed', 'Observing covertly or waiting until the person habituates to the observer', 'Changing observers constantly', 'Recording only in the office'], answer: 1, hint: 'Making observations less obtrusive can reduce reactivity.' },
  ];
  Q['U2-S8'] = [
    { q: 'Interobserver agreement (IOA) measures:', type: 'mc', options: ['How well the behavior matches expectations', 'The degree to which two observers record the same behavior the same way', 'How often the observer is present', 'The intensity of the behavior'], answer: 1, hint: 'IOA is the degree to which two independent observers agree on their recordings.' },
    { q: 'A high level of interobserver agreement suggests that:', type: 'mc', options: ['The behavior is unobservable', 'The behavioral definition is clear and the data are reliable', 'The observer is biased', 'The recording is unnecessary'], answer: 1, hint: 'High IOA indicates reliable data and clear definitions.' },
  ];

  /* ================= CHAPTER 3 ================= */
  Q['U3-S0'] = [
    { q: 'The horizontal axis of a graph typically represents:', type: 'mc', options: ['The behavior', 'Time (sessions or days)', 'The number of observers', 'The intensity of behavior'], answer: 1, hint: 'The x-axis usually shows time across sessions.' },
    { q: 'The vertical axis of a graph typically represents:', type: 'mc', options: ['Time', 'The value of the dependent variable (e.g., frequency of behavior)', 'The observer\'s name', 'The location'], answer: 1, hint: 'The y-axis shows the level of the dependent variable.' },
  ];
  Q['U3-S1'] = [
    { q: 'A graph used to evaluate behavior change should show data points plotted:', type: 'mc', options: ['Randomly', 'Across successive sessions or time periods', 'Only at the start', 'Only at the end'], answer: 1, hint: 'Data are plotted across successive sessions to show change over time.' },
    { q: 'True or False: Graphs can help you evaluate the effects of a treatment by comparing behavior before and after the intervention.', type: 'tf', answer: true, hint: 'Graphing data is central to evaluating behavior change.' },
  ];
  Q['U3-S2'] = [
    { q: 'The "level" of behavior in a graph refers to:', type: 'mc', options: ['The slope of the data', 'The amount or value of behavior on the vertical axis', 'The color of the line', 'The number of sessions'], answer: 1, hint: 'Level is the amount of behavior (value on the y-axis).' },
    { q: 'The "trend" of behavior refers to:', type: 'mc', options: ['The direction of the data points over time', 'The variability of the data', 'The number of data points', 'The baseline average'], answer: 0, hint: 'Trend is the overall direction of the data (increasing, decreasing, or flat).' },
    { q: 'High "variability" in the data means:', type: 'mc', options: ['The data are all the same', 'There is a lot of fluctuation in the level of behavior', 'The trend is flat', 'There are no data points'], answer: 1, hint: 'Variability refers to how much the data fluctuate around the trend.' },
  ];
  Q['U3-S3'] = [
    { q: 'In an A–B graph, the "A" phase refers to:', type: 'mc', options: ['The treatment phase', 'The baseline phase', 'The follow-up phase', 'The maintenance phase'], answer: 1, hint: 'A = baseline (no treatment); B = treatment phase.' },
    { q: 'In an A–B design, the "B" phase refers to:', type: 'mc', options: ['Baseline', 'The treatment or intervention phase', 'A second baseline', 'The control condition'], answer: 1, hint: 'B = the intervention phase.' },
  ];
  Q['U3-S4'] = [
    { q: 'The A–B–A–B design is also called:', type: 'mc', options: ['Multiple-baseline design', 'Reversal design', 'Alternating-treatments design', 'Changing-criterion design'], answer: 1, hint: 'The A–B–A–B design is a reversal design.' },
    { q: 'In a multiple-baseline design, the treatment is introduced:', type: 'mc', options: ['Simultaneously to all baselines', 'Staggered in time across two or more behaviors, settings, or people', 'Never', 'Only after all behavior stops'], answer: 1, hint: 'Treatment is introduced at different times across baselines.' },
    { q: 'In a reversal (A–B–A–B) design, if the behavior changes during treatment and returns to baseline levels when treatment is withdrawn, this demonstrates:', type: 'mc', options: ['No effect', 'A functional relationship between treatment and behavior', 'That baseline was unnecessary', 'Random variation only'], answer: 1, hint: 'The replication of the effect across phases demonstrates a functional relationship.' },
  ];
  Q['U3-S5'] = [
    { q: 'In an alternating-treatments design, two or more conditions are:', type: 'mc', options: ['Kept constant for long periods', 'Alternated rapidly across sessions', 'Never compared', 'Applied only to one person'], answer: 1, hint: 'Conditions are alternated to compare their effects.' },
    { q: 'In a changing-criterion design, reinforcement is delivered when the behavior:', type: 'mc', options: ['Reaches a gradually changing criterion level', 'Stops completely', 'Occurs randomly', 'Exceeds all baseline levels at once'], answer: 0, hint: 'The criterion for reinforcement is gradually changed to shape behavior.' },
  ];

  /* ================= CHAPTER 4 ================= */
  Q['U4-S0'] = [
    { q: 'Reinforcement is defined as a procedure in which:', type: 'mc', options: ['A stimulus is removed after the behavior', 'The occurrence of a stimulus after a behavior increases the future rate of that behavior', 'A behavior is ignored', 'A person is punished'], answer: 1, hint: 'Reinforcement always involves an increase in the future frequency of the behavior.' },
    { q: 'The consequence that follows a behavior and increases its future occurrence is called a:', type: 'mc', options: ['Punisher', 'Reinforcer', 'Discriminative stimulus', 'Motivating operation'], answer: 1, hint: 'A reinforcer is a stimulus that increases the future rate of behavior.' },
  ];
  Q['U4-S1'] = [
    { q: 'Positive reinforcement involves:', type: 'mc', options: ['Removing an aversive stimulus after the behavior', 'Presenting a stimulus after the behavior, increasing its future occurrence', 'Punishing the behavior', 'Ignoring the behavior'], answer: 1, hint: 'Positive reinforcement = presentation of a stimulus that increases behavior.' },
    { q: 'Negative reinforcement involves:', type: 'mc', options: ['Presenting an aversive stimulus', 'Removing an aversive stimulus after the behavior, increasing its future occurrence', 'Giving a reward', 'Decreasing behavior'], answer: 1, hint: 'Negative reinforcement = removal of an aversive stimulus, increasing behavior.' },
    { q: 'A child cleans their room and the parent stops nagging, so cleaning increases. This is an example of:', type: 'mc', options: ['Positive reinforcement', 'Negative reinforcement', 'Punishment', 'Extinction'], answer: 1, hint: 'The removal of nagging (an aversive) after the behavior increases it.' },
  ];
  Q['U4-S2'] = [
    { q: 'Escape behavior is maintained by:', type: 'mc', options: ['Positive reinforcement', 'Negative reinforcement (removal of an aversive event)', 'Extinction', 'Punishment'], answer: 1, hint: 'Escape behavior removes an aversive event (negative reinforcement).' },
    { q: 'Avoidance behavior occurs:', type: 'mc', options: ['After the aversive event happens', 'Before the aversive event occurs, to prevent it', 'Only under punishment', 'At random times'], answer: 1, hint: 'Avoidance prevents an aversive event from occurring.' },
    { q: 'True or False: Escape and avoidance behaviors are both maintained by negative reinforcement.', type: 'tf', answer: true, hint: 'Both involve removal or prevention of aversive events.' },
  ];
  Q['U4-S3'] = [
    { q: 'Unconditioned reinforcers:', type: 'mc', options: ['Require learning to be effective', 'Are naturally reinforcing (e.g., food, water)', 'Are always social', 'Only work for animals'], answer: 1, hint: 'Unconditioned reinforcers work without prior learning (food, water, warmth).' },
    { q: 'A conditioned reinforcer:', type: 'mc', options: ['Is naturally reinforcing', 'Becomes reinforcing through pairing with another reinforcer (e.g., praise, money)', 'Cannot be learned', 'Is always aversive'], answer: 1, hint: 'Conditioned reinforcers acquire reinforcing value through pairing (e.g., money, tokens).' },
    { q: 'Money is best classified as:', type: 'mc', options: ['An unconditioned reinforcer', 'A conditioned (generalized) reinforcer', 'A punisher', 'An unconditioned stimulus'], answer: 1, hint: 'Money is reinforcing because it has been paired with many other reinforcers.' },
  ];
  Q['U4-S4'] = [
    { q: 'The immediacy of reinforcement refers to:', type: 'mc', options: ['How large the reinforcer is', 'The time between the behavior and the delivery of the reinforcer', 'The number of reinforcers', 'The color of the reinforcer'], answer: 1, hint: 'Immediacy = the delay between behavior and reinforcement; short delays work best.' },
    { q: 'A motivating operation (e.g., food deprivation) that increases the value of a reinforcer is called:', type: 'mc', options: ['An abolishing operation', 'An establishing operation', 'A discriminative stimulus', 'A conditioned stimulus'], answer: 1, hint: 'An establishing operation increases the reinforcing value of a stimulus.' },
    { q: 'For reinforcement to be effective, the reinforcer must be delivered:', type: 'mc', options: ['Randomly', 'Only if the behavior occurs (contingently)', 'Before the behavior', 'By a supervisor only'], answer: 1, hint: 'Reinforcement must be contingent on the behavior.' },
  ];
  Q['U4-S5'] = [
    { q: 'In a fixed ratio (FR) schedule, reinforcement is delivered:', type: 'mc', options: ['After a fixed number of responses', 'After a variable number of responses', 'After a fixed period of time', 'Never'], answer: 0, hint: 'FR = reinforcement after a fixed number of responses.' },
    { q: 'A variable ratio (VR) schedule delivers reinforcement:', type: 'mc', options: ['After a fixed number of responses', 'After an average number of responses that varies', 'After a fixed time', 'Only once'], answer: 1, hint: 'VR = reinforcement after a varying number of responses around an average.' },
    { q: 'In a fixed interval (FI) schedule, the first response after ___ is reinforced.', type: 'mc', options: ['A fixed number of responses', 'A fixed period of time has elapsed', 'A variable number of responses', 'The baseline'], answer: 1, hint: 'FI = reinforcement for the first response after a fixed time interval.' },
    { q: 'Slot machines typically pay off on which schedule?', type: 'mc', options: ['Fixed ratio', 'Variable ratio', 'Fixed interval', 'Variable interval'], answer: 1, hint: 'Gambling behavior is maintained by variable ratio reinforcement.' },
  ];
  Q['U4-S6'] = [
    { q: 'Reinforcing a behavior for its frequency, duration, or intensity illustrates that reinforcement can target:', type: 'mc', options: ['Different dimensions of behavior', 'Only the topographical form', 'Only one dimension ever', 'Private events'], answer: 0, hint: 'Reinforcement can be applied to any dimension (frequency, duration, intensity, etc.).' },
    { q: 'True or False: You can reinforce only the frequency of behavior, not its duration or intensity.', type: 'tf', answer: false, hint: 'Reinforcement can be delivered for any dimension of behavior.' },
  ];
  Q['U4-S7'] = [
    { q: 'In concurrent schedules, the person has:', type: 'mc', options: ['Only one response option', 'Two or more response options available simultaneously', 'No response options', 'A forced choice between two punishments'], answer: 1, hint: 'Concurrent schedules present two or more simultaneously available response options.' },
    { q: 'In multiple schedules, two or more schedules:', type: 'mc', options: ['Occur in different, signaled conditions presented in sequence', 'Occur simultaneously with no signals', 'Never occur', 'Are identical'], answer: 0, hint: 'Multiple schedules alternate conditions, each signaled by a discriminative stimulus.' },
  ];

  /* ================= CHAPTER 5 ================= */
  Q['U5-S0'] = [
    { q: 'Extinction is a procedure in which:', type: 'mc', options: ['A reinforcer is presented after the behavior', 'The reinforcer that previously maintained the behavior is withheld or no longer follows the behavior', 'A punisher is applied', 'The behavior is rewarded more often'], answer: 1, hint: 'Extinction = withholding the reinforcer that maintained the behavior.' },
    { q: 'True or False: Extinction decreases the future frequency of the behavior.', type: 'tf', answer: true, hint: 'Extinction is used to decrease behavior by discontinuing reinforcement.' },
  ];
  Q['U5-S1'] = [
    { q: 'The extinction burst is:', type: 'mc', options: ['A gradual increase in the behavior', 'A temporary increase in the frequency, duration, or intensity of the behavior at the start of extinction', 'The final burst of reinforcement', 'A type of punishment'], answer: 1, hint: 'At the beginning of extinction, the behavior often temporarily increases — the extinction burst.' },
    { q: 'During the extinction burst, the behavior may also:', type: 'mc', options: ['Disappear permanently', 'Show novel forms or emotional responses (e.g., aggression)', 'Immediately stop', 'Become reinforced'], answer: 1, hint: 'Extinction bursts are often accompanied by novel behaviors and emotional responses.' },
    { q: 'If a parent gives in and reinforces the behavior during an extinction burst, the behavior will likely:', type: 'mc', options: ['Stop permanently', 'Be reinforced and persist even longer (be resistant to later extinction)', 'Decrease immediately', 'Never occur again'], answer: 1, hint: 'Accidentally reinforcing during a burst teaches persistence.' },
  ];
  Q['U5-S2'] = [
    { q: 'Spontaneous recovery refers to:', type: 'mc', options: ['The behavior reappearing after it has declined to zero, even without reinforcement', 'The behavior increasing during reinforcement', 'A new behavior appearing', 'The end of extinction'], answer: 0, hint: 'The behavior may reappear temporarily after extinction has reduced it.' },
    { q: 'True or False: Spontaneous recovery means the behavior will return permanently at full strength.', type: 'tf', answer: false, hint: 'Recovery is temporary and of short duration unless reinforced again.' },
  ];
  Q['U5-S3'] = [
    { q: 'Extinction can be applied to behaviors maintained by positive reinforcement (e.g., attention). Which is an example?', type: 'mc', options: ['Ignoring a child\'s tantrum maintained by attention', 'Giving more attention', 'Removing privileges after the tantrum', 'Sending the child to time-out'], answer: 0, hint: 'Withholding attention is extinction for attention-maintained behavior.' },
    { q: 'For a behavior maintained by negative reinforcement (e.g., escape from tasks), extinction means:', type: 'mc', options: ['Allowing escape as usual', 'No longer allowing escape after the behavior', 'Adding more tasks', 'Praising the behavior'], answer: 1, hint: 'Extinction for escape behavior means the person can no longer escape the task.' },
  ];
  Q['U5-S4'] = [
    { q: 'A common misconception about extinction is that it is the same as:', type: 'mc', options: ['Ignoring all behavior regardless of its cause', 'Reinforcement', 'Shaping', 'Punishment by removal'], answer: 0, hint: 'Extinction is NOT simply ignoring; it must withhold the specific reinforcer maintaining the behavior.' },
    { q: 'True or False: Simply ignoring a behavior is always extinction.', type: 'tf', answer: false, hint: 'Extinction requires withholding the specific reinforcer that maintains the behavior.' },
  ];
  Q['U5-S5'] = [
    { q: 'A behavior reinforced on a continuous schedule will usually extinguish:', type: 'mc', options: ['More slowly than an intermittently reinforced behavior', 'More quickly than an intermittently reinforced behavior', 'At the same rate', 'Never'], answer: 1, hint: 'Intermittently reinforced behavior is more resistant to extinction.' },
    { q: 'The more intermittent the reinforcement schedule before extinction, the ___ the behavior is to extinction.', type: 'mc', options: ['More resistant', 'Less resistant', 'Unaffected', 'More susceptible'], answer: 0, hint: 'Partial reinforcement schedules produce greater resistance to extinction.' },
  ];

  /* ================= CHAPTER 6 ================= */
  Q['U6-S0'] = [
    { q: 'Punishment is defined as a procedure in which:', type: 'mc', options: ['A stimulus is presented and behavior increases', 'A stimulus follows a behavior and the future frequency of that behavior decreases', 'The reinforcer is withheld', 'The behavior is ignored'], answer: 1, hint: 'Punishment always involves a decrease in the future frequency of the behavior.' },
    { q: 'A punisher is a consequence that:', type: 'mc', options: ['Increases behavior', 'Decreases the future frequency of the behavior', 'Has no effect', 'Only works on animals'], answer: 1, hint: 'A punisher is a stimulus that decreases the future rate of behavior.' },
  ];
  Q['U6-S1'] = [
    { q: 'A common misconception about punishment is that it means:', type: 'mc', options: ['Always decreasing behavior', 'Retaliation, revenge, or physical harm to the person', 'A technical procedure', 'Only time-out'], answer: 1, hint: 'Punishment is often confused with retribution; technically it just decreases behavior.' },
    { q: 'True or False: Punishment and reinforcement are defined by their effect on the future frequency of behavior, not by how they feel.', type: 'tf', answer: true, hint: 'The definition is functional: punishment decreases behavior, reinforcement increases it.' },
  ];
  Q['U6-S2'] = [
    { q: 'Positive punishment involves:', type: 'mc', options: ['Removing a stimulus after the behavior', 'Presenting an aversive stimulus after the behavior, decreasing its future occurrence', 'Giving a reward', 'Withholding reinforcement'], answer: 1, hint: 'Positive punishment = presentation of an aversive stimulus that decreases behavior.' },
    { q: 'Negative punishment involves:', type: 'mc', options: ['Presenting an aversive stimulus', 'Removing a reinforcing stimulus after the behavior, decreasing its future occurrence', 'Increasing behavior', 'Praising the person'], answer: 1, hint: 'Negative punishment = removal of a reinforcing stimulus that decreases behavior.' },
    { q: 'A child loses video game privileges for hitting their sibling, and hitting decreases. This is:', type: 'mc', options: ['Positive punishment', 'Negative punishment', 'Positive reinforcement', 'Extinction'], answer: 1, hint: 'Removal of a reinforcing stimulus (games) that decreases behavior = negative punishment.' },
    { q: 'Time-out is an example of:', type: 'mc', options: ['Positive punishment', 'Negative punishment (removal of access to reinforcement)', 'Reinforcement', 'Extinction'], answer: 1, hint: 'Time-out removes the opportunity to earn reinforcement.' },
  ];
  Q['U6-S3'] = [
    { q: 'Unconditioned punishers are:', type: 'mc', options: ['Learned aversive stimuli', 'Naturally aversive (e.g., intense heat, electric shock, extreme cold)', 'Always social', 'Never painful'], answer: 1, hint: 'Unconditioned punishers are naturally aversive without prior learning.' },
    { q: 'A conditioned punisher:', type: 'mc', options: ['Is naturally aversive', 'Becomes punishing through pairing with another punisher (e.g., the word "no")', 'Always increases behavior', 'Cannot be learned'], answer: 1, hint: 'Conditioned punishers acquire punishing value through pairing.' },
  ];
  Q['U6-S4'] = [
    { q: 'Which statement correctly contrasts reinforcement and punishment?', type: 'mc', options: ['Both increase behavior', 'Reinforcement increases the future frequency of behavior; punishment decreases it', 'Both decrease behavior', 'Punishment increases behavior'], answer: 1, hint: 'Reinforcement increases behavior; punishment decreases it.' },
    { q: 'Positive reinforcement and positive punishment both involve:', type: 'mc', options: ['Removing a stimulus', 'Presenting a stimulus after the behavior', 'Decreasing behavior', 'No consequence'], answer: 1, hint: 'Both "positive" procedures present a stimulus; they differ in effect (increase vs. decrease).' },
  ];
  Q['U6-S5'] = [
    { q: 'For punishment to be most effective, it should be:', type: 'mc', options: ['Delayed and inconsistent', 'Immediate, contingent, and consistent', 'Applied only to intense behavior', 'Avoided entirely'], answer: 1, hint: 'Immediacy, contingency, and consistency enhance punishment effectiveness.' },
    { q: 'The effectiveness of punishment is also influenced by:', type: 'mc', options: ['Motivating operations and the magnitude of the punisher', 'The color of the punisher', 'The weather', 'The person\'s handwriting'], answer: 0, hint: 'MO and magnitude are among the factors that influence punishment.' },
  ];
  Q['U6-S6'] = [
    { q: 'Which of the following is a problem associated with punishment?', type: 'mc', options: ['It always works perfectly', 'It can produce emotional reactions such as fear and anxiety', 'It increases behavior', 'It has no side effects'], answer: 1, hint: 'Punishment can produce negative emotional reactions.' },
    { q: 'Escape and avoidance behaviors may develop when punishment is used because the person may try to:', type: 'mc', options: ['Get more attention', 'Escape from or avoid the punisher or the punishing situation', 'Increase the behavior', 'Reinforce others'], answer: 1, hint: 'People may escape or avoid the source of punishment.' },
    { q: 'Using punishment can be negatively reinforced for the punisher because:', type: 'mc', options: ['It feels good to punish', 'The immediate reduction in the problem behavior removes an aversive event for the punisher', 'It always works', 'It is ethical'], answer: 1, hint: 'The punisher\'s behavior is maintained by negative reinforcement — removal of the aversive behavior.' },
    { q: 'Punishment may serve as a model for:', type: 'mc', options: ['Positive behavior', 'Aggressive behavior', 'Healthy coping', 'Academic success'], answer: 1, hint: 'Modeling aggressive punishment can teach aggressive behavior.' },
  ];
  Q['U6-S7'] = [
    { q: 'Ethical use of punishment requires:', type: 'mc', options: ['Never using reinforcement', 'Informed consent, alternative treatments tried first, and safeguards', 'Always punishing first', 'Using the most intense punisher'], answer: 1, hint: 'Ethics require informed consent, prior attempts at positive approaches, and safeguards.' },
    { q: 'True or False: Because of the side effects, punishment should generally be used after positive procedures have been tried.', type: 'tf', answer: true, hint: 'Positive reinforcement-based procedures are usually tried first.' },
  ];

  /* ================= CHAPTER 7 ================= */
  Q['U7-S0'] = [
    { q: 'Stimulus control is demonstrated when:', type: 'mc', options: ['Behavior occurs equally in all situations', 'The occurrence of a behavior is more likely in the presence of a specific stimulus', 'Behavior never occurs', 'Only one stimulus exists'], answer: 1, hint: 'Stimulus control = behavior is more likely in the presence of a particular antecedent stimulus.' },
    { q: 'An example of stimulus control is:', type: 'mc', options: ['Running in all rooms equally', 'Stopping your car at a red light but not a green light', 'Eating at any time', 'Sleeping only at parties'], answer: 1, hint: 'The red light (SD) controls stopping; the green light does not.' },
  ];
  Q['U7-S1'] = [
    { q: 'Stimulus control is a term used to describe:', type: 'mc', options: ['The influence of an antecedent stimulus on behavior', 'The effect of a consequence', 'Random behavior', 'The response rate'], answer: 0, hint: 'Stimulus control refers to the influence of antecedent stimuli on behavior.' },
    { q: 'The behavior occurs in the presence of the discriminative stimulus but not in its absence. This describes:', type: 'mc', options: ['Punishment', 'Stimulus control', 'Extinction', 'Reinforcement'], answer: 1, hint: 'This is the defining feature of stimulus control.' },
  ];
  Q['U7-S2'] = [
    { q: 'Stimulus discrimination training involves:', type: 'mc', options: ['Reinforcing the behavior in the presence of one stimulus and not in the presence of another', 'Punishing all responses', 'Reinforcing behavior equally everywhere', 'Removing all stimuli'], answer: 0, hint: 'Discrimination training reinforces behavior in the presence of the SD and not in the presence of the S-delta.' },
    { q: 'In discrimination training, the stimulus in whose presence the behavior is reinforced is called the:', type: 'mc', options: ['S-delta', 'Discriminative stimulus (SD)', 'Unconditioned stimulus', 'Neutral stimulus'], answer: 1, hint: 'The SD signals that reinforcement is available.' },
    { q: 'In discrimination training, the stimulus in whose presence the behavior is NOT reinforced is called the:', type: 'mc', options: ['Discriminative stimulus', 'S-delta', 'Reinforcer', 'Motivating operation'], answer: 1, hint: 'The S-delta signals that reinforcement is not available.' },
  ];
  Q['U7-S3'] = [
    { q: 'The three-term contingency consists of:', type: 'mc', options: ['Behavior, consequence, and emotion', 'Antecedent (SD), behavior, and consequence', 'Two behaviors and a consequence', 'Stimulus, response, and perception'], answer: 1, hint: 'The three-term contingency is antecedent–behavior–consequence.' },
    { q: 'The antecedent in the three-term contingency that sets the occasion for reinforcement is the:', type: 'mc', options: ['S-delta', 'SD (discriminative stimulus)', 'Punisher', 'Response'], answer: 1, hint: 'The SD sets the occasion for a behavior that will be reinforced.' },
  ];
  Q['U7-S4'] = [
    { q: 'Research on stimulus control has shown that behavior comes under control of the SD when:', type: 'mc', options: ['Reinforcement is delivered only in its presence', 'Punishment is delivered in its presence', 'Reinforcement is random', 'No consequences follow'], answer: 0, hint: 'Differential reinforcement in the presence of the SD produces stimulus control.' },
    { q: 'True or False: Stimulus control is developed through a history of differential reinforcement.', type: 'tf', answer: true, hint: 'Stimulus control results from a history of reinforcement in the presence of the SD only.' },
  ];
  Q['U7-S5'] = [
    { q: 'Generalization occurs when:', type: 'mc', options: ['Behavior occurs in the presence of novel stimuli that are similar to the SD', 'Behavior occurs only in one exact situation', 'Behavior stops entirely', 'Only the SD controls behavior'], answer: 0, hint: 'Generalization = responding to similar (but novel) stimuli.' },
    { q: 'A child who says "doggie" to all four-legged animals is demonstrating:', type: 'mc', options: ['Discrimination', 'Generalization', 'Extinction', 'Punishment'], answer: 1, hint: 'Responding to similar stimuli (all furry animals) = generalization.' },
    { q: 'True or False: Generalization and discrimination are opposite processes along a continuum of stimulus similarity.', type: 'tf', answer: true, hint: 'The more similar a novel stimulus is to the SD, the more likely generalization; the less similar, the more discrimination.' },
  ];
  Q['U7-S6'] = [
    { q: 'Stimulus equivalence is demonstrated when, after training A→B and B→C, the person also shows:', type: 'mc', options: ['Only A→B responses', 'B→A (symmetry) and A→C (transitivity) without additional training', 'No new responses', 'Only C→C'], answer: 1, hint: 'Stimulus equivalence involves symmetry, transitivity, and reflexivity of relations.' },
    { q: 'In stimulus equivalence research, after learning that A equals B and B equals C, a learner who responds that A equals C is demonstrating:', type: 'mc', options: ['Symmetry', 'Transitivity', 'Reflexivity', 'Extinction'], answer: 1, hint: 'Transitivity = deriving the A–C relation from A–B and B–C training.' },
  ];

  /* ================= CHAPTER 8 ================= */
  Q['U8-S0'] = [
    { q: 'In respondent conditioning, a neutral stimulus becomes able to elicit a response after:', type: 'mc', options: ['Being paired with an unconditioned stimulus', 'Being punished', 'Being ignored', 'Occurring alone'], answer: 0, hint: 'The neutral stimulus is repeatedly paired with the US until it elicits the response.' },
    { q: 'Pavlov\'s dog salivating to the sound of a metronome after pairing with food is an example of:', type: 'mc', options: ['Operant conditioning', 'Respondent (classical) conditioning', 'Shaping', 'Extinction'], answer: 1, hint: 'This is the classic example of respondent conditioning.' },
  ];
  Q['U8-S1'] = [
    { q: 'In respondent conditioning, the unconditioned stimulus (US):', type: 'mc', options: ['Is learned', 'Naturally elicits an unconditioned response without prior learning', 'Never elicits a response', 'Is always neutral'], answer: 1, hint: 'The US naturally elicits a response (e.g., food elicits salivation).' },
    { q: 'After conditioning, the neutral stimulus is called the:', type: 'mc', options: ['Unconditioned stimulus', 'Conditioned stimulus (CS)', 'S-delta', 'Reinforcer'], answer: 1, hint: 'Once the neutral stimulus elicits the response, it is a conditioned stimulus.' },
    { q: 'The response elicited by the conditioned stimulus after conditioning is called the:', type: 'mc', options: ['Unconditioned response', 'Conditioned response (CR)', 'Operant response', 'Discriminative response'], answer: 1, hint: 'The CR is the learned response to the CS.' },
  ];
  Q['U8-S2'] = [
    { q: 'For respondent conditioning to be most effective, the neutral stimulus should:', type: 'mc', options: ['Come after the unconditioned stimulus', 'Precede the unconditioned stimulus (or occur simultaneously)', 'Never be paired', 'Be presented randomly'], answer: 1, hint: 'The CS should precede or overlap the US for optimal conditioning.' },
    { q: 'If the neutral stimulus is presented after the unconditioned stimulus ends, conditioning is:', type: 'mc', options: ['Stronger', 'Weakened or unlikely', 'Unaffected', 'Perfect'], answer: 1, hint: 'Backward pairing (US before NS) produces little conditioning.' },
  ];
  Q['U8-S3'] = [
    { q: 'Higher-order conditioning occurs when:', type: 'mc', options: ['A second neutral stimulus is paired with a conditioned stimulus', 'The US is removed', 'Only operant behavior is involved', 'Punishment is used'], answer: 0, hint: 'Higher-order conditioning: a new NS paired with an established CS becomes a CS too.' },
    { q: 'True or False: Higher-order conditioning can establish conditioned emotional responses without direct pairing with the original US.', type: 'tf', answer: true, hint: 'Pairing with a CS can condition new responses.' },
  ];
  Q['U8-S4'] = [
    { q: 'Conditioned emotional responses (CERs) are:', type: 'mc', options: ['Responses elicited by conditioned stimuli that involve emotional reactions such as fear', 'Operant behaviors', 'Always positive emotions', 'Never learned'], answer: 0, hint: 'CERs are respondent (emotional) responses to conditioned stimuli.' },
    { q: 'A phobia of dogs that developed after a dog bite can be understood as:', type: 'mc', options: ['An unconditioned reflex', 'A conditioned emotional response', 'An operant behavior', 'A schedule effect'], answer: 1, hint: 'Fear elicited by a previously neutral stimulus is a conditioned emotional response.' },
  ];
  Q['U8-S5'] = [
    { q: 'In respondent extinction, the conditioned response decreases when:', type: 'mc', options: ['The CS is presented repeatedly without the US', 'The US is presented alone', 'The CS is paired with the US', 'The response is reinforced'], answer: 0, hint: 'Respondent extinction = presenting the CS alone repeatedly, without the US.' },
    { q: 'True or False: Spontaneous recovery also occurs in respondent conditioning after extinction.', type: 'tf', answer: true, hint: 'The CR can reappear temporarily after respondent extinction.' },
  ];
  Q['U8-S6'] = [
    { q: 'Respondent generalization occurs when:', type: 'mc', options: ['The CR is elicited by stimuli similar to the CS', 'Only the exact CS elicits the response', 'No response occurs', 'The response is operant'], answer: 0, hint: 'Stimuli similar to the CS also elicit the CR.' },
    { q: 'Respondent discrimination develops when:', type: 'mc', options: ['Similar stimuli also elicit the response', 'The CR occurs only to the CS and not to other stimuli', 'There is no response', 'All stimuli elicit the response'], answer: 1, hint: 'Discrimination = the response is elicited only by the CS.' },
  ];
  Q['U8-S7'] = [
    { q: 'Which factor strengthens respondent conditioning?', type: 'mc', options: ['More pairings of the CS and US', 'Fewer pairings', 'US presented after CS ends', 'Random pairings'], answer: 0, hint: 'The number of pairings influences the strength of conditioning.' },
    { q: 'A strong contingency between the CS and US (the US reliably follows the CS) makes conditioning:', type: 'mc', options: ['Weaker', 'Stronger', 'Impossible', 'Irrelevant'], answer: 1, hint: 'A reliable relationship between CS and US strengthens conditioning.' },
  ];
  Q['U8-S8'] = [
    { q: 'Operant behavior is controlled by its consequences, whereas respondent behavior is:', type: 'mc', options: ['Elicited by antecedent stimuli', 'Also controlled by consequences', 'Always voluntary', 'Never learned'], answer: 0, hint: 'Respondent behavior is elicited by stimuli; operant behavior is controlled by consequences.' },
    { q: 'Which pair correctly matches the type of conditioning to its defining feature?', type: 'mc', options: ['Operant – elicited by antecedent stimuli; Respondent – controlled by consequences', 'Operant – controlled by consequences; Respondent – elicited by antecedent stimuli', 'Both elicited', 'Both controlled by consequences'], answer: 1, hint: 'Operant = consequences; Respondent = antecedent-elicited reflexes.' },
  ];

  /* ================= CHAPTER 9 ================= */
  Q['U9-S0'] = [
    { q: 'Shaping was famously used to teach a child to speak in the example involving:', type: 'mc', options: ['B. F. Skinner\'s daughter', 'A child with autism named Ricky', 'A dog named Skipper', 'A classroom of monkeys'], answer: 1, hint: 'The classic example involved shaping a child\'s verbal behavior.' },
    { q: 'In shaping, reinforcement is provided for:', type: 'mc', options: ['Only the final target behavior', 'Successive approximations to the target behavior', 'Any behavior', 'Behaviors unrelated to the target'], answer: 1, hint: 'Shaping reinforces successive approximations toward the target.' },
  ];
  Q['U9-S1'] = [
    { q: 'Shaping is defined as:', type: 'mc', options: ['Reinforcing successive approximations of a behavior until the target behavior is achieved', 'Punishing all behavior', 'Teaching a chain of behaviors', 'Modeling a behavior'], answer: 0, hint: 'Shaping = differential reinforcement of successive approximations.' },
    { q: 'True or False: Shaping is used to develop NEW behaviors the person does not currently perform.', type: 'tf', answer: true, hint: 'Shaping develops novel behavior through successive approximations.' },
  ];
  Q['U9-S2'] = [
    { q: 'In one application, shaping was used to help Mrs. F:', type: 'mc', options: ['Walk again after a medical condition', 'Learn to read', 'Stop smoking', 'Speak French'], answer: 0, hint: 'Shaping was used to get Mrs. F to walk again.' },
    { q: 'Shaping can be used to gradually increase the time between bathroom visits — a shaping program to increase:', type: 'mc', options: ['Frequency of behavior', 'Latency or duration between behaviors', 'Intensity', 'Generalization'], answer: 1, hint: 'The program shaped longer intervals between bathroom visits.' },
  ];
  Q['U9-S3'] = [
    { q: 'Research on shaping has shown that it is effective for:', type: 'mc', options: ['Developing new behavior in animals and humans', 'Only animals', 'Only adults', 'Only decreasing behavior'], answer: 0, hint: 'Shaping is effective across species and ages.' },
    { q: 'True or False: Shaping requires that the behavior be reinforced in steps that gradually approach the target.', type: 'tf', answer: true, hint: 'Each successive approximation is reinforced until the next is achieved.' },
  ];
  Q['U9-S4'] = [
    { q: 'The first step in using shaping is to:', type: 'mc', options: ['Reinforce the final behavior', 'Define the target behavior and identify an initial behavior that approximates it', 'Stop all reinforcement', 'Punish approximations'], answer: 1, hint: 'Begin by defining the target and identifying the starting approximation.' },
    { q: 'When shaping, you should reinforce the current approximation and then:', type: 'mc', options: ['Never change the criterion', 'Raise the criterion once the current approximation is well established', 'Lower the criterion', 'Stop reinforcing entirely'], answer: 1, hint: 'Gradually raise the criterion as each approximation is mastered.' },
  ];
  Q['U9-S5'] = [
    { q: 'Shaping of problem behaviors can occur when:', type: 'mc', options: ['Parents gradually reinforce increasingly intense versions of a problem behavior', 'All behavior is ignored', 'Reinforcement is continuous', 'No one notices'], answer: 0, hint: 'Inadvertent shaping can strengthen problem behaviors.' },
    { q: 'True or False: Problem behaviors can be unintentionally shaped through gradual reinforcement.', type: 'tf', answer: true, hint: 'Gradual escalation of reinforcement can shape more intense problems.' },
  ];

  /* ================= CHAPTER 10 ================= */
  Q['U10-S0'] = [
    { q: 'The tee-ball example in Chapter 10 illustrates the use of:', type: 'mc', options: ['Prompting and fading to teach hitting a ball', 'Punishment', 'Shaping a response chain', 'Extinction'], answer: 0, hint: 'Prompts and fading were used to teach tee-ball players to hit.' },
    { q: 'In the example, the coach\'s physical guidance (prompting) was gradually removed — this process is called:', type: 'mc', options: ['Reinforcement', 'Fading', 'Punishment', 'Satiation'], answer: 1, hint: 'Fading = gradually removing the prompt.' },
  ];
  Q['U10-S1'] = [
    { q: 'A prompt is:', type: 'mc', options: ['An extra antecedent stimulus provided to increase the likelihood of the correct response', 'A consequence that punishes', 'A type of reinforcement schedule', 'A permanent product'], answer: 0, hint: 'Prompts are supplemental antecedent stimuli that help the correct response occur.' },
    { q: 'True or False: Prompts are used during acquisition of a behavior and should be faded over time.', type: 'tf', answer: true, hint: 'Prompts are temporary; the goal is transfer to natural cues.' },
  ];
  Q['U10-S2'] = [
    { q: 'Fading is the procedure of:', type: 'mc', options: ['Adding more prompts', 'Gradually removing or changing a prompt until it no longer is present', 'Punishing prompted responses', 'Reinforcing unprompted behavior only'], answer: 1, hint: 'Fading = gradually eliminating the prompt.' },
    { q: 'True or False: Fading ensures that the behavior is controlled by the natural SD, not the prompt.', type: 'tf', answer: true, hint: 'Fading transfers stimulus control from the prompt to the natural cue.' },
  ];
  Q['U10-S3'] = [
    { q: 'Response prompts include:', type: 'mc', options: ['Verbal instructions, modeling, and physical guidance', 'Changing the color of a stimulus', 'Highlighting features of the SD', 'Adding more reinforcers'], answer: 0, hint: 'Response prompts involve the behavior of another person (verbal, modeling, physical).' },
    { q: 'Stimulus prompts include:', type: 'mc', options: ['Physical guidance', 'Changing or exaggerating a feature of the stimulus (e.g., making it brighter or bolder)', 'Verbal instructions', 'Modeling'], answer: 1, hint: 'Stimulus prompts alter the physical characteristics of the SD.' },
  ];
  Q['U10-S4'] = [
    { q: 'Prompt fading involves:', type: 'mc', options: ['Removing response prompts gradually', 'Adding more prompts', 'Never removing prompts', 'Punishing prompts'], answer: 0, hint: 'Fading = gradually removing response prompts.' },
    { q: 'In prompt delay, the prompt is:', type: 'mc', options: ['Presented immediately every time', 'Delayed for a brief period so the natural SD can control the response', 'Never used', 'Removed permanently on the first trial'], answer: 1, hint: 'Prompt delay gives the learner a chance to respond before the prompt.' },
    { q: 'Stimulus fading involves:', type: 'mc', options: ['Gradually changing the stimulus prompt until it matches the natural SD', 'Removing the SD', 'Adding response prompts', 'Using only verbal prompts'], answer: 0, hint: 'The exaggerated stimulus feature is gradually reduced.' },
  ];
  Q['U10-S5'] = [
    { q: 'When using prompting and fading, the first step is to:', type: 'mc', options: ['Define the target behavior and choose the most appropriate prompt', 'Punish all errors', 'Remove all cues', 'Reinforce random behavior'], answer: 0, hint: 'Begin by defining the behavior and choosing the prompt.' },
    { q: 'During fading, reinforcement should be delivered for:', type: 'mc', options: ['Prompted responses only', 'Responses that occur without prompts', 'All responses', 'Only errors'], answer: 1, hint: 'Unprompted (correct) responses are reinforced as the prompt fades.' },
  ];
  Q['U10-S6'] = [
    { q: 'Prompting and fading are widely used in treatment for children with:', type: 'mc', options: ['Autism spectrum disorder', 'Broken bones', 'Vision loss only', 'No conditions'], answer: 0, hint: 'Prompting and transfer procedures are central in autism treatment.' },
    { q: 'True or False: Transfer of stimulus control from prompts to natural stimuli is an important goal of teaching.', type: 'tf', answer: true, hint: 'Behavior should come under control of natural cues.' },
  ];
  Q['U10-S7'] = [
    { q: 'In verbal behavior terms, a request ("I want water") controlled by deprivation is a:', type: 'mc', options: ['Tact', 'Mand', 'Echoic', 'Intraverbal'], answer: 1, hint: 'A mand is a verbal response controlled by a motivating operation (e.g., deprivation).' },
    { q: 'Labeling an object you see ("That is a dog") is a:', type: 'mc', options: ['Mand', 'Tact', 'Echoic', 'Intraverbal'], answer: 1, hint: 'A tact is a verbal response under the control of a nonverbal stimulus.' },
    { q: 'Repeating what someone says is a(n):', type: 'mc', options: ['Mand', 'Tact', 'Echoic', 'Intraverbal'], answer: 2, hint: 'An echoic is a vocal imitation of a verbal stimulus.' },
    { q: 'Answering a question ("What is your name?") involves a(n):', type: 'mc', options: ['Mand', 'Tact', 'Echoic', 'Intraverbal'], answer: 3, hint: 'An intraverbal is controlled by other verbal stimuli without point-to-point correspondence.' },
  ];

  /* ================= CHAPTER 11 ================= */
  Q['U11-S0'] = [
    { q: 'A behavioral chain is:', type: 'mc', options: ['A sequence of behaviors where each response produces a stimulus that serves as an SD for the next', 'A single reinforced response', 'A type of punishment', 'An unconditioned reflex'], answer: 0, hint: 'Chains are sequences of stimulus–response links.' },
    { q: 'In a behavioral chain, each response produces:', type: 'mc', options: ['Nothing', 'A stimulus change that functions as a conditioned reinforcer and an SD for the next response', 'Only punishment', 'Only a primary reinforcer'], answer: 1, hint: 'Each response produces a stimulus that reinforces the prior response and cues the next.' },
  ];
  Q['U11-S1'] = [
    { q: 'Analyzing a stimulus–response chain involves:', type: 'mc', options: ['Identifying each S–R link in the sequence', 'Counting reinforcers', 'Measuring response latency only', 'Removing links'], answer: 0, hint: 'Chain analysis breaks the behavior into its component S–R links.' },
    { q: 'True or False: A chain analysis is used to identify where to teach and what each link looks like.', type: 'tf', answer: true, hint: 'The analysis identifies each component for teaching.' },
  ];
  Q['U11-S2'] = [
    { q: 'A task analysis:', type: 'mc', options: ['Breaks a complex skill into its component behaviors or steps', 'Is a type of graph', 'Is a reinforcement schedule', 'Measures IOA'], answer: 0, hint: 'A task analysis lists all the steps in a task.' },
    { q: 'True or False: Task analyses are typically developed by observing a competent individual perform the task.', type: 'tf', answer: true, hint: 'Observation of skilled performance guides the task analysis.' },
  ];
  Q['U11-S3'] = [
    { q: 'In backward chaining, teaching begins with:', type: 'mc', options: ['The first step of the chain', 'The last step of the chain', 'The middle step', 'All steps at once'], answer: 1, hint: 'Backward chaining teaches the final step first.' },
    { q: 'An advantage of backward chaining is that:', type: 'mc', options: ['The learner completes the chain each trial and contacts the natural reinforcer', 'It is easier for the teacher', 'It never requires prompts', 'It uses no reinforcers'], answer: 0, hint: 'Each trial ends with the learner completing the chain and receiving reinforcement.' },
  ];
  Q['U11-S4'] = [
    { q: 'In forward chaining, teaching begins with:', type: 'mc', options: ['The last step', 'The first step of the chain', 'A middle step', 'No steps'], answer: 1, hint: 'Forward chaining teaches the first step first.' },
    { q: 'True or False: In forward chaining, after each step is mastered, the next step in the chain is taught.', type: 'tf', answer: true, hint: 'Steps are added one at a time in order.' },
  ];
  Q['U11-S5'] = [
    { q: 'In total task presentation, the learner:', type: 'mc', options: ['Practices the entire chain from start to finish on each trial', 'Practices one step at a time', 'Only watches a model', 'Never receives prompts'], answer: 0, hint: 'Total task training involves the whole chain each trial.' },
    { q: 'Total task presentation is often used when:', type: 'mc', options: ['The learner can already do most steps', 'The learner has no skills', 'The chain is very long and complex', 'No reinforcers are available'], answer: 0, hint: 'It works well when most links are already in the repertoire.' },
  ];
  Q['U11-S6'] = [
    { q: 'Which of the following is another strategy for teaching behavioral chains?', type: 'mc', options: ['Written task analyses, picture prompts, video modeling, and self-instructions', 'Extinction', 'Shaping alone', 'Punishment'], answer: 0, hint: 'Written, pictorial, video, and self-instruction strategies support chaining.' },
    { q: 'Using a written checklist of steps is an example of a:', type: 'mc', options: ['Written task analysis', 'Video model', 'Picture prompt', 'Self-instruction'], answer: 0, hint: 'The learner follows a written list of the steps.' },
  ];
  Q['U11-S7'] = [
    { q: 'When using chaining procedures, you should first:', type: 'mc', options: ['Conduct a task analysis of the chain', 'Punish errors', 'Remove all prompts', 'Skip the last step'], answer: 0, hint: 'A task analysis of the chain comes first.' },
    { q: 'True or False: In chaining, prompts and fading are often used to help the learner perform each step.', type: 'tf', answer: true, hint: 'Prompts are used to evoke each link and then faded.' },
  ];

  /* ================= CHAPTER 12 ================= */
  Q['U12-S0'] = [
    { q: 'The BST procedure was used to teach Marcia to:', type: 'mc', options: ['Say "no" assertively to unreasonable requests from professors', 'Run a marathon', 'Speak Spanish', 'Manage money'], answer: 0, hint: 'BST was used to teach assertive refusal skills.' },
    { q: 'BST was used to teach children to:', type: 'mc', options: ['Protect themselves from abduction', 'Play chess', 'Cook meals', 'Do laundry'], answer: 0, hint: 'Children were taught safety skills to resist abduction.' },
  ];
  Q['U12-S1'] = [
    { q: 'The four components of Behavioral Skills Training are:', type: 'mc', options: ['Instructions, modeling, rehearsal, and feedback', 'Prompting, fading, chaining, shaping', 'Reinforcement, punishment, extinction, shaping', 'Observation, note-taking, testing, grading'], answer: 0, hint: 'BST = instruction, modeling, rehearsal, feedback.' },
    { q: 'True or False: BST procedures combine antecedent (instructions, modeling) and consequence (feedback) components.', type: 'tf', answer: true, hint: 'BST uses antecedents and consequences together.' },
  ];
  Q['U12-S2'] = [
    { q: 'During the modeling component of BST, the learner:', type: 'mc', options: ['Watches someone demonstrate the correct behavior', 'Only listens to verbal rules', 'Practices immediately', 'Is punished for errors'], answer: 0, hint: 'Modeling provides a demonstration of correct performance.' },
    { q: 'Instructions in BST are:', type: 'mc', options: ['Verbal descriptions of the behavior and why it is important', 'Always unnecessary', 'The only component needed', 'A type of punishment'], answer: 0, hint: 'Instructions describe the skill and its rationale.' },
  ];
  Q['U12-S3'] = [
    { q: 'Rehearsal in BST involves:', type: 'mc', options: ['The learner practicing the behavior in a role-play situation', 'Only thinking about the behavior', 'Watching a video', 'Reading about the skill'], answer: 0, hint: 'Rehearsal = the learner practices the skill.' },
    { q: 'Feedback in BST should include:', type: 'mc', options: ['Praise for correct performance and specific correction for errors', 'Only criticism', 'Only praise', 'No information'], answer: 0, hint: 'Feedback = positive reinforcement plus correction of errors.' },
  ];
  Q['U12-S4'] = [
    { q: 'To enhance generalization after BST, trainers often:', type: 'mc', options: ['Conduct training across different people, settings, and situations', 'Never change the training setting', 'Use only one trainer', 'Stop rehearsing'], answer: 0, hint: 'Varying training contexts promotes generalization.' },
    { q: 'True or False: Generalization after BST should be planned and programmed, not assumed.', type: 'tf', answer: true, hint: 'Generalization strategies must be programmed explicitly.' },
  ];
  Q['U12-S5'] = [
    { q: 'In situ assessment involves:', type: 'mc', options: ['Assessing the skill in the natural environment without the person knowing they are being tested', 'Assessing in the classroom only', 'Self-report of skill', 'Written exams'], answer: 0, hint: 'In situ = natural situation, unannounced.' },
    { q: 'In situ training:', type: 'mc', options: ['Provides BST in the natural environment when a skill failure is detected', 'Is done only in the lab', 'Uses no feedback', 'Is a written test'], answer: 0, hint: 'When in situ assessment reveals failure, training is delivered on the spot.' },
  ];
  Q['U12-S6'] = [
    { q: 'BST relates to the three-term contingency because:', type: 'mc', options: ['Instructions and modeling are antecedents; rehearsal and feedback provide practice and consequences', 'It has no relation', 'It only uses consequences', 'It is a schedule'], answer: 0, hint: 'BST arranges antecedents (instruction, modeling) and consequences (feedback).' },
    { q: 'True or False: In BST, the role-play scenarios should be similar to real situations the learner will face.', type: 'tf', answer: true, hint: 'Rehearsal in realistic scenarios improves performance.' },
  ];
  Q['U12-S7'] = [
    { q: 'BST can be implemented in groups when:', type: 'mc', options: ['Several learners need the same skill and role-play in small groups', 'Only one learner is present', 'No feedback is given', 'Learners never practice'], answer: 0, hint: 'Group BST is efficient and effective for shared skills.' },
    { q: 'True or False: BST is used to teach skills like interview skills, self-protection, and social skills.', type: 'tf', answer: true, hint: 'BST has broad applications across skill domains.' },
  ];
  Q['U12-S8'] = [
    { q: 'When using BST, the first step is typically to:', type: 'mc', options: ['Identify the skill, define it, and identify the training setting', 'Punish mistakes', 'Remove all prompts', 'Test without teaching'], answer: 0, hint: 'Identify and define the target skill first.' },
    { q: 'True or False: In BST, the learner should rehearse the skill multiple times and receive feedback on each trial.', type: 'tf', answer: true, hint: 'Repetition with feedback builds fluency.' },
  ];

  /* ================= CHAPTER 13 ================= */
  Q['U13-S0'] = [
    { q: 'Functional assessment was used in the chapter examples to understand the behavior of:', type: 'mc', options: ['Jacob and Anna', 'Willy and Sammy', 'Mrs. F and Mrs. S', 'Marcia and Claire'], answer: 0, hint: 'Jacob and Anna were the chapter-opening examples.' },
    { q: 'True or False: Functional assessment is used to identify why a problem behavior occurs.', type: 'tf', answer: true, hint: 'It identifies the purpose/function of the behavior.' },
  ];
  Q['U13-S1'] = [
    { q: 'Functional assessment is best defined as:', type: 'mc', options: ['A process for gathering information about the antecedents and consequences of a problem behavior to determine its function', 'A punishment procedure', 'A type of reinforcement', 'A labeling system'], answer: 0, hint: 'It identifies the functional relationship between behavior and environment.' },
    { q: 'True or False: The goal of functional assessment is to determine the function (purpose) of the problem behavior.', type: 'tf', answer: true, hint: 'Knowing the function guides effective intervention.' },
  ];
  Q['U13-S2'] = [
    { q: 'A behavior maintained by social positive reinforcement occurs because it produces:', type: 'mc', options: ['Attention or access to preferred items from others', 'Removal of tasks', 'Automatic sensory stimulation', 'Escape from demands'], answer: 0, hint: 'Social positive reinforcement = attention or tangibles.' },
    { q: 'A behavior maintained by social negative reinforcement occurs because it produces:', type: 'mc', options: ['Attention', 'Escape from or avoidance of aversive social situations or tasks', 'Food', 'Sensory input'], answer: 1, hint: 'Social negative reinforcement = escape from aversive social events.' },
    { q: 'Automatic positive reinforcement means the behavior produces reinforcement:', type: 'mc', options: ['Directly, without involving another person (e.g., sensory stimulation)', 'Only through other people', 'From the teacher', 'From money'], answer: 0, hint: 'Automatic reinforcement is independent of the social environment.' },
    { q: 'Automatic negative reinforcement means the behavior produces:', type: 'mc', options: ['Attention', 'Removal of an aversive stimulation directly (e.g., scratching an itch)', 'Social praise', 'Tangible items'], answer: 1, hint: 'The behavior removes an aversive event automatically.' },
  ];
  Q['U13-S3'] = [
    { q: 'Indirect functional assessment methods include:', type: 'mc', options: ['Interviews, questionnaires, and rating scales', 'Direct observation', 'Functional analysis', 'Videotaping'], answer: 0, hint: 'Indirect methods rely on reports rather than observation.' },
    { q: 'True or False: Indirect assessment relies on the reports of the person or others who know them, not direct observation.', type: 'tf', answer: true, hint: 'Interviews and questionnaires are indirect.' },
  ];
  Q['U13-S4'] = [
    { q: 'Direct observation methods for functional assessment involve:', type: 'mc', options: ['Observing and recording the behavior and environmental events as they occur', 'Asking the person questions', 'Rating scales only', 'File reviews'], answer: 0, hint: 'Direct observation captures antecedents, behavior, and consequences in real time.' },
    { q: 'An ABC observation records:', type: 'mc', options: ['Antecedent, behavior, and consequence', 'Age, behavior, condition', 'All behaviors continuously', 'Attitudes, beliefs, concerns'], answer: 0, hint: 'ABC = Antecedent–Behavior–Consequence.' },
  ];
  Q['U13-S5'] = [
    { q: 'A functional analysis involves:', type: 'mc', options: ['Experimentally manipulating environmental events to determine the function of behavior', 'Only interviewing caregivers', 'Observing without manipulation', 'Labeling behavior'], answer: 0, hint: 'Functional analysis is an experimental method.' },
    { q: 'In a functional analysis, different conditions (e.g., attention, escape, alone, play) are compared to see which:', type: 'mc', options: ['Produces the highest rate of the problem behavior', 'Produces the most attention', 'Is easiest', 'Has the most staff'], answer: 0, hint: 'The condition with the highest rates reveals the function.' },
  ];
  Q['U13-S6'] = [
    { q: 'True or False: Functional analysis research demonstrates a causal (functional) relationship between environmental events and behavior.', type: 'tf', answer: true, hint: 'Experimental manipulation establishes causation.' },
    { q: 'Functional analysis is generally considered the most rigorous assessment method because it:', type: 'mc', options: ['Involves experimental manipulation', 'Is the quickest', 'Requires no training', 'Is subjective'], answer: 0, hint: 'Experimentation provides the strongest evidence of function.' },
  ];
  Q['U13-S7'] = [
    { q: 'The steps of a functional assessment typically begin with:', type: 'mc', options: ['Indirect assessment, then direct observation, and possibly functional analysis', 'Functional analysis first', 'Punishment', 'No assessment'], answer: 0, hint: 'Assessment proceeds from indirect to direct to experimental methods.' },
    { q: 'True or False: The results of a functional assessment should be used to design a functional intervention.', type: 'tf', answer: true, hint: 'Function-based interventions are more effective.' },
  ];
  Q['U13-S8'] = [
    { q: 'A functional intervention:', type: 'mc', options: ['Alters the antecedents and consequences identified in the functional assessment', 'Punishes all behavior equally', 'Ignores the function', 'Uses only medication'], answer: 0, hint: 'Functional interventions address the identified function.' },
    { q: 'True or False: Understanding the function of behavior allows you to arrange an alternative, appropriate behavior that serves the same function.', type: 'tf', answer: true, hint: 'Teach a functionally equivalent replacement behavior.' },
  ];

  /* ================= CHAPTER 14 ================= */
  Q['U14-S0'] = [
    { q: 'The chapter opens with the case of Willy, whose problem behavior was:', type: 'mc', options: ['Crying and tantrums maintained by attention', 'Excessive studying', 'Refusing food', 'Running away'], answer: 0, hint: 'Willy\'s tantrums were reinforced by parental attention.' },
    { q: 'True or False: In Willy\'s case, extinction involved the parents no longer giving attention following the tantrums.', type: 'tf', answer: true, hint: 'Withholding the reinforcer (attention) is extinction.' },
  ];
  Q['U14-S1'] = [
    { q: 'To use extinction to decrease a problem behavior, you must first:', type: 'mc', options: ['Collect data and identify the reinforcer maintaining the behavior', 'Punish the behavior', 'Reinforce the behavior', 'Remove all reinforcers'], answer: 0, hint: 'Identify the reinforcer through functional assessment, then withhold it.' },
    { q: 'In extinction, the reinforcer must be:', type: 'mc', options: ['Withheld after each instance of the behavior', 'Delivered immediately', 'Increased', 'Delivered intermittently'], answer: 0, hint: 'The reinforcer is eliminated after each occurrence.' },
  ];
  Q['U14-S2'] = [
    { q: 'The schedule of reinforcement before extinction matters because:', type: 'mc', options: ['Intermittently reinforced behavior is more resistant to extinction', 'It has no effect', 'Continuous reinforcement is more resistant', 'Schedules are irrelevant'], answer: 0, hint: 'Partial reinforcement produces greater resistance to extinction.' },
    { q: 'True or False: A behavior reinforced on a continuous schedule will typically extinguish more quickly than one on an intermittent schedule.', type: 'tf', answer: true, hint: 'Intermittent schedules build greater persistence.' },
  ];
  Q['U14-S3'] = [
    { q: 'When using extinction, it is important to also:', type: 'mc', options: ['Reinforce alternative (appropriate) behaviors', 'Punish alternative behaviors', 'Ignore everything', 'Never use reinforcement'], answer: 0, hint: 'Reinforcing appropriate alternatives speeds behavior change.' },
    { q: 'True or False: Combining extinction with differential reinforcement of alternative behavior is often recommended.', type: 'tf', answer: true, hint: 'Reinforce the desirable behavior while extinguishing the problem.' },
  ];
  Q['U14-S4'] = [
    { q: 'To promote generalization and maintenance of the effects of extinction, you should:', type: 'mc', options: ['Withhold the reinforcer consistently across settings and time', 'Reinforce the problem behavior occasionally', 'Stop all treatment', 'Use punishment only'], answer: 0, hint: 'Consistency across settings promotes generalization.' },
    { q: 'True or False: All caregivers must implement extinction consistently or the behavior may be intermittently reinforced.', type: 'tf', answer: true, hint: 'Inconsistent extinction can strengthen the behavior.' },
  ];
  Q['U14-S5'] = [
    { q: 'Research evaluating the use of extinction has found that it:', type: 'mc', options: ['Effectively decreases problem behaviors, often with an initial extinction burst', 'Never works', 'Always increases behavior', 'Is never used alone'], answer: 0, hint: 'Extinction is effective but often shows a burst first.' },
    { q: 'True or False: Extinction should be implemented without considering its side effects, such as extinction bursts.', type: 'tf', answer: false, hint: 'Plan for bursts and emotional reactions.' },
  ];

  /* ================= CHAPTER 15 ================= */
  Q['U15-S0'] = [
    { q: 'Differential reinforcement of alternative behavior (DRA) involves:', type: 'mc', options: ['Reinforcing an appropriate alternative behavior while withholding reinforcement for the problem behavior', 'Punishing the alternative', 'Reinforcing the problem behavior', 'Ignoring all behavior'], answer: 0, hint: 'DRA = reinforce an alternative, appropriate behavior; extinguish the problem behavior.' },
    { q: 'The chapter example "Getting Mrs. Williams to Be Positive" used DRA to increase:', type: 'mc', options: ['Compliments instead of criticisms', 'Work productivity', 'Exercise', 'Sleep'], answer: 0, hint: 'Compliments (alternative) were reinforced while criticisms were ignored.' },
  ];
  Q['U15-S1'] = [
    { q: 'A variation of DRA that involves reinforcing a functionally equivalent behavior is:', type: 'mc', options: ['DRL', 'DRO', 'Functional communication training (FCT)', 'Differential reinforcement of high rates'], answer: 2, hint: 'FCT teaches a communication response that serves the same function as the problem behavior.' },
    { q: 'True or False: In DRA, the alternative behavior must be reinforced while the problem behavior is placed on extinction.', type: 'tf', answer: true, hint: 'That is the essence of DRA.' },
    { q: 'Differential negative reinforcement of alternative behavior is used when the problem behavior is maintained by:', type: 'mc', options: ['Negative reinforcement (escape)', 'Positive reinforcement only', 'Automatic reinforcement', 'Nothing'], answer: 0, hint: 'The alternative behavior produces escape, and the problem behavior no longer does.' },
  ];
  Q['U15-S2'] = [
    { q: 'In DRO (differential reinforcement of other behavior), reinforcement is delivered:', type: 'mc', options: ['When the problem behavior has not occurred for a specific interval of time', 'After every problem behavior', 'For an alternative behavior only', 'Randomly'], answer: 0, hint: 'DRO delivers reinforcement for the absence of the problem behavior during an interval.' },
    { q: 'In DRO, if the problem behavior occurs during the interval, the interval:', type: 'mc', options: ['Is reset (reinforcement is not delivered)', 'Continues normally', 'Ends with reinforcement', 'Is doubled'], answer: 0, hint: 'The interval resets when the problem behavior occurs.' },
  ];
  Q['U15-S3'] = [
    { q: 'Differential reinforcement of low rates of responding (DRL) is used to:', type: 'mc', options: ['Decrease the rate of a behavior to a low but acceptable level', 'Eliminate the behavior entirely', 'Increase behavior', 'Punish behavior'], answer: 0, hint: 'DRL reduces behavior to a low rate, not necessarily zero.' },
    { q: 'In spaced-responding DRL, reinforcement is delivered when:', type: 'mc', options: ['A behavior occurs after a minimum interval since the last response', 'The behavior occurs rapidly', 'The behavior never occurs', 'Any response occurs'], answer: 0, hint: 'Responses must be spaced apart to be reinforced.' },
  ];
  Q['U15-S4'] = [
    { q: 'DRO and spaced-responding DRL differ because:', type: 'mc', options: ['DRO reinforces the absence of behavior for a whole interval; DRL reinforces responses separated by a minimum interval', 'They are identical', 'DRO increases behavior', 'DRL eliminates all behavior'], answer: 0, hint: 'DRO = no response for interval; DRL = responses spaced in time.' },
    { q: 'True or False: When implementing DRL, the criterion for acceptable rate is gradually changed.', type: 'tf', answer: true, hint: 'The criterion is gradually adjusted to reach the target rate.' },
  ];

  /* ================= CHAPTER 16 ================= */
  Q['U16-S0'] = [
    { q: 'The chapter example "Getting Marianne to Study More" is an antecedent intervention that:', type: 'mc', options: ['Arranged cues and reduced response effort for studying', 'Punished procrastination', 'Used only consequences', 'Changed her personality'], answer: 0, hint: 'Antecedents were rearranged to increase studying.' },
    { q: 'The example "Getting Cal to Eat Right" manipulated antecedents by:', type: 'mc', options: ['Making healthy foods more available and decreasing the effort to prepare them', 'Punishing junk food only', 'Adding rewards', 'Using medication'], answer: 0, hint: 'Antecedents like food availability were rearranged.' },
  ];
  Q['U16-S1'] = [
    { q: 'Antecedent interventions involve:', type: 'mc', options: ['Modifying the environment before the behavior occurs to alter its likelihood', 'Delivering consequences after behavior', 'Only punishment', 'Only reinforcement'], answer: 0, hint: 'Antecedent interventions change the antecedents that influence behavior.' },
    { q: 'True or False: Antecedent interventions can be used to increase desirable behavior and decrease undesirable behavior.', type: 'tf', answer: true, hint: 'They work both ways.' },
  ];
  Q['U16-S2'] = [
    { q: 'Presenting the SD or cues for the desired behavior means:', type: 'mc', options: ['Making discriminative stimuli for the desired behavior more available/prominent', 'Removing all cues', 'Punishing behavior', 'Reinforcing all responses'], answer: 0, hint: 'Increase the salience/availability of the SD for the desirable behavior.' },
    { q: 'Removing the SD or cues for undesirable behaviors means:', type: 'mc', options: ['Making the discriminative stimuli for the problem behavior less available or prominent', 'Adding more cues', 'Reinforcing the problem behavior', 'Ignoring everything'], answer: 0, hint: 'Eliminate cues that set the occasion for the problem behavior.' },
  ];
  Q['U16-S3'] = [
    { q: 'Arranging an establishing operation for the desirable behavior:', type: 'mc', options: ['Increases the value of its reinforcer (making the behavior more likely)', 'Decreases the value of its reinforcer', 'Has no effect', 'Punishes the behavior'], answer: 0, hint: 'EOs increase the value of reinforcers for desirable behavior.' },
    { q: 'Presenting an abolishing operation for an undesirable behavior:', type: 'mc', options: ['Decreases the value of the reinforcer maintaining the problem behavior', 'Increases it', 'Has no effect', 'Adds punishment'], answer: 0, hint: 'AOs decrease the value of reinforcers for the problem behavior.' },
  ];
  Q['U16-S4'] = [
    { q: 'Decreasing response effort for the desirable behavior means making the behavior:', type: 'mc', options: ['Easier to perform (less effort)', 'Harder to perform', 'Impossible', 'Unrelated to antecedents'], answer: 0, hint: 'Lower effort = more likely behavior.' },
    { q: 'Increasing the response effort for undesirable behaviors means:', type: 'mc', options: ['Making the problem behavior harder to perform', 'Making it easier', 'Reinforcing it', 'Ignoring it'], answer: 0, hint: 'Higher effort = less likely problem behavior.' },
  ];
  Q['U16-S5'] = [
    { q: 'Research on antecedent interventions has shown that manipulating discriminative stimuli, response effort, and motivating operations can:', type: 'mc', options: ['Effectively change behavior without consequences', 'Never change behavior', 'Only work in labs', 'Require punishment'], answer: 0, hint: 'Antecedent manipulations are effective alone in many cases.' },
    { q: 'True or False: Antecedent interventions can be combined with consequence-based procedures for best results.', type: 'tf', answer: true, hint: 'Combining strategies is often most effective.' },
  ];
  Q['U16-S6'] = [
    { q: 'To use antecedent interventions, you should first:', type: 'mc', options: ['Analyze the three-term contingency for both the desirable and undesirable behaviors', 'Punish the problem', 'Remove all stimuli', 'Reinforce everything'], answer: 0, hint: 'The three-term contingency analysis guides antecedent changes.' },
    { q: 'Functional interventions for problem behaviors are based on:', type: 'mc', options: ['The function identified in a functional assessment', 'Random choice', 'Trial and error with punishment', 'Personal opinion'], answer: 0, hint: 'Function-based antecedent interventions target the identified function.' },
  ];

  /* ================= CHAPTER 17 ================= */
  Q['U17-S0'] = [
    { q: 'Time-out is a procedure in which:', type: 'mc', options: ['Access to reinforcement is removed for a brief period following a behavior', 'A child is sent to bed', 'Reinforcement is increased', 'Physical punishment is used'], answer: 0, hint: 'Time-out = removal of access to reinforcement following the behavior.' },
    { q: 'True or False: Time-out is a form of negative punishment.', type: 'tf', answer: true, hint: 'A reinforcing stimulus (access to reinforcement) is removed.' },
  ];
  Q['U17-S1'] = [
    { q: 'The two basic types of time-out are:', type: 'mc', options: ['Exclusionary and nonexclusionary (inclusionary)', 'Physical and verbal', 'Short and long', 'Group and individual'], answer: 0, hint: 'Time-out can exclude the person from the reinforcing setting or not.' },
    { q: 'In nonexclusionary (inclusionary) time-out:', type: 'mc', options: ['The person remains in the setting but is denied reinforcement (e.g., observing only)', 'The person is removed from the room', 'The person is isolated for hours', 'No procedure occurs'], answer: 0, hint: 'Nonexclusionary time-out keeps the person present but removes reinforcement.' },
  ];
  Q['U17-S2'] = [
    { q: 'When using time-out, it is essential to:', type: 'mc', options: ['Provide reinforcement for appropriate behavior and ensure the time-out setting is nonreinforcing', 'Make the time-out setting fun', 'Never use reinforcement', 'Extend time-out for hours'], answer: 0, hint: 'Reinforce appropriate behavior and keep the time-out environment dull.' },
    { q: 'True or False: Time-out works best when the environment the person leaves is reinforcing.', type: 'tf', answer: true, hint: 'Time-out is effective when the person loses access to reinforcement.' },
  ];
  Q['U17-S3'] = [
    { q: 'Considerations in using time-out include:', type: 'mc', options: ['The duration (typically a few minutes), the need to explain the rule, and consistency', 'Using it for hours', 'Never explaining the rule', 'Applying it randomly'], answer: 0, hint: 'Short durations, clear rules, and consistency matter.' },
    { q: 'True or False: Time-out should not be used if the person\'s behavior is maintained by escape, because time-out may provide escape.', type: 'tf', answer: true, hint: 'For escape-maintained behavior, time-out could be reinforcing.' },
  ];
  Q['U17-S4'] = [
    { q: 'Response cost involves:', type: 'mc', options: ['Removing a specified amount of a reinforcer after a behavior occurs', 'Adding a reinforcer', 'Removing the person', 'Physical punishment'], answer: 0, hint: 'Response cost = loss of a reinforcer following the behavior.' },
    { q: 'A child loses points for each instance of a problem behavior, and the behavior decreases. This is:', type: 'mc', options: ['Response cost', 'Extinction', 'Shaping', 'Reinforcement'], answer: 0, hint: 'Losing reinforcers contingent on behavior = response cost.' },
  ];
  Q['U17-S5'] = [
    { q: 'Which statement correctly compares response cost and time-out?', type: 'mc', options: ['Response cost removes a reinforcer; time-out removes access to reinforcement', 'They are identical', 'Both add aversives', 'Time-out is reinforcement'], answer: 0, hint: 'Response cost = loss of reinforcers; time-out = loss of access to reinforcement.' },
    { q: 'Extinction differs from response cost because extinction:', type: 'mc', options: ['Withholds the reinforcer maintaining the behavior, while response cost removes reinforcers contingently', 'Uses punishment', 'Is reinforcement', 'Is identical to time-out'], answer: 0, hint: 'Extinction targets the maintaining reinforcer directly.' },
  ];
  Q['U17-S6'] = [
    { q: 'Considerations in using response cost include:', type: 'mc', options: ['Ensuring the person has enough reinforcers, using it with reinforcement, and avoiding excessive losses', 'Taking everything at once', 'Never combining with reinforcement', 'Using large fines always'], answer: 0, hint: 'Response cost is best used alongside reinforcement with moderate fines.' },
    { q: 'Research evaluating response cost has shown it is:', type: 'mc', options: ['An effective procedure for decreasing behavior, especially when combined with reinforcement', 'Never effective', 'Only for animals', 'Identical to extinction'], answer: 0, hint: 'Response cost is effective, particularly with reinforcement.' },
  ];

  /* ================= CHAPTER 18 ================= */
  Q['U18-S0'] = [
    { q: 'Punishment by application of aversive activities includes procedures such as:', type: 'mc', options: ['Overcorrection and contingent exercise', 'Time-out', 'Response cost', 'Extinction'], answer: 0, hint: 'Overcorrection and contingent exercise are positive punishment procedures.' },
    { q: 'In overcorrection, the person:', type: 'mc', options: ['Must correct the effects of the misbehavior and practice appropriate behavior', 'Is removed from the room', 'Loses points', 'Is praised'], answer: 0, hint: 'Overcorrection = restitution plus positive practice.' },
  ];
  Q['U18-S1'] = [
    { q: 'Positive punishment is described as a treatment of last resort because:', type: 'mc', options: ['Reinforcement-based procedures should be tried first and positive punishment has side effects', 'It never works', 'It is expensive', 'It is illegal'], answer: 0, hint: 'Positive reinforcement procedures are preferred and tried first.' },
    { q: 'True or False: Before using positive punishment, alternative reinforcement-based procedures should be implemented.', type: 'tf', answer: true, hint: 'Least intrusive, reinforcement-based approaches come first.' },
  ];
  Q['U18-S2'] = [
    { q: 'Considerations in using positive punishment include:', type: 'mc', options: ['Immediacy, contingencies, reinforcer availability, and monitoring side effects', 'Using it without consequences', 'Delaying punishment', 'Ignoring the behavior'], answer: 0, hint: 'Like other procedures, immediacy and contingency matter, plus safeguards.' },
    { q: 'True or False: Positive punishment should be implemented only after careful analysis and supervision.', type: 'tf', answer: true, hint: 'Punishment requires careful oversight.' },
  ];
  Q['U18-S3'] = [
    { q: 'The ethics of punishment require:', type: 'mc', options: ['Informed consent, prior attempts at alternative treatments, and recipient safety', 'Never documenting decisions', 'Using punishment first', 'No peer review'], answer: 0, hint: 'Ethical guidelines require consent, alternatives, and safety.' },
    { q: 'When punishment is considered, the severity of the problem must be:', type: 'mc', options: ['Balanced against the intrusiveness and side effects of the procedure', 'Ignored', 'The only consideration', 'Kept secret'], answer: 0, hint: 'Problem severity must justify the procedure.' },
  ];
  Q['U18-S4'] = [
    { q: 'Proper training and supervision for punishment procedures are needed to ensure:', type: 'mc', options: ['Correct implementation and safety', 'No one observes', 'Faster punishment', 'More punishment'], answer: 0, hint: 'Trained, supervised implementation prevents misuse.' },
    { q: 'Peer review of punishment programs:', type: 'mc', options: ['Provides an independent check on the appropriateness of the procedure', 'Is optional and rare', 'Is only for research', 'Slows everything down unnecessarily'], answer: 0, hint: 'Peer review is an important safeguard.' },
  ];
  Q['U18-S5'] = [
    { q: 'Accountability in the use of punishment means:', type: 'mc', options: ['Monitoring the procedure, the data, and the recipients to prevent misuse and overuse', 'Never recording data', 'Using punishment freely', 'Avoiding supervision'], answer: 0, hint: 'Ongoing data collection and review prevent misuse.' },
    { q: 'True or False: Documentation and ongoing data collection are essential when punishment procedures are used.', type: 'tf', answer: true, hint: 'Accountability requires data.' },
  ];

  /* ================= CHAPTER 19 ================= */
  Q['U19-S0'] = [
    { q: 'Generalization programming aims to ensure that behavior change:', type: 'mc', options: ['Occurs in relevant settings and persists beyond training', 'Only happens in the training room', 'Never persists', 'Is temporary'], answer: 0, hint: 'Generalization programming extends change to natural settings.' },
    { q: 'True or False: Generalization should be actively programmed rather than assumed.', type: 'tf', answer: true, hint: 'The "train and hope" approach is not recommended.' },
  ];
  Q['U19-S1'] = [
    { q: 'Generalization is defined as:', type: 'mc', options: ['The occurrence of a behavior in settings or situations where it was not directly trained', 'Behavior occurring only in training', 'A reinforcement schedule', 'A type of punishment'], answer: 0, hint: 'Generalization = behavior change in untrained situations.' },
    { q: 'True or False: Generalization includes responding to novel stimuli similar to the training stimuli.', type: 'tf', answer: true, hint: 'Stimulus generalization is part of generalization.' },
  ];
  Q['U19-S2'] = [
    { q: 'Reinforcing occurrences of generalization means:', type: 'mc', options: ['Reinforcing the target behavior when it occurs in the natural environment', 'Reinforcing only in training', 'Punishing generalization', 'Never reinforcing'], answer: 0, hint: 'Reinforce the behavior outside training settings.' },
    { q: 'Training skills that contact natural contingencies of reinforcement means teaching behaviors that:', type: 'mc', options: ['Will naturally be reinforced in the real world', 'Require artificial support forever', 'Never get reinforced', 'Are irrelevant'], answer: 0, hint: 'Choose skills the natural environment will maintain.' },
  ];
  Q['U19-S3'] = [
    { q: 'Modifying contingencies of reinforcement and punishment in the natural environment means:', type: 'mc', options: ['Changing the natural environment so it supports the behavior', 'Leaving the environment unchanged', 'Removing all reinforcers', 'Adding punishment'], answer: 0, hint: 'Arrange the natural environment to reinforce appropriate behavior.' },
    { q: 'Incorporating a variety of relevant stimulus situations in training means:', type: 'mc', options: ['Training in multiple settings and with multiple people to promote generalization', 'Training in one fixed setting', 'Never changing settings', 'Using only one trainer'], answer: 0, hint: 'Variety in training promotes generalized responding.' },
  ];
  Q['U19-S4'] = [
    { q: 'Incorporating common stimuli means:', type: 'mc', options: ['Including elements of the natural environment in the training setting', 'Excluding all natural stimuli', 'Training in isolation', 'Using identical stimuli everywhere'], answer: 0, hint: 'Make training resemble the natural environment.' },
    { q: 'Teaching a range of functionally equivalent responses means teaching:', type: 'mc', options: ['Multiple appropriate ways to achieve the same outcome', 'Only one response', 'Unrelated responses', 'No responses'], answer: 0, hint: 'Multiple functional responses increase generalization.' },
  ];
  Q['U19-S5'] = [
    { q: 'Providing cues in the natural environment means:', type: 'mc', options: ['Adding prompts or reminders in the real-world settings', 'Removing all cues', 'Training only', 'Ignoring the environment'], answer: 0, hint: 'Natural cues prompt the behavior.' },
    { q: 'Incorporating self-generated mediators of generalization includes:', type: 'mc', options: ['Teaching the person to use self-instructions or to picture the behavior', 'Forbidding self-talk', 'Only external cues', 'Random reinforcement'], answer: 0, hint: 'Self-generated mediators travel with the person.' },
  ];
  Q['U19-S6'] = [
    { q: 'When implementing strategies to promote generalization, you should:', type: 'mc', options: ['Identify the target settings, select strategies, implement, and measure generalization', 'Only train once', 'Avoid measuring', 'Train and hope'], answer: 0, hint: 'Plan, implement, and evaluate generalization.' },
    { q: 'True or False: Generalized reductions in problem behaviors also require programming (e.g., reducing the behavior across all settings).', type: 'tf', answer: true, hint: 'Decreases must also generalize.' },
  ];

  /* ================= CHAPTER 20 ================= */
  Q['U20-S0'] = [
    { q: 'The chapter examples of self-management include:', type: 'mc', options: ['Getting Murray to run regularly and Annette to clean up', 'Teaching Jacob to stop tantrums', 'Willy\'s bedtime', 'Mrs. F walking'], answer: 0, hint: 'Murray (running) and Annette (cleaning) were the examples.' },
    { q: 'True or False: Self-management is the application of behavior modification to one\'s own behavior.', type: 'tf', answer: true, hint: 'The person manages their own behavior.' },
  ];
  Q['U20-S1'] = [
    { q: 'A self-management problem exists when:', type: 'mc', options: ['The behavior to be changed is a problem and controlling the behavior is up to the person', 'Someone else controls the behavior', 'No behavior change is needed', 'The behavior is automatic'], answer: 0, hint: 'The person both wants to change and controls their own behavior.' },
    { q: 'True or False: A behavior is not a self-management problem if someone else is already controlling it.', type: 'tf', answer: true, hint: 'Self-management requires the person to be the agent of change.' },
  ];
  Q['U20-S2'] = [
    { q: 'Self-management involves:', type: 'mc', options: ['Behaviors engaged in to influence future behavior', 'Only unconscious processes', 'Only medication', 'No antecedents'], answer: 0, hint: 'Self-management = deliberately engaging in behavior to affect future behavior.' },
    { q: 'True or False: Self-management procedures can target both behavioral excesses and deficits.', type: 'tf', answer: true, hint: 'Both over- and under-behaviors are manageable.' },
  ];
  Q['U20-S3'] = [
    { q: 'Types of self-management strategies include:', type: 'mc', options: ['Goal setting, self-monitoring, antecedent interventions, contracting, self-reinforcement, social support, and self-instructions', 'Only punishment', 'Only medication', 'Only willpower'], answer: 0, hint: 'A wide range of behavioral strategies are used.' },
    { q: 'Goal setting and self-monitoring are:', type: 'mc', options: ['Often the first steps in a self-management plan', 'Never helpful', 'Only for athletes', 'Unrelated to behavior'], answer: 0, hint: 'Setting goals and tracking behavior come first.' },
  ];
  Q['U20-S4'] = [
    { q: 'The first step in a self-management plan is typically to:', type: 'mc', options: ['Define the problem and set a goal', 'Punish the behavior', 'Remove all reinforcers', 'Tell no one'], answer: 0, hint: 'Start by specifying the target and the goal.' },
    { q: 'In a self-management plan, after setting goals you should:', type: 'mc', options: ['Self-monitor the behavior, then implement antecedent and consequence strategies, and evaluate', 'Skip monitoring', 'Only use willpower', 'Give up quickly'], answer: 0, hint: 'Monitor, intervene, and evaluate.' },
  ];
  Q['U20-S5'] = [
    { q: 'Self-instructions are:', type: 'mc', options: ['Verbal statements the person says to themselves to guide behavior', 'Instructions from a teacher', 'Written contracts only', 'Punishment'], answer: 0, hint: 'Self-instructions cue and guide one\'s own behavior.' },
    { q: 'True or False: Self-management plans often include enlisting social support and arranging self-reinforcement.', type: 'tf', answer: true, hint: 'Support and self-reinforcement strengthen plans.' },
  ];

  /* ================= CHAPTER 21 ================= */
  Q['U21-S0'] = [
    { q: 'Habit behaviors in the chapter include:', type: 'mc', options: ['Nervous habits, motor and vocal tics, and stuttering', 'Tantrums and aggression', 'Phobias', 'Studying habits'], answer: 0, hint: 'Habit behaviors include nervous habits, tics, and stuttering.' },
    { q: 'True or False: Habit behaviors are repetitive behaviors that are often performed automatically.', type: 'tf', answer: true, hint: 'Habits occur frequently, often without awareness.' },
  ];
  Q['U21-S1'] = [
    { q: 'Habit behaviors are defined as:', type: 'mc', options: ['Repetitive behaviors that occur automatically, often without social consequences', 'Behaviors reinforced by peers', 'Deliberate misbehavior', 'Responses to commands'], answer: 0, hint: 'Habits are automatic and often maintained by automatic reinforcement.' },
    { q: 'Motor and vocal tics are:', type: 'mc', options: ['Sudden, repetitive, nonrhythmic movements or vocalizations', 'Deliberate actions', 'Normal voluntary behaviors', 'Thoughts'], answer: 0, hint: 'Tics are sudden, repetitive motor or vocal responses.' },
  ];
  Q['U21-S2'] = [
    { q: 'The habit reversal procedure consists of:', type: 'mc', options: ['Awareness training, competing response training, and motivation procedures', 'Only punishment', 'Only reinforcement', 'Medication'], answer: 0, hint: 'Habit reversal = awareness + competing response + motivation.' },
    { q: 'In competing response training, the person is taught to:', type: 'mc', options: ['Engage in a physically incompatible behavior when the habit occurs or is about to occur', 'Do nothing', 'Engage in the habit more', 'Ignore the urge'], answer: 0, hint: 'The competing response prevents the habit.' },
  ];
  Q['U21-S3'] = [
    { q: 'Habit reversal has been shown to be effective for:', type: 'mc', options: ['Nervous habits, tics, and stuttering', 'Only stuttering', 'Only tics', 'No behaviors'], answer: 0, hint: 'Habit reversal is effective across all three categories.' },
    { q: 'True or False: Awareness training teaches the person to detect each occurrence of the habit.', type: 'tf', answer: true, hint: 'Noticing the habit is the first step.' },
  ];
  Q['U21-S4'] = [
    { q: 'Why do habit reversal procedures work? A likely reason is that the competing response:', type: 'mc', options: ['Interferes with the habit and makes it less likely (plus increased awareness and motivation)', 'Increases the habit', 'Is reinforcing the habit', 'Has no effect'], answer: 0, hint: 'Competing responses disrupt the habit; awareness and motivation add to the effect.' },
    { q: 'True or False: The competing response is physically incompatible with the habit.', type: 'tf', answer: true, hint: 'Incompatible responses prevent the behavior.' },
  ];
  Q['U21-S5'] = [
    { q: 'Other treatments for habit disorders include:', type: 'mc', options: ['Stimulus control, relaxation training, and habit reversal variations', 'Only surgery', 'Only medication', 'No treatments'], answer: 0, hint: 'Various behavioral procedures are used.' },
    { q: 'True or False: Habit reversal is generally considered the treatment of choice for tics.', type: 'tf', answer: true, hint: 'Habit reversal is the leading behavioral treatment.' },
  ];

  /* ================= CHAPTER 22 ================= */
  Q['U22-S0'] = [
    { q: 'In the opening example, Sammy\'s rehabilitation program used a token economy to:', type: 'mc', options: ['Reinforce adaptive behaviors with tokens exchanged for backup reinforcers', 'Punish all behavior', 'Provide medication', 'Only record behavior'], answer: 0, hint: 'Tokens were delivered for adaptive behaviors and exchanged for backup reinforcers.' },
    { q: 'True or False: A token economy was used to help Sammy earn privileges by engaging in appropriate behaviors.', type: 'tf', answer: true, hint: 'Sammy earned tokens for target behaviors.' },
  ];
  Q['U22-S1'] = [
    { q: 'A token economy is:', type: 'mc', options: ['A system in which tokens are earned for target behaviors and exchanged for backup reinforcers', 'A punishment system', 'A savings account', 'A type of test'], answer: 0, hint: 'Tokens + backup reinforcers = token economy.' },
    { q: 'True or False: Tokens are conditioned reinforcers that can be exchanged for backup reinforcers.', type: 'tf', answer: true, hint: 'Tokens acquire value through exchange.' },
  ];
  Q['U22-S2'] = [
    { q: 'Implementing a token economy begins with:', type: 'mc', options: ['Defining the target behaviors, selecting tokens, choosing backup reinforcers, and setting the exchange rate', 'Punishing behavior', 'Buying tokens', 'Training staff only'], answer: 0, hint: 'These are the first implementation steps.' },
    { q: 'In a token economy, the schedule of reinforcement refers to:', type: 'mc', options: ['How often tokens are delivered for the target behaviors', 'The color of tokens', 'The size of the token board', 'The number of participants'], answer: 0, hint: 'The schedule specifies when tokens are earned.' },
    { q: 'The token exchange rate specifies:', type: 'mc', options: ['How many tokens are needed for each backup reinforcer', 'The price of tokens', 'The number of participants', 'The time of day'], answer: 0, hint: 'Exchange rate = token value of backup reinforcers.' },
  ];
  Q['U22-S3'] = [
    { q: 'Practical considerations in a token economy include:', type: 'mc', options: ['Ensuring tokens are not counterfeited, stored safely, and exchanged reliably', 'Making tokens easy to steal', 'Exchanging randomly', 'Ignoring the system'], answer: 0, hint: 'Token security and consistent exchange are practical concerns.' },
    { q: 'True or False: Staff training and management are important for a token economy to work.', type: 'tf', answer: true, hint: 'Staff must implement consistently.' },
  ];
  Q['U22-S4'] = [
    { q: 'Token economies have been applied successfully in:', type: 'mc', options: ['Schools, psychiatric facilities, group homes, and workplaces', 'Only zoos', 'Only one setting', 'No settings'], answer: 0, hint: 'Token economies are used in many settings.' },
    { q: 'True or False: In a token economy, response cost can be used to reduce problem behaviors by removing tokens.', type: 'tf', answer: true, hint: 'Tokens can be removed for problem behaviors.' },
  ];
  Q['U22-S5'] = [
    { q: 'An advantage of a token economy is that:', type: 'mc', options: ['Tokens bridge delays to reinforcement and are portable', 'It never works', 'It is always free', 'It requires no planning'], answer: 0, hint: 'Tokens allow immediate reinforcement that can be exchanged later.' },
    { q: 'A disadvantage of a token economy is that:', type: 'mc', options: ['It requires staff time, resources, and careful management, and behavior may not generalize without programming', 'It is too simple', 'It has no disadvantages', 'It only works for animals'], answer: 0, hint: 'Token economies need investment and generalization planning.' },
  ];

  /* ================= CHAPTER 23 ================= */
  Q['U23-S0'] = [
    { q: 'The chapter example "Getting Stavros to Complete His Dissertation" used a behavioral contract that:', type: 'mc', options: ['Specified the work target and the reinforcer Stavros would earn', 'Punished all work', 'Was only verbal', 'Involved no consequences'], answer: 0, hint: 'A contract specified the target and consequences.' },
    { q: 'The contract with Dan and his parents was designed to:', type: 'mc', options: ['Improve their interactions by specifying behaviors and consequences for both parties', 'Punish Dan', 'Remove all privileges', 'End communication'], answer: 0, hint: 'Two-party contracts specify obligations for both sides.' },
  ];
  Q['U23-S1'] = [
    { q: 'A behavioral contract is:', type: 'mc', options: ['A written document that specifies a target behavior and the consequences for achieving or not achieving it', 'A verbal promise', 'A legal punishment', 'A type of test'], answer: 0, hint: 'Contracts are written, specifying behavior and contingencies.' },
    { q: 'True or False: A behavioral contract specifies who will do what and the consequences of the behavior.', type: 'tf', answer: true, hint: 'It spells out behavior, contingencies, and parties.' },
  ];
  Q['U23-S2'] = [
    { q: 'The components of a behavioral contract include:', type: 'mc', options: ['The target behavior, the contingency (reinforcer/punisher), and the task record', 'Only the reinforcer', 'Only the behavior', 'Only the signature'], answer: 0, hint: 'Contracts include target behaviors, consequences, and record-keeping.' },
    { q: 'True or False: A contract should specify how the behavior will be recorded and by whom.', type: 'tf', answer: true, hint: 'The task record component tracks the behavior.' },
  ];
  Q['U23-S3'] = [
    { q: 'A one-party (self) contract is:', type: 'mc', options: ['A contract a person makes with themselves', 'A contract between two people', 'A legal contract', 'A contract with an employer'], answer: 0, hint: 'One-party contracts involve the person managing their own behavior.' },
    { q: 'A two-party contract involves:', type: 'mc', options: ['Two people, one whose behavior is targeted and another who arranges consequences', 'Only one person', 'Three parties minimum', 'No consequences'], answer: 0, hint: 'Two-party contracts have a contract manager.' },
  ];
  Q['U23-S4'] = [
    { q: 'Negotiating a behavioral contract should involve:', type: 'mc', options: ['Discussion of the target behavior and consequences with both parties agreeing', 'One party deciding unilaterally', 'No discussion', 'Random rules'], answer: 0, hint: 'Negotiation leads to agreement.' },
    { q: 'True or False: Both parties should agree to the terms before the contract is signed.', type: 'tf', answer: true, hint: 'Consent and agreement are essential.' },
  ];
  Q['U23-S5'] = [
    { q: 'Behavioral contracts influence behavior because they:', type: 'mc', options: ['Specify rules, provide cues (antecedents), and arrange reinforcement/punishment consequences', 'Are legal threats', 'Only remind people', 'Punish automatically'], answer: 0, hint: 'Contracts combine antecedent rules with consequences.' },
    { q: 'True or False: A written contract makes the contingencies explicit and observable.', type: 'tf', answer: true, hint: 'Writing makes rules explicit.' },
  ];
  Q['U23-S6'] = [
    { q: 'Behavioral contracts have been applied to:', type: 'mc', options: ['Academic work, health behaviors, parent–child relations, and organizational settings', 'Only classrooms', 'Only animals', 'No settings'], answer: 0, hint: 'Contracts are broadly applicable.' },
    { q: 'True or False: Contracts can be used to both increase desirable behavior and decrease undesirable behavior.', type: 'tf', answer: true, hint: 'Contingencies can be arranged either way.' },
  ];

  /* ================= CHAPTER 24 ================= */
  Q['U24-S0'] = [
    { q: 'The chapter examples of fear and anxiety reduction include:', type: 'mc', options: ['Trisha\'s fear of public speaking and Allison\'s fear of spiders', 'Tanisha\'s hair pulling', 'Sammy\'s rehabilitation', 'Stavros\'s dissertation'], answer: 0, hint: 'Public speaking and spider phobia were the examples.' },
    { q: 'True or False: These fears were treated with behavioral procedures such as relaxation and exposure.', type: 'tf', answer: true, hint: 'Relaxation training and exposure procedures were used.' },
  ];
  Q['U24-S1'] = [
    { q: 'Fear and anxiety problems involve:', type: 'mc', options: ['Respondent-conditioned emotional responses (e.g., fear) and avoidance behaviors', 'Only thoughts', 'Only physical symptoms', 'No learned components'], answer: 0, hint: 'Fear involves respondent conditioning plus operant avoidance.' },
    { q: 'True or False: Avoidance behavior is maintained by negative reinforcement (removal of fear).', type: 'tf', answer: true, hint: 'Avoiding the feared stimulus reduces anxiety.' },
  ];
  Q['U24-S2'] = [
    { q: 'Relaxation training teaches the person to:', type: 'mc', options: ['Produce deep muscle relaxation as a response incompatible with anxiety', 'Avoid feared situations', 'Think positive thoughts only', 'Hold their breath'], answer: 0, hint: 'Relaxation is incompatible with the fear response.' },
    { q: 'Progressive muscle relaxation involves:', type: 'mc', options: ['Tensing and relaxing muscle groups in sequence', 'Only breathing', 'Only imagining', 'Physical exercise'], answer: 0, hint: 'PMR alternates tensing and relaxing muscles.' },
  ];
  Q['U24-S3'] = [
    { q: 'Systematic desensitization pairs relaxation with:', type: 'mc', options: ['Graduated exposure to the feared stimulus (hierarchy)', 'Sudden intense exposure', 'Avoidance', 'Medication'], answer: 0, hint: 'The fear hierarchy is presented gradually while relaxed.' },
    { q: 'In flooding (or in vivo exposure), the person:', type: 'mc', options: ['Is exposed to the feared stimulus without graduated steps until anxiety decreases', 'Avoids the stimulus', 'Only relaxes', 'Uses only imagery'], answer: 0, hint: 'Flooding involves exposure until habituation occurs.' },
    { q: 'Exposure procedures work through:', type: 'mc', options: ['Respondent extinction and habituation of the fear response', 'Punishment', 'Reinforcement of fear', 'Avoidance training'], answer: 0, hint: 'Repeated exposure without the feared outcome extinguishes fear.' },
  ];
  Q['U24-S4'] = [
    { q: 'Other fear reduction methods include:', type: 'mc', options: ['Modeling, cognitive restructuring, and reinforced practice', 'Only medication', 'Only avoidance', 'No methods'], answer: 0, hint: 'Multiple behavioral and cognitive methods reduce fear.' },
    { q: 'True or False: Modeling can reduce fear by having the person observe others approaching the feared stimulus successfully.', type: 'tf', answer: true, hint: 'Observational learning reduces avoidance.' },
  ];
  Q['U24-S5'] = [
    { q: 'In clinical applications, fear and anxiety reduction procedures are used for:', type: 'mc', options: ['Phobias, social anxiety, and posttraumatic stress', 'Only spider phobia', 'Only public speaking', 'No clinical problems'], answer: 0, hint: 'These procedures address a range of anxiety disorders.' },
    { q: 'True or False: The key to successful exposure is that the person must remain in the feared situation until anxiety decreases.', type: 'tf', answer: true, hint: 'Leaving early maintains avoidance and fear.' },
  ];

  /* ================= CHAPTER 25 ================= */
  Q['U25-S0'] = [
    { q: 'The chapter examples of cognitive behavior modification include:', type: 'mc', options: ['Helping Daniel control his anger and Claire pay attention in class', 'Willy\'s tantrums', 'Sammy\'s tokens', 'Trisha\'s fear'], answer: 0, hint: 'Daniel (anger) and Claire (attention) were the examples.' },
    { q: 'True or False: Cognitive behavior modification targets both cognitive behavior and overt behavior.', type: 'tf', answer: true, hint: 'It addresses thoughts and actions.' },
  ];
  Q['U25-S1'] = [
    { q: 'Cognitive behavior refers to:', type: 'mc', options: ['Covert events such as thinking, imagining, and self-talk', 'Only public actions', 'Only emotions', 'Biological processes'], answer: 0, hint: 'Cognitive behavior is private behavior (thoughts, images).' },
    { q: 'Cognitive behavior can function as:', type: 'mc', options: ['Antecedents and consequences for overt behavior', 'Unrelated events', 'Only punishment', 'Only reinforcers'], answer: 0, hint: 'Private events can influence overt behavior.' },
  ];
  Q['U25-S2'] = [
    { q: 'Cognitive restructuring involves:', type: 'mc', options: ['Identifying and changing irrational or maladaptive cognitions', 'Suppressing all thoughts', 'Avoiding situations', 'Only relaxing'], answer: 0, hint: 'Restructuring changes unhelpful thinking patterns.' },
    { q: 'In cognitive restructuring, the person learns to:', type: 'mc', options: ['Identify maladaptive thoughts and replace them with more adaptive ones', 'Avoid thinking', 'Ignore evidence', 'Only relax'], answer: 0, hint: 'Thought replacement is the core skill.' },
  ];
  Q['U25-S3'] = [
    { q: 'Cognitive coping skills training (e.g., stress inoculation) teaches the person to:', type: 'mc', options: ['Use coping self-statements and skills during stressful situations', 'Avoid all stress', 'Suppress emotions', 'Only relax'], answer: 0, hint: 'Coping self-statements guide behavior under stress.' },
    { q: 'True or False: Self-instructional training uses self-talk to guide behavior in a step-by-step manner.', type: 'tf', answer: true, hint: 'Self-instructions cue appropriate behavior.' },
  ];
  Q['U25-S4'] = [
    { q: 'Acceptance-based therapies emphasize:', type: 'mc', options: ['Accepting thoughts/feelings without fighting them while committing to valued action', 'Suppressing all thoughts', 'Always obeying thoughts', 'Avoiding feelings'], answer: 0, hint: 'Acceptance and commitment (ACT) underpin these approaches.' },
    { q: 'True or False: Acceptance-based approaches differ from cognitive restructuring in that they do not try to change the content of thoughts.', type: 'tf', answer: true, hint: 'They change the relationship to thoughts, not their content.' },
  ];
  Q['U25-S5'] = [
    { q: 'Cognitive behavior modification is applied to clinical problems such as:', type: 'mc', options: ['Depression, anger, anxiety, and habit disorders', 'Only anger', 'Only attention problems', 'No problems'], answer: 0, hint: 'CBM addresses a wide range of clinical problems.' },
    { q: 'True or False: In cognitive behavior modification, the focus remains on observable behavior change as the outcome.', type: 'tf', answer: true, hint: 'Measurable behavior change is the goal.' },
  ];

  /* ------------------------- BOPPPS GENERATOR -------------------------
     For each section we produce a concrete six-stage lesson:
       B  Bridge-in      — hook (unit case) + section framing
       O  Objectives     — 2–3 SMART learning objectives
       P  Pre-assessment — the quiz bank's first question as a warm-up
       P  Participatory  — key points (from the quiz bank) as study bullets
       P  Post-assessment— the quiz itself
       S  Summary        — "The big idea" recap sentence
     This is computed deterministically from the section's quiz bank so
     every one of the 176 sections gets real, content-specific material.
  ----------------------------------------------------------------------- */
  function makeBOPPPS(unit, idx) {
    const section = unit.sections[idx];
    const questions = C.getQuestions(unit.id, idx);
    const key = C.getSectionKey(unit.id, idx);
    // Rich, per-section teaching content written in plain language.
    const SC = (typeof window !== 'undefined' && window.SectionContent) ? window.SectionContent : {};
    const sc = SC[key] || {};
    const hook = sc.bridge || (UNIT_HOOKS[unit.id] || ('Unit ' + unit.id + ' — ' + unit.title + ' in action.'));
    const n = questions.length;
    const preQ = questions[0] || null;
    const bullets = questions.map((q) => {
      if (q.type === 'mc') return { k: q.q, v: q.options[q.answer] };
      if (q.type === 'tf') return { k: q.q, v: q.answer ? 'True' : 'False' };
      return { k: q.q, v: '' };
    });
    const objectives = (sc.objectives && sc.objectives.length)
      ? sc.objectives
      : [
        'Define and explain "' + section + '" in your own words.',
        'Identify the key terms and concepts that define this topic.',
        'Apply what you learn to a real-world example from the book.',
      ];
    const sum = (sc.explain
      ? 'The big idea: ' + section + '. ' + (sc.explain.length > 220 ? sc.explain.slice(0, 220) + '…' : sc.explain)
      : 'The big idea: "' + section + '" connects directly to the principles of behavior modification.');
    return {
      section: section,
      unitId: unit.id,
      unitTitle: unit.title,
      unitIcon: unit.icon,
      hook: hook,
      objectives: objectives,
      preQ: preQ,
      bullets: bullets,
      preText: sc.pre || null,
      explain: sc.explain || null,
      vocab: sc.vocab || null,
      summary: sum,
    };
  }

  /* ------------------------- CURRICULUM API ------------------------- */
  const C = {
    PARTS,
    UNITS,
    Q,
    UNIT_HOOKS,
    totalSections,
    getUnit: (id) => UNITS.find(u => u.id === id) || null,
    getSectionKey: (unitId, idx) => 'U' + unitId + '-S' + idx,
    getQuestions: (unitId, idx) => {
      const key = C.getSectionKey(unitId, idx);
      return (Q[key] || []).slice();
    },
    getBOPPPS: makeBOPPPS,
  };

  window.Curriculum = C;
})();

