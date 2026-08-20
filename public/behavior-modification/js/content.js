/* ============================================================
   BehaviorMod Pro — content.js
   Per-section teaching content for all 176 sections, written in
   plain language so middle-school and high-school students can
   follow. For each section:
     bridge      — a unique, creative hook (no more shared chapter hook)
     objectives  — 2 specific learning objectives
     pre         — a scenario "think about it" question (pre-assessment)
     explain     — the participatory-learning explanation (creative, simple)
     vocab       — words above CET-4 with IPA + a plain explanation
   The quiz bank in data.js remains the post-assessment.
   ============================================================ */
(function () {
  'use strict';
  const SC = {
    /* ============ UNIT 1 · Introduction to Behavior Modification ============ */
    "U1-S0": {
      bridge: "Blink. Then try to watch yourself blink. Now — is *growing taller* a behavior? Only one of these is a 'behavior' in this book. Guess which before you read on.",
      objectives: ["Give the book's definition of behavior and explain why thoughts and growth are NOT behaviors.", "List the five characteristics of behavior and spot each one in a real example."],
      pre: "Think about a video of a cat: it runs, stops, yawns, sleeps. Which parts of that video would you call 'behaviors' — and which would you leave out? Why?",
      explain: "A **behavior** is an action — something a living thing DOES, with movement through space and time. That's why you can film it. Blinking is a behavior (you can see it). Dreaming is NOT (no one can film a dream). Growing taller is NOT (it just happens to you; it's not something you do). Behaviors have **dimensions** — measurable parts like how often (frequency), how long (duration), how strong (intensity), and how quickly it starts (latency).",
      vocab: {
        behavior: { ipa: "/bɪˈheɪvjər/", plain: "an action someone or something does" },
        dimension: { ipa: "/dɪˈmenʃən/", plain: "a part of something you can measure" },
        latency: { ipa: "/ˈleɪtənsi/", plain: "the time between a signal and the response" }
      }
    },
    "U1-S1": {
      bridge: "Samantha bangs her head, Tanisha pulls her hair, and Francisco runs every day. Three very different people — what does a 3-year-old, a worried woman, and a runner all share?",
      objectives: ["Explain what makes a behavior observable and measurable.", "Give a real example of a behavior and name its dimensions (frequency, duration, intensity)."],
      pre: "Your friend says 'I have a bad attitude.' Is 'attitude' something you could count or measure? What would you count instead?",
      explain: "A behavior has an **impact** on the world around it. Turn on a light — the room changes. Raise your hand — the teacher calls you. Say a phone number out loud — you remember it better. Behaviors are also **lawful**: they happen for reasons. If Samantha bangs her head and her teacher gives her attention every time, guess what happens? The head-banging keeps happening — because it *works*. That's the whole secret of behavior: it's not random.",
      vocab: {
        impact: { ipa: "/ˈɪmpækt/", plain: "the effect something has" },
        lawful: { ipa: "/ˈlɔːfəl/", plain: "following a rule; not random" },
        functional: { ipa: "/ˈfʌŋkʃənəl/", plain: "working; doing its job" }
      }
    },
    "U1-S2": {
      bridge: "Your little sister screams in the candy aisle and mom gives in. Is there a *scientific* way to understand — and even fix — that? That's exactly what behavior modification does.",
      objectives: ["Define behavior modification in one sentence.", "Explain the difference between analyzing behavior and modifying it."],
      pre: "A friend says 'I just can't focus.' Would a behavior scientist accept that as the final answer — or keep asking 'WHEN and WHERE do you NOT focus?'",
      explain: "**Behavior modification** is a science with two jobs. First, **analyze**: figure out WHY a behavior happens by looking at what comes before and after it. Second, **modify**: change those events so the behavior changes. It's like being a detective first, then an engineer. Professionals like **behavior analysts** design these changes so people can build better habits or drop problem behaviors.",
      vocab: {
        modify: { ipa: "/ˈmɑːdɪfaɪ/", plain: "to change something" },
        analyze: { ipa: "/ˈænəlaɪz/", plain: "to look closely and figure out why" },
        analyst: { ipa: "/ˈænəlɪst/", plain: "a person who studies something carefully" }
      }
    },
    "U1-S3": {
      bridge: "Why do behavior scientists refuse to say 'he's just a bad kid'? Because a label is a dead end — but an action can be changed.",
      objectives: ["Explain why behavior modification focuses on actions, not labels.", "List the seven defining characteristics of behavior modification."],
      pre: "Which is easier to fix: 'lazy' or 'sleeps past noon and skips homework'? Pick one and explain your choice.",
      explain: "Behavior modification has seven rules of thumb. (1) **Focus on behavior**, not labels — we change actions, not 'badness'. (2) The behavior must be **defined precisely**, so two people would record it the same way. (3) **Treatment is done by real people** — parents, teachers, coaches — after training. (4) **We measure** the behavior before, during, and after. (5) **Past events matter less** than what's happening NOW, because now can still be changed. (6) We **reject fake causes** like 'a weak ego' — you can't measure a weak ego, so it can't be a real cause. (7) Everything is based on **behavioral principles**.",
      vocab: {
        precisely: { ipa: "/prɪˈsaɪsli/", plain: "exactly, with no confusion" },
        intervene: { ipa: "/ˌɪntərˈviːn/", plain: "to step in and do something" },
        reject: { ipa: "/rɪˈdʒekt/", plain: "to refuse to accept" },
        principle: { ipa: "/ˈprɪnsəpəl/", plain: "a basic rule that is always true" }
      }
    },
    "U1-S4": {
      bridge: "A cat stuck in a puzzle box, a dog drooling at the sound of a bell, and a rat pressing a lever — three lab animals quietly started a whole science.",
      objectives: ["Connect each major figure (Thorndike, Pavlov, Skinner) to their key idea.", "Explain the law of effect in your own words."],
      pre: "A cat learns to press a lever to open its cage door and reach food. What do you think the cat does NEXT time it's locked in?",
      explain: "**Thorndike** put a hungry cat in a cage with food outside. The cat had to hit a lever to escape. He discovered the **law of effect**: if a behavior brings a good result, the animal will do it again. **Pavlov** rang a bell right before giving a dog food. Soon the dog drooled at just the bell — a **reflex** learned by pairing. **Skinner** studied how **consequences** control behavior, and his work became the foundation of everything in this book.",
      vocab: {
        reflex: { ipa: "/ˈriːfleks/", plain: "an automatic body response" },
        consequence: { ipa: "/ˈkɑːnsɪkwens/", plain: "what happens right after an action" },
        foundation: { ipa: "/faʊnˈdeɪʃən/", plain: "the base everything else builds on" }
      }
    },
    "U1-S5": {
      bridge: "Believe it or not, the same tricks that calm a toddler's tantrum also help factories run safer, athletes perform better, and schools teach better. Here's where behavior science shows up in the real world.",
      objectives: ["Name at least six areas where behavior modification is applied.", "Give one real example of behavior modification in business or education."],
      pre: "Where do you think behavior science is used most: hospitals, classrooms, factories, sports teams, or your own home? Pick one and be ready to explain.",
      explain: "Behavior modification is used almost everywhere. In **autism and developmental disabilities**, it teaches new skills. In **mental illness**, it's called behavior therapy. In **education**, teachers use it daily. It improves **business** (organizational behavior management — safer factories, fewer accidents), helps people with **self-management** (exercise, habits), guides **parents** with child behavior, supports **prevention**, boosts **sports performance**, improves **health behaviors**, and even helps older adults in **gerontology**.",
      vocab: {
        application: { ipa: "/ˌæplɪˈkeɪʃən/", plain: "a way of using something" },
        rehabilitation: { ipa: "/ˌriːəˌbɪlɪˈteɪʃən/", plain: "helping someone recover skills" },
        gerontology: { ipa: "/ˌdʒerənˈtɑːlədʒi/", plain: "the study of aging and older adults" }
      }
    },
    "U1-S6": {
      bridge: "You wouldn't let someone without a license fix your teeth. So who gets to change people's behavior — and what rules do they follow?",
      objectives: ["Explain who is certified to practice behavior modification.", "Describe why ethics matter when changing someone's behavior."],
      pre: "Your cousin says 'I taught my dog a trick, so I could totally run a therapy program.' What's missing from that logic?",
      explain: "Changing behavior is powerful — and powerful things need rules. The main professionals are **Board Certified Behavior Analysts** (BCBAs) and **assistant analysts** (BCaBAs). They study, pass exams, and follow an **ethics** code. The people who *carry out* the plans — parents, teachers, staff — should be trained and watched over by a professional. Ethics means: use the least forceful method first, get **consent** (permission), protect the person, and keep records.",
      vocab: {
        certified: { ipa: "/ˈsɜːrtɪfaɪd/", plain: "officially trained and approved" },
        ethics: { ipa: "/ˈeθɪks/", plain: "rules about right and wrong" },
        consent: { ipa: "/kənˈsent/", plain: "clear permission from someone" }
      }
    },
    "U1-S7": {
      bridge: "The book you're holding is built like a staircase — each chapter stands on the one before it. Let's see the whole map before we start climbing.",
      objectives: ["Sketch the five-part structure of the book.", "Explain what makes each chapter small and manageable."],
      pre: "If you were writing a book about how people change, what would you teach FIRST: why behavior happens, or how to change it?",
      explain: "The book is split into five parts that build on each other. **Part 1** shows how to measure and record behavior. **Part 2** teaches the basic principles — reinforcement, extinction, punishment, stimulus control, respondent conditioning. **Part 3** shows how to build brand-new behaviors (shaping, prompting, chaining, skills training). **Part 4** tackles problem behaviors with things like functional assessment and time-out. **Part 5** covers advanced tools — self-management, token economies, contracts, and fear reduction. Each chapter covers ONE idea, so you can master it before moving on.",
      vocab: {
        structure: { ipa: "/ˈstrʌktʃər/", plain: "the way something is organized" },
        principle: { ipa: "/ˈprɪnsəpəl/", plain: "a basic rule that is always true" },
        stimulus: { ipa: "/ˈstɪmjələs/", plain: "something in the world that makes you react" }
      }
    },

    /* ============ UNIT 2 · Observing and Recording Behavior ============ */
    "U2-S0": {
      bridge: "Your mom asks 'How was your brother today?' You answer from memory. But a scientist needs the TRUTH — so they watch the brother himself. That's the difference between two ways of measuring.",
      objectives: ["Tell the difference between direct and indirect assessment.", "Give one example of each method."],
      pre: "Which is more trustworthy: your friend's description of their own 'bad week', or a video of what they actually did? Why?",
      explain: "**Direct assessment** means watching and writing down the behavior *as it happens* — like a referee calling fouls live. **Indirect assessment** means asking people to remember and describe it — interviews, questionnaires, rating scales. Indirect is quicker and easier, but memory lies. Direct is slower but gives the real picture. Great scientists use both: start indirect to get ideas, then go direct to get facts.",
      vocab: {
        indirect: { ipa: "/ˌɪndɪˈrekt/", plain: "not straight; through someone else" },
        assessment: { ipa: "/əˈsesmənt/", plain: "a careful check or evaluation" },
        questionnaire: { ipa: "/ˌkwestʃəˈner/", plain: "a list of questions for people to answer" }
      }
    },
    "U2-S1": {
      bridge: "'Be nicer' is a wish, not a plan. 'Say 'thank you' at least three times a day' is a plan. The difference? A clear definition of the target.",
      objectives: ["Define what a target behavior is.", "Write a clear, objective definition that two people could agree on."],
      pre: "Two teachers watch the same student. Teacher A counts 'disruptions'. Teacher B counts 'calling out without raising a hand'. Who will record more reliably?",
      explain: "A **target behavior** is the exact behavior you want to change. The rule: define it so clearly that two different observers would record the *same* thing. 'Being rude' is too fuzzy. 'Interrupting by talking while another student is speaking' is perfect. A good definition names the **action** you can see, so the record is honest and reliable.",
      vocab: {
        target: { ipa: "/ˈtɑːrɡɪt/", plain: "the thing you are aiming at" },
        objective: { ipa: "/əbˈdʒektɪv/", plain: "based on facts, not feelings" },
        reliable: { ipa: "/rɪˈlaɪəbəl/", plain: "dependable; gives the same answer every time" }
      }
    },
    "U2-S2": {
      bridge: "Who watches? Where? When? Before you record a single behavior, you need a plan — otherwise your data is garbage.",
      objectives: ["List the logistics you must decide before recording.", "Explain why the observer matters."],
      pre: "You want to count how many times your friend bites their nails. When and where should you watch them to get a fair count?",
      explain: "Recording has three practical questions. **Who observes?** It could be the person themselves (self-monitoring) or someone else — but whoever it is must be trained and honest. **When and where?** Pick times and places that truly show the behavior, not just convenient ones. If you only watch at recess, you'll miss what happens in class. **How long?** Plan enough observation time to get a fair sample.",
      vocab: {
        logistics: { ipa: "/ləˈdʒɪstɪks/", plain: "all the practical details of a plan" },
        observe: { ipa: "/əbˈzɜːrv/", plain: "to watch carefully" },
        sample: { ipa: "/ˈsæmpəl/", plain: "a small part that stands for the whole" }
      }
    },
    "U2-S3": {
      bridge: "Counting every single basketball shot is exhausting — but it's the most honest. Sometimes scientists count a few minutes instead. Both are legitimate — it depends on the behavior.",
      objectives: ["Describe the main recording methods.", "Choose the right recording method for a given behavior."],
      pre: "You want to know how often your sister says 'um' during dinner. Do you record every single time — or check every 5 minutes?",
      explain: "There are three families of recording. **Continuous recording** counts EVERY occurrence — every time the behavior happens, you mark it. It's the gold standard but hard for very frequent behaviors. **Product recording** measures the leftover result — like counting finished homework pages instead of watching the person write. **Sampling** records only part of the time and estimates the rest. Choose based on the behavior: rare and short → continuous; fast and nonstop → sampling.",
      vocab: {
        continuous: { ipa: "/kənˈtɪnjuəs/", plain: "without stopping; all the time" },
        occurrence: { ipa: "/əˈkɜːrəns/", plain: "a single time something happens" },
        estimate: { ipa: "/ˈestɪmeɪt/", plain: "to make a good guess from data" }
      }
    },
    "U2-S4": {
      bridge: "Some behaviors leave footprints. You don't need to watch a student do math problems — just count the finished problems at the end of the day.",
      objectives: ["Explain continuous recording and product recording.", "Give an example of a permanent product."],
      pre: "How could you measure 'cleaning the garage' without staring at someone all afternoon?",
      explain: "**Continuous recording** means you are there for every single instance — every hand-raise, every word, every hit. **Product recording** is smarter for some jobs: the behavior leaves a **permanent product** you can count later. Pages written, dishes washed, nails cut, widgets made. The rule: if the behavior naturally leaves evidence, product recording saves your eyes.",
      vocab: {
        permanent: { ipa: "/ˈpɜːrmənənt/", plain: "lasting; stays around" },
        product: { ipa: "/ˈprɑːdʌkt/", plain: "a thing that is made or produced" },
        evidence: { ipa: "/ˈevɪdəns/", plain: "proof that something happened" }
      }
    },
    "U2-S5": {
      bridge: "You can't watch a fish swim for 24 hours. But if you peek for 10 seconds every 3 minutes, you can still guess how active it is. That's sampling.",
      objectives: ["Explain time sampling and interval recording.", "Describe the difference between whole-interval and partial-interval recording."],
      pre: "To find out how much a baby naps, do you watch all day — or check every 10 minutes and note 'sleeping or awake'?",
      explain: "**Time sampling** splits your watch time into small windows. In **interval recording**, you divide the session into intervals and mark whether the behavior happened in each. In **partial-interval**, you mark YES if it happened ANY time during the interval (catches rare events). In **whole-interval**, you mark YES only if it happened for the WHOLE interval (catches long behaviors). Sampling is a shortcut — you lose a little detail to save a lot of effort.",
      vocab: {
        interval: { ipa: "/ˈɪntərvəl/", plain: "a set period of time between two points" },
        partial: { ipa: "/ˈpɑːrʃəl/", plain: "only part of something" },
        estimate: { ipa: "/ˈestɪmeɪt/", plain: "to make a good guess from data" }
      }
    },
    "U2-S6": {
      bridge: "A chef needs the right knife; a behavior scientist needs the right tool. A clicker, a wrist counter, a stopwatch, a data sheet — each one fits a different job.",
      objectives: ["Name common recording instruments.", "Match an instrument to a recording method."],
      pre: "Your job: count how many times a bird pecks per minute. Would a tally sheet work — or would a counter you can click with your thumb be better?",
      explain: "The **instrument** is the tool you record with. **Wrist counters** count each event with a click. **Data sheets** are paper grids for marking intervals or products. **Stopwatches** measure duration and latency. **Electronic devices** and apps can do it all. The rule: the instrument must fit the method. You wouldn't use a stopwatch to count frequency, and you wouldn't use a clicker to time duration.",
      vocab: {
        instrument: { ipa: "/ˈɪnstrəmənt/", plain: "a tool used for a special job" },
        duration: { ipa: "/dʊˈreɪʃən/", plain: "how long something lasts" },
        frequency: { ipa: "/ˈfriːkwənsi/", plain: "how often something happens" }
      }
    },
    "U2-S7": {
      bridge: "Here's a creepy secret: the moment you START watching someone, they change. It's like knowing a camera is on — you suddenly sit up straighter.",
      objectives: ["Define reactivity.", "Explain two ways to reduce reactivity."],
      pre: "Would you eat a messy burger the same way if a camera was filming you? What does that tell you about watching people?",
      explain: "**Reactivity** is the sneaky effect where people act differently because they know they're being watched. A student who never raises their hand suddenly becomes a star when the principal visits. To fix it: observe **covertly** (hidden) when you can, or give people time to **habituate** — get used to the observer until they forget you're there. Once being watched feels normal, behavior returns to real.",
      vocab: {
        reactivity: { ipa: "/riˌækˈtɪvəti/", plain: "changing because you know you're being watched" },
        covertly: { ipa: "/ˈkoʊvɜːrtli/", plain: "secretly, without being seen" },
        habituate: { ipa: "/həˈbɪtʃueɪt/", plain: "to get used to something" }
      }
    },
    "U2-S8": {
      bridge: "Two referees at the same game should make the same calls. If they don't, is the game real or is someone guessing? Same question in behavior science — it's called agreement.",
      objectives: ["Define interobserver agreement (IOA).", "Explain why high IOA means trustworthy data."],
      pre: "Two scouts watch the same player. Scout A records 30 passes; Scout B records 18. Can you trust either number?",
      explain: "**Interobserver agreement** (IOA) is how much two independent observers agree when they record the same behavior. High agreement = the definition is clear and the data are honest. Low agreement = someone's guessing, or the definition is fuzzy. A simple way to measure: divide the number of times they agreed by the total chances to agree, then multiply by 100 for a percentage. The higher, the better — good scientists check IOA regularly.",
      vocab: {
        interobserver: { ipa: "/ˌɪntərəbˈzɜːrvər/", plain: "between two different watchers" },
        agreement: { ipa: "/əˈɡriːmənt/", plain: "when people match or say the same thing" },
        percentage: { ipa: "/pərˈsentɪdʒ/", plain: "a part of 100; 'out of 100'" }
      }
    },

    /* ============ UNIT 3 · Graphing Behavior and Measuring Change ============ */
    "U3-S0": {
      bridge: "A list of 60 numbers tells you almost nothing. Plot those same 60 numbers on a graph — and suddenly the story appears. That's the superpower of graphs.",
      objectives: ["Label the parts of a behavior graph.", "Explain what each axis shows."],
      pre: "Your friend shows you 40 numbers from their fitness tracker. How could you make sense of them in 5 seconds?",
      explain: "A behavior graph has two main lines. The **horizontal axis** (going sideways) is usually **time** — sessions, days, or trials. The **vertical axis** (going up) is the **value of behavior** — how many, how long, how strong. Each dot is one measurement. Connect the dots and the line tells the story: is the behavior going up, down, or flat?",
      vocab: {
        horizontal: { ipa: "/ˌhɔːrɪˈzɑːntəl/", plain: "side to side, like the floor" },
        vertical: { ipa: "/ˈvɜːrtɪkəl/", plain: "up and down, like a wall" },
        axis: { ipa: "/ˈæksɪs/", plain: "one of the main lines of a graph" }
      }
    },
    "U3-S1": {
      bridge: "One data point is a rumor. Five data points are a clue. Twenty data points are a fact. Graphs turn clues into facts.",
      objectives: ["Explain why data must be plotted across time.", "Read a simple behavior graph."],
      pre: "If someone shows you a graph with ONE dot, can you tell if their behavior is improving? What would you ask for instead?",
      explain: "The point of graphing is to see behavior **change over time**. You plot one dot per session or day, in order, left to right. Then you can compare before and after a treatment. Without the time axis, a single number means nothing — '10 tantrums' could be great or terrible depending on when it happened and how often it used to occur.",
      vocab: {
        plot: { ipa: "/plɑːt/", plain: "to mark a point on a graph" },
        session: { ipa: "/ˈseʃən/", plain: "one meeting or one practice period" },
        trend: { ipa: "/trend/", plain: "the general direction of something over time" }
      }
    },
    "U3-S2": {
      bridge: "Three words unlock every graph: LEVEL, TREND, VARIABILITY. Learn to see them and you can read any behavior chart like a pro.",
      objectives: ["Define level, trend, and variability.", "Describe a graph's data using these three terms."],
      pre: "Your friend's test scores: 60, 62, 58, 61, 90. Which word — level, trend, or variability — best describes the jump at the end?",
      explain: "**Level** is how high or low the behavior is — the average height of the dots. **Trend** is the direction the dots are marching — up, down, or flat. **Variability** is how wobbly they are — tight and smooth, or bouncing all over. A behavior change shows up as a shift in one of these: level drops, trend tilts down, or wobble settles.",
      vocab: {
        level: { ipa: "/ˈlevəl/", plain: "how high or low something is" },
        variability: { ipa: "/ˌveriəˈbɪləti/", plain: "how much something bounces around" },
        average: { ipa: "/ˈævərɪdʒ/", plain: "the middle value; add them all and divide" }
      }
    },
    "U3-S3": {
      bridge: "Before you try to fix anything, you need a 'before' photo. Scientists call it baseline. Then comes the 'after' — the treatment. A vs B.",
      objectives: ["Explain what baseline (A) and treatment (B) mean.", "Read an A–B graph."],
      pre: "A coach starts a new training plan. When should she first measure the athlete — before the plan, or after? Why?",
      explain: "An **A–B graph** is the simplest experiment. **A = baseline**: the behavior measured as it naturally is, no treatment. **B = treatment**: the behavior measured after you change something. Compare the two. If the behavior only changes in B, the treatment likely caused it. Without baseline, you can't tell if your change did anything — the behavior might have been changing anyway.",
      vocab: {
        baseline: { ipa: "/ˈbeɪslaɪn/", plain: "the starting measurement before any change" },
        treatment: { ipa: "/ˈtriːtmənt/", plain: "the plan or procedure you apply" },
        comparison: { ipa: "/kəmˈpærɪsən/", plain: "looking at two things to see how they differ" }
      }
    },
    "U3-S4": {
      bridge: "Want to PROVE your teaching works — not just guess? Flip the switch off, then on, then off, then on. If the behavior follows the switch every time, you've proven it.",
      objectives: ["Explain the A–B–A–B reversal design.", "Explain the multiple-baseline design.", "State why these designs show a functional relationship."],
      pre: "A teacher rewards reading and reading goes up. She stops rewarding and it goes down. She rewards again and it goes up again. What does that flip-flop prove?",
      explain: "**A–B–A–B** (reversal) design: measure (A), treat (B), stop treating (A), treat again (B). If behavior follows the pattern — up in B, down in A — that's strong proof the treatment caused it. **Multiple-baseline**: you treat several behaviors, people, or settings at *different times*. Each one changes only when ITS turn comes. No need to stop treatment; great when you can't ethically 'un-treat' someone. Both designs show a **functional relationship**: change the cause, the effect follows.",
      vocab: {
        reversal: { ipa: "/rɪˈvɜːrsəl/", plain: "switching back to an earlier state" },
        replicate: { ipa: "/ˈreplɪkeɪt/", plain: "to do the same thing again to confirm it" },
        functional: { ipa: "/ˈfʌŋkʃənəl/", plain: "working; one thing truly causes another" }
      }
    },
    "U3-S5": {
      bridge: "What if two treatments are competing to win? Flip a coin between them each session, and let the data pick the champion.",
      objectives: ["Explain the alternating-treatments design.", "Explain the changing-criterion design."],
      pre: "You can't decide between two study methods. What experiment could you run across two weeks to test BOTH fairly?",
      explain: "In **alternating-treatments**, you quickly switch between two conditions (A, B, A, B...) and compare them — the winner is whichever produces better behavior. In **changing-criterion**, you set a goal bar that moves up in steps. The behavior must hit each new bar to earn reward. If it tracks each step, the procedure is working. It's great for shaping up slow, steady improvement.",
      vocab: {
        alternating: { ipa: "/ˈɔːltərneɪtɪŋ/", plain: "switching back and forth" },
        criterion: { ipa: "/kraɪˈtɪriən/", plain: "the standard or goal you must meet" },
        rapid: { ipa: "/ˈræpɪd/", plain: "very fast" }
      }
    },

    /* ============ UNIT 4 · Reinforcement ============ */
    "U4-S0": {
      bridge: "Here's a rule that runs your whole life: if a behavior is followed by something good, you'll do it again. Scientists gave that rule a name — and it's the most important word in this book.",
      objectives: ["Define reinforcement using its effect on behavior.", "Explain what a reinforcer is."],
      pre: "You study for an exam and get an A. The next exam, do you study more or less? Why?",
      explain: "**Reinforcement** is a simple recipe: (1) a behavior happens, (2) something follows it, (3) the behavior gets MORE likely in the future. The thing that follows is a **reinforcer**. The key word is *effect*: if the behavior doesn't increase, it wasn't reinforcement — no matter how 'rewarding' it looked. Chocolate that doesn't change behavior isn't a reinforcer for that person. It's measured by what it DOES, not what it IS.",
      vocab: {
        reinforcement: { ipa: "/ˌriːɪnˈfɔːrsmənt/", plain: "making a behavior stronger by what follows it" },
        reinforcer: { ipa: "/ˌriːɪnˈfɔːrsər/", plain: "the thing that follows and strengthens a behavior" },
        increase: { ipa: "/ɪnˈkriːs/", plain: "to go up or become more" }
      }
    },
    "U4-S1": {
      bridge: "Two doors lead to the same room. Door 1: you get a cookie. Door 2: the alarm stops screaming. Both make you walk through the door more often — but they feel totally different.",
      objectives: ["Distinguish positive from negative reinforcement.", "Identify each one in a real example."],
      pre: "A child cleans their room, and mom stops nagging. Cleaning increases. Was that positive or negative reinforcement? Read on to check.",
      explain: "**Positive reinforcement** = something is ADDED after the behavior (praise, a cookie, a high-five) → behavior increases. **Negative reinforcement** = something UNPLEASANT is REMOVED after the behavior (nagging stops, a headache goes away) → behavior increases. Both *increase* behavior — that's the similarity. The word 'negative' doesn't mean bad; it means subtraction. 'Take the Tylenol, headache goes away' is negative reinforcement. Watch out: many people confuse negative reinforcement with punishment — it's NOT. Punishment decreases behavior; both reinforcements increase it.",
      vocab: {
        aversive: { ipa: "/əˈvɜːrsɪv/", plain: "unpleasant; something you want to avoid" },
        positive: { ipa: "/ˈpɑːzətɪv/", plain: "adding something in" },
        negative: { ipa: "/ˈneɡətɪv/", plain: "taking something away" }
      }
    },
    "U4-S2": {
      bridge: "Why do we run FROM loud noises but also run TO avoid them before they even start? Both escapes and dodges are powered by the same engine.",
      objectives: ["Explain how escape and avoidance behaviors are maintained.", "Give an example of each."],
      pre: "A student who hates math asks to go to the bathroom whenever the teacher hands out worksheets. Is that escape or avoidance?",
      explain: "**Escape** = the bad thing is already happening, and you do something to stop it (cover your ears to silence the fire alarm). **Avoidance** = you act BEFORE the bad thing comes, to prevent it (leave the building before the alarm). Both are maintained by **negative reinforcement**: removing or preventing something unpleasant. That's why problem behaviors like tantrums 'work' for kids — if the tantrum gets them out of the chore, they'll use it again.",
      vocab: {
        escape: { ipa: "/ɪˈskeɪp/", plain: "to get away from something happening now" },
        avoidance: { ipa: "/əˈvɔɪdəns/", plain: "staying away before something bad happens" },
        maintain: { ipa: "/meɪnˈteɪn/", plain: "to keep something going" }
      }
    },
    "U4-S3": {
      bridge: "Food works as a reward with zero training — even a newborn wants it. Money only works because we've been taught it buys things. Two kinds of reinforcers.",
      objectives: ["Distinguish unconditioned and conditioned reinforcers.", "Give examples of each, including generalized reinforcers like money."],
      pre: "Why does a puppy work for a treat without any lessons, but you wouldn't expect it to work for a dollar bill?",
      explain: "**Unconditioned reinforcers** are natural — food, water, warmth, sleep. No learning needed; they keep us alive. **Conditioned reinforcers** become rewarding by being paired with other reinforcers — praise, tokens, stickers, grades. **Generalized reinforcers** like money and points are the best: they pair with MANY different rewards, so they work almost anywhere. Praise is a conditioned reinforcer that pairs with attention and approval — and it costs nothing to give.",
      vocab: {
        unconditioned: { ipa: "/ˌʌnkənˈdɪʃənd/", plain: "natural, no training needed" },
        conditioned: { ipa: "/kənˈdɪʃənd/", plain: "learned through experience" },
        generalized: { ipa: "/ˈdʒenrəlaɪzd/", plain: "works in many different situations" }
      }
    },
    "U4-S4": {
      bridge: "A reward that comes too late is like a punchline delivered a day after the joke — it lands flat. Timing is everything in reinforcement.",
      objectives: ["List the factors that make reinforcement effective.", "Explain immediacy and contingency with examples."],
      pre: "Would a dog learn a trick faster if the treat came 1 second after the trick, or 10 seconds later?",
      explain: "Reinforcement works best when it's **immediate** (right after the behavior — the dog needs the treat in 1 second, not 10), **contingent** (ONLY when the behavior happens — never free), and big enough (**magnitude**). It also depends on **motivating operations**: food is a powerful reinforcer when you're starving, and worthless when you're full. And it's personal — **individual differences** mean one kid loves stickers, another couldn't care less. Find what works for THAT person.",
      vocab: {
        immediate: { ipa: "/ɪˈmiːdiət/", plain: "right now, with no delay" },
        contingency: { ipa: "/kənˈtɪndʒənsi/", plain: "the rule that reward depends on the behavior" },
        magnitude: { ipa: "/ˈmæɡnɪtuːd/", plain: "how big or strong something is" }
      }
    },
    "U4-S5": {
      bridge: "Do you get a reward every time, every 5th time, or at random? The SCHEDULE decides how fast you learn — and how hard you keep trying when the rewards stop.",
      objectives: ["Define the four basic schedules of reinforcement.", "Match each schedule to a real-world example."],
      pre: "Your phone buzzes at random times with likes. Checking it feels addictive. What would happen if likes came exactly every 10 minutes instead?",
      explain: "Schedules are the rules for when rewards come. **Fixed ratio (FR)**: reward after a set number of actions (every 5 push-ups). **Variable ratio (VR)**: reward after an AVERAGE number that varies (slot machines — that's why they're addictive). **Fixed interval (FI)**: reward for the first action after a set time (a paycheck every 2 weeks). **Variable interval (VI)**: reward for the first action after a varying time (random pop quizzes). Rule of thumb: 'variable' schedules make behavior stronger and harder to kill.",
      vocab: {
        schedule: { ipa: "/ˈskedʒuːl/", plain: "a plan of when things happen" },
        ratio: { ipa: "/ˈreɪʃioʊ/", plain: "a fixed amount based on number of actions" },
        interval: { ipa: "/ˈɪntərvəl/", plain: "a period of time between events" }
      }
    },
    "U4-S6": {
      bridge: "Reinforcement doesn't just boost 'how often' — it can shape HOW LONG, HOW HARD, and HOW FAST. You can reward almost any part of a behavior.",
      objectives: ["Explain that any dimension of behavior can be reinforced.", "Give an example of reinforcing duration or intensity."],
      pre: "Your goal: get your friend to hold a plank longer. Which dimension of 'planking' do you need to reward — how often, or how long?",
      explain: "A behavior has many **dimensions**: frequency (how often), duration (how long), intensity (how hard), latency (how quickly it starts). Reinforcement can target ANY of them. Want more reading? Reward finishing chapters. Want longer reading? Reward staying focused for 20 minutes. Want louder singing? Reward when the volume increases. Smart teachers pick the dimension that matters for the goal.",
      vocab: {
        dimension: { ipa: "/dɪˈmenʃən/", plain: "a measurable part of something" },
        intensity: { ipa: "/ɪnˈtensəti/", plain: "how strong or powerful something is" },
        duration: { ipa: "/dʊˈreɪʃən/", plain: "how long something lasts" }
      }
    },
    "U4-S7": {
      bridge: "Life is a buffet, not a single dish. When two rewards are on the table at once, which one wins? That's the science of choice.",
      objectives: ["Explain concurrent schedules.", "Explain multiple schedules."],
      pre: "Homework OR video games are both available right now. Which one do you pick — and what does that choice teach a scientist?",
      explain: "**Concurrent schedules** = two or more rewards available AT THE SAME TIME. You choose between them — and your choice shows which reinforcer is stronger right now. **Multiple schedules** = two or more schedules that switch back and forth, each signaled by a cue (a green light means 'rewards every 3 responses', a red light means 'rewards every 10'). The cue tells you which rule is running. Both tools help scientists understand how people choose and how cues control behavior.",
      vocab: {
        concurrent: { ipa: "/kənˈkɜːrənt/", plain: "happening at the same time" },
        multiple: { ipa: "/ˈmʌltɪpəl/", plain: "more than one" },
        cue: { ipa: "/kjuː/", plain: "a signal that tells you what to do" }
      }
    },

    /* ============ UNIT 5 · Extinction ============ */
    "U5-S0": {
      bridge: "Imagine the vending machine stops delivering. You push the button once, twice, ten times... and finally you walk away. That's extinction — the most common way behaviors die.",
      objectives: ["Define extinction.", "Identify the reinforcer being withheld in an example."],
      pre: "A dog begs at the table because it always gets a bite. What would you do to make the begging STOP?",
      explain: "**Extinction** = the reinforcer that used to follow a behavior suddenly stops coming. The behavior gets weaker and weaker until it disappears. The vending machine that never delivers: you stop pushing. The kid whose tantrum used to get candy: once the candy never comes, the tantrum fades. The catch: you must stop the SPECIFIC reinforcer. If the tantrum is for attention, ignoring it is extinction — but if it's for getting out of chores, ignoring won't work at all.",
      vocab: {
        extinction: { ipa: "/ɪkˈstɪŋkʃən/", plain: "making a behavior die by cutting off its reward" },
        withhold: { ipa: "/wɪðˈhoʊld/", plain: "to hold back; not give" },
        specific: { ipa: "/spəˈsɪfɪk/", plain: "exact; one particular thing" }
      }
    },
    "U5-S1": {
      bridge: "Warning: before the storm ends, it gets WORSE. When rewards stop, behavior often explodes first. Scientists call it the burst — and it's the moment most people give up.",
      objectives: ["Describe the extinction burst.", "Explain why the burst makes people give up and reinforce again."],
      pre: "You stop giving your dog treats for barking. What does the dog probably do in the first 10 minutes?",
      explain: "The **extinction burst** is the nasty surprise: when rewards first stop, the behavior doesn't quietly fade — it SPIKES. The dog barks louder and longer. The toddler's tantrum escalates to screaming. People also show new behaviors and emotions — aggression, tears. The danger: if you give in DURING the burst, you teach 'scream harder and you'll get it'. That makes the behavior even stronger next time. The fix: hold steady, ride out the burst, and the behavior will crash.",
      vocab: {
        burst: { ipa: "/bɜːrst/", plain: "a sudden short increase" },
        escalate: { ipa: "/ˈeskəleɪt/", plain: "to get worse or more intense" },
        emotional: { ipa: "/ɪˈmoʊʃənəl/", plain: "connected to feelings" }
      }
    },
    "U5-S2": {
      bridge: "You thought the behavior was gone — then it reappears from nowhere, like a zombie. But here's the trick: ignore it once, and it dies for good.",
      objectives: ["Define spontaneous recovery.", "Explain why recovery is temporary."],
      pre: "A habit you broke suddenly comes back for one afternoon. Does that mean your plan failed?",
      explain: "**Spontaneous recovery** is when a behavior that was extinguished suddenly pops back, without any reward. It looks like failure — but it's a normal, temporary blip. If you ignore it, it fades again quickly. The trap: if you give in DURING recovery, you revive the behavior and it becomes even harder to kill. Think of it like a fire that flared up from one last spark — starve it, and it goes out for good.",
      vocab: {
        spontaneous: { ipa: "/spɑːnˈteɪniəs/", plain: "happening on its own, without a trigger" },
        recovery: { ipa: "/rɪˈkʌvəri/", plain: "coming back" },
        temporary: { ipa: "/ˈtempəreri/", plain: "only for a short time" }
      }
    },
    "U5-S3": {
      bridge: "Extinction comes in flavors. For attention-seekers, it means being ignored. For escape-artists, it means the escape door gets locked.",
      objectives: ["Apply extinction to behavior maintained by positive reinforcement.", "Apply extinction to behavior maintained by negative reinforcement."],
      pre: "A kid throws a fit to skip homework, and the teacher sends them to the office (no homework). Will the fits increase or decrease?",
      explain: "Extinction must match the reinforcer. **Positive reinforcement extinction**: withhold the added reward — ignore attention-seeking whining, stop handing out candy for pestering. **Negative reinforcement extinction**: stop allowing the escape — the kid must finish the worksheet even after the tantrum. Many people ignore the wrong thing: a behavior kept alive by ESCAPE won't die from being ignored. Match the extinction to the function, or it won't work.",
      vocab: {
        function: { ipa: "/ˈfʌŋkʃən/", plain: "the job or purpose of something" },
        match: { ipa: "/mætʃ/", plain: "to fit together correctly" },
        maintain: { ipa: "/meɪnˈteɪn/", plain: "to keep something going" }
      }
    },
    "U5-S4": {
      bridge: "Pop quiz: is extinction the same as 'just ignoring'? Answer: only if the reinforcer is attention. Ignoring a behavior driven by escape is NOT extinction — it's a free pass.",
      objectives: ["Correct the common misconception about extinction.", "Explain when ignoring is extinction and when it isn't."],
      pre: "Your teacher ignores your classmate's shouting. If the shouting was for attention, what happens? If it was to get out of class, what happens?",
      explain: "The myth: 'Extinction = ignoring.' The truth: extinction means withholding the **specific** reinforcer. If the behavior runs on attention, ignoring IS extinction. If the behavior runs on escaping work, ignoring changes nothing — the escape keeps rewarding it. Also, 'extinction' and 'time-out' and 'response cost' are different tools. Getting this straight decides whether your plan works or backfires.",
      vocab: {
        misconception: { ipa: "/ˌmɪskənˈsepʃən/", plain: "a wrong idea many people believe" },
        specific: { ipa: "/spəˈsɪfɪk/", plain: "exact; one particular thing" },
        backfire: { ipa: "/ˈbækfaɪər/", plain: "to fail in a harmful way" }
      }
    },
    "U5-S5": {
      bridge: "Some behaviors die fast; others are zombie-hard to kill. The secret? It depends how the rewards were scheduled BEFORE extinction started.",
      objectives: ["Explain how the reinforcement schedule affects resistance to extinction.", "Compare continuous and intermittent reinforcement."],
      pre: "Two vending machines: Machine A gives candy every time; Machine B gives candy randomly. If both break down today, which one will people keep pushing longer?",
      explain: "If a behavior was rewarded **every single time** (continuous), it dies fast when rewards stop — the contrast is obvious. If it was rewarded **sometimes** (intermittent), it's super **resistant to extinction** — like a gambler who keeps betting because 'maybe THIS time'. This is the 'partial reinforcement extinction effect'. It explains why habits built on random rewards (notifications, slot machines) are so hard to break.",
      vocab: {
        intermittent: { ipa: "/ˌɪntərˈmɪtənt/", plain: "sometimes, not always" },
        resistant: { ipa: "/rɪˈzɪstənt/", plain: "hard to break or change" },
        contrast: { ipa: "/ˈkɑːntræst/", plain: "a clear difference" }
      }
    },

    /* ============ UNIT 6 · Punishment ============ */
    "U6-S0": {
      bridge: "Reinforcement makes behavior grow. Punishment makes it shrink. Both are defined by ONE thing only: what happens to the behavior next time.",
      objectives: ["Define punishment by its effect on behavior.", "Explain what a punisher is."],
      pre: "A kid hits a sibling and loses the video game. The hitting stops. Did reinforcement or punishment just happen?",
      explain: "**Punishment** is the mirror of reinforcement: (1) a behavior happens, (2) something follows it, (3) the behavior gets LESS likely in the future. The thing that follows is a **punisher**. Again, the test is the EFFECT. If a 'scolding' doesn't actually reduce the behavior, it wasn't punishment — no matter how unpleasant it seemed. Punishment is a technical word; it just means 'a consequence that decreases behavior'.",
      vocab: {
        punishment: { ipa: "/ˈpʌnɪʃmənt/", plain: "making a behavior weaker by what follows it" },
        punisher: { ipa: "/ˈpʌnɪʃər/", plain: "the thing that follows and weakens a behavior" },
        decrease: { ipa: "/dɪˈkriːs/", plain: "to go down or become less" }
      }
    },
    "U6-S1": {
      bridge: "When people hear 'punishment' they picture yelling and grounding. But scientists mean something calmer and more useful: any consequence that makes a behavior rarer.",
      objectives: ["Correct the everyday misconception about punishment.", "Distinguish punishment from revenge."],
      pre: "A parent takes a phone away and the bad behavior STOPS. A coach yells at a player and the bad behavior CONTINUES. Which one was real punishment?",
      explain: "The word 'punishment' triggers thoughts of revenge, anger, and pain. In behavior science, punishment is just a **functional** term — it's whatever DECREASES the behavior. Yelling that doesn't change behavior isn't punishment at all. And punishment is not revenge: revenge is about hurting back; punishment is about teaching. This definition lets scientists study it calmly, measure it, and use it safely.",
      vocab: {
        revenge: { ipa: "/rɪˈvendʒ/", plain: "hurting someone back because they hurt you" },
        functional: { ipa: "/ˈfʌŋkʃənəl/", plain: "working; based on what it actually does" },
        calm: { ipa: "/kɑːm/", plain: "peaceful, not angry" }
      }
    },
    "U6-S2": {
      bridge: "Two ways to make behavior disappear: ADD something bad, or TAKE something good away. Both are punishment — but they feel completely different.",
      objectives: ["Distinguish positive and negative punishment.", "Identify each type in a real example."],
      pre: "A kid is rude, so the parent adds chores. Another kid is rude, so the parent cancels the movie. Both stop being rude. How were the two punishments different?",
      explain: "**Positive punishment** = ADD something unpleasant after the behavior (extra chores, a scolding, overcorrection). **Negative punishment** = REMOVE something the person enjoys after the behavior (lose the phone, lose recess, time-out from fun). Both DECREASE the behavior. Confusing? Remember: 'positive' means adding, 'negative' means removing — exactly like positive and negative reinforcement, except these DEcrease behavior. Time-out and response cost are the two famous negative punishments.",
      vocab: {
        positive: { ipa: "/ˈpɑːzətɪv/", plain: "adding something in" },
        negative: { ipa: "/ˈneɡətɪv/", plain: "taking something away" },
        privileges: { ipa: "/ˈprɪvəlɪdʒɪz/", plain: "special rights or treats you can lose" }
      }
    },
    "U6-S3": {
      bridge: "Burning your hand teaches you instantly, with zero lessons. But a stern 'NO' only works because you've learned what it means. Two kinds of punishers.",
      objectives: ["Distinguish unconditioned and conditioned punishers.", "Give an example of each."],
      pre: "Why does a toddler pull back from a hot stove with no training, but learn to fear the word 'NO' only after experience?",
      explain: "**Unconditioned punishers** are naturally unpleasant — intense heat, extreme cold, a strong shock, physical pain. No learning required; evolution built them in. **Conditioned punishers** become unpleasant by being paired with other punishers — the word 'NO', a stern look, a raised voice. A baby doesn't fear 'NO' at first, but after pairing with real consequences, the word alone becomes punishing. Conditioned punishers are useful because they're portable and safe.",
      vocab: {
        unconditioned: { ipa: "/ˌʌnkənˈdɪʃənd/", plain: "natural, no training needed" },
        conditioned: { ipa: "/kənˈdɪʃənd/", plain: "learned through experience" },
        aversion: { ipa: "/əˈvɜːrʒən/", plain: "a strong dislike" }
      }
    },
    "U6-S4": {
      bridge: "Four words, one confusion: positive/negative × reinforcement/punishment. Here's the cheat sheet that ends the confusion forever.",
      objectives: ["Build the 2×2 table of reinforcement and punishment.", "Classify a consequence into the right quadrant."],
      pre: "Sister gets dessert for sharing (sharing increases). Brother loses TV for hitting (hitting decreases). Name BOTH consequences using the +/− and reinforce/punish labels.",
      explain: "The 2×2 table of consequences: **Positive reinforcement** = add good → behavior increases. **Negative reinforcement** = remove bad → behavior increases. **Positive punishment** = add bad → behavior decreases. **Negative punishment** = remove good → behavior decreases. Two steps to classify any consequence: (1) does behavior go UP or DOWN? That tells you reinforce or punish. (2) Was something added or removed? That tells you positive or negative. Master this grid and half the book clicks into place.",
      vocab: {
        classify: { ipa: "/ˈklæsɪfaɪ/", plain: "to sort into groups" },
        quadrant: { ipa: "/ˈkwɑːdrənt/", plain: "one of four sections of a grid" },
        consequence: { ipa: "/ˈkɑːnsɪkwens/", plain: "what happens right after an action" }
      }
    },
    "U6-S5": {
      bridge: "A punishment that arrives a week later is a rumor, not a lesson. For punishment to teach, it must be immediate, certain, and strong enough to matter.",
      objectives: ["List the factors that make punishment effective.", "Explain immediacy and consistency."],
      pre: "Which teaches faster: a speeding ticket the moment you speed, or a fine that arrives in the mail a month later?",
      explain: "Punishment works best when it's **immediate** (right after the behavior), **contingent** (every time, no exceptions), and **strong enough** (magnitude) to outweigh the reward. It also depends on **motivating operations** — a punishment removes a privilege only if that privilege is valuable right now. And **individual differences** matter: what's punishing for one kid (losing screen time) might be fine for another. Consistency is everything — a punishment that comes only sometimes teaches 'maybe I'll get away with it'.",
      vocab: {
        immediate: { ipa: "/ɪˈmiːdiət/", plain: "right now, with no delay" },
        consistent: { ipa: "/kənˈsɪstənt/", plain: "the same every time" },
        outweigh: { ipa: "/ˌaʊtˈweɪ/", plain: "to be stronger or more important than" }
      }
    },
    "U6-S6": {
      bridge: "Punishment can backfire in four sneaky ways — and one of them is that the punisher gets hooked. Here's why punishment is a tricky tool.",
      objectives: ["List the side effects of punishment.", "Explain why punishment can be reinforcing for the punisher."],
      pre: "A teacher yells, the class quiets down for a moment, and the teacher feels relieved. What just reinforced the TEACHER?",
      explain: "Punishment has four famous problems. (1) **Emotional reactions**: fear and anger can attach to the punisher, not just the behavior. (2) **Escape and avoidance**: the person learns to hide, lie, or run — to dodge the punisher. (3) **Negative reinforcement for the punisher**: the behavior STOPS instantly, which feels great for the adult — so the adult gets hooked on punishing. (4) **Modeling**: punishers show aggression, and kids copy it. Punishment also has **ethical issues** — it must be the last resort, not the first.",
      vocab: {
        emotional: { ipa: "/ɪˈmoʊʃənəl/", plain: "connected to feelings" },
        aggressive: { ipa: "/əˈɡresɪv/", plain: "hostile or violent behavior" },
        ethical: { ipa: "/ˈeθɪkəl/", plain: "following rules about right and wrong" }
      }
    },
    "U6-S7": {
      bridge: "If punishment is so risky, when — if ever — is it OK to use it? Answer: rarely, carefully, and always wrapped in safeguards.",
      objectives: ["State the ethical requirements for using punishment.", "Explain why positive procedures come first."],
      pre: "A frustrated parent wants to yell louder until the kid obeys. What should a professional try FIRST, before any punishment?",
      explain: "Ethical punishment follows a checklist. Try **reinforcement-based** procedures first — always. Get **informed consent** (clear permission). Make sure **alternative treatments** were tried and failed. Consider whether the problem is **severe** enough to justify it. Follow strict **implementation guidelines**, with **training and supervision**, and **peer review** by other professionals. Track the data to prevent **misuse**. In short: punishment is a scalpel, not a hammer — used only when gentler tools fail.",
      vocab: {
        "informed consent": { ipa: "/ɪnˈfɔːrmd kənˈsent/", plain: "clear permission given with full information" },
        supervision: { ipa: "/ˌsuːpərˈvɪʒən/", plain: "watchful oversight by a trained person" },
        guidelines: { ipa: "/ˈɡaɪdlaɪnz/", plain: "rules that tell you how to do something right" }
      }
    },

    /* ============ UNIT 7 · Stimulus Control ============ */
    "U7-S0": {
      bridge: "You stop at a red light but cruise through a green one. Same car, same you — different signal. That's stimulus control running your driving.",
      objectives: ["Define stimulus control.", "Give an everyday example."],
      pre: "Why do you check your phone when it buzzes, but ignore it when it's silent? What's the stimulus?",
      explain: "**Stimulus control** means: a behavior is more likely when a specific thing is present, and less likely when it's not. The red light controls stopping; the green light controls going. The phone buzz controls checking. The behavior doesn't just happen randomly — a **stimulus** (a cue in the world) sets it off. This is one of the most useful ideas in the book: change the cues, change the behavior.",
      vocab: {
        stimulus: { ipa: "/ˈstɪmjələs/", plain: "something in the world that makes you react" },
        cue: { ipa: "/kjuː/", plain: "a signal that tells you what to do" },
        presence: { ipa: "/ˈprezəns/", plain: "being there" }
      }
    },
    "U7-S1": {
      bridge: "Turn the page, and the room goes quiet. The page didn't do anything — but it controls the class. How did it gain that power?",
      objectives: ["Explain what stimulus control is.", "Describe how a stimulus gains control over behavior."],
      pre: "How did your classroom learn to go quiet when the teacher stands at the front door? Was it instant?",
      explain: "**Stimulus control** is built by history. A stimulus gains control because, in the past, the behavior in its presence got rewarded. The teacher at the door → quiet → no reprimand. After enough repetitions, the sight alone triggers quiet. The behavior becomes more likely **in the presence** of the stimulus and less likely **in its absence**. That history of learning is the invisible engine behind almost every habit.",
      vocab: {
        history: { ipa: "/ˈhɪstəri/", plain: "everything that happened before" },
        trigger: { ipa: "/ˈtrɪɡər/", plain: "to set something off" },
        repetition: { ipa: "/ˌrepɪˈtɪʃən/", plain: "doing something again and again" }
      }
    },
    "U7-S2": {
      bridge: "Here's the training recipe: reward the behavior ONLY in front of one sign, never in front of another. Soon the behavior shows up only where it pays.",
      objectives: ["Explain stimulus discrimination training.", "Define the discriminative stimulus (SD) and the S-delta."],
      pre: "You want a dog to sit when you hold up a fist, but never when you hold up an open palm. What's the training rule?",
      explain: "**Discrimination training** is the recipe: reinforce the behavior in the presence of one stimulus, and NOT in the presence of another. The rewarded cue is the **discriminative stimulus (SD)** — it signals 'reward available'. The unrewarded cue is the **S-delta** — it signals 'no reward'. The dog learns: fist = sit = treat; palm = sit = nothing. Result: the behavior happens for the SD, not the S-delta. This is how we teach reading (letter shapes), spelling, and thousands of everyday discriminations.",
      vocab: {
        discrimination: { ipa: "/dɪˌskrɪmɪˈneɪʃən/", plain: "telling the difference between two signals" },
        delta: { ipa: "/ˈdeltə/", plain: "a symbol used for 'the other' stimulus" },
        available: { ipa: "/əˈveɪləbəl/", plain: "ready to be used or received" }
      }
    },
    "U7-S3": {
      bridge: "Three-part equation that explains all behavior: CUE → ACTION → REWARD. Psychologists call it the three-term contingency, and it's everywhere.",
      objectives: ["State the three-term contingency.", "Identify its parts in a real example."],
      pre: "Fill the blanks: The bell rings (___), the dog salivates (___), the food arrives (___). What are the three parts?",
      explain: "The **three-term contingency** is behavior in its simplest form: **Antecedent → Behavior → Consequence**. The antecedent (SD) sets the occasion, the behavior happens, and the consequence follows. Example: red light (antecedent) → you brake (behavior) → you avoid a ticket (consequence). Every behavior you study in this book can be squeezed into these three boxes. If you want to change behavior, you can change ANY of the three.",
      vocab: {
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" },
        contingency: { ipa: "/kənˈtɪndʒənsi/", plain: "the connection between action and result" },
        occasion: { ipa: "/əˈkeɪʒən/", plain: "a moment or event when something happens" }
      }
    },
    "U7-S4": {
      bridge: "How do scientists PROVE a stimulus controls behavior? They take the cue away and watch. If the behavior collapses, the cue was the boss.",
      objectives: ["Describe how stimulus control is demonstrated in research.", "Explain the role of differential reinforcement."],
      pre: "A student only raises their hand when the teacher wears glasses. How would you test whether the glasses really control the hand-raising?",
      explain: "Research shows stimulus control by manipulating the cue. Scientists **differentially reinforce**: reward the response when the SD is present, never when it's absent. Then they test: present the SD, present the S-delta, and compare. If the behavior reliably follows the SD and dies in the S-delta, control is proven. The secret ingredient is **differential reinforcement** — the same response is rewarded in one situation and not the other.",
      vocab: {
        demonstrate: { ipa: "/ˈdemənstreɪt/", plain: "to show clearly with evidence" },
        differential: { ipa: "/ˌdɪfəˈrenʃəl/", plain: "treating two things differently" },
        manipulate: { ipa: "/məˈnɪpjəleɪt/", plain: "to carefully control or change" }
      }
    },
    "U7-S5": {
      bridge: "Teach a kid that ALL four-legged animals are 'doggie' and you've got generalization. Teach them the difference between dog and cat — that's discrimination.",
      objectives: ["Define generalization.", "Explain how generalization and discrimination relate."],
      pre: "Your little cousin calls every animal with fur 'dog'. Is that a sign of confusion — or of learning?",
      explain: "**Generalization** is when a behavior spreads to NEW stimuli that are similar to the original. Learned 'doggie' on a golden retriever → calls a husky and a poodle 'doggie' too. It's a good thing (we don't need a separate lesson for every dog) but too much is sloppy. **Discrimination** is the opposite skill: telling similar things apart. The two sit on a sliding scale — the more similar a new stimulus is to the original, the more generalization; the less similar, the more discrimination. Life is a constant balance of both.",
      vocab: {
        generalization: { ipa: "/ˌdʒenrələˈzeɪʃən/", plain: "using a skill in new, similar situations" },
        similar: { ipa: "/ˈsɪmələr/", plain: "alike but not exactly the same" },
        continuum: { ipa: "/kənˈtɪnjuəm/", plain: "a scale with no gaps between ends" }
      }
    },
    "U7-S6": {
      bridge: "Learn that A is like B and B is like C — and your brain quietly figures out that A is like C, without anyone teaching it. That's stimulus equivalence, and it's how language explodes.",
      objectives: ["Define stimulus equivalence.", "Explain symmetry and transitivity."],
      pre: "You learn 'dog' = the picture, and the picture = the word 'dog'. Without another lesson, what else do you now know?",
      explain: "**Stimulus equivalence** is a mind-blowing property of learning. Train two relations — A→B and B→C — and learners derive new ones for free. **Symmetry**: if A means B, then B means A (picture ↔ word). **Transitivity**: if A→B and B→C, then A→C, never directly taught. This is why a child who learns 'cat' matches a picture, and the picture matches the furry animal, can suddenly label the real animal correctly. Equivalence makes learning explode without teaching every link.",
      vocab: {
        equivalence: { ipa: "/ɪˈkwɪvələns/", plain: "being equal or interchangeable" },
        symmetry: { ipa: "/ˈsɪmətri/", plain: "mirroring; if A=B then B=A" },
        transitive: { ipa: "/ˈtrænzətɪv/", plain: "passing through; A→C via A→B and B→C" }
      }
    },

    /* ============ UNIT 8 · Respondent Conditioning ============ */
    "U8-S0": {
      bridge: "A dog hears a bell and starts drooling — no food in sight. Pavlov turned a simple accident into the most famous experiment in psychology.",
      objectives: ["Describe Pavlov's classic experiment.", "Explain how a neutral stimulus becomes conditioned."],
      pre: "Your mouth waters when you see your favorite restaurant's logo. Nobody taught you that directly — so how did it happen?",
      explain: "**Respondent (classical) conditioning** is learning by PAIRING. Pavlov rang a bell, then gave a dog food. After repeating this, the bell ALONE made the dog salivate. The bell started as a **neutral stimulus** (no effect), became a **conditioned stimulus** (CS) that triggers the response. This isn't voluntary learning — it's automatic, like a reflex wired into the nervous system. Your mouth watering at a logo is the same process.",
      vocab: {
        respondent: { ipa: "/rɪˈspɑːndənt/", plain: "automatic; controlled by reflexes" },
        neutral: { ipa: "/ˈnuːtrəl/", plain: "having no effect; in the middle" },
        salivate: { ipa: "/ˈsælɪveɪt/", plain: "to produce saliva (mouth water)" }
      }
    },
    "U8-S1": {
      bridge: "Every reflex has a cast of characters: US, UR, CS, CR. Learn these four letters and you can read any conditioning story.",
      objectives: ["Define US, UR, CS, and CR.", "Label the parts of a conditioning example."],
      pre: "Food makes a dog drool naturally. A bell makes it drool only after training. Which one is the 'unconditioned' part?",
      explain: "Four terms run the show. The **unconditioned stimulus (US)** naturally triggers a response — food, no training needed. The **unconditioned response (UR)** is the natural reaction — drooling at food. The **conditioned stimulus (CS)** starts neutral but, after pairing, triggers the response — the bell. The **conditioned response (CR)** is the learned reaction — drooling at the bell. Same muscle, different trigger: the response looks similar, but one is built-in and one is learned.",
      vocab: {
        unconditioned: { ipa: "/ˌʌnkənˈdɪʃənd/", plain: "natural, no training needed" },
        conditioned: { ipa: "/kənˈdɪʃənd/", plain: "learned through experience" },
        elicits: { ipa: "/ɪˈlɪsɪts/", plain: "brings out an automatic response" }
      }
    },
    "U8-S2": {
      bridge: "In conditioning, order matters more than almost anything. The signal must come FIRST — a bell after dinner teaches nothing.",
      objectives: ["Explain why the neutral stimulus must precede the US.", "Describe the optimal timing for conditioning."],
      pre: "Which pairing would teach a dog faster: bell THEN food, or food THEN bell? Why?",
      explain: "For conditioning to stick, the **neutral stimulus must come before or at the same time as the US** — the bell must predict the food. If the food comes FIRST and the bell after, the bell announces nothing, and little is learned (that's called backward pairing). The strongest learning happens when the CS starts just before the US and overlaps it — the signal reliably predicts what's coming.",
      vocab: {
        precede: { ipa: "/prɪˈsiːd/", plain: "to come before" },
        overlap: { ipa: "/ˌoʊvərˈlæp/", plain: "to happen at the same time, partly covering" },
        predict: { ipa: "/prɪˈdɪkt/", plain: "to say what will happen next" }
      }
    },
    "U8-S3": {
      bridge: "Once a bell can make you drool, pair a new sound with the bell — and the new sound learns the trick too. Conditioning can stack.",
      objectives: ["Explain higher-order conditioning.", "Give an example of a second-order conditioned stimulus."],
      pre: "A cat fears the vet's office. Now it starts fearing the car that drives to the vet — without ever being hurt in the car. How?",
      explain: "**Higher-order conditioning** is conditioning on top of conditioning. First, a bell (CS1) is paired with food, so the bell triggers drooling. Then a light is paired with the BELL (not the food). Soon the light alone triggers drooling. The cat that fears the vet (CS1) starts fearing the car (CS2) because the car predicts the vet. This is how fears, likes, and cravings spread to whole chains of places, people, and things.",
      vocab: {
        "higher-order": { ipa: "/ˈhaɪər ˈɔːrdər/", plain: "built on top of earlier learning" },
        chain: { ipa: "/tʃeɪn/", plain: "a series of linked things" },
        trigger: { ipa: "/ˈtrɪɡər/", plain: "to set something off" }
      }
    },
    "U8-S4": {
      bridge: "A dog bite once, and now every dog makes your heart race. That's not 'being dramatic' — that's a conditioned emotional response, and your body learned it.",
      objectives: ["Define conditioned emotional response (CER).", "Explain how phobias can form through pairing."],
      pre: "After a scary fall from a bike, a child trembles at the sight of ANY bike. What got conditioned to what?",
      explain: "A **conditioned emotional response (CER)** is an automatic emotional reaction — fear, joy, disgust — triggered by a learned cue. The bike (neutral) was paired with a scary crash (US), so the bike became a CS that now triggers fear. This is how **phobias** are born and also how positive feelings attach to songs, places, and people. CERs explain why emotions seem 'irrational' — the body learned the pairing even when the mind didn't choose it.",
      vocab: {
        emotional: { ipa: "/ɪˈmoʊʃənəl/", plain: "connected to feelings" },
        phobia: { ipa: "/ˈfoʊbiə/", plain: "an extreme, unreasonable fear" },
        irrational: { ipa: "/ɪˈræʃənəl/", plain: "not based on logic" }
      }
    },
    "U8-S5": {
      bridge: "Scared of dogs? The cure might be meeting dogs over and over with nothing bad happening — until the fear fades. That's respondent extinction.",
      objectives: ["Define respondent extinction.", "Explain spontaneous recovery in respondent learning."],
      pre: "If a bell makes you drool, what happens if the bell rings 50 times with NO food following?",
      explain: "**Respondent extinction** = present the conditioned stimulus (the bell) repeatedly WITHOUT the US (no food). The response weakens and eventually disappears. The fear fades when the dog shows up and nothing bad happens. But watch out: **spontaneous recovery** happens here too — the fear may briefly return, then fade again if you keep going. The key is to keep presenting the CS safely until the automatic response truly dies.",
      vocab: {
        extinction: { ipa: "/ɪkˈstɪŋkʃən/", plain: "making a behavior die by removing what feeds it" },
        fade: { ipa: "/feɪd/", plain: "to slowly become weaker" },
        repeated: { ipa: "/rɪˈpiːtɪd/", plain: "done again and again" }
      }
    },
    "U8-S6": {
      bridge: "Learn to fear one spider and every spider looks scary. But maybe not tarantulas-from-afar vs tiny-house-spiders — your body generalizes AND discriminates.",
      objectives: ["Explain respondent generalization.", "Explain respondent discrimination."],
      pre: "A child fears the dentist's drill. Do they also flinch at a hair dryer? At a vacuum? Why or why not?",
      explain: "**Respondent generalization**: the conditioned response spreads to stimuli SIMILAR to the CS. Fear of one spider → fear of all spiders, then maybe even spider pictures. **Respondent discrimination**: the response stays specific to the CS, because only the CS was paired with the US. If the drill (but never the hair dryer) predicted pain, only the drill triggers flinching. The more similar a new stimulus is to the CS, the stronger the generalized response.",
      vocab: {
        generalize: { ipa: "/ˈdʒenrəlaɪz/", plain: "to spread to similar situations" },
        discriminate: { ipa: "/dɪˈskrɪmɪneɪt/", plain: "to tell the difference" },
        similar: { ipa: "/ˈsɪmələr/", plain: "alike but not exactly the same" }
      }
    },
    "U8-S7": {
      bridge: "Some bells condition fast, some condition never. What makes the difference? Four dials control how strong the learning gets.",
      objectives: ["List the factors that strengthen respondent conditioning.", "Explain why number of pairings and reliability matter."],
      pre: "Which produces a stronger fear: being scared by a dog once, or being scared by a dog every day for a month?",
      explain: "Four factors turn the dial. (1) **Nature of the stimuli**: strong, clear USs condition better. (2) **Temporal relationship**: CS just before US = best. (3) **Contingency**: the US must reliably FOLLOW the CS — a random US teaches nothing. (4) **Number of pairings**: more pairings = stronger conditioning. One more: **previous exposure** to the CS can slow conditioning — a dog that was already familiar to you is harder to turn into a fear trigger than a brand-new one.",
      vocab: {
        temporal: { ipa: "/ˈtempərəl/", plain: "related to time" },
        reliable: { ipa: "/rɪˈlaɪəbəl/", plain: "dependable; happens every time" },
        exposure: { ipa: "/ɪkˈspoʊʒər/", plain: "being in contact with something" }
      }
    },
    "U8-S8": {
      bridge: "Two learning machines run your brain. One is a reflex: cue → automatic response. The other is a choice: action → consequence. Never mix them up.",
      objectives: ["Distinguish operant and respondent conditioning.", "Classify an example as operant or respondent."],
      pre: "A dog drools at a bell. A dog presses a lever for food. Which is 'automatic' and which is a 'choice'?",
      explain: "**Respondent** behavior is **elicited** — pulled out automatically by a stimulus, like drooling at a bell. The animal doesn't choose; it's a reflex. **Operant** behavior is **emitted** — voluntarily performed, and shaped by its **consequences**, like pressing a lever to earn food. Simple test: does the behavior depend on what FOLLOWS it (operant) or is it triggered automatically by what PRECEDES it (respondent)? Knowing which engine is running tells you which tool to use to change it.",
      vocab: {
        operant: { ipa: "/ˈɑːpərənt/", plain: "chosen behavior controlled by results" },
        emitted: { ipa: "/ɪˈmɪtɪd/", plain: "sent out; produced voluntarily" },
        voluntary: { ipa: "/ˈvɑːlənteri/", plain: "done by choice" }
      }
    },

    /* ============ UNIT 9 · Shaping ============ */
    "U9-S0": {
      bridge: "A baby says 'baba' and the whole family cheers. Little by little, 'baba' becomes 'bottle'. That slow, patient staircase is shaping.",
      objectives: ["Describe the classic example of shaping speech.", "Explain the idea of successive approximations."],
      pre: "How do you get from a baby's random 'gaga' to a real word like 'bottle'? What does the parent reward along the way?",
      explain: "The famous example: a child with autism, Ricky, learned to talk through shaping. You can't wait for a perfect word to appear — instead you reward **successive approximations**: first any sound, then a closer sound, then a word-like sound, then the real word. Each small step that gets closer to the goal is reinforced. It's like climbing stairs — you can't jump to the top, but you can take each step.",
      vocab: {
        approximation: { ipa: "/əˌprɑːksɪˈmeɪʃən/", plain: "a close guess or a step close to the goal" },
        successive: { ipa: "/səkˈsesɪv/", plain: "one after another" },
        reinforcement: { ipa: "/ˌriːɪnˈfɔːrsmənt/", plain: "strengthening behavior with rewards" }
      }
    },
    "U9-S1": {
      bridge: "You can't demand a behavior that doesn't exist yet. Shaping is the art of building it piece by piece, rewarding every step that points the right way.",
      objectives: ["Define shaping.", "Explain why shaping is used for NEW behaviors."],
      pre: "Can you reward 'speaking French' tomorrow if your friend speaks zero French today? What would you reward instead?",
      explain: "**Shaping** is **differential reinforcement of successive approximations**: you reward closer-and-closer versions of the target behavior, and stop rewarding the old, farther-away versions. It's for behaviors the person CAN'T do yet. You can't reinforce a behavior that never happens — so you reinforce the closest thing that DOES happen, then raise the bar. Little by little, the behavior grows into the target.",
      vocab: {
        shaping: { ipa: "/ˈʃeɪpɪŋ/", plain: "building a new behavior step by step" },
        approximation: { ipa: "/əˌprɑːksɪˈmeɪʃən/", plain: "a step close to the goal" },
        differential: { ipa: "/ˌdɪfəˈrenʃəl/", plain: "treating different steps differently" }
      }
    },
    "U9-S2": {
      bridge: "Shaping isn't just for baby talk — it helped a woman walk again after illness and helped another woman space out bathroom trips. Real lives, real steps.",
      objectives: ["Describe two real applications of shaping.", "Explain how shaping targets duration and distance."],
      pre: "After a stroke, Mrs. F can barely stand. How could a therapist get her walking again using tiny steps and rewards?",
      explain: "In the book, shaping rebuilt **Mrs. F's walking**: first standing, then a step, then two, then walking across the room — each success rewarded, each new bar raised. For **Mrs. S**, shaping stretched the TIME between bathroom visits, slowly increasing the interval that earned reinforcement. Shaping isn't just about 'more of something' — it can shape **duration**, **distance**, **loudness**, any dimension you can measure and reward.",
      vocab: {
        application: { ipa: "/ˌæplɪˈkeɪʃən/", plain: "a real-world use" },
        duration: { ipa: "/dʊˈreɪʃən/", plain: "how long something lasts" },
        rehabilitation: { ipa: "/ˌriːəˌbɪlɪˈteɪʃən/", plain: "helping someone recover skills" }
      }
    },
    "U9-S3": {
      bridge: "From pigeons pecking dials to children speaking — research shows shaping works across species and ages. The recipe is the same everywhere.",
      objectives: ["Summarize research support for shaping.", "Explain why shaping works with animals and humans."],
      pre: "Researchers once taught pigeons to PECK a tiny disk to earn food — a behavior pigeons don't naturally have. What had to happen first?",
      explain: "Research on shaping shows it works in labs and real life, with animals and people. The famous demonstrations: pigeons learned to peck disks and even 'bowl' by rolling a ball. The trick in every study is the same — **start where the learner is**, reward the next small step, and keep raising the bar. Because shaping builds on whatever exists, it never demands the impossible.",
      vocab: {
        research: { ipa: "/ˈriːsɜːrtʃ/", plain: "careful study to learn new facts" },
        demonstrate: { ipa: "/ˈdemənstreɪt/", plain: "to show clearly with evidence" },
        species: { ipa: "/ˈspiːʃiːz/", plain: "a type of animal" }
      }
    },
    "U9-S4": {
      bridge: "Want to shape someone's behavior? There's a 5-step recipe — and the most important step is knowing exactly what the final 'target' looks like.",
      objectives: ["List the steps for using shaping.", "Explain how to choose the starting approximation."],
      pre: "You want to shape your friend from 'never exercising' to 'running 5km'. What's the FIRST behavior you'd reward?",
      explain: "The shaping recipe: (1) **Define the target behavior** — know exactly where you're going. (2) **Pick a starting point** — the closest behavior the person can already do. (3) **Reinforce that first step** every time. (4) **Raise the criterion** — once the step is solid, stop rewarding it and reward the next closer step. (5) **Repeat** until you reach the target. Patience is the whole game — rush the steps and the behavior collapses.",
      vocab: {
        criterion: { ipa: "/kraɪˈtɪriən/", plain: "the standard you must meet" },
        target: { ipa: "/ˈtɑːrɡɪt/", plain: "the final goal" },
        repeat: { ipa: "/rɪˈpiːt/", plain: "to do again" }
      }
    },
    "U9-S5": {
      bridge: "Shaping can go wrong: parents can accidentally shape a tiny whine into a full-blown scream — one 'fine, here's candy' at a time.",
      objectives: ["Explain how problem behaviors can be shaped accidentally.", "Describe how to prevent accidental shaping."],
      pre: "A kid whines quietly, mom ignores it. The kid whines louder, mom gives in. What did the kid just learn about volume?",
      explain: "The scary flip side: shaping works even when nobody plans it. If a parent only gives in when the whining becomes screaming, the parent has **differentially reinforced** louder and louder whining — shaping a tantrum machine. The same accidental shaping builds shyness, aggression, or giving up. Prevention: decide in advance which behaviors you'll reward, and never reward the escalation. Consistency is the antidote.",
      vocab: {
        accidental: { ipa: "/ˌæksɪˈdentəl/", plain: "unplanned; by mistake" },
        escalate: { ipa: "/ˈeskəleɪt/", plain: "to get worse or more intense" },
        consistent: { ipa: "/kənˈsɪstənt/", plain: "the same every time" }
      }
    },

    /* ============ UNIT 10 · Prompting & Transfer of Stimulus Control ============ */
    "U10-S0": {
      bridge: "Little tee-ball players can't hit a moving ball — so coaches hold the ball still, then make it harder. Guiding first, freedom later. That's prompting and fading.",
      objectives: ["Describe the tee-ball example.", "Explain how prompts are removed over time."],
      pre: "How do you teach a kid to catch a ball? Do you throw fast right away — or make it easier first, then gradually harder?",
      explain: "Tee-ball coaches start with the ball on a **tee** — still and easy. As kids improve, the ball is pitched slowly, then faster. The 'help' (the tee) is **faded** until the child hits a real pitch. The same idea runs through teaching: give extra help (**prompts**), then gradually remove it so the skill stands on its own.",
      vocab: {
        prompt: { ipa: "/prɑːmpt/", plain: "extra help or a hint to get the right answer" },
        fade: { ipa: "/feɪd/", plain: "to slowly remove" },
        guide: { ipa: "/ɡaɪd/", plain: "to help someone along" }
      }
    },
    "U10-S1": {
      bridge: "A nudge, a hint, a finger pointing the way — these are prompts. They're training wheels: essential at first, embarrassing forever.",
      objectives: ["Define a prompt.", "Explain when prompts are used."],
      pre: "When a teacher points at the correct answer on the board, is she 'giving away' the answer — or helping a student learn?",
      explain: "A **prompt** is an extra antecedent stimulus that makes the correct response MORE likely. It can be a verbal hint ('try the left side'), a gesture (pointing), or physical help (guiding a hand). Prompts are used when the behavior is **new** and the learner needs help to get it right. They're not cheating — they're training wheels that let the learner succeed NOW, so success can be reinforced.",
      vocab: {
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" },
        verbal: { ipa: "/ˈvɜːrbəl/", plain: "using words" },
        gesture: { ipa: "/ˈdʒestʃər/", plain: "a movement that communicates, like pointing" }
      }
    },
    "U10-S2": {
      bridge: "The training wheels come off — slowly. Fading is the art of removing help so gently that the skill never notices it's alone.",
      objectives: ["Define fading.", "Explain the goal of fading."],
      pre: "If you remove ALL the help at once, the learner fails and the skill collapses. What's the smarter way to remove help?",
      explain: "**Fading** is the gradual removal of a prompt until the behavior happens on its own. The key word is **gradual** — a little less help each time, so the learner keeps succeeding. The final goal: the behavior is controlled by the **natural cue** (the real-world SD), not by the prompt. If the child can only read when you point, fading isn't done. The test of fading: remove yourself completely and see if the skill survives.",
      vocab: {
        fade: { ipa: "/feɪd/", plain: "to slowly remove" },
        natural: { ipa: "/ˈnætʃərəl/", plain: "occurring in the real world, not artificial" },
        transfer: { ipa: "/trænsˈfɜːr/", plain: "to move from one thing to another" }
      }
    },
    "U10-S3": {
      bridge: "Prompts come in two flavors: someone shows/tells you what to do (response prompts), or the object itself is made easier to see (stimulus prompts).",
      objectives: ["Distinguish response prompts and stimulus prompts.", "Give examples of each."],
      pre: "Two ways to help a student spell 'CAT': whisper the letters, OR make the C bigger and bolder on the page. Which is a response prompt and which is a stimulus prompt?",
      explain: "**Response prompts** involve another person's behavior: **verbal** instructions ('say it louder'), **modeling** (watch me), or **physical guidance** (moving the learner's hand). **Stimulus prompts** change the object itself: making the letter bigger, bolder, or brighter, or rearranging the answer choices. Response prompts teach by showing; stimulus prompts teach by highlighting. Both get faded eventually.",
      vocab: {
        modeling: { ipa: "/ˈmɑːdəlɪŋ/", plain: "demonstrating so someone can copy you" },
        physical: { ipa: "/ˈfɪzɪkəl/", plain: "using the body" },
        highlight: { ipa: "/ˈhaɪlaɪt/", plain: "to make something stand out" }
      }
    },
    "U10-S4": {
      bridge: "The final boss of teaching: transfer. The skill must move from 'helped' to 'independent' — using fading, delay, and clever stimulus tricks.",
      objectives: ["Explain the three transfer methods: fading, prompt delay, stimulus fading.", "Describe prompt delay."],
      pre: "A teacher wants students to stop needing her hints. Name at least two ways she could slowly take the hints away.",
      explain: "**Transfer of stimulus control** moves behavior from the prompt to the natural cue. Three tools: **prompt fading** (less help each trial), **prompt delay** (wait a few seconds before giving the prompt — the learner gets a chance to answer on their own), and **stimulus fading** (slowly make the stimulus prompt less exaggerated until it looks normal). The gold standard: the learner responds correctly WITHOUT any help at all.",
      vocab: {
        transfer: { ipa: "/trænsˈfɜːr/", plain: "to move from one thing to another" },
        delay: { ipa: "/dɪˈleɪ/", plain: "to wait before doing something" },
        independent: { ipa: "/ˌɪndɪˈpendənt/", plain: "not needing help" }
      }
    },
    "U10-S5": {
      bridge: "A step-by-step plan makes prompting work: define the behavior, pick the prompt, reinforce success, then gently fade away.",
      objectives: ["List the steps for using prompting and fading.", "Explain how reinforcement supports fading."],
      pre: "You're teaching a friend to tie shoes. What's your plan: define the goal, then what?",
      explain: "The recipe: (1) **Define the target behavior** and the natural cue that should control it. (2) **Choose the most helpful prompt** — start with the strongest you need. (3) **Reinforce correct prompted responses**. (4) **Fade** the prompt gradually. (5) **Reinforce independent responses** — the whole point is success WITHOUT help. Reinforce the unprompted successes most, so independence becomes rewarding.",
      vocab: {
        procedure: { ipa: "/prəˈsiːdʒər/", plain: "a set of steps to follow" },
        reinforce: { ipa: "/ˌriːɪnˈfɔːrs/", plain: "to strengthen with rewards" },
        gradually: { ipa: "/ˈɡrædʒuəli/", plain: "slowly, step by step" }
      }
    },
    "U10-S6": {
      bridge: "For kids with autism, prompting and fading aren't just helpful — they're the heart of therapy, teaching everything from pointing to speaking.",
      objectives: ["Explain the role of prompting in autism treatment.", "Describe how transfer to natural stimuli is achieved."],
      pre: "If a child with autism only says 'hello' when a therapist taps her shoulder, has teaching really worked? What's missing?",
      explain: "In autism treatment, prompting and fading build communication, play, and daily skills. The danger is **prompt dependency** — the child responds only to the helper, not the real world. So therapists work hard on **transfer**: the greeting must happen when a person walks in (natural cue), not when the shoulder is tapped. Fading and delay are used relentlessly so skills belong to the child, not the therapist.",
      vocab: {
        dependency: { ipa: "/dɪˈpendənsi/", plain: "needing help to do something" },
        therapy: { ipa: "/ˈθerəpi/", plain: "treatment to improve a condition" },
        social: { ipa: "/ˈsoʊʃəl/", plain: "related to interacting with people" }
      }
    },
    "U10-S7": {
      bridge: "Why do we say the things we say? Skinner's answer: words are behaviors too — requests, labels, echoes, and answers each run on different engines.",
      objectives: ["Define the four verbal operants: mand, tact, echoic, intraverbal.", "Classify an utterance into the right verbal operant."],
      pre: "A kid says 'juice' because she's thirsty. A kid says 'juice' because she sees the box. Same word — different reasons. Can you spot the difference?",
      explain: "Skinner classified verbal behavior by what controls it. **Mand**: a request controlled by need — 'juice' because I'm thirsty (and juice is the reward). **Tact**: a label controlled by what you SEE — 'juice' because the box is there. **Echoic**: repeating what you heard — 'juice' after someone says it. **Intraverbal**: an answer controlled by other words — 'What do you drink?' → 'juice'. The same word can be four different behaviors depending on why it happens.",
      vocab: {
        mand: { ipa: "/mænd/", plain: "a request; asking for what you need" },
        tact: { ipa: "/tækt/", plain: "labeling something you see" },
        echoic: { ipa: "/eˈkoʊɪk/", plain: "copying a sound you just heard" },
        intraverbal: { ipa: "/ˌɪntrəˈvɜːrbəl/", plain: "answering; controlled by other words" }
      }
    },

    /* ============ UNIT 11 · Chaining ============ */
    "U11-S0": {
      bridge: "Brushing your teeth looks like ONE behavior — but it's really 20 small steps linked together. Each step is a domino that knocks over the next.",
      objectives: ["Define a behavioral chain.", "Explain how each response in a chain cues the next."],
      pre: "List the steps of brushing your teeth. Now imagine teaching it to an alien. Are those steps one behavior or many?",
      explain: "A **behavioral chain** is a sequence of behaviors where each response produces a stimulus that triggers the next. Pick up toothbrush → see toothpaste → put paste on → reach toward mouth... Each step's result becomes the **cue** for the next step. Chains make complex skills look automatic — but they're built link by link.",
      vocab: {
        chain: { ipa: "/tʃeɪn/", plain: "a series of linked things" },
        sequence: { ipa: "/ˈsiːkwəns/", plain: "a set order of steps" },
        automatic: { ipa: "/ˌɔːtəˈmætɪk/", plain: "done without thinking" }
      }
    },
    "U11-S1": {
      bridge: "To teach a chain, first take it apart. Psychologists draw every link: response → stimulus → response → stimulus. That map is gold.",
      objectives: ["Explain how to analyze a stimulus–response chain.", "Diagram a simple chain."],
      pre: "Your job: teach 'make a sandwich' to a robot. What's the first thing you need before teaching any step?",
      explain: "Analyzing a chain means breaking it into its **stimulus–response links**. Each link has two parts: the response you do, and the stimulus change it produces (which cues the next response). Draw it like dominoes: R1→S1, R2→S2, R3→S3... This map shows exactly where to start teaching, where learners get stuck, and which links are missing.",
      vocab: {
        stimulus: { ipa: "/ˈstɪmjələs/", plain: "something in the world that makes you react" },
        link: { ipa: "/lɪŋk/", plain: "one connection in a chain" },
        analyze: { ipa: "/ˈænəlaɪz/", plain: "to look closely and figure out the parts" }
      }
    },
    "U11-S2": {
      bridge: "A task analysis is a recipe for behavior — a numbered list of every single step. No step is too small to write down.",
      objectives: ["Define a task analysis.", "Explain how task analyses are developed."],
      pre: "Write down the steps to 'wash your hands'. Did you forget the soap? The tap? See how easy steps are to skip?",
      explain: "A **task analysis** is a complete, numbered list of all the steps in a task, from start to finish. To build one, watch a skilled person do the task and write down EVERYTHING they do, in order — 'turn on tap', 'wet hands', 'get soap'... Each step becomes a teachable link. Task analyses turn vague skills ('be independent') into concrete checklists anyone can follow and teachers can check.",
      vocab: {
        analysis: { ipa: "/əˈnæləsɪs/", plain: "a careful breakdown of something" },
        checklist: { ipa: "/ˈtʃeklɪst/", plain: "a list of things to check off" },
        sequential: { ipa: "/sɪˈkwenʃəl/", plain: "in a fixed order" }
      }
    },
    "U11-S3": {
      bridge: "Tie your shoes from the LAST step backwards? It sounds crazy — but backward chaining ends every practice with a win, and that's the point.",
      objectives: ["Explain backward chaining.", "Describe its advantage for motivation."],
      pre: "You teach a kid to put on a shirt, but they only master the last step today. Why is ending at the 'shirt over head' moment a good win?",
      explain: "In **backward chaining**, you teach the FINAL step first, and the teacher does everything before it. The learner completes the last step, finishing the whole chain — and gets the natural reward. Next time, the learner does the last TWO steps, and so on. The magic: every single practice ends with the learner **completing the chain successfully**. That's motivating, and the final step's reward reinforces the whole chain.",
      vocab: {
        backward: { ipa: "/ˈbækwərd/", plain: "in reverse; from the end to the start" },
        chaining: { ipa: "/ˈtʃeɪnɪŋ/", plain: "teaching a chain of behaviors" },
        complete: { ipa: "/kəmˈpliːt/", plain: "to finish the whole thing" }
      }
    },
    "U11-S4": {
      bridge: "Forward chaining goes the logical way: teach step 1 first, then step 2, then step 3 — building the chain from the start.",
      objectives: ["Explain forward chaining.", "Compare it with backward chaining."],
      pre: "Teaching 'load the dishwasher': if the learner starts at step 1 and the teacher does the rest, which end of the chain grows over time?",
      explain: "In **forward chaining**, you teach the FIRST step first, then add steps one at a time in order. Step 1 mastered → add step 2 → add step 3... The learner always practices from the beginning, and the teacher finishes the tail end. It's logical and easy to track. The downside: early practice sessions don't end with the natural reward (the chain isn't finished). Backward chaining wins on motivation; forward chaining wins on pure logic.",
      vocab: {
        forward: { ipa: "/ˈfɔːrwərd/", plain: "from the start to the end" },
        logical: { ipa: "/ˈlɑːdʒɪkəl/", plain: "making sense, following a sensible order" },
        mastered: { ipa: "/ˈmæstərd/", plain: "learned perfectly" }
      }
    },
    "U11-S5": {
      bridge: "Some learners don't need baby steps — they can run the whole chain at once, with a coach fixing mistakes along the way. That's total task training.",
      objectives: ["Explain total task presentation.", "State when it is the best choice."],
      pre: "If a teenager can already do 8 of 10 steps of cooking, do they need to relearn step by step? What's a faster approach?",
      explain: "**Total task presentation** (whole-task training) means the learner practices the ENTIRE chain every time, start to finish, with prompts and help as needed. It works best when the learner already has most of the steps — they just need to glue them together. Instead of drilling one step, they run the whole skill and get feedback throughout. It's how most of us learn to ride a bike: all at once, with someone steadying the seat.",
      vocab: {
        entire: { ipa: "/ɪnˈtaɪər/", plain: "the whole thing" },
        practice: { ipa: "/ˈpræktɪs/", plain: "doing something to get better" },
        feedback: { ipa: "/ˈfiːdbæk/", plain: "information about how you did" }
      }
    },
    "U11-S6": {
      bridge: "Chains can be taught with more than hands-on practice: written checklists, picture cards, videos, or even talking yourself through it.",
      objectives: ["Describe four additional strategies for teaching chains.", "Give an example of each."],
      pre: "How could picture cards help someone learn to do laundry — without a teacher present?",
      explain: "Four extra tools teach chains: **written task analysis** — a checklist the learner follows; **picture prompts** — photos of each step, taped by the machine; **video modeling** — watch the whole chain on screen first; and **self-instructions** — the learner tells themselves each step ('turn it on, add detergent...'). These make chains teachable anywhere, anytime, without a coach in the room.",
      vocab: {
        modeling: { ipa: "/ˈmɑːdəlɪŋ/", plain: "demonstrating so someone can copy you" },
        instruction: { ipa: "/ɪnˈstrʌkʃən/", plain: "a direction telling you what to do" },
        strategy: { ipa: "/ˈstrætədʒi/", plain: "a plan or method" }
      }
    },
    "U11-S7": {
      bridge: "The chaining playbook: analyze first, choose your direction, pick your tools, and reinforce every link until the chain runs on its own.",
      objectives: ["List the steps for using chaining procedures.", "Explain how prompts support chain teaching."],
      pre: "You're teaching 'make a bed' to a young child. Put these in order: analyze the steps, choose the direction, pick the tools, reward progress.",
      explain: "The chaining recipe: (1) **Do a task analysis** — list every step. (2) **Choose the direction** — backward, forward, or total task, based on the learner. (3) **Pick teaching aids** — prompts, checklists, pictures, videos. (4) **Reinforce each link** and fade the prompts. (5) **Test the full chain** — the learner runs it alone. Each step is small enough to master, and the chain is only as strong as its weakest link.",
      vocab: {
        procedure: { ipa: "/prəˈsiːdʒər/", plain: "a set of steps to follow" },
        reinforce: { ipa: "/ˌriːɪnˈfɔːrs/", plain: "to strengthen with rewards" },
        weakest: { ipa: "/ˈwiːkɪst/", plain: "the least strong" }
      }
    },

    /* ============ UNIT 12 · Behavioral Skills Training ============ */
    "U12-S0": {
      bridge: "Marcia couldn't say 'no' to a pushy professor. Kids couldn't escape a kidnapper. Both were fixed with the same four-step recipe — behavioral skills training.",
      objectives: ["Describe the BST examples in the book.", "Explain why skills must be actively trained."],
      pre: "Would a child who 'knows' stranger danger actually run away from a real stranger? Is knowing the same as doing?",
      explain: "The chapter's heroes: **Marcia**, who learned to refuse unreasonable requests from professors, and **children**, who learned to protect themselves from abduction. The insight: telling kids about danger isn't enough. Skills must be **practiced** until they're automatic. That's what **behavioral skills training (BST)** does — it turns knowledge into actual performance.",
      vocab: {
        abduction: { ipa: "/æbˈdʌkʃən/", plain: "being taken away by force" },
        assertively: { ipa: "/əˈsɜːrtɪvli/", plain: "confidently standing up for yourself" },
        rehearsal: { ipa: "/rɪˈhɜːrsəl/", plain: "practicing before the real moment" }
      }
    },
    "U12-S1": {
      bridge: "Four ingredients, one powerful recipe: tell them (instructions), show them (modeling), let them try (rehearsal), and tell them how they did (feedback).",
      objectives: ["List the four components of BST.", "Explain why all four are needed."],
      pre: "Your friend wants to learn to do a magic trick. What's more useful: you explaining it, or you doing it once while they watch?",
      explain: "**BST** = **Instructions + Modeling + Rehearsal + Feedback**. First, **instruct**: explain the skill and why it matters. Then **model**: demonstrate it correctly. Then **rehearse**: the learner practices in a role-play. Then **feedback**: praise what was right and correct what wasn't. Any one alone is weak; the four together build skills that actually show up in real life.",
      vocab: {
        components: { ipa: "/kəmˈpoʊnənts/", plain: "the parts that make up something" },
        instruction: { ipa: "/ɪnˈstrʌkʃən/", plain: "a direction telling you what to do" },
        rehearsal: { ipa: "/rɪˈhɜːrsəl/", plain: "practicing before the real moment" }
      }
    },
    "U12-S2": {
      bridge: "The first two BST ingredients are the 'showing' half: instructions paint the picture, modeling acts it out. Together they set the stage.",
      objectives: ["Explain the role of instructions in BST.", "Explain the role of modeling in BST."],
      pre: "Why does a coach both EXPLAIN a tennis serve AND demonstrate it, instead of just doing one?",
      explain: "**Instructions** are clear verbal rules: 'When someone asks you to do something you don't want to do, look them in the eye and say NO.' They tell the learner WHAT to do and WHY. **Modeling** is watching a correct demonstration — live or on video. Words alone can be forgotten; seeing it makes the skill real. Modeling also shows the learner the standard to aim for.",
      vocab: {
        demonstrate: { ipa: "/ˈdemənstreɪt/", plain: "to show clearly how to do something" },
        rationale: { ipa: "/ˌræʃəˈnæl/", plain: "the reason behind something" },
        standard: { ipa: "/ˈstændərd/", plain: "the level of quality to aim for" }
      }
    },
    "U12-S3": {
      bridge: "The last two BST ingredients are the 'doing' half: rehearsal is where the skill gets built, and feedback is the mirror that shows it.",
      objectives: ["Explain rehearsal in BST.", "Explain how feedback should be delivered."],
      pre: "You watched a video of a perfect interview and heard great tips. Will you now ace a real interview without ever practicing?",
      explain: "**Rehearsal** is the learner practicing the skill in a role-play, over and over, until it feels natural. **Feedback** follows every rehearsal: start with genuine **praise** for what was right ('great eye contact!'), then give a **correction** for what to improve ('say 'no' a little sooner'), and let them try again. The cycle — practice, feedback, practice — is what turns a shaky attempt into a solid skill.",
      vocab: {
        "role-play": { ipa: "/ˈroʊl pleɪ/", plain: "acting out a real situation for practice" },
        correction: { ipa: "/kəˈrekʃən/", plain: "a fix for a mistake" },
        praise: { ipa: "/preɪz/", plain: "saying something good about what someone did" }
      }
    },
    "U12-S4": {
      bridge: "A skill that only works in the training room is a trick, not a skill. BST plans for real life from day one.",
      objectives: ["Explain how to enhance generalization after BST.", "Give examples of programming generalization."],
      pre: "A child practices saying 'no' only with their therapist. Will they say 'no' to a stranger at the park? What might help?",
      explain: "Skills trained in one room can stay trapped in that room. To **generalize** BST, mix it up: train with different people (mom, teacher, stranger), in different places (home, school, park), with different situations. Use **in situ** (real-life) practice. If the skill only works in front of the trainer, the training isn't done. Generalization must be **programmed**, not hoped for.",
      vocab: {
        generalize: { ipa: "/ˈdʒenrəlaɪz/", plain: "to spread to new situations" },
        programming: { ipa: "/ˈproʊɡræmɪŋ/", plain: "deliberately planning something in" },
        variety: { ipa: "/vəˈraɪəti/", plain: "different kinds of things" }
      }
    },
    "U12-S5": {
      bridge: "Here's the honesty test: send the learner into a real situation, unannounced, and see if the skill shows up. No warnings. That's in situ assessment.",
      objectives: ["Define in situ assessment.", "Explain in situ training."],
      pre: "How would you test whether a child really knows what to do if a stranger approaches — without actually endangering them?",
      explain: "**In situ assessment** is testing the skill in the REAL situation, without the learner knowing they're being tested — a trained stranger approaches, and we secretly watch. If the skill fails in real life, trainers do **in situ training**: BST right there, on the spot. This honest testing reveals what role-plays miss. It's how researchers proved which safety-skills programs actually work.",
      vocab: {
        "in situ": { ipa: "/ɪn ˈsɪtʃuː/", plain: "in the real place, not a practice setting" },
        assessment: { ipa: "/əˈsesmənt/", plain: "a careful check or evaluation" },
        secretly: { ipa: "/ˈsiːkrətli/", plain: "without being known or seen" }
      }
    },
    "U12-S6": {
      bridge: "BST is really a three-term contingency wearing a costume: instructions and modeling are the ANTECEDENTS; rehearsal and feedback supply the CONSEQUENCES.",
      objectives: ["Connect BST to the three-term contingency.", "Explain the role of antecedents and consequences in BST."],
      pre: "In the ABC of behavior — Antecedent, Behavior, Consequence — which BST parts are 'A' and which create 'C'?",
      explain: "BST maps onto the **three-term contingency**: **instructions and modeling are antecedents** — they set the stage for the correct behavior. The **rehearsal is the behavior** — the skill being performed. **Feedback is the consequence** — praise strengthens the right performance, correction fixes the wrong one. That's why BST works: it arranges both the before AND the after, not just one.",
      vocab: {
        contingency: { ipa: "/kənˈtɪndʒənsi/", plain: "the connection between action and result" },
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" },
        consequence: { ipa: "/ˈkɑːnsɪkwens/", plain: "what happens right after an action" }
      }
    },
    "U12-S7": {
      bridge: "BST scales up: whole classrooms can learn together — one instruction, one model, then small groups rehearse while partners give feedback.",
      objectives: ["Explain how BST works in groups.", "Describe applications of BST."],
      pre: "Teaching an entire class assertiveness — is it possible to give everyone real practice, or just lectures? How?",
      explain: "BST isn't just one-on-one. In **groups**, the trainer instructs and models for everyone, then learners split into pairs or small teams to rehearse while partners **give feedback**. BST has trained interview skills, social skills, safety skills, parenting, and job skills in schools, clinics, and workplaces. The same four ingredients scale to any group size.",
      vocab: {
        peer: { ipa: "/pɪr/", plain: "a person at the same level as you" },
        scale: { ipa: "/skeɪl/", plain: "to grow or apply to bigger groups" },
        application: { ipa: "/ˌæplɪˈkeɪʃən/", plain: "a real-world use" }
      }
    },
    "U12-S8": {
      bridge: "The BST playbook, end to end: pick the skill, set the stage, demonstrate, let them practice, give feedback, and test it in real life.",
      objectives: ["List the steps for using BST.", "Explain why each step builds on the last."],
      pre: "You're running BST to teach a friend to refuse a risky dare. Order the steps: feedback, model, choose the skill, rehearse, test in real life.",
      explain: "The BST recipe: (1) **Identify and define the skill**, and where it will be used. (2) **Instruct** — explain the skill and why it matters. (3) **Model** — show it correctly. (4) **Rehearse** — practice in realistic role-plays. (5) **Feedback** — praise and correct each try. (6) **Test in the real situation** (in situ) and keep training until the skill shows up where it counts.",
      vocab: {
        identify: { ipa: "/aɪˈdentɪfaɪ/", plain: "to recognize and name" },
        realistic: { ipa: "/ˌriːəˈlɪstɪk/", plain: "like the real situation" },
        mastery: { ipa: "/ˈmæstəri/", plain: "complete skill and understanding" }
      }
    },

    /* ============ UNIT 13 · Functional Assessment ============ */
    "U13-S0": {
      bridge: "Jacob screams and Anna refuses to work. A frustrated adult might ask 'what's wrong with them?' A behavior scientist asks a better question: 'what is this behavior GETTING them?'",
      objectives: ["Describe the functional assessment examples.", "Explain the mindset shift from labeling to understanding."],
      pre: "A kid cries every time math class starts. What are TWO possible reasons? How would you find out which is true?",
      explain: "**Jacob** and **Anna** both had problem behaviors that seemed 'random'. Functional assessment treats behavior like a puzzle: every behavior has a **purpose**. The goal isn't to label the child — it's to find what the behavior **gets** or **avoids**. Once you know the 'why', you can teach a better behavior that does the same job.",
      vocab: {
        functional: { ipa: "/ˈfʌŋkʃənəl/", plain: "working; based on what it does" },
        assessment: { ipa: "/əˈsesmənt/", plain: "a careful check or evaluation" },
        purpose: { ipa: "/ˈpɜːrpəs/", plain: "the reason something happens" }
      }
    },
    "U13-S1": {
      bridge: "Functional assessment is detective work: gather clues about what comes before and after a problem behavior, and the 'why' walks out of the shadows.",
      objectives: ["Define functional assessment.", "State its goal."],
      pre: "If you wanted to find out WHY your friend bites their nails, what clues would you look for: when, where, what happens right after?",
      explain: "**Functional assessment** is a process of gathering information about the **antecedents** (what happens before) and **consequences** (what happens after) of a problem behavior — to figure out its **function** (purpose). It's the difference between 'he's aggressive' (a label) and 'he hits when asked to share toys, and hitting gets him the toy back' (a function). The function tells you exactly what to change.",
      vocab: {
        function: { ipa: "/ˈfʌŋkʃən/", plain: "the job or purpose of something" },
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" },
        consequence: { ipa: "/ˈkɑːnsɪkwens/", plain: "what happens right after an action" }
      }
    },
    "U13-S2": {
      bridge: "Four hidden engines can power any problem behavior: attention, escape, sensory pleasure, and sensory relief. Find the engine, and you can fix the car.",
      objectives: ["Name the four functions of problem behavior.", "Match a behavior to its function."],
      pre: "A kid screams in class. It could be for attention, to escape work, or just because it feels good. How would you tell which?",
      explain: "Problem behaviors are powered by four **functions**: **social positive reinforcement** — the behavior gets attention or a toy from someone; **social negative reinforcement** — it gets you OUT of something unpleasant (escape); **automatic positive reinforcement** — it feels good directly (sensory stimulation); **automatic negative reinforcement** — it removes an unpleasant feeling directly (scratching an itch). Every problem behavior is doing one of these four jobs.",
      vocab: {
        automatic: { ipa: "/ˌɔːtəˈmætɪk/", plain: "done on its own, no other person needed" },
        sensory: { ipa: "/ˈsensəri/", plain: "related to the senses (sight, sound, touch)" },
        negative: { ipa: "/ˈneɡətɪv/", plain: "taking something away" }
      }
    },
    "U13-S3": {
      bridge: "The fastest way to find a behavior's 'why'? Just ask. Interviews and questionnaires are the quick-and-dirty start of functional assessment.",
      objectives: ["Describe indirect assessment methods.", "State their advantages and limits."],
      pre: "To learn why a student acts out, a teacher could ask the student, the parents, and other teachers. What's good — and risky — about relying on people's answers?",
      explain: "**Indirect methods** gather information from **reports** — interviews, questionnaires, and rating scales filled out by the person or people who know them. They're fast, cheap, and give useful starting ideas. The risk: memory is imperfect, and people see the same behavior differently. Indirect methods are the **first step**, not the final word — they point you toward where to look.",
      vocab: {
        indirect: { ipa: "/ˌɪndɪˈrekt/", plain: "not straight; through someone else" },
        "rating scale": { ipa: "/ˈreɪtɪŋ skeɪl/", plain: "a list where you score behaviors 1–5" },
        report: { ipa: "/rɪˈpɔːrt/", plain: "a description given by someone" }
      }
    },
    "U13-S4": {
      bridge: "Forget opinions — go watch. Direct observation records the behavior LIVE, along with what happens right before and right after it.",
      objectives: ["Describe direct observation methods.", "Explain ABC recording."],
      pre: "What would you actually write down if you sat in a classroom to find out why a kid shouts out?",
      explain: "**Direct observation** means watching the behavior as it happens and recording the **ABC**: the **Antecedent** (what happened right before), the **Behavior** (exactly what the person did), and the **Consequence** (what happened right after). Over many observations, patterns appear — 'shouting happens when work is given, and the teacher then sends him out.' That pattern IS the function.",
      vocab: {
        observation: { ipa: "/ˌɑːbzərˈveɪʃən/", plain: "watching and recording carefully" },
        pattern: { ipa: "/ˈpætərn/", plain: "something that repeats in a regular way" },
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" }
      }
    },
    "U13-S5": {
      bridge: "The gold-standard test: change the situation ON PURPOSE and see if the behavior follows. That's a functional analysis — an experiment, not a guess.",
      objectives: ["Define functional analysis.", "Explain its experimental conditions."],
      pre: "A scientist sets up four playrooms: one with attention, one with easy work (escape), one with toys, one with nothing. Why?",
      explain: "A **functional analysis (FA)** is an experiment. The scientist creates conditions that match each function — an **attention** condition (adult pays attention to the behavior), an **escape** condition (behavior removes demands), an **alone** condition (automatic reinforcement), and a **play** condition (control). Whichever condition produces the most behavior reveals its function. Because it's an experiment, it gives the strongest, most certain evidence.",
      vocab: {
        analysis: { ipa: "/əˈnæləsɪs/", plain: "a careful study to find the truth" },
        condition: { ipa: "/kənˈdɪʃən/", plain: "a specific setup in an experiment" },
        experimental: { ipa: "/ɪkˌsperɪˈmentəl/", plain: "tested by controlled experiments" }
      }
    },
    "U13-S6": {
      bridge: "Why is functional analysis the most respected tool in the toolbox? Because it doesn't just guess 'why' — it PROVES it, with an experiment.",
      objectives: ["Explain why functional analysis is the most rigorous method.", "Summarize what FA research shows."],
      pre: "An interview says a behavior is for attention. An experiment proves it. Which evidence would you trust more, and why?",
      explain: "Functional analysis is the **gold standard** because only an experiment can show **cause and effect** — not just 'these things happen together' but 'change the situation, and the behavior follows every time'. Research using FA has transformed treatment: when therapists match the intervention to the proven function, success rates soar. The lesson from FA research: guessing at functions wastes time; testing them works.",
      vocab: {
        rigorous: { ipa: "/ˈrɪɡərəs/", plain: "extremely careful and thorough" },
        cause: { ipa: "/kɔːz/", plain: "the thing that makes something happen" },
        effective: { ipa: "/ɪˈfektɪv/", plain: "works well; gets results" }
      }
    },
    "U13-S7": {
      bridge: "Assessment is a staircase, not a single step: ask first (indirect), watch next (direct), experiment only if needed (functional analysis).",
      objectives: ["Describe the typical steps of a functional assessment.", "Explain why assessment is done in stages."],
      pre: "Put these in order of 'fastest and easiest' to 'slowest and most certain': experiment, ask people, watch directly.",
      explain: "A functional assessment usually moves through stages. **Step 1: indirect** — interviews and questionnaires for quick leads. **Step 2: direct observation** — watch and record ABCs to confirm. **Step 3: functional analysis** — if the picture is still unclear, run the experiment. Each stage adds certainty and cost. Starting cheap and easy, then investing more where needed, is smart science.",
      vocab: {
        stage: { ipa: "/steɪdʒ/", plain: "one step in a process" },
        confirm: { ipa: "/kənˈfɜːrm/", plain: "to check and verify" },
        evidence: { ipa: "/ˈevɪdəns/", plain: "proof that something is true" }
      }
    },
    "U13-S8": {
      bridge: "Know the function, pick the fix: if a behavior runs on attention, teach the child a better way to ASK for attention. Same job, better tool.",
      objectives: ["Explain functional interventions.", "Explain why function-based treatments work better."],
      pre: "A kid's tantrums get attention. If the teacher ignores tantrums but also teaches 'raise your hand for attention', what happens to the tantrums?",
      explain: "A **functional intervention** changes the exact antecedents and consequences found in the assessment. If the function is attention, you stop rewarding the tantrum and teach a **replacement behavior** — like raising a hand or saying 'excuse me' — that gets the same attention. The replacement serves the SAME function, so it's motivating, and it's appropriate, so it's acceptable. Treat the function, and the problem behavior loses its reason to exist.",
      vocab: {
        intervention: { ipa: "/ˌɪntərˈvenʃən/", plain: "a plan or action to fix a problem" },
        replacement: { ipa: "/rɪˈpleɪsmənt/", plain: "a substitute that takes the place" },
        equivalent: { ipa: "/ɪˈkwɪvələnt/", plain: "equal; does the same job" }
      }
    },

    /* ============ UNIT 14 · Applying Extinction ============ */
    "U14-S0": {
      bridge: "Willy screamed, cried, and flopped to the floor — until his parents discovered the single thing feeding the tantrum and simply stopped feeding it.",
      objectives: ["Describe the case of Willy.", "Explain how extinction was applied in the case."],
      pre: "Willy's tantrums got him attention from Mom and Dad. If his parents suddenly ignored every tantrum, what would likely happen first — and then?",
      explain: "Willy's tantrums were powered by **attention**. His parents' attention after each tantrum was the reinforcer. The fix was **extinction**: the parents stopped giving attention following tantrums — calmly ignoring the behavior while staying safe. The tantrums first spiked (extinction burst), then faded. The lesson: once you know the reinforcer, extinction is the direct cure.",
      vocab: {
        attention: { ipa: "/əˈtenʃən/", plain: "notice or interest from others" },
        calmly: { ipa: "/ˈkɑːmli/", plain: "in a peaceful way, without anger" },
        faded: { ipa: "/ˈfeɪdɪd/", plain: "slowly became weaker" }
      }
    },
    "U14-S1": {
      bridge: "Extinction has a two-part recipe: collect data to prove the problem, and find the reinforcer before you ever withdraw it.",
      objectives: ["List the steps for using extinction.", "Explain the role of data and functional assessment."],
      pre: "Before you stop rewarding a problem behavior, what two things should you have done first?",
      explain: "Using extinction properly: (1) **Collect baseline data** — measure the behavior before you change anything, so you can see if your plan works. (2) **Identify the reinforcer** through functional assessment — if you don't know what's feeding the behavior, you can't withdraw it. (3) **Withhold the reinforcer after EVERY instance** — no exceptions, no 'just this once'. Data shows whether you're winning; assessment shows what to cut off.",
      vocab: {
        baseline: { ipa: "/ˈbeɪslaɪn/", plain: "the starting measurement before any change" },
        withdraw: { ipa: "/wɪðˈdrɔː/", plain: "to take away or pull back" },
        instance: { ipa: "/ˈɪnstəns/", plain: "one single time something happens" }
      }
    },
    "U14-S2": {
      bridge: "Not all behaviors die at the same speed. The ones that were rewarded only sometimes are the zombies — they refuse to stay dead.",
      objectives: ["Explain how the reinforcement schedule affects extinction.", "Predict which behaviors extinguish slowly."],
      pre: "Two habits: one always pays off, one pays off randomly. Which one will be harder to break when the payoffs stop?",
      explain: "The **schedule before extinction** predicts how long extinction takes. Behaviors rewarded **every time** die fast — the contrast is obvious. Behaviors rewarded **sometimes** (intermittently) are **highly resistant** — the person keeps trying because 'maybe this time it pays'. This is why quitting gambling or notifications is brutal: the history of random rewards built maximum stubbornness.",
      vocab: {
        schedule: { ipa: "/ˈskedʒuːl/", plain: "a plan of when things happen" },
        resistant: { ipa: "/rɪˈzɪstənt/", plain: "hard to break or change" },
        intermittent: { ipa: "/ˌɪntərˈmɪtənt/", plain: "sometimes, not always" }
      }
    },
    "U14-S3": {
      bridge: "Extinction alone is a half-solution. The full recipe pairs it with a second move: reinforcing a BETTER behavior that takes the problem's place.",
      objectives: ["Explain why reinforcing alternative behaviors matters.", "Combine extinction with differential reinforcement."],
      pre: "If you stop rewarding tantrums but teach nothing else, the child may just find a NEW problem behavior. What's the smarter addition?",
      explain: "Extinction tells the brain 'this doesn't work anymore' — but it doesn't say what DOES work. So smart plans **reinforce alternative behaviors**: praise the child for using words instead of tantrums, reward asking politely, celebrate calm. Now the child has a better route to the same reward. This pairing — **extinction + differential reinforcement** — is faster, gentler, and prevents new problems from springing up.",
      vocab: {
        alternative: { ipa: "/ɔːlˈtɜːrnətɪv/", plain: "another option or choice" },
        differential: { ipa: "/ˌdɪfəˈrenʃəl/", plain: "treating two things differently" },
        combination: { ipa: "/ˌkɑːmbɪˈneɪʃən/", plain: "two things used together" }
      }
    },
    "U14-S4": {
      bridge: "Extinction works in one room — but will it survive at grandma's house, where the tantrums still get cookies? Generalization needs a plan.",
      objectives: ["Explain how to promote generalization of extinction.", "Explain why consistency across settings matters."],
      pre: "Parents stop rewarding tantrums at home. But grandma still gives in. What does that do to the whole plan?",
      explain: "Extinction generalizes only if EVERYONE plays by the same rules. If grandma still rewards the tantrum, the behavior gets **intermittently reinforced** — making it MORE stubborn, not less. To promote generalization: brief **everyone** who spends time with the child, apply the same rules in every setting, and keep monitoring over time. One weak link can undo the whole chain.",
      vocab: {
        generalize: { ipa: "/ˈdʒenrəlaɪz/", plain: "to spread to new situations" },
        consistency: { ipa: "/kənˈsɪstənsi/", plain: "always doing the same thing" },
        maintenance: { ipa: "/ˈmeɪntənəns/", plain: "keeping results over time" }
      }
    },
    "U14-S5": {
      bridge: "Does extinction actually hold up in research? Thousands of studies say yes — with two honest warnings: expect the burst, and expect the zombie reappearance.",
      objectives: ["Summarize research on extinction.", "State the side effects to plan for."],
      pre: "A researcher reviews 40 studies on extinction. What patterns would you predict she sees — fast fixes? setbacks? both?",
      explain: "Research consistently shows extinction **decreases problem behavior** — but it's not a magic wand. Scientists document the **extinction burst** (temporary spike), **emotional reactions** (frustration, aggression), and **spontaneous recovery** (brief reappearances). Good plans budget for all three. Knowing these side effects in advance is the difference between giving up at the burst and pushing through to success.",
      vocab: {
        spontaneous: { ipa: "/spɑːnˈteɪniəs/", plain: "happening on its own, without a trigger" },
        budget: { ipa: "/ˈbʌdʒɪt/", plain: "to plan for in advance" },
        "side effect": { ipa: "/ˈsaɪd ɪˌfekt/", plain: "an extra result beyond the main one" }
      }
    },

    /* ============ UNIT 15 · Differential Reinforcement ============ */
    "U15-S0": {
      bridge: "Mrs. Williams turned her house into a storm of criticism — until the family flipped the script: praise the compliments, ignore the complaints. The storm calmed.",
      objectives: ["Define differential reinforcement of alternative behavior (DRA).", "Explain how DRA works."],
      pre: "A teacher wants a talkative student to raise a hand instead of blurting out. What should the teacher reward, and what should stop being rewarded?",
      explain: "**DRA** = **Differential Reinforcement of Alternative behavior**. You **reinforce** an appropriate behavior that can replace the problem one, while **withholding reinforcement** for the problem behavior. Mrs. Williams's family reinforced her **compliments** and ignored her **criticisms** — so compliments grew and criticisms faded. The alternative behavior fills the same need, but in an acceptable way.",
      vocab: {
        alternative: { ipa: "/ɔːlˈtɜːrnətɪv/", plain: "another option or choice" },
        appropriate: { ipa: "/əˈproʊpriət/", plain: "suitable; right for the situation" },
        withhold: { ipa: "/wɪðˈhoʊld/", plain: "to hold back; not give" }
      }
    },
    "U15-S1": {
      bridge: "DRA gets an upgrade when the replacement behavior speaks the same language as the problem: if the tantrum means 'I want out', teach 'say: please, a break'.",
      objectives: ["Describe variations of DRA, including functional communication training.", "Explain how to choose an alternative behavior."],
      pre: "A child screams to escape homework. What alternative behavior could serve the SAME purpose (a break) but in an acceptable way?",
      explain: "DRA has smart variations. The most powerful is **functional communication training (FCT)**: teach a **communication response** that does the exact job of the problem behavior. Screaming = 'I need a break', so the child learns to say 'break, please'. Escape-maintained behavior calls for **differential negative reinforcement** — the alternative behavior earns the escape. Rule: the replacement should be **functionally equivalent** — same reward, different action.",
      vocab: {
        functional: { ipa: "/ˈfʌŋkʃənəl/", plain: "working; based on what it does" },
        equivalent: { ipa: "/ɪˈkwɪvələnt/", plain: "equal; does the same job" },
        communication: { ipa: "/kəˌmjuːnɪˈkeɪʃən/", plain: "sharing information with others" }
      }
    },
    "U15-S2": {
      bridge: "DRO is the 'quiet contest': if you can go 5 whole minutes WITHOUT the problem behavior, you win. The behavior loses simply by not showing up.",
      objectives: ["Define differential reinforcement of other behavior (DRO).", "Explain how DRO is implemented."],
      pre: "A child bites when frustrated. The teacher sets a timer for 5 minutes: no biting = reward; any bite = timer restarts. What's the reward actually for?",
      explain: "**DRO** = **Differential Reinforcement of Other behavior**. You reinforce the **absence** of the problem behavior: 'if no tantrum happens for 10 minutes, you earn a star.' If the behavior occurs, the timer resets and the reward is missed. DRO is simple to explain ('earn a reward for staying calm') and works for many behaviors. It doesn't teach a specific replacement — it just makes the problem behavior costly.",
      vocab: {
        absence: { ipa: "/ˈæbsəns/", plain: "not being there" },
        interval: { ipa: "/ˈɪntərvəl/", plain: "a set period of time" },
        reset: { ipa: "/ˈriːset/", plain: "to start over" }
      }
    },
    "U15-S3": {
      bridge: "Some behaviors shouldn't vanish — they should just slow down. Talking 20 times a minute? DRL turns it into 5 times, and keeps it there.",
      objectives: ["Define differential reinforcement of low rates (DRL).", "Explain the two variations of DRL."],
      pre: "Your friend calls out answers constantly. You don't want zero participation — you want less chaos. Which tool reduces a behavior without killing it?",
      explain: "**DRL** = **Differential Reinforcement of Low rates**. It **decreases** a behavior to a low, acceptable level without eliminating it. Two versions: **spaced-responding DRL** — reward responses that are separated by a minimum gap of time (answers at least 2 minutes apart); and **full-session DRL** — reward if the TOTAL count stays under a limit (under 10 interruptions all day). DRL is perfect for behaviors that are fine in small doses.",
      vocab: {
        "low rates": { ipa: "/loʊ reɪts/", plain: "a small number of times" },
        spacing: { ipa: "/ˈspeɪsɪŋ/", plain: "leaving gaps in time between events" },
        acceptable: { ipa: "/əkˈseptəbəl/", plain: "good enough; okay" }
      }
    },
    "U15-S4": {
      bridge: "Three abbreviations, one easy mix-up: DRA rewards a replacement, DRO rewards silence, DRL rewards SLOWNESS. Here's the memory trick.",
      objectives: ["Differentiate DRA, DRO, and DRL.", "Choose the right procedure for a goal."],
      pre: "Match the tool to the goal: (a) want a new behavior instead, (b) want zero of the behavior, (c) want less of it. Which is DRA, DRO, DRL?",
      explain: "The memory key: **A** for **Alternative** (teach a replacement), **O** for **Other** (reward anything OTHER than the problem — its absence), **L** for **Low rates** (slow it down). Ask: do I want a different behavior, no behavior, or less behavior? That question picks the tool. And remember, implementing DRL means setting a **criterion** and **gradually** adjusting it until you hit the target rate.",
      vocab: {
        criterion: { ipa: "/kraɪˈtɪriən/", plain: "the standard or goal you must meet" },
        procedure: { ipa: "/prəˈsiːdʒər/", plain: "a set of steps to follow" },
        gradually: { ipa: "/ˈɡrædʒuəli/", plain: "slowly, step by step" }
      }
    },

    /* ============ UNIT 16 · Antecedent Interventions ============ */
    "U16-S0": {
      bridge: "Marianne never studied — until her roommate moved the desk and put the books on top. Cal ate junk food — until healthy snacks sat right at eye level. Change the BEFORE, change the behavior.",
      objectives: ["Describe the antecedent intervention examples.", "Explain how environment changes behavior."],
      pre: "Your phone is always within reach while you study. What's one thing you could change BEFORE studying to help yourself focus?",
      explain: "**Marianne** needed to study more, so the fix came from **antecedents**: she made the study cue unmissable and the effort tiny. **Cal** needed to eat better, so healthy food became **easier and more visible** while junk went out of sight. The idea: you don't have to fight the behavior at the moment it happens — you can **rearrange the world** so the right behavior is the easy one.",
      vocab: {
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" },
        intervention: { ipa: "/ˌɪntərˈvenʃən/", plain: "a plan or action to fix a problem" },
        visible: { ipa: "/ˈvɪzəbəl/", plain: "able to be seen" }
      }
    },
    "U16-S1": {
      bridge: "Instead of fixing behavior after it happens, antecedent interventions fix the SETUP. It's like putting a lock on the cookie jar instead of scolding the thief.",
      objectives: ["Define antecedent interventions.", "Explain how they work before the behavior."],
      pre: "Compare two plans to stop a kid eating candy: (a) scold him when he takes it, (b) stop buying candy. Which changes the BEFORE?",
      explain: "**Antecedent interventions** change the environment **before** the behavior occurs, to make the desirable behavior more likely and the problem behavior less likely. They work by manipulating the three things that set behavior up: the **discriminative stimuli (cues)**, the **motivating operations** (how much you want the reward), and the **response effort** (how hard the behavior is). No consequences needed — the setup does the work.",
      vocab: {
        discriminative: { ipa: "/dɪˈskrɪmɪneɪtɪv/", plain: "used to tell signals apart" },
        manipulate: { ipa: "/məˈnɪpjəleɪt/", plain: "to carefully control or change" },
        desirable: { ipa: "/dɪˈzaɪərəbəl/", plain: "wanted; good to have" }
      }
    },
    "U16-S2": {
      bridge: "Cues are powerful: a book on the table says 'read', a game controller on the couch says 'play'. Whoever has the loudest cue wins your time.",
      objectives: ["Explain how to present cues for desirable behavior.", "Explain how to remove cues for undesirable behavior."],
      pre: "You want to study, but the PlayStation is glowing right next to your desk. What does that cue do to you?",
      explain: "**Presenting the SD for desirable behavior**: put the cues out where they scream for attention — books on the desk, sneakers by the door, water bottle on the counter. **Removing the SD for undesirable behavior**: hide the triggers — put the game controller in a drawer, silence notifications, keep junk food out of sight. Cues are like magnets; make the good magnet stronger and the bad magnet weaker.",
      vocab: {
        cue: { ipa: "/kjuː/", plain: "a signal that tells you what to do" },
        prominent: { ipa: "/ˈprɑːmɪnənt/", plain: "easy to see; standing out" },
        trigger: { ipa: "/ˈtrɪɡər/", plain: "to set something off" }
      }
    },
    "U16-S3": {
      bridge: "Want changes the value of rewards: food is gold when you're starving and worthless when you're stuffed. Motivating operations are the volume dial on rewards.",
      objectives: ["Explain establishing operations.", "Explain abolishing operations."],
      pre: "Why does water taste amazing after a long run but barely matter after a big drink? What changed — the water or your need?",
      explain: "A **motivating operation** changes how much you WANT a reinforcer. An **establishing operation (EO)** INCREASES the value — food after fasting, praise after being ignored. An **abolishing operation (AO)** DECREASES the value — food after a feast, attention after a spotlight. Antecedent interventions use this: **arrange an EO for the good behavior** (skip the snack, so a healthy one is tempting) and **present an AO for the problem** (fill up before the junk-food aisle).",
      vocab: {
        establishing: { ipa: "/ɪˈstæblɪʃɪŋ/", plain: "setting up; making stronger" },
        abolishing: { ipa: "/əˈbɑːlɪʃɪŋ/", plain: "removing; making weaker" },
        deprivation: { ipa: "/ˌdeprɪˈveɪʃən/", plain: "being without something you need" }
      }
    },
    "U16-S4": {
      bridge: "Easy actions get done; hard actions get avoided. That one rule lets you engineer behavior: make good things easy, bad things annoying.",
      objectives: ["Explain how decreasing response effort helps.", "Explain how increasing response effort hurts."],
      pre: "Which door do people use more: the one with a heavy push bar, or the one that swings open with a finger? How could you use this for good habits?",
      explain: "**Response effort** is how hard a behavior is. **Decrease effort for desirable behavior**: keep the guitar out and tuned, pre-portion the veggies, leave the book open. **Increase effort for undesirable behavior**: put the games console in the closet, uninstall the app, keep junk food on the top shelf. Every extra step is a wall; every removed step is a ramp. Engineer the effort and behavior follows.",
      vocab: {
        effort: { ipa: "/ˈefərt/", plain: "the energy or work something takes" },
        portion: { ipa: "/ˈpɔːrʃən/", plain: "a measured amount of food" },
        engineer: { ipa: "/ˌendʒɪˈnɪr/", plain: "to design something carefully" }
      }
    },
    "U16-S5": {
      bridge: "Skeptics asked: do antecedent changes REALLY work without rewards or scolding? Research says yes — rearrange the world, and behavior changes.",
      objectives: ["Summarize research on antecedent interventions.", "Give examples from the studies."],
      pre: "Would simply making a salad easier to grab actually change what people eat? What would a careful study need to prove it?",
      explain: "Research on antecedent interventions shows real, measurable effects. Studies manipulated **discriminative stimuli** (posters, cues, sign placements), **response effort** (making trash bins closer cut littering; making stairs more inviting boosted stair use), and **motivating operations** (setting up needs). Across schools, workplaces, and communities, changing the BEFORE reliably changed the behavior — often with no consequence at all.",
      vocab: {
        measurable: { ipa: "/ˈmeʒərəbəl/", plain: "able to be measured" },
        manipulate: { ipa: "/məˈnɪpjəleɪt/", plain: "to carefully control or change" },
        community: { ipa: "/kəˈmjuːnəti/", plain: "a group of people living together" }
      }
    },
    "U16-S6": {
      bridge: "The antecedent playbook starts with a map: draw the three-term contingency for the good behavior AND the bad one, then rearrange both setups.",
      objectives: ["Explain how to use antecedent interventions.", "Apply the three-term contingency analysis."],
      pre: "To change a habit, what two behaviors should you map out first — and what three boxes does each map have?",
      explain: "To use antecedent interventions: (1) **Analyze the three-term contingency for the desirable behavior** — what cue should trigger it, what makes it easy, what makes the reward valuable? (2) **Analyze it for the undesirable behavior** — what cue triggers it, what makes it easy, what makes ITS reward valuable? (3) **Rearrange both**: strengthen the good setup, weaken the bad one. Functional interventions then target whatever the assessment revealed.",
      vocab: {
        contingency: { ipa: "/kənˈtɪndʒənsi/", plain: "the connection between action and result" },
        analysis: { ipa: "/əˈnæləsɪs/", plain: "a careful breakdown of something" },
        eliminate: { ipa: "/ɪˈlɪmɪneɪt/", plain: "to remove completely" }
      }
    },

    /* ============ UNIT 17 · Time-Out & Response Cost ============ */
    "U17-S0": {
      bridge: "When a kid misbehaves, the party doesn't stop — the kid leaves the party. Time-out removes the audience, the toys, the fun — and the behavior fades.",
      objectives: ["Define time-out.", "Explain why removing reinforcement works."],
      pre: "A child throws blocks during playtime. The teacher calmly moves him to a boring chair for 2 minutes. What exactly is being removed?",
      explain: "**Time-out** = **time out from reinforcement**. After a behavior, the person briefly loses access to all the fun — the toys, the friends, the attention. It's a **negative punishment**: something enjoyable is removed, so the behavior decreases. The catch: the regular environment must be reinforcing. If being sent away is MORE fun than the room (or lets the kid escape work), time-out backfires.",
      vocab: {
        reinforcement: { ipa: "/ˌriːɪnˈfɔːrsmənt/", plain: "making a behavior stronger by what follows it" },
        negative: { ipa: "/ˈneɡətɪv/", plain: "taking something away" },
        backfire: { ipa: "/ˈbækfaɪər/", plain: "to fail in a harmful way" }
      }
    },
    "U17-S1": {
      bridge: "Time-out comes in two styles: kick them OUT of the room (exclusionary) or keep them in the room but freeze them out (nonexclusionary).",
      objectives: ["Distinguish exclusionary and nonexclusionary time-out.", "Give an example of each."],
      pre: "Two versions: a child sits in the hallway, vs. a child sits in a corner of the same classroom watching others play. Which is 'exclusionary'?",
      explain: "**Exclusionary time-out** removes the person from the reinforcing setting — the child goes to a separate, boring room. **Nonexclusionary (inclusionary) time-out** keeps the person in the room but **denies reinforcement** — the child stays but can't play, or sits facing the wall. Nonexclusionary is less disruptive and keeps the child safe and supervised. Choose based on the situation and the child's needs.",
      vocab: {
        exclusionary: { ipa: "/ɪkˈskluːʒəneri/", plain: "sending someone out of the area" },
        inclusionary: { ipa: "/ɪnˈkluːʒəneri/", plain: "keeping someone in the area" },
        supervised: { ipa: "/ˈsuːpərvaɪzd/", plain: "watched over by an adult" }
      }
    },
    "U17-S2": {
      bridge: "Time-out is only half the plan. The other half is filling the good moments with reinforcement — because you can't punish your way to a happy kid.",
      objectives: ["Explain why reinforcement is essential with time-out.", "Describe how to pair the two."],
      pre: "A teacher uses time-out all day but never praises good behavior. What's missing from this plan?",
      explain: "Time-out tells the child what NOT to do; **reinforcement** tells them what TO do. The best programs pair them: plenty of **praise and rewards for appropriate behavior** (so the 'time-in' is worth protecting), plus time-out for the problem. Also make sure the time-out area is truly **non-reinforcing** — boring, quiet, no toys, no attention. If time-out is fun, it's not time-out.",
      vocab: {
        appropriate: { ipa: "/əˈproʊpriət/", plain: "suitable; right for the situation" },
        essential: { ipa: "/ɪˈsenʃəl/", plain: "absolutely necessary" },
        "non-reinforcing": { ipa: "/nɑːn ˌriːɪnˈfɔːrsɪŋ/", plain: "not rewarding at all" }
      }
    },
    "U17-S3": {
      bridge: "Time-out has a user manual: keep it short, explain the rule once, and stay calm. Three mistakes turn a teaching tool into a power struggle.",
      objectives: ["List considerations in using time-out.", "Avoid common mistakes."],
      pre: "A parent makes time-out last 40 minutes and lectures the whole time. What's wrong with this picture?",
      explain: "Time-out works best with these rules: keep it **short** (a few minutes is plenty — longer adds nothing); **explain the rule** briefly beforehand so the child knows what earns time-out; **apply it consistently**; stay **calm** (no yelling — that's attention); and return the child quickly to reinforcement after. Watch out for the trap: if the child's behavior is maintained by ESCAPE, time-out can reward them. Match the tool to the function.",
      vocab: {
        consistent: { ipa: "/kənˈsɪstənt/", plain: "the same every time" },
        explanation: { ipa: "/ˌekspləˈneɪʃən/", plain: "the reason given for something" },
        maintain: { ipa: "/meɪnˈteɪn/", plain: "to keep something going" }
      }
    },
    "U17-S4": {
      bridge: "No isolation needed — just a fine. Every time the misbehavior happens, a small piece of the good stuff gets taken away. That's response cost.",
      objectives: ["Define response cost.", "Explain how it decreases behavior."],
      pre: "A kid starts the week with 10 stars. Each rude word costs a star. What happens to the rude words — and why does the star system matter?",
      explain: "**Response cost** is the loss of a reinforcer after a behavior: lose a star, lose screen time, lose points. It's **negative punishment** — the good thing is subtracted, so the behavior decreases. It's fast, easy to explain, and works with token systems. The trick: the person must START with reinforcers to lose. Response cost is powerful because the loss is immediate and the 'price' is clear.",
      vocab: {
        "response cost": { ipa: "/rɪˈspɑːns kɔːst/", plain: "paying for a behavior by losing rewards" },
        subtraction: { ipa: "/səbˈtrækʃən/", plain: "taking something away" },
        immediate: { ipa: "/ɪˈmiːdiət/", plain: "right now, with no delay" }
      }
    },
    "U17-S5": {
      bridge: "Three tools, one goal: extinction stops feeding the behavior, time-out removes the party, response cost takes the toys. Know which is which.",
      objectives: ["Compare response cost, time-out, and extinction.", "Choose the right procedure for a situation."],
      pre: "Match: (a) the reward never comes, (b) the person leaves the fun, (c) the person loses a reinforcer. Extinction, time-out, or response cost?",
      explain: "**Extinction** withholds the specific reinforcer that MAINTAINED the behavior (the tantrum stops earning attention). **Time-out** removes access to ALL reinforcement for a bit (the child leaves the play area). **Response cost** takes away a specific reinforcer (lose 5 minutes of games). Key difference: extinction targets the exact reinforcer feeding the behavior; the other two remove general or specific good things. Choose by function: extinction matches the reinforcer; time-out and response cost are broader tools.",
      vocab: {
        withhold: { ipa: "/wɪðˈhoʊld/", plain: "to hold back; not give" },
        specific: { ipa: "/spəˈsɪfɪk/", plain: "exact; one particular thing" },
        broader: { ipa: "/ˈbrɔːdər/", plain: "wider; covering more" }
      }
    },
    "U17-S6": {
      bridge: "Response cost needs training wheels too: pair it with reinforcement, keep the fines fair, and never take everything.",
      objectives: ["List considerations in using response cost.", "Explain how to combine it with reinforcement."],
      pre: "A parent takes away ALL of a child's screen time for one small mistake. What could go wrong with a fine that big?",
      explain: "Response cost works best when: **combine it with reinforcement** — the person must have a way to EARN things back; **keep fines moderate** — huge penalties cause anger and hopelessness, not learning; **protect the reinforcer pool** — don't fine away everything, or there's nothing left to lose and motivation collapses. Research shows response cost, used with reinforcement, reliably decreases problem behavior.",
      vocab: {
        moderate: { ipa: "/ˈmɑːdərət/", plain: "in the middle; not too big or small" },
        motivation: { ipa: "/ˌmoʊtɪˈveɪʃən/", plain: "the drive to act" },
        penalty: { ipa: "/ˈpenəlti/", plain: "a punishment, often a fine" }
      }
    },

    /* ============ UNIT 18 · Positive Punishment & Ethics ============ */
    "U18-S0": {
      bridge: "Overcorrection is odd but effective: knock over a shelf, and you don't just fix the shelf — you practice the right way five times. Fix it, then practice it.",
      objectives: ["Describe overcorrection and contingent exercise.", "Explain how positive punishment procedures work."],
      pre: "A kid scribbles on a desk. What would 'overcorrection' look like — beyond just cleaning it up?",
      explain: "**Overcorrection** has two parts: **restitution** — repair the damage you caused ('clean the desk AND the wall'); and **positive practice** — rehearse the correct behavior repeatedly ('practice writing on paper nicely'). **Contingent exercise** adds a physical activity (run a lap) after the behavior. Both are **positive punishment** — they add something unpleasant to decrease the behavior. They're intense tools with a specific job.",
      vocab: {
        restitution: { ipa: "/ˌrestɪˈtuːʃən/", plain: "fixing or repairing what you damaged" },
        aversive: { ipa: "/əˈvɜːrsɪv/", plain: "unpleasant; something you want to avoid" },
        practice: { ipa: "/ˈpræktɪs/", plain: "doing something to get better" }
      }
    },
    "U18-S1": {
      bridge: "Positive punishment is the fire extinguisher of behavior change: kept in the cabinet, used only when the house is burning.",
      objectives: ["Explain why positive punishment is a last resort.", "Describe the rule of trying reinforcement first."],
      pre: "A frustrated coach wants to use extra running as punishment for every mistake. What should the coach try BEFORE this?",
      explain: "**Positive punishment** is called **treatment of last resort** for a reason: it feels bad, can teach fear and aggression, and has risky side effects. The rule: **try reinforcement-based procedures first** — reward the behavior you want, redesign the environment, use extinction or time-out. Only when those fail — and the problem is severe and safe to treat — does positive punishment enter the picture, always with safeguards.",
      vocab: {
        "last resort": { ipa: "/læst rɪˈzɔːrt/", plain: "the final option after everything else" },
        reinforce: { ipa: "/ˌriːɪnˈfɔːrs/", plain: "to strengthen with rewards" },
        intrusive: { ipa: "/ɪnˈtruːsɪv/", plain: "forceful or invasive" }
      }
    },
    "U18-S2": {
      bridge: "If positive punishment is ever used, it comes with a checklist: immediate, consistent, paired with reinforcement — and watched like a hawk.",
      objectives: ["List the considerations for using positive punishment.", "Explain how to monitor side effects."],
      pre: "A teacher decides to use a firm verbal reprimand for interruptions. What three 'rules of use' should she set before starting?",
      explain: "When positive punishment is necessary, apply it with care: make it **immediate** (right after the behavior); make it **contingent** (every time); keep the **magnitude** just strong enough — never harsh; **pair it with reinforcement** for the right behavior; and **monitor** for side effects like fear, escape, or aggression. If side effects appear, stop and revise. Punishment needs supervision, not enthusiasm.",
      vocab: {
        magnitude: { ipa: "/ˈmæɡnɪtuːd/", plain: "how big or strong something is" },
        monitor: { ipa: "/ˈmɑːnɪtər/", plain: "to watch and track closely" },
        supervise: { ipa: "/ˈsuːpərvaɪz/", plain: "to oversee carefully" }
      }
    },
    "U18-S3": {
      bridge: "The ethics of punishment read like a safety checklist: consent, alternatives tried, safety first, severity justified, clear rules, training, peer review.",
      objectives: ["State the ethical requirements for using punishment.", "Explain informed consent."],
      pre: "Before ANY punishment plan, a professional must check several boxes. Which of these do you think belongs on the list: permission? alternatives? safety?",
      explain: "Ethical punishment rests on six pillars: **informed consent** — the person (or family) clearly agrees after hearing the full plan; **alternative treatments tried** — gentler methods failed first; **recipient safety** — the person is protected; **problem severity** — the behavior is serious enough to justify the tool; **implementation guidelines** — precise rules for use; and **training** so everyone uses it correctly. No checklist, no punishment.",
      vocab: {
        "informed consent": { ipa: "/ɪnˈfɔːrmd kənˈsent/", plain: "clear permission given with full information" },
        severity: { ipa: "/sɪˈverəti/", plain: "how serious something is" },
        safeguard: { ipa: "/ˈseɪfɡɑːrd/", plain: "a protection against harm" }
      }
    },
    "U18-S4": {
      bridge: "Nobody learns surgery from a YouTube video — and nobody should learn punishment that way either. Training, supervision, and peer review are the safety net.",
      objectives: ["Explain the role of training and supervision.", "Explain peer review."],
      pre: "A parent copies a punishment technique they saw online. What professional safeguards are they missing?",
      explain: "Punishment requires **training**: everyone who implements it must know the procedure exactly. **Supervision** means a qualified professional watches the implementation and corrects mistakes. **Peer review** means other professionals independently check the plan — is it necessary? appropriate? safe? These layers catch errors before they harm anyone. Punishment without oversight is a risk no one should take.",
      vocab: {
        oversight: { ipa: "/ˈoʊvərsaɪt/", plain: "careful watching and control" },
        "peer review": { ipa: "/pɪr rɪˈvjuː/", plain: "checking by other experts" },
        qualified: { ipa: "/ˈkwɑːlɪfaɪd/", plain: "properly trained and approved" }
      }
    },
    "U18-S5": {
      bridge: "The final guardrail is accountability: every punishment, every session, written down and reviewed. Data turns 'trust me' into 'prove it'.",
      objectives: ["Explain accountability in punishment programs.", "Describe how data prevents misuse."],
      pre: "How can a clinic prove that its punishment procedure is working — and not being overused?",
      explain: "**Accountability** means documenting everything: what behavior happened, what punishment was applied, what the data show, and how the person responded. **Ongoing data collection** lets the team see whether the behavior is actually decreasing, whether side effects are appearing, and whether the procedure is being overused. If the data say stop — you stop. Accountability is what separates professional treatment from abuse.",
      vocab: {
        accountability: { ipa: "/əˌkaʊntəˈbɪləti/", plain: "being responsible and answerable" },
        documentation: { ipa: "/ˌdɑːkjumenˈteɪʃən/", plain: "written records and evidence" },
        misuse: { ipa: "/ˌmɪsˈjuːz/", plain: "using something the wrong way" }
      }
    },

    /* ============ UNIT 19 · Promoting Generalization ============ */
    "U19-S0": {
      bridge: "A student learns to raise her hand in Ms. Lee's class — but forgets it in every other class. A skill that stays in one room is a trick, not a skill.",
      objectives: ["Describe the generalization programming examples.", "Explain why generalization must be planned."],
      pre: "If a child learns to say 'please' only at home, is the training done? What's missing?",
      explain: "The chapter's examples show skills that DIDN'T travel: good behavior in one classroom, gone in another. The message: **generalization doesn't happen by accident** — it must be **programmed**. 'Train and hope' is not a strategy. If you want the skill to show up everywhere, you must deliberately build it into the training from the start.",
      vocab: {
        programming: { ipa: "/ˈproʊɡræmɪŋ/", plain: "deliberately planning something in" },
        generalization: { ipa: "/ˌdʒenrələˈzeɪʃən/", plain: "using a skill in new situations" },
        deliberate: { ipa: "/dɪˈlɪbərət/", plain: "done on purpose, planned" }
      }
    },
    "U19-S1": {
      bridge: "Generalization has one simple definition: the behavior shows up where you DIDN'T train it. Same skill, new place, new person, new cue.",
      objectives: ["Define generalization.", "Give examples of stimulus and response generalization."],
      pre: "You learn to swim in a pool. Later you swim in a lake. Is that generalization? What if you only swim in THAT pool?",
      explain: "**Generalization** is behavior change that shows up in **untrained situations** — new settings, new people, new cues. **Stimulus generalization**: respond correctly to new but similar signals (all stop signs, not just the one on your street). **Response generalization**: use a family of similar responses (greet with 'hi', 'hello', or a wave). Generalization is what makes learning useful beyond the classroom.",
      vocab: {
        generalize: { ipa: "/ˈdʒenrəlaɪz/", plain: "to spread to new situations" },
        similar: { ipa: "/ˈsɪmələr/", plain: "alike but not exactly the same" },
        untrained: { ipa: "/ˌʌnˈtreɪnd/", plain: "not practiced or taught directly" }
      }
    },
    "U19-S2": {
      bridge: "Two classic strategies: reward the skill when it shows up in real life, and teach skills that the real world will naturally reward back.",
      objectives: ["Explain reinforcing occurrences of generalization.", "Explain natural contingencies of reinforcement."],
      pre: "A student uses her table manners at a restaurant without being asked. What would 'reinforcing generalization' look like right then?",
      explain: "**Reinforce generalization**: when the behavior shows up outside training, reward it — praise the table manners at the restaurant. **Train skills that contact natural contingencies**: pick behaviors the real world already rewards — being polite gets smiles, finishing homework gets good grades, exercise feels good. When the natural environment pays for the behavior, you don't need a trainer forever.",
      vocab: {
        natural: { ipa: "/ˈnætʃərəl/", plain: "occurring in the real world, not artificial" },
        contingency: { ipa: "/kənˈtɪndʒənsi/", plain: "the connection between action and result" },
        occurrence: { ipa: "/əˈkɜːrəns/", plain: "a single time something happens" }
      }
    },
    "U19-S3": {
      bridge: "Two more levers: change the real world so it rewards the skill, and train in lots of different places so the skill learns to travel.",
      objectives: ["Explain modifying natural contingencies.", "Explain incorporating varied training situations."],
      pre: "A school wants students to use 'please' everywhere. What could they change in the halls, cafeteria, and playground — not just in one class?",
      explain: "**Modify natural contingencies**: arrange the real environment to reward the behavior — post friendly signs, have staff notice and praise good behavior everywhere. **Incorporate a variety of relevant stimulus situations**: train in many settings, with many people, at many times — classroom, gym, library, playground, different teachers. The more varied the training, the more the skill learns that it applies everywhere.",
      vocab: {
        relevant: { ipa: "/ˈreləvənt/", plain: "connected and important to the topic" },
        varied: { ipa: "/ˈverid/", plain: "of many different types" },
        modify: { ipa: "/ˈmɑːdɪfaɪ/", plain: "to change something" }
      }
    },
    "U19-S4": {
      bridge: "Make training look like real life (common stimuli) and teach many ways to succeed (multiple responses) — and the skill becomes a traveler.",
      objectives: ["Explain incorporating common stimuli.", "Explain teaching functionally equivalent responses."],
      pre: "If kids practice 'stranger safety' only in a classroom with their teacher, what real-world details are missing from the training?",
      explain: "**Common stimuli**: put pieces of the real environment INTO training — use the real playground, real uniforms, real noises — so the real world feels familiar. **Range of functionally equivalent responses**: teach several ways to reach the same outcome — saying 'no', walking away, AND telling an adult. If one response fails, another works. Both strategies make the skill flexible enough to survive reality.",
      vocab: {
        equivalent: { ipa: "/ɪˈkwɪvələnt/", plain: "equal; does the same job" },
        incorporate: { ipa: "/ɪnˈkɔːrpəreɪt/", plain: "to include or add in" },
        flexible: { ipa: "/ˈfleksəbəl/", plain: "able to bend and adapt" }
      }
    },
    "U19-S5": {
      bridge: "Leave reminders in the real world (cues) and teach the learner to carry their own coach (self-generated mediators) — and the skill travels in their pocket.",
      objectives: ["Explain providing cues in the natural environment.", "Explain self-generated mediators."],
      pre: "How could a sticky note, a wristband, or a self-reminder help a new habit survive outside the training room?",
      explain: "**Cues in the natural environment**: leave reminders where the behavior should happen — a checklist on the locker, a sign by the exit, a sticker on the mirror. **Self-generated mediators**: teach the person to carry their own cues — a self-instruction ('when I feel angry, I count to ten'), a mental picture, a rehearsed phrase. Cues from outside help; cues from inside travel anywhere.",
      vocab: {
        mediator: { ipa: "/ˈmiːdieɪtər/", plain: "a helper that connects two things" },
        generate: { ipa: "/ˈdʒenəreɪt/", plain: "to create or produce" },
        cue: { ipa: "/kjuː/", plain: "a signal that tells you what to do" }
      }
    },
    "U19-S6": {
      bridge: "The generalization playbook: know where the skill must work, pick your strategies, implement them, then measure whether the skill actually travels.",
      objectives: ["List the steps for implementing generalization strategies.", "Explain how to measure generalization."],
      pre: "Before planning a generalization program, what's the FIRST question to answer? (Hint: where should the skill show up?)",
      explain: "To program generalization: (1) **Identify the target situations** — exactly where and with whom the skill must work. (2) **Select strategies** from the toolbox (reinforce, natural contingencies, variety, common stimuli, cues, self-mediators). (3) **Implement** them alongside training. (4) **Measure generalization** — actually test the skill in the real settings and check. No measurement, no proof. Generalized behavior change (including reducing problems everywhere) is the real goal.",
      vocab: {
        implement: { ipa: "/ˈɪmplɪment/", plain: "to put a plan into action" },
        strategy: { ipa: "/ˈstrætədʒi/", plain: "a plan or method" },
        evaluate: { ipa: "/ɪˈvæljueɪt/", plain: "to judge how well something worked" }
      }
    },

    /* ============ UNIT 20 · Self-Management ============ */
    "U20-S0": {
      bridge: "Murray couldn't make himself run. Annette couldn't make herself clean. Both became their own behavior scientists — and both won.",
      objectives: ["Describe the self-management examples.", "Explain what self-management means."],
      pre: "What's the difference between a parent making a kid do chores, and the kid making THEMSELF do chores?",
      explain: "**Murray** wanted to run regularly; **Annette** wanted to clean her mess. Neither was being controlled by anyone else — each had to manage their OWN behavior. **Self-management** is applying behavior modification to yourself: you set the goal, you arrange the rewards, you track the progress. It's the ultimate test of everything this book teaches.",
      vocab: {
        management: { ipa: "/ˈmænɪdʒmənt/", plain: "the act of controlling or handling" },
        regularly: { ipa: "/ˈreɡjələrli/", plain: "on a steady, repeated schedule" },
        achievement: { ipa: "/əˈtʃiːvmənt/", plain: "something you succeed in doing" }
      }
    },
    "U20-S1": {
      bridge: "Not every bad habit is a 'self-management problem'. It only counts when YOU are the one who has to control it — and nobody else is doing the job.",
      objectives: ["Define a self-management problem.", "Explain when behavior is a self-management problem."],
      pre: "Which is a self-management problem: your mom making you do homework, or you making yourself stop biting your nails? Why?",
      explain: "A **self-management problem** exists when two things are true: the behavior is a **problem** (you want it to change), and **controlling it is up to you** (no one else is managing it). If a teacher controls your homework, that's someone else's program, not self-management. The moment you take the wheel — goal, plan, rewards — it becomes self-management.",
      vocab: {
        "problem behavior": { ipa: "/ˈprɑːbləm bɪˈheɪvjər/", plain: "a behavior that causes trouble" },
        control: { ipa: "/kənˈtroʊl/", plain: "to direct or manage" },
        responsibility: { ipa: "/rɪˌspɑːnsəˈbɪləti/", plain: "being in charge of something" }
      }
    },
    "U20-S2": {
      bridge: "Self-management is using today's behavior to change tomorrow's. You become your own coach, your own referee, and your own cheerleader.",
      objectives: ["Define self-management.", "Explain how it works using behavioral principles."],
      pre: "How can a reward you give YOURSELF for studying today make you study again tomorrow?",
      explain: "**Self-management** means deliberately engaging in behaviors now to influence your own future behavior — arranging **antecedents** (put the books out), **consequences** (self-reward after studying), and **self-monitoring** (track every day). You're using the same science a therapist would use — but you're the therapist. It works because the behavioral principles are the same whether someone else arranges them or you do.",
      vocab: {
        deliberately: { ipa: "/dɪˈlɪbərətli/", plain: "on purpose, with intent" },
        monitor: { ipa: "/ˈmɑːnɪtər/", plain: "to watch and track" },
        principles: { ipa: "/ˈprɪnsəpəlz/", plain: "basic rules that are always true" }
      }
    },
    "U20-S3": {
      bridge: "Self-management has a full toolbox: goals, tracking, environment design, contracts, rewards, friends, and self-talk. Pick the tools that fit the job.",
      objectives: ["List the types of self-management strategies.", "Give an example of each."],
      pre: "You want to exercise more. Name at least three different strategies you could use to make it happen.",
      explain: "The self-management toolbox: **goal setting and self-monitoring** (decide and track); **antecedent interventions** (make it easy, remove temptations); **behavioral contracting** (write a deal with yourself or a partner); **arranging reinforcers and punishers** (treat yourself for wins, fine yourself for misses); **social support** (tell friends, join a group); and **self-instructions** (talk yourself through it). A good plan layers several tools at once.",
      vocab: {
        strategy: { ipa: "/ˈstrætədʒi/", plain: "a plan or method" },
        contracting: { ipa: "/kənˈtræktɪŋ/", plain: "making a written agreement" },
        "social support": { ipa: "/ˈsoʊʃəl səˈpɔːrt/", plain: "help and encouragement from people" }
      }
    },
    "U20-S4": {
      bridge: "The self-management recipe: define the problem, set a goal, track it, change the setup, reward the wins, and evaluate. Six steps to a new you.",
      objectives: ["List the steps of a self-management plan.", "Explain why self-monitoring comes early."],
      pre: "You're starting a self-management plan to drink more water. What's the very first step — before you change anything?",
      explain: "The steps: (1) **Define the problem and set a goal** — know exactly what and how much. (2) **Self-monitor** — track the behavior for a few days to get a baseline. (3) **Arrange antecedents** — set up cues and reduce effort. (4) **Arrange consequences** — rewards for success, costs for failure. (5) **Enlist support** — tell people who'll encourage you. (6) **Evaluate and adjust** — check the data and tweak the plan.",
      vocab: {
        baseline: { ipa: "/ˈbeɪslaɪn/", plain: "the starting measurement before any change" },
        evaluate: { ipa: "/ɪˈvæljueɪt/", plain: "to judge how well something worked" },
        adjust: { ipa: "/əˈdʒʌst/", plain: "to make small changes" }
      }
    },
    "U20-S5": {
      bridge: "Self-management can treat real clinical problems — habits, fears, overeating, anger — when the person becomes their own scientist.",
      objectives: ["Describe clinical uses of self-management.", "Explain the role of self-instructions."],
      pre: "A person with a hair-pulling habit tries self-management. What's one behavior they could engage in instead of pulling?",
      explain: "**Self-instructions** are the little sentences you say to guide yourself: 'I can stay calm. I'll take a breath and count to five.' They're a **self-generated mediator** that travels with you. Self-management tackles real **clinical problems**: nail-biting, tics, overeating, procrastination, anger, even fear. The same plan that works for 'exercise more' scales to 'stop pulling my hair' — because the science is the science.",
      vocab: {
        clinical: { ipa: "/ˈklɪnɪkəl/", plain: "related to treating real problems" },
        "self-instructions": { ipa: "/self ɪnˈstrʌkʃənz/", plain: "sentences you say to yourself to guide behavior" },
        procrastination: { ipa: "/proʊˌkræstɪˈneɪʃən/", plain: "putting off things you should do" }
      }
    },

    /* ============ UNIT 21 · Habit Reversal ============ */
    "U21-S0": {
      bridge: "A bald spot from hair-pulling. A constant shoulder twitch. A stutter that won't quit. Habits can hijack a body — and a clever procedure can steal it back.",
      objectives: ["Describe examples of habit behaviors.", "Explain why habits are hard to control."],
      pre: "Why is it so hard to stop biting your nails, even when you really want to? What makes a habit automatic?",
      explain: "The chapter's heroes struggled with **hair-pulling**, **tics**, and **stuttering** — behaviors that happen automatically, often without the person even noticing. These are **habit behaviors**: repetitive, frequent, and usually harmless at first, but sometimes damaging. They're hard to control because they're not deliberate — the person doesn't 'choose' to do them, so willpower alone rarely works.",
      vocab: {
        repetitive: { ipa: "/rɪˈpetətɪv/", plain: "done again and again" },
        automatic: { ipa: "/ˌɔːtəˈmætɪk/", plain: "done without thinking" },
        deliberate: { ipa: "/dɪˈlɪbərət/", plain: "done on purpose" }
      }
    },
    "U21-S1": {
      bridge: "What exactly is a 'habit'? It's a behavior that runs itself — so often, so smoothly, that you barely notice it until it's a problem.",
      objectives: ["Define habit behaviors.", "Distinguish nervous habits, tics, and stuttering."],
      pre: "Name one behavior you do without thinking, many times a day. What makes it feel 'automatic'?",
      explain: "**Habit behaviors** are repetitive behaviors that occur automatically, often with little awareness, and typically without strong social consequences — nobody rewards you for nail-biting. The three types: **nervous habits** (hair-pulling, nail-biting, thumb-sucking), **motor and vocal tics** (sudden, repetitive twitches or sounds), and **stuttering** (repeated interruptions of speech). They're maintained largely by **automatic reinforcement** — the behavior itself provides the reward.",
      vocab: {
        tics: { ipa: "/tɪks/", plain: "sudden repeated movements or sounds" },
        stuttering: { ipa: "/ˈstʌtərɪŋ/", plain: "speaking with repeated sounds or blocks" },
        automatic: { ipa: "/ˌɔːtəˈmætɪk/", plain: "done without thinking" }
      }
    },
    "U21-S2": {
      bridge: "The habit reversal recipe has three secret ingredients: catch it (awareness), block it (competing response), and reward the win (motivation).",
      objectives: ["Describe the components of habit reversal.", "Explain the competing response."],
      pre: "To stop a hair-pulling habit, would it help to (a) notice every pull, (b) do a different action with your hands instead, or (c) both?",
      explain: "**Habit reversal** has three parts. **Awareness training**: learn to DETECT each occurrence — because you can't stop what you don't notice. **Competing response training**: at the first sign of the habit, do a **physically incompatible** behavior — for hair-pulling, grip your hands tightly at your sides. The competing response makes the habit impossible to do at the same time. **Motivation procedures**: rewards, reminders, and social support keep the person going.",
      vocab: {
        competing: { ipa: "/kəmˈpiːtɪŋ/", plain: "in conflict; blocking each other" },
        incompatible: { ipa: "/ˌɪnkəmˈpætəbəl/", plain: "can't happen at the same time" },
        awareness: { ipa: "/əˈwernəs/", plain: "knowing and noticing something" }
      }
    },
    "U21-S3": {
      bridge: "Habit reversal isn't just theory — it has beaten nervous habits, tics, and even stuttering in study after study.",
      objectives: ["Describe applications of habit reversal.", "Explain how it is adapted to different habits."],
      pre: "A therapist uses habit reversal for a thumb-sucker. What would the 'competing response' be for sucking a thumb?",
      explain: "Habit reversal has been applied successfully across the board: **nervous habits** (hair-pulling, nail-biting, thumb-sucking), **motor and vocal tics**, and **stuttering**. The competing response changes with the habit — gripping the hands for hair-pulling, sitting on hands for thumb-sucking, taking a breath and speaking slowly for stuttering. Whatever the habit, the formula is the same: catch it, block it, reward the win.",
      vocab: {
        applied: { ipa: "/əˈplaɪd/", plain: "put to use in the real world" },
        effective: { ipa: "/ɪˈfektɪv/", plain: "works well; gets results" },
        adaptation: { ipa: "/ˌædæpˈteɪʃən/", plain: "changing something to fit a new use" }
      }
    },
    "U21-S4": {
      bridge: "Why does habit reversal work so well? The competing response blocks the habit, awareness kills the 'auto-pilot', and rewards keep the fight alive.",
      objectives: ["Explain why habit reversal works.", "Describe the role of each component."],
      pre: "Which part of habit reversal do you think matters most: noticing the habit, doing the blocking move, or getting rewards?",
      explain: "Three mechanisms explain the power of habit reversal. The **competing response physically prevents** the habit — you literally cannot pull hair while your hands are locked at your sides. **Awareness training** turns an automatic behavior into a noticed one — and you can't change what you don't see. **Motivation procedures** make the effort worthwhile — rewards and support keep the person practicing until the habit dies. Together, they attack the habit from three angles at once.",
      vocab: {
        mechanism: { ipa: "/ˈmekənɪzəm/", plain: "the way something works" },
        prevent: { ipa: "/prɪˈvent/", plain: "to stop from happening" },
        motivate: { ipa: "/ˈmoʊtɪveɪt/", plain: "to give someone a reason to act" }
      }
    },
    "U21-S5": {
      bridge: "Habit reversal is the star, but not the only actor: stimulus control, relaxation, and other treatments round out the toolbox.",
      objectives: ["Describe other treatments for habit disorders.", "Compare them with habit reversal."],
      pre: "Beyond blocking a habit, what else might help: avoiding the triggers? relaxing? Both?",
      explain: "Other procedures support habit reversal: **stimulus control** — remove or change the cues that trigger the habit (shorten nails, cover the mirror); **relaxation training** — reduce the tension that fuels some habits; and variations of habit reversal itself (simplified versions for busy clinics). Habit reversal remains the **treatment of choice** for tics, but the full toolbox gives therapists flexible options.",
      vocab: {
        treatment: { ipa: "/ˈtriːtmənt/", plain: "the plan or procedure you apply" },
        trigger: { ipa: "/ˈtrɪɡər/", plain: "to set something off" },
        flexible: { ipa: "/ˈfleksəbəl/", plain: "able to bend and adapt" }
      }
    },

    /* ============ UNIT 22 · Token Economy ============ */
    "U22-S0": {
      bridge: "Sammy had given up on himself. Then a card with little stars appeared — and every good action earned a star. Sammy started rebuilding his life, one star at a time.",
      objectives: ["Describe the token economy example.", "Explain how tokens changed behavior."],
      pre: "A boy earns a star for every chore and trades stars for movie night. What does the star DO that a simple 'good job' doesn't?",
      explain: "In the opening case, **Sammy** earned **tokens** (like stars or checkmarks) for adaptive behaviors — self-care, work, social skills — and later **exchanged** them for **backup reinforcers** (privileges, snacks, outings). The tokens bridged the gap: he got immediate reinforcement for good behavior, and the tokens stored that value until he could spend them. His rehabilitation was built token by token.",
      vocab: {
        token: { ipa: "/ˈtoʊkən/", plain: "a small object or mark that stands for a reward" },
        exchange: { ipa: "/ɪksˈtʃeɪndʒ/", plain: "to trade one thing for another" },
        rehabilitation: { ipa: "/ˌriːəˌbɪlɪˈteɪʃən/", plain: "helping someone recover skills" }
      }
    },
    "U22-S1": {
      bridge: "A token economy is a tiny economy built from behavior: tokens are the currency, target behaviors are the jobs, and backup reinforcers are the goods.",
      objectives: ["Define a token economy.", "Explain the role of tokens and backup reinforcers."],
      pre: "What makes a poker chip valuable to a monkey? It can't eat it — so why would the monkey work for it?",
      explain: "A **token economy** is a system where people earn **tokens** for target behaviors and spend them on **backup reinforcers**. Tokens are **conditioned reinforcers** — they have no value on their own, but become valuable because they can be exchanged. Why use tokens? They're **immediate** (hand one out the instant the behavior happens), **portable**, and **countable**. You can reinforce a behavior every time without carrying a pocketful of candy.",
      vocab: {
        economy: { ipa: "/ɪˈkɑːnəmi/", plain: "a system of producing and exchanging things" },
        currency: { ipa: "/ˈkɜːrənsi/", plain: "the money or tokens used in a system" },
        backup: { ipa: "/ˈbækʌp/", plain: "a reserve; the real reward behind the token" }
      }
    },
    "U22-S2": {
      bridge: "Building a token economy takes six design decisions: what behaviors pay, what the tokens are, what you can buy, how often, at what price, and when the store opens.",
      objectives: ["List the steps for implementing a token economy.", "Explain the token exchange rate."],
      pre: "You're designing a classroom token economy. What six things do you need to decide before you hand out the first token?",
      explain: "The implementation checklist: (1) **Define target behaviors** — exactly what earns tokens. (2) **Choose tokens** — stars, checks, poker chips, points. (3) **Pick backup reinforcers** — what people actually want to buy. (4) **Set the schedule** — tokens every time, or sometimes? (5) **Set the exchange rate** — 10 tokens = 30 minutes of games. (6) **Decide the exchange time and place** — when the 'store' is open. (7) Decide whether **response cost** (fining tokens) is used.",
      vocab: {
        implementation: { ipa: "/ˌɪmplɪmenˈteɪʃən/", plain: "putting a plan into action" },
        "exchange rate": { ipa: "/ɪksˈtʃeɪndʒ reɪt/", plain: "how many tokens buy how much reward" },
        define: { ipa: "/dɪˈfaɪn/", plain: "to state exactly what something is" }
      }
    },
    "U22-S3": {
      bridge: "Token economies run on details: keep the tokens safe, keep the books honest, and train the staff. The system lives or dies on the boring stuff.",
      objectives: ["Describe practical considerations for token economies.", "Explain staff training."],
      pre: "A class token economy collapses after two weeks. What boring details might have killed it — counterfeit tokens? untrained helpers?",
      explain: "Practical traps: **counterfeiting** — tokens must be hard to fake (stamps, initials); **storage** — tokens must be kept safely so they can't be stolen; **reliable exchange** — the 'store' must open when promised, or trust dies; **tracking** — accurate records of who earned and spent what; and **staff training** — every adult must apply the rules identically. A token economy is only as strong as its bookkeeping.",
      vocab: {
        counterfeit: { ipa: "/ˈkaʊntərfɪt/", plain: "fake copies made to cheat" },
        reliable: { ipa: "/rɪˈlaɪəbəl/", plain: "dependable; happens as promised" },
        bookkeeping: { ipa: "/ˈbʊkkiːpɪŋ/", plain: "keeping accurate records" }
      }
    },
    "U22-S4": {
      bridge: "Token economies run everywhere — classrooms, clinics, group homes, even workplaces. Wherever behavior matters, tokens can help.",
      objectives: ["Describe applications of token economies.", "Give examples from different settings."],
      pre: "Beyond classrooms, where else could 'earn points, spend points' improve behavior? Hospitals? Offices? Homes?",
      explain: "Token economies have been used in **schools** (earn points for work and behavior), **psychiatric hospitals** (patients earn privileges for self-care), **group homes and institutions** (individuals with disabilities earn tokens for daily skills), **workplaces** (points for safety and productivity), and even **family homes** (chore charts). The system is flexible: change the behaviors, tokens, and backup reinforcers, and it fits almost any setting.",
      vocab: {
        psychiatric: { ipa: "/ˌsaɪkiˈætrɪk/", plain: "related to mental health treatment" },
        productivity: { ipa: "/ˌproʊdʌkˈtɪvəti/", plain: "how much work gets done" },
        institution: { ipa: "/ˌɪnstɪˈtuːʃən/", plain: "a large organized place of care" }
      }
    },
    "U22-S5": {
      bridge: "Token economies have superpowers — immediate rewards, portability, bridging delays — and kryptonite: they need staff, money, and a plan for the real world.",
      objectives: ["List the advantages of token economies.", "List the disadvantages."],
      pre: "Tokens can be handed out instantly, carried anywhere, and spent later. What could possibly be hard about running a token economy?",
      explain: "**Advantages**: tokens are **immediate** (instant reinforcement), **portable** (usable anywhere), **bridge delays** (behavior today, reward Friday), and make behavior **visible** (a growing token pile is motivating). **Disadvantages**: they take **time and money** (tokens, backup reinforcers, staff), need **constant management**, and — the big one — behavior may not **generalize** once the tokens stop. Smart programs plan to fade tokens and let real-world rewards take over.",
      vocab: {
        advantage: { ipa: "/ədˈvæntɪdʒ/", plain: "a benefit or plus" },
        disadvantage: { ipa: "/ˌdɪsədˈvæntɪdʒ/", plain: "a drawback or minus" },
        generalize: { ipa: "/ˈdʒenrəlaɪz/", plain: "to spread to new situations" }
      }
    },

    /* ============ UNIT 23 · Behavioral Contracts ============ */
    "U23-S0": {
      bridge: "Stavros's dissertation was going nowhere — until he signed a contract: write so many pages, earn so much fun. Dan's family was drowning in fights — until a contract turned truce into rules.",
      objectives: ["Describe the behavioral contracting examples.", "Explain how contracts changed behavior."],
      pre: "Why do written promises work better than 'I'll try'? What does writing it down change?",
      explain: "**Stavros** needed to write his dissertation, so he made a **contract** with himself or a partner: specific work targets in exchange for specific rewards. **Dan and his parents** were fighting constantly, so they wrote a contract spelling out what each side would do — and the consequences. Both contracts worked because they turned vague wishes into **specific, written, enforceable deals**.",
      vocab: {
        contract: { ipa: "/ˈkɑːntrækt/", plain: "a written agreement between parties" },
        dissertation: { ipa: "/ˌdɪsərˈteɪʃən/", plain: "a long formal essay for a degree" },
        enforceable: { ipa: "/ɪnˈfɔːrsəbəl/", plain: "can be made to happen" }
      }
    },
    "U23-S1": {
      bridge: "A behavioral contract is a written deal with three parts: who does what, what they get, and what happens if they don't.",
      objectives: ["Define a behavioral contract.", "State its purpose."],
      pre: "What makes a contract different from a 'promise'? What would a written contract include that a promise doesn't?",
      explain: "A **behavioral contract** is a **written document** that specifies a **target behavior**, the **consequences** for doing (or not doing) it, and the **record-keeping** — who checks and how. It works by making the deal **explicit and observable**: everyone can see the terms, check the data, and apply the consequences. Writing turns 'I'll try to behave' into 'I will do X, and here's what happens.'",
      vocab: {
        explicit: { ipa: "/ɪkˈsplɪsɪt/", plain: "stated clearly and exactly" },
        observable: { ipa: "/əbˈzɜːrvəbəl/", plain: "can be seen and checked" },
        specify: { ipa: "/ˈspesɪfaɪ/", plain: "to state exactly" }
      }
    },
    "U23-S2": {
      bridge: "Every contract has the same anatomy: the task (what you'll do), the reward (what you'll earn), and the record (how we'll know).",
      objectives: ["List the components of a behavioral contract.", "Explain the task record."],
      pre: "Write the three parts of a homework contract: what you'll do, what you'll get, and... what's the third?",
      explain: "The three components: (1) **The task** — the target behavior, defined clearly ('complete 2 math worksheets daily'). (2) **The reward and penalty** — the reinforcer for success and the consequence for failure. (3) **The task record** — who records the behavior and how, so success is measured honestly. Some contracts also name a **bonus** or a **penalty** and who delivers it. All parts must be clear enough that there's no room to argue.",
      vocab: {
        component: { ipa: "/kəmˈpoʊnənt/", plain: "one part of something" },
        penalty: { ipa: "/ˈpenəlti/", plain: "a consequence for failing" },
        record: { ipa: "/ˈrekərd/", plain: "a written note of what happened" }
      }
    },
    "U23-S3": {
      bridge: "Contracts come in two sizes: solo (you vs. you) and duo (you plus a partner who holds the rewards).",
      objectives: ["Distinguish one-party and two-party contracts.", "Give an example of each."],
      pre: "Which contract is stronger: one you make with yourself, or one you sign with a friend who controls your rewards? Why?",
      explain: "A **one-party (self) contract** is a deal you make with yourself — you set the terms and hold the consequences. It's simple but easy to break (who fines themselves?). A **two-party contract** adds a **contract manager** — someone who holds the reinforcers and delivers them fairly. The other person makes the deal real, which is why two-party contracts usually work better. Even a self-contract is stronger when you share it with someone.",
      vocab: {
        "one-party": { ipa: "/wʌn ˈpɑːrti/", plain: "made with just yourself" },
        "two-party": { ipa: "/tuː ˈpɑːrti/", plain: "made with another person" },
        manager: { ipa: "/ˈmænɪdʒər/", plain: "the person who runs or oversees something" }
      }
    },
    "U23-S4": {
      bridge: "The best contracts aren't imposed — they're negotiated. Both sides talk, both sides agree, and the deal is fair enough to actually keep.",
      objectives: ["Explain how to negotiate a behavioral contract.", "Describe the role of agreement."],
      pre: "A parent writes a punishment-heavy contract and orders the kid to sign. Why might this backfire?",
      explain: "Good contracts are **negotiated**: both sides discuss the target behavior, the rewards, the penalties, and the record-keeping until they **agree**. The person whose behavior is changing should feel they have a say — a fair deal is one they'll actually follow. Before signing, review every term together. A contract built by force is a contract built to fail.",
      vocab: {
        negotiate: { ipa: "/nɪˈɡoʊʃieɪt/", plain: "to discuss and reach an agreement" },
        mutual: { ipa: "/ˈmjuːtʃuəl/", plain: "shared by both sides" },
        consent: { ipa: "/kənˈsent/", plain: "clear agreement or permission" }
      }
    },
    "U23-S5": {
      bridge: "Why do signed contracts change behavior when promises don't? They attack from three directions: the rule, the cue, and the payoff.",
      objectives: ["Explain why behavioral contracts work.", "Connect contracts to behavioral principles."],
      pre: "A contract spells out a rule, sits on the fridge as a reminder, and delivers a reward. Which three behavioral principles does that hit?",
      explain: "Contracts influence behavior through **three principles at once**. As a **rule**, they tell you what to do — and humans follow clear rules. As a **cue (antecedent)**, the written contract reminds you constantly — it's a discriminative stimulus. As a **contingency**, they **arrange reinforcement and punishment** — the reward actually comes, or the penalty actually lands. Most people don't break contracts lightly, and the consequences make that smart.",
      vocab: {
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" },
        contingency: { ipa: "/kənˈtɪndʒənsi/", plain: "the connection between action and result" },
        consequence: { ipa: "/ˈkɑːnsɪkwens/", plain: "what happens right after an action" }
      }
    },
    "U23-S6": {
      bridge: "Contracts are everywhere once you look: homework deals, health goals, workplace bonuses, family rules — all using the same three-part structure.",
      objectives: ["Describe applications of behavioral contracts.", "Give examples from different domains."],
      pre: "Where have you seen a 'contract-like' deal in your own life — school, home, or a game? What made it work?",
      explain: "Behavioral contracts apply across domains: **academic work** (page goals for dissertations or study), **health behaviors** (exercise and diet deals), **parent–child relations** (chores and privileges), **schools** (classroom conduct contracts), and **organizations** (performance bonuses). Every one uses the same skeleton — clear behavior, clear consequences, clear records. Contracts can **increase** desirable behavior and **decrease** undesirable behavior; the structure is identical.",
      vocab: {
        domain: { ipa: "/doʊˈmeɪn/", plain: "an area or field of life" },
        academic: { ipa: "/ˌækəˈdemɪk/", plain: "related to school and study" },
        organizational: { ipa: "/ˌɔːrɡənəˈzeɪʃənəl/", plain: "related to companies or groups" }
      }
    },

    /* ============ UNIT 24 · Fear & Anxiety Reduction ============ */
    "U24-S0": {
      bridge: "Trisha's heart raced at the thought of public speaking. Allison couldn't walk past a spider. Both learned that fear — however real — can be unlearned.",
      objectives: ["Describe the fear reduction examples.", "Explain how fears are learned and unlearned."],
      pre: "If a fear is LEARNED (paired experiences), what does that suggest about how to fix it?",
      explain: "**Trisha** feared public speaking; **Allison** feared spiders. Their fears were **conditioned emotional responses** — learned by pairing. And what is learned can be **unlearned**. Their treatments used **relaxation** and **exposure** — teaching the body to stay calm in the presence of the feared thing until the fear fades. The process is called **extinction** of the conditioned response.",
      vocab: {
        anxiety: { ipa: "/æŋˈzaɪəti/", plain: "a feeling of worry or fear" },
        exposure: { ipa: "/ɪkˈspoʊʒər/", plain: "being in contact with something" },
        relief: { ipa: "/rɪˈliːf/", plain: "the feeling when something bad stops" }
      }
    },
    "U24-S1": {
      bridge: "Fear is a two-headed monster: the body's automatic alarm (respondent) and the escape behavior that keeps the alarm alive (operant).",
      objectives: ["Explain the respondent and operant parts of fear.", "Explain how avoidance maintains fear."],
      pre: "If you ALWAYS run away from spiders, will your fear ever fade? Why does running away make fear stronger?",
      explain: "Fear has two engines. The **respondent engine**: a stimulus (spider) triggers an automatic fear response (racing heart). The **operant engine**: you **avoid** the spider, and avoidance feels like relief — which **negatively reinforces** the avoidance. The cruel part: avoiding the spider means you never learn it's safe, so the fear never dies. Any treatment must tackle BOTH the automatic alarm AND the avoidance.",
      vocab: {
        respondent: { ipa: "/rɪˈspɑːndənt/", plain: "automatic; controlled by reflexes" },
        avoidance: { ipa: "/əˈvɔɪdəns/", plain: "staying away from something" },
        maintain: { ipa: "/meɪnˈteɪn/", plain: "to keep something going" }
      }
    },
    "U24-S2": {
      bridge: "Before facing the monster, learn to switch off your body's alarm. Relaxation training is the calm superpower that makes fear-fighting possible.",
      objectives: ["Describe relaxation training.", "Explain progressive muscle relaxation."],
      pre: "Why is it nearly impossible to feel deeply relaxed and terrified at the same time? What does that suggest for treating fear?",
      explain: "**Relaxation training** teaches the body to produce deep calm on command. **Progressive muscle relaxation (PMR)** is the classic method: tense each muscle group hard, notice the tension, then let it go and notice the calm — working through the whole body, foot to head. Relaxation is powerful because it's **incompatible with anxiety** — your body can't be tense and relaxed at once. That's the key that unlocks exposure.",
      vocab: {
        progressive: { ipa: "/prəˈɡresɪv/", plain: "moving step by step" },
        incompatible: { ipa: "/ˌɪnkəmˈpætəbəl/", plain: "can't happen at the same time" },
        muscle: { ipa: "/ˈmʌsəl/", plain: "body tissue that moves or tenses" }
      }
    },
    "U24-S3": {
      bridge: "The cure for fear is facing it — but smartly. Systematic desensitization climbs a fear ladder step by step; flooding dives into the deep end. Both end with fear losing.",
      objectives: ["Describe systematic desensitization.", "Describe flooding and in vivo exposure.", "Explain why exposure works."],
      pre: "Which sounds kinder: facing a tiny fear first and working up, or facing the biggest fear all at once? Which would you choose?",
      explain: "**Systematic desensitization** is the staircase: build a **fear hierarchy** (ratings from 1 to 10), learn to relax, then climb the ladder — imagining or facing each rung while staying relaxed. **Flooding (or in vivo exposure)** is the deep end: face the full fear directly, with no escape, until the anxiety peaks and falls. Both work through **habituation and extinction** — staying in the situation without the feared disaster teaches the brain 'this is safe'. The golden rule: **stay until the anxiety drops**. Leaving early teaches escape, which keeps the fear alive.",
      vocab: {
        desensitization: { ipa: "/diːˌsensətəˈzeɪʃən/", plain: "making a fear less sensitive" },
        hierarchy: { ipa: "/ˈhaɪərɑːrki/", plain: "a ranked list, from least to most" },
        habituation: { ipa: "/həˌbɪtʃuˈeɪʃən/", plain: "getting used to something until it stops affecting you" }
      }
    },
    "U24-S4": {
      bridge: "Beyond relaxation and exposure, fear can be fought with models, thoughts, and practice — the full team of fear-busters.",
      objectives: ["Describe modeling, cognitive restructuring, and reinforced practice.", "Explain how each reduces fear."],
      pre: "Watching a brave friend calmly handle a spider — could that lower YOUR fear? How would that work?",
      explain: "Extra tools: **modeling** — watching others handle the fear calmly lowers your own (that's vicarious learning); **cognitive restructuring** — changing the scary self-talk ('I'll die!' becomes 'I can handle this'); and **reinforced practice** — doing the feared task with rewards and support. Each targets a different part of fear. The strongest treatments often combine exposure with these helpers.",
      vocab: {
        vicarious: { ipa: "/vɪˈkeriəs/", plain: "learned by watching someone else" },
        cognitive: { ipa: "/ˈkɑːɡnətɪv/", plain: "related to thinking" },
        restructuring: { ipa: "/ˌriːˈstrʌktʃərɪŋ/", plain: "rebuilding something into a new shape" }
      }
    },
    "U24-S5": {
      bridge: "This isn't just about spiders and speeches: these procedures treat real phobias, social anxiety, and even posttraumatic stress — with the same science.",
      objectives: ["Describe clinical applications of fear reduction.", "Explain the core rule of exposure."],
      pre: "What do a dog phobia, stage fright, and fear of flying have in common — and what single rule makes all of them treatable?",
      explain: "Fear-reduction procedures treat a wide range: **specific phobias** (spiders, dogs, heights), **social anxiety**, **panic**, and **posttraumatic stress** (carefully and with support). The shared core rule: **approach the fear gradually or fully, and stay until the anxiety falls**. Whether the ladder or the deep end, the lesson is the same — the fear is a false alarm, and the only way the brain learns that is by facing it safely.",
      vocab: {
        phobia: { ipa: "/ˈfoʊbiə/", plain: "an extreme, unreasonable fear" },
        posttraumatic: { ipa: "/ˌpoʊsttrəˈmætɪk/", plain: "after a shocking or scary event" },
        clinical: { ipa: "/ˈklɪnɪkəl/", plain: "related to treating real problems" }
      }
    },

    /* ============ UNIT 25 · Cognitive Behavior Modification ============ */
    "U25-S0": {
      bridge: "Daniel exploded at the smallest frustration. Claire drifted off in every class. The fix wasn't just their actions — it was the thoughts running those actions.",
      objectives: ["Describe the cognitive behavior modification examples.", "Explain the role of thinking in behavior."],
      pre: "Before Daniel gets angry, what goes through his mind? Could changing that thought change the anger?",
      explain: "**Daniel** learned to control his anger, and **Claire** learned to pay attention — not by changing the world, but by changing their **thinking**. **Cognitive behavior modification** targets the **private behaviors** — thoughts, images, self-talk — that drive overt actions. The idea: if thoughts are behaviors, then the principles of behavior change apply to them too.",
      vocab: {
        cognitive: { ipa: "/ˈkɑːɡnətɪv/", plain: "related to thinking" },
        overt: { ipa: "/oʊˈvɜːrt/", plain: "visible; out in the open" },
        modification: { ipa: "/ˌmɑːdɪfɪˈkeɪʃən/", plain: "the act of changing something" }
      }
    },
    "U25-S1": {
      bridge: "Thinking IS behavior — private behavior. It has a function: our thoughts cue and reward our actions like any other antecedents and consequences.",
      objectives: ["Define cognitive behavior.", "Explain how thoughts function as antecedents and consequences."],
      pre: "If telling yourself 'I can do this' changes what you do next, what role is that thought playing — a cue or a reward?",
      explain: "**Cognitive behavior** is **covert** — private events like thinking, imagining, and self-talk that others can't see. But they're still behavior, and they still **function**: a self-instruction ('stay calm') is an **antecedent** that cues calm behavior; self-praise ('good job, me!') is a **consequence** that reinforces effort. Because private events influence public behavior, changing thoughts changes actions.",
      vocab: {
        covert: { ipa: "/ˈkoʊvɜːrt/", plain: "hidden; not visible to others" },
        function: { ipa: "/ˈfʌŋkʃən/", plain: "the job or purpose of something" },
        antecedent: { ipa: "/ˌæntɪˈsiːdənt/", plain: "what comes before; the trigger" }
      }
    },
    "U25-S2": {
      bridge: "Cognitive restructuring is thought-renovation: find the irrational beliefs running the show, then remodel them into realistic ones.",
      objectives: ["Define cognitive restructuring.", "Explain how maladaptive thoughts are changed."],
      pre: "You fail one test and think 'I'm a total failure.' Is that thought accurate? What would a more realistic thought be?",
      explain: "**Cognitive restructuring** is a three-step renovation. (1) **Identify** the **maladaptive thoughts** — the distorted, unhelpful ones ('I'm a failure', 'everyone hates me'). (2) **Challenge** them — what's the evidence? (3) **Replace** them with **adaptive, realistic** thoughts ('I failed one test; I can study differently next time'). The person learns to catch their own distorted thinking and rebuild it — changing thoughts to change feelings and actions.",
      vocab: {
        restructuring: { ipa: "/ˌriːˈstrʌktʃərɪŋ/", plain: "rebuilding something into a new shape" },
        maladaptive: { ipa: "/ˌmæləˈdæptɪv/", plain: "unhelpful; makes problems worse" },
        irrational: { ipa: "/ɪˈræʃənəl/", plain: "not based on logic" }
      }
    },
    "U25-S3": {
      bridge: "Sometimes you can't change the storm — but you can learn to sail in it. Cognitive coping skills give you the self-talk to survive the rough seas.",
      objectives: ["Describe cognitive coping skills training.", "Explain self-instructional training."],
      pre: "What do you say to yourself during a stressful moment? How could a rehearsed sentence help you stay calm?",
      explain: "**Cognitive coping skills training** (including **stress inoculation**) prepares people for tough situations by teaching **coping self-statements** — sentences you rehearse and then use under pressure ('Take a breath. I can handle this. One step at a time.'). **Self-instructional training** goes further: the person talks themselves through a task step by step, first out loud, then quietly, then silently. The self-talk becomes a portable coach.",
      vocab: {
        coping: { ipa: "/ˈkoʊpɪŋ/", plain: "handling stress or difficulty" },
        inoculation: { ipa: "/ɪˌnɑːkjəˈleɪʃən/", plain: "preparing ahead so the real thing is easier" },
        "self-instruction": { ipa: "/self ɪnˈstrʌkʃən/", plain: "talking yourself through something" }
      }
    },
    "U25-S4": {
      bridge: "Acceptance-based therapy flips the script: don't fight the thought — let it float by like a cloud, and choose your action anyway.",
      objectives: ["Explain acceptance-based approaches.", "Compare them with cognitive restructuring."],
      pre: "If 'I'm anxious' pops into your head, which helps more: arguing with it, or noticing it and acting bravely anyway?",
      explain: "**Acceptance-based therapies** (like **ACT** — Acceptance and Commitment Therapy) take a different route from restructuring. Instead of **changing the content** of thoughts, they change your **relationship** to them: **notice** the thought, **accept** it without fighting, and **commit to action** guided by your values. The anxious thought doesn't have to leave — it just stops being your boss. Both approaches work; they just target different parts of the thinking machine.",
      vocab: {
        acceptance: { ipa: "/əkˈseptəns/", plain: "letting something be without fighting it" },
        commitment: { ipa: "/kəˈmɪtmənt/", plain: "a strong promise to do something" },
        values: { ipa: "/ˈvæljuːz/", plain: "what matters most to you" }
      }
    },
    "U25-S5": {
      bridge: "From anger to anxiety to habits, cognitive behavior modification treats a wide range — always with the same rule: the proof is in changed behavior.",
      objectives: ["Describe clinical applications of cognitive behavior modification.", "Explain the emphasis on measurable behavior change."],
      pre: "A therapist changes a client's thoughts about public speaking. How would she know the treatment actually worked?",
      explain: "Cognitive behavior modification applies to **depression, anger, anxiety, eating problems, and habit disorders** — and it's used in schools and workplaces too. The discipline's rule: thoughts may be the target, but **measurable behavior change is the proof**. The therapist checks: does Daniel actually stay calm longer? Does Claire actually focus more? If the behavior doesn't improve, the thoughts weren't the right ones to change.",
      vocab: {
        measurable: { ipa: "/ˈmeʒərəbəl/", plain: "able to be measured" },
        depression: { ipa: "/dɪˈpreʃən/", plain: "a lasting feeling of sadness" },
        discipline: { ipa: "/ˈdɪsəplɪn/", plain: "a field of study with its own rules" }
      }
    },
  };

  window.SectionContent = SC;
})();

