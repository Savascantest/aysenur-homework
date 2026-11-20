const choice = (id, prompt, options, answer, label, explanation) => ({ id, prompt, options, answer, label, explanation });
const fill = (id, prompt, answer, explanation) => ({ id, type: 'fill', prompt, answer, explanation });
const order = (id, prompt, words, answer, explanation) => ({ id, type: 'order', prompt, words, answer, explanation });
const match = (id, prompt, pairs, explanation) => ({ id, type: 'match', prompt, pairs, explanation });
const conversation = (id, title, scenario, partner, turns) => ({ id, title, scenario, partner, turns });

const businessVocabulary = [
  ['agenda', 'a list of things to discuss in a meeting', 'The agenda is ready before the meeting.', 'gündem', 'Toplantıdan önce gündem hazırdır.'],
  ['deadline', 'the final time to finish a task', 'The deadline for the report is Friday.', 'son tarih', 'Raporun son tarihi Cuma.'],
  ['update', 'new information about work or a situation', 'Can you give the team a short update?', 'güncelleme', 'Ekibe kısa bir güncelleme verebilir misin?'],
  ['colleague', 'a person you work with', 'My colleague joins the call at ten.', 'iş arkadaşı', 'İş arkadaşım görüşmeye saat onda katılıyor.'],
  ['customer', 'a person who buys a product or service', 'The customer needs an answer today.', 'müşteri', 'Müşterinin bugün bir cevaba ihtiyacı var.'],
  ['schedule', 'a plan of times and activities', 'Please check the meeting schedule.', 'program', 'Lütfen toplantı programını kontrol et.'],
  ['confirm', 'to say that something is correct or agreed', 'Please confirm the time by email.', 'onaylamak', 'Lütfen saati e-postayla onayla.'],
  ['prepare', 'to get ready for something', 'We need to prepare the presentation.', 'hazırlamak', 'Sunumu hazırlamamız gerekiyor.'],
  ['report', 'a document with information about work', 'She sends the weekly report on Monday.', 'rapor', 'Haftalık raporu pazartesi gönderiyor.'],
  ['feedback', 'an opinion that helps someone improve', 'The manager gives helpful feedback.', 'geri bildirim', 'Müdür faydalı geri bildirim veriyor.']
].map(([word, definition, example, turkish, turkishExample]) => ({ id: word, word, definition, example, turkish, turkishExample }));

const placeVocabulary = [
  ['entrance', 'the place where you go into a building', 'Please wait near the main entrance.', 'giriş', 'Lütfen ana girişin yakınında bekleyin.'],
  ['exit', 'the place where you leave a building', 'The exit is on the left.', 'çıkış', 'Çıkış solda.'],
  ['location', 'the place where something is', 'I will send you the meeting location.', 'konum', 'Size toplantı konumunu göndereceğim.'],
  ['direction', 'information that tells you where to go', 'Can you give me directions to the office?', 'yol tarifi', 'Ofise nasıl gideceğimi söyleyebilir misin?'],
  ['nearby', 'not far away', 'There is a nearby café for visitors.', 'yakında', 'Ziyaretçiler için yakında bir kafe var.'],
  ['corner', 'the place where two streets meet', 'Turn right at the next corner.', 'köşe', 'Bir sonraki köşeden sağa dön.'],
  ['stairs', 'steps that go up or down', 'Take the stairs to the second floor.', 'merdivenler', 'İkinci kata merdivenlerden çık.'],
  ['lift', 'a machine that takes people between floors', 'The lift is next to reception.', 'asansör', 'Asansör danışmanın yanında.'],
  ['floor', 'one level of a building', 'The training room is on the third floor.', 'kat', 'Eğitim odası üçüncü katta.'],
  ['reception', 'the desk where visitors first ask for help', 'Ask at reception for your visitor badge.', 'danışma', 'Ziyaretçi kartın için danışmaya sor.']
].map(([word, definition, example, turkish, turkishExample]) => ({ id: word, word, definition, example, turkish, turkishExample }));

const businessDialogues = [
  conversation('meeting', 'A meeting time', 'You are arranging a short team meeting.', 'Maya', [
    { prompt: 'Hi. Can we confirm the meeting time for tomorrow?', options: ['Yes, the meeting is at 10:00.', 'Yes, I met the time yesterday.', 'Yes, the meeting were at 10:00.'], answer: 0 },
    { prompt: 'Great. Is everyone free at that time?', options: ['I check the schedule last week.', 'I have checked the schedule, and everyone is free.', 'I am check the schedule tomorrow.'], answer: 1 },
    { prompt: 'What is on the agenda?', options: ['We discuss the customer update and the report.', 'We are discussing the customer update and the report.', 'We discussed the customer update tomorrow.'], answer: 1 },
    { prompt: 'Can you prepare a short update?', options: ['Yes, I can prepare it before the meeting.', 'Yes, I prepared it before tomorrow.', 'Yes, I can prepares it.'], answer: 0 },
    { prompt: 'Perfect. Please send it when it is ready.', options: ['I will send it this afternoon.', 'I sent it next afternoon.', 'I have send it this afternoon.'], answer: 0 }
  ]),
  conversation('customer', 'A customer request', 'You are replying to a customer with a colleague.', 'Daniel', [
    { prompt: 'The customer has asked for an update. Do we have the information?', options: ['Yes, I have the latest information.', 'Yes, I had the latest information tomorrow.', 'Yes, I has the latest information.'], answer: 0 },
    { prompt: 'When did the customer send the question?', options: ['They have sent it yesterday afternoon.', 'They sent it yesterday afternoon.', 'They send it yesterday afternoon.'], answer: 1 },
    { prompt: 'Can you write the reply?', options: ['Yes, I will prepare a clear reply now.', 'Yes, I prepared a clear reply now.', 'Yes, I am prepare a clear reply.'], answer: 0 },
    { prompt: 'Please include the deadline.', options: ['I include it already yesterday.', 'I will include it in the message.', 'I have included it tomorrow.'], answer: 1 },
    { prompt: 'Thank you. I will check it before we send it.', options: ['Great, your feedback will help.', 'Great, your feedback helped tomorrow.', 'Great, your feedback are help.'], answer: 0 }
  ]),
  conversation('report', 'A short work update', 'You are giving an update to a colleague.', 'Elif', [
    { prompt: 'How is the weekly report going?', options: ['I have finished the first part.', 'I finish the first part last week now.', 'I has finished the first part.'], answer: 0 },
    { prompt: 'What did you complete yesterday?', options: ['I completed the customer section.', 'I have completed the customer section yesterday.', 'I complete the customer section tomorrow.'], answer: 0 },
    { prompt: 'Do you need anything from me?', options: ['Could you check the schedule, please?', 'Could you checked the schedule, please?', 'Could you checking the schedule, please?'], answer: 0 },
    { prompt: 'Of course. I can do that after lunch.', options: ['Thank you. That is very helpful.', 'Thank you. That was helpful tomorrow.', 'Thank you. That are helpful.'], answer: 0 },
    { prompt: 'When will you send the report?', options: ['I will send it before the deadline.', 'I sent it before the deadline tomorrow.', 'I have send it before the deadline.'], answer: 0 }
  ])
];

const placeDialogues = [
  conversation('visitor', 'Welcoming a visitor', 'You are helping a visitor find a meeting room.', 'Noah', [
    { prompt: 'Hello. I am looking for the training room.', options: ['It is on the third floor.', 'It is at the third floor.', 'It is in the third floor.'], answer: 0 },
    { prompt: 'Is the lift nearby?', options: ['Yes, it is next to reception.', 'Yes, it is under reception.', 'Yes, it is between reception.'], answer: 0 },
    { prompt: 'What should I do after I leave the lift?', options: ['Turn left and walk to the end.', 'You turning left and walk.', 'Turned left and walking.'], answer: 0 },
    { prompt: 'Is the room near the stairs?', options: ['Yes, it is opposite the stairs.', 'Yes, it is on the stairs.', 'Yes, it is the stairs.'], answer: 0 },
    { prompt: 'Thank you for the directions.', options: ['You are welcome. Please follow the signs.', 'You are welcome. Following the signs.', 'You welcome. Please follows the signs.'], answer: 0 }
  ]),
  conversation('platform', 'Using the homework page', 'You are helping a colleague find an activity.', 'Sam', [
    { prompt: 'I cannot find the vocabulary cards.', options: ['First, open the Vocabulary tab.', 'First, opening the Vocabulary tab.', 'First, you opens the Vocabulary tab.'], answer: 0 },
    { prompt: 'What do I do after that?', options: ['Tap a card to turn it over.', 'Tapping a card to turn it over.', 'You tapped a card tomorrow.'], answer: 0 },
    { prompt: 'Where is the writing task?', options: ['It is in the Writing tab.', 'It is on the Writing tab.', 'It is at the Writing tab.'], answer: 1 },
    { prompt: 'Should I write directly on the page?', options: ['Yes. Write your draft in the text box.', 'Yes. Writing your draft in the text box.', 'Yes. You wrote your draft in the text box.'], answer: 0 },
    { prompt: 'Thanks. I can see it now.', options: ['Great. Do not forget to save your ideas.', 'Great. Not forget save your ideas.', 'Great. You do not forget saved your ideas.'], answer: 0 }
  ]),
  conversation('directions', 'Finding an office', 'You are asking for directions before a meeting.', 'Rina', [
    { prompt: 'Can you tell me where reception is?', options: ['It is near the main entrance.', 'It is nearby the main entrance.', 'It is at the main entrance.'], answer: 0 },
    { prompt: 'I am at the entrance now. What next?', options: ['Go straight ahead to the corner.', 'Going straight ahead to the corner.', 'You went straight ahead tomorrow.'], answer: 0 },
    { prompt: 'Do I turn right or left?', options: ['Turn right at the corner.', 'Turning right at the corner.', 'You turn right at the corner?'], answer: 0 },
    { prompt: 'Is the office on this floor?', options: ['No. Take the stairs to the second floor.', 'No. Take the stairs on the second floor.', 'No. Take the stairs in second floor.'], answer: 0 },
    { prompt: 'Thank you. I have found it.', options: ['Excellent. The meeting room is on your left.', 'Excellent. The meeting room is in your left.', 'Excellent. The meeting room is at your left.'], answer: 0 }
  ])
];

const finalGroups = (topic) => topic === 'business' ? [
  { id: 'choice', label: '01–03 · CHOOSE', title: 'Choose the message that fits', questions: [
    choice('business-c1', 'You need a colleague to check whether she can join tomorrow’s call. Which message would you send?', ['Please confirm whether you can join tomorrow’s call.', 'Please confirmed whether you can join tomorrow’s call.', 'Please confirming whether you can join tomorrow’s call.'], 0, undefined, 'After “please”, use the base verb. “Please confirm” is a clear, polite request.'),
    choice('business-c2', 'At 3 pm, your manager asks whether the first part of the report is ready. Which reply fits best?', ['I have finished the first part.', 'I finished the first part tomorrow.', 'I have finish the first part.'], 0, undefined, '“Have finished” shows a completed action with a result that matters now.'),
    choice('business-c3', 'Your colleague asks when the customer sent the question. Which reply is natural?', ['They sent it yesterday afternoon.', 'They have sent it yesterday afternoon.', 'They send it yesterday afternoon.'], 0, undefined, '“Yesterday afternoon” is a finished time, so use the Past Simple: “sent”.')
  ] },
  { id: 'fill', label: '04–06 · COMPLETE', title: 'Finish useful messages', questions: [
    fill('business-f1', 'Email to a colleague: “Please _____ the meeting time before 4 pm.”', 'confirm', 'Use the base verb after “please” to make a polite request.'),
    fill('business-f2', 'Team note: “We need to _____ the slides before the presentation.”', 'prepare', 'After “need to”, use the base form of the verb: “prepare”.'),
    fill('business-f3', 'Project message: “I will send a short _____ after lunch.”', 'update', 'An “update” is new information about a task or situation.')]
  },
  { id: 'order', label: '07–09 · BUILD', title: 'Build messages people would send', questions: [
    order('business-o1', 'Put together a reminder before a meeting.', ['Please', 'check', 'the', 'agenda', 'before', 'the', 'meeting.'], ['Please', 'check', 'the', 'agenda', 'before', 'the', 'meeting.'], 'A polite instruction starts with “Please” followed by the base verb “check”.'),
    order('business-o2', 'Put together a progress update for your manager.', ['I', 'have', 'finished', 'the', 'first', 'section.'], ['I', 'have', 'finished', 'the', 'first', 'section.'], '“Have finished” reports a completed action that is relevant now.'),
    order('business-o3', 'Put together a reply about yesterday’s email.', ['I', 'sent', 'the', 'reply', 'yesterday.'], ['I', 'sent', 'the', 'reply', 'yesterday.'], 'A finished time such as “yesterday” goes with the Past Simple: “sent”.')]
  },
  { id: 'match', label: '10–12 · MATCH', title: 'Match the situation to the message', questions: [
    match('business-m1', 'Match each situation to the message that solves it.', [{ left: 'The meeting topics are not clear.', right: 'Please check the agenda.' }, { left: 'The client is waiting for news.', right: 'I will send a short update.' }]),
    match('business-m2', 'Match each situation to the useful word.', [{ left: 'Finish the task by Friday.', right: 'deadline' }, { left: 'A person on your work team.', right: 'colleague' }]),
    match('business-m3', 'Match each time clue to the message.', [{ left: 'The action happened yesterday.', right: 'I sent the email yesterday.' }, { left: 'The result matters now.', right: 'I have sent the email.' }], 'Finished times use Past Simple; a present result can use Present Perfect.')]
  },
  { id: 'reply', label: '13–15 · REPLY', title: 'Pick the reply that helps', questions: [
    choice('business-r1', 'A colleague says: “Can you send the report today?”', ['Yes, I will send it before 5 pm.', 'Yes, I sent it tomorrow.', 'Yes, I will sends it before 5 pm.'], 0, undefined, 'Use “will + base verb” for a decision or promise about the future.'),
    choice('business-r2', 'A manager asks: “Have you checked the schedule?”', ['Yes, I have checked it, and everyone is free.', 'Yes, I have check it, and everyone is free.', 'Yes, I checked it tomorrow.'], 0, undefined, 'Present Perfect uses “have + past participle”: “have checked”.'),
    choice('business-r3', 'A customer asks for confirmation. Which closing is best?', ['I will confirm the details by email.', 'I will confirmed the details by email.', 'I confirming the details by email.'], 0, undefined, 'After “will”, use the base verb: “will confirm”.')]
  }
] : [
  { id: 'choice', label: '01–03 · CHOOSE', title: 'Choose the message that fits', questions: [
    choice('places-c1', 'A visitor asks how to reach a room on level three. Which reply helps most?', ['Take the lift to the third floor, then turn left.', 'Take the lift in the third floor, then turn left.', 'Taking the lift to the third floor, then turn left.'], 0, undefined, 'We say “on the third floor” for a level in a building, and “take” gives a clear instruction.'),
    choice('places-c2', 'You are welcoming a visitor. Which message is natural?', ['Please wait near the main entrance.', 'Please waiting near the main entrance.', 'Please waited near the main entrance.'], 0, undefined, 'After “please”, use the base verb: “wait”.'),
    choice('places-c3', 'A colleague asks where the lift is. Which reply is clear?', ['It is next to reception.', 'It is next reception.', 'It is at next to reception.'], 0, undefined, 'Use “next to” to show that two places are side by side.')
  ] },
  { id: 'fill', label: '04–06 · COMPLETE', title: 'Finish useful directions', questions: [
    fill('places-f1', 'Visitor message: “The training room is on the third _____.”', 'floor', 'We use “on” with a floor in a building.'),
    fill('places-f2', 'Visitor message: “Please wait near the main _____.”', 'entrance', 'The “entrance” is where people go into a building.'),
    fill('places-f3', 'Direction: “The lift is _____ to reception.”', 'next', 'The complete place phrase is “next to”.')]
  },
  { id: 'order', label: '07–09 · BUILD', title: 'Build directions a visitor can follow', questions: [
    order('places-o1', 'Put together the first step for a visitor.', ['First,', 'ask', 'at', 'reception.'], ['First,', 'ask', 'at', 'reception.'], 'A clear instruction uses a base verb: “ask”.'),
    order('places-o2', 'Put together the next step after the lift.', ['Then,', 'turn', 'left', 'at', 'the', 'corner.'], ['Then,', 'turn', 'left', 'at', 'the', 'corner.'], '“Then” shows the next step, followed by the base verb “turn”.'),
    order('places-o3', 'Put together a clear location message.', ['The', 'meeting', 'room', 'is', 'on', 'the', 'third', 'floor.'], ['The', 'meeting', 'room', 'is', 'on', 'the', 'third', 'floor.'], 'Use “on” with a floor in a building.')]
  },
  { id: 'match', label: '10–12 · MATCH', title: 'Match the situation to the direction', questions: [
    match('places-m1', 'Match each visitor need to the helpful direction.', [{ left: 'A visitor needs a badge.', right: 'Ask at reception.' }, { left: 'A visitor needs level three.', right: 'Take the lift or the stairs.' }]),
    match('places-m2', 'Match each word to the place it describes.', [{ left: 'entrance', right: 'where you go into a building' }, { left: 'exit', right: 'where you leave a building' }]),
    match('places-m3', 'Match each phrase to the picture it creates.', [{ left: 'next to reception', right: 'beside reception' }, { left: 'opposite the entrance', right: 'across from the entrance' }])]
  },
  { id: 'reply', label: '13–15 · REPLY', title: 'Pick the reply that helps', questions: [
    choice('places-r1', 'A visitor says: “I am at reception. What do I do next?”', ['Take the lift to the third floor.', 'Taking the lift to the third floor.', 'You took the lift to the third floor.'], 0, undefined, 'A direct instruction uses the base verb: “Take”.'),
    choice('places-r2', 'A visitor asks: “Is the café close?”', ['Yes, it is nearby.', 'Yes, it is nearbily.', 'Yes, it nearby.'], 0, undefined, '“Nearby” means not far away and works after “is”.'),
    choice('places-r3', 'A visitor asks where to leave after the meeting. Which reply is best?', ['Use the exit on the left.', 'Use the exit in the left.', 'Use the exit at left.'], 0, undefined, 'We use “on the left” to describe where something is.')]
  }
];

export const lessonEnhancements = {
  '2026-11-08-k4m7p2r8t5w9': {
    sections: {
      notes: { title: 'What we practised', intro: 'This homework brings together clear sentence structure, useful tenses, and practical work communication.', items: [
        { kicker: 'FOCUS 01', title: 'Clear sentences', text: 'Build direct sentences with a subject, a verb, and useful information.' },
        { kicker: 'FOCUS 02', title: 'Past and present', text: 'Choose Past Simple for finished time and Present Perfect for a result that matters now.' },
        { kicker: 'FOCUS 03', title: 'Work communication', text: 'Use short, clear phrases for schedules, updates, customers, and meetings.' },
        { kicker: 'TRY THIS', title: 'Say it aloud', text: 'Read every example once slowly and once at natural speed before you answer.' }
      ] },
      grammar: { title: 'Tenses for clear work updates', intro: 'Use the time clue first. Then choose the tense that says exactly what you mean.', rules: [
        { tone: 'mint', label: 'RULE 01', title: 'A clear sentence', formula: 'subject + verb + extra information', explanation: 'Start with who or what. Add the action. Finish with the important detail.', examples: ['The customer needs an answer today.', 'My colleague checks the schedule.'] },
        { tone: 'sun', label: 'RULE 02', title: 'Past Simple', formula: 'subject + past verb + finished time', explanation: 'Use it for actions at a finished time: yesterday, last week, on Monday.', examples: ['I sent the report yesterday.', 'We met the customer on Monday.'] },
        { tone: 'blue', label: 'RULE 03', title: 'Present Perfect', formula: 'have / has + past participle', explanation: 'Use it for a result that is important now. The exact time is not the focus.', examples: ['I have prepared the agenda.', 'She has checked the schedule.'] },
        { tone: 'rose', label: 'RULE 04', title: 'Ask clearly', formula: 'Did …? / Have …?', explanation: 'Use did for a finished time. Use have or has when the result matters now.', examples: ['Did you send it yesterday?', 'Have you sent it yet?'] }
      ], questions: [
        choice('g1', 'Your colleague asks when you sent the weekly report. Choose your reply.', ['I have sent it yesterday.', 'I sent it yesterday.', 'I send it yesterday.'], 1, undefined, '“Yesterday” is a finished time, so use the Past Simple: “sent”.'),
        choice('g2', 'Your manager asks whether the agenda is ready. Choose your reply.', ['I have prepared it.', 'I prepared it tomorrow.', 'I prepares it.'], 0, undefined, '“Have prepared” shows that the task is complete and the result matters now.'),
        fill('g3', 'Maya is ready for the call. Complete her message: “I _____ checked the schedule.”', 'have', 'With “I”, use “have + past participle”: “have checked”.'),
        order('g4', 'Put together a short update for a colleague.', ['The', 'customer', 'needs', 'an', 'update.'], ['The', 'customer', 'needs', 'an', 'update.'], 'A clear update starts with who needs something, then gives the action or need.'),
        choice('g5', 'You want to ask if your colleague has completed an email. Which question is natural?', ['Have you sent the email yet?', 'Did you sent the email yet?', 'Have you send the email yet?'], 0, undefined, 'Present Perfect questions use “have + past participle”: “Have you sent…?”')
      ] },
      vocabulary: { title: 'Business-ready vocabulary', intro: 'These ten words are useful in everyday work communication. Flip, read, and use each one in your own sentence.', cards: businessVocabulary, cloze: { title: 'Ten short team messages', intro: 'Complete ten separate sentences. Drag or tap each word into one blank, and use every word once.', blanks: [
        { id: 'b1', before: 'The meeting ', placeholder: '_____', answer: 'agenda', after: ' lists every topic we will discuss tomorrow.' }, { id: 'b2', before: 'The ', placeholder: '_____', answer: 'customer', after: ' sent a question about her order.' }, { id: 'b3', before: 'My ', placeholder: '_____', answer: 'colleague', after: ' sits next to me and works on the same team.' }, { id: 'b4', before: 'Our weekly ', placeholder: '_____', answer: 'schedule', after: ' shows the start time of every meeting.' }, { id: 'b5', before: 'The ', placeholder: '_____', answer: 'deadline', after: ' is Friday at 5 pm, so submit the work before then.' }, { id: 'b6', before: 'Please ', placeholder: '_____', answer: 'prepare', after: ' the slides before the presentation begins.' }, { id: 'b7', before: 'Please ', placeholder: '_____', answer: 'confirm', after: ' by email that you can attend.' }, { id: 'b8', before: 'I will give the team a brief ', placeholder: '_____', answer: 'update', after: ' on the project after lunch.' }, { id: 'b9', before: 'The weekly ', placeholder: '_____', answer: 'report', after: ' includes sales figures and written results.' }, { id: 'b10', before: 'Your ', placeholder: '_____', answer: 'feedback', after: ' on the presentation will help me improve it.' }
      ] } },
      reading: { title: 'A practical project update', intro: 'Read the message as if you are part of the team. Look for the reason behind each action.', paragraphs: [
        'On Monday morning, Amira opened her schedule and saw that the project meeting was only two days away. The customer had asked for a clear update before the meeting, so Amira checked the agenda and made a short plan. She wrote three points: the work that the team had finished, the work that still needed attention, and the deadline for the final report.',
        'During the afternoon, Amira spoke to her colleague Leo. He had already prepared the sales information, but he had not added the latest customer feedback. Amira sent him a message: “Please add the feedback before 3:00. I will prepare the summary, and then we can check everything together.” Leo replied that he could finish his part before lunch the next day.',
        'On Tuesday, the team met for fifteen minutes. They did not change the deadline, because the customer needed the report on Friday. However, they changed the order of the agenda. First, Amira would give an update; then Leo would show the sales information; finally, they would confirm the next steps. After the meeting, Amira sent the customer a short email to confirm the plan.'
      ], questions: [
        choice('r1', 'True or false: The project meeting was on the same day as Amira’s planning.', ['True', 'False'], 1, 'True or false'),
        choice('r2', 'True or false: Leo had already prepared every part of the information.', ['True', 'False'], 1, 'True or false'),
        choice('r3', 'Why did the team keep the deadline?', ['The customer needed the report on Friday.', 'The meeting was cancelled.', 'Leo was not available.'], 0),
        choice('r4', 'What changed after the short team meeting?', ['The report deadline', 'The order of the agenda', 'The customer request'], 1),
        choice('r5', 'What did Amira do after the meeting?', ['She sent an email to confirm the plan.', 'She cancelled the project.', 'She prepared sales information.'], 0)
      ] },
      dialogues: { title: 'Choose your reply', intro: 'Read the context and choose the reply that fits. The best answer is accurate, polite, and natural.', conversations: businessDialogues },
      listening: { title: 'Listening: a request at work', intro: 'Use the external recording first. Then return here to practise the ideas in the conversation.', source: { title: 'A request from your boss', description: 'A short workplace conversation about arranging a meeting, sending an email, and writing a report.', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/a1/request-your-boss' }, questions: [choice('l1', 'What does the manager need first?', ['An email to the customer', 'A new presentation', 'A report for today'], 0), choice('l2', 'What needs to happen before the team email?', ['Book a meeting room', 'Call the customer', 'Change the deadline'], 0), choice('l3', 'When should the report be written?', ['Immediately', 'When there is time', 'After the customer visit'], 1), choice('l4', 'Which task is described as urgent?', ['Sending an email', 'Writing a report', 'Giving feedback'], 0), choice('l5', 'What does Mario say he can do?', ['Finish a task this week', 'Cancel the meeting', 'Move the customer visit'], 0)] },
      writing: { title: 'Write a short work update', intro: 'Use the grammar and vocabulary from this homework to write a clear, useful message.', prompt: 'Write 80–110 words to a colleague. Give a short update about a task, mention one completed action, explain one next step, and ask the colleague to confirm something.', checklist: ['Use at least four words from the vocabulary cards.', 'Use one Past Simple sentence and one Present Perfect sentence.', 'Add one clear question or polite request.', 'Read it once for clear sentence order.'] },
      finalTest: { title: 'Put it to use', intro: 'Fifteen mixed tasks. Take your time and use the clues in each sentence.', groups: finalGroups('business') }
    }
  },
  '2026-11-16-m6q9v2x4c8n7': {
    sections: {
      notes: { title: 'What we practised', intro: 'This homework focuses on place prepositions, clear imperative structures, and useful directions for everyday situations.', items: [
        { kicker: 'FOCUS 01', title: 'Describe a place', text: 'Use in, on, next to, between, and opposite to say exactly where something is.' },
        { kicker: 'FOCUS 02', title: 'Give directions', text: 'Use short imperative verbs: go, turn, take, open, and check.' },
        { kicker: 'FOCUS 03', title: 'Use the platform', text: 'Follow a clear sequence: open, choose, read, answer, and write.' },
        { kicker: 'TRY THIS', title: 'Be specific', text: 'A good direction includes an action and a place: “Turn left at the corner.”' }
      ] },
      grammar: { title: 'Places and clear instructions', intro: 'Use small words and direct verbs to help someone understand you immediately.', rules: [
        { tone: 'mint', label: 'RULE 01', title: 'Place prepositions', formula: 'in / on / under + place', explanation: 'Use these words to show position. Choose the one that creates the clearest picture.', examples: ['The badge is on the desk.', 'The visitor is in the waiting area.'] },
        { tone: 'sun', label: 'RULE 02', title: 'Nearby places', formula: 'next to / between / opposite', explanation: 'Use these phrases when two places have a clear relationship.', examples: ['The lift is next to reception.', 'The café is opposite the entrance.'] },
        { tone: 'blue', label: 'RULE 03', title: 'Imperatives', formula: 'base verb + information', explanation: 'Use a base verb for a clear instruction. Add please when you want a polite tone.', examples: ['Turn right at the corner.', 'Please check the location.'] },
        { tone: 'rose', label: 'RULE 04', title: 'Order matters', formula: 'First … Then … Finally …', explanation: 'Sequence words make instructions easier to follow.', examples: ['First, take the lift. Then turn left.', 'Finally, ask at reception.'] }
      ], questions: [
        choice('g1', 'A visitor asks where to get a badge. Choose the helpful reply.', ['Reception is next to the entrance.', 'Reception is next the entrance.', 'Reception next to the entrance.'], 0, undefined, 'Use “next to” to show that two places are side by side.'),
        choice('g2', 'A visitor has just left the lift. Choose the next instruction.', ['Turn left at the corner.', 'Turning left at the corner.', 'You turn left at the corner?'], 0, undefined, 'Clear directions use the base verb: “Turn”.'),
        fill('g3', 'Message to a visitor: “The lift is _____ reception.”', 'next to', '“Next to” is the complete phrase for two places that are beside each other.'),
        order('g4', 'Put together the first step in a visitor message.', ['First,', 'go', 'to', 'reception.'], ['First,', 'go', 'to', 'reception.'], '“First” shows the opening step, followed by the base verb “go”.'),
        choice('g5', 'You are telling a visitor where the training room is. Choose the natural phrase.', ['on the third floor', 'in the third floor', 'at the third floor'], 0, undefined, 'Use “on” with a floor in a building: “on the third floor”.')
      ] },
      vocabulary: { title: 'Places and visitor vocabulary', intro: 'These ten words are useful for offices, buildings, meetings, and daily directions.', cards: placeVocabulary, cloze: { title: 'Ten visitor messages', intro: 'Complete ten separate sentences. Drag or tap each word into one blank, and use every word once.', blanks: [
        { id: 'p1', before: 'I sent the exact ', placeholder: '_____', answer: 'location', after: ' by message, including the street and building.' }, { id: 'p2', before: 'Visitors enter the building through the main ', placeholder: '_____', answer: 'entrance', after: '.' }, { id: 'p3', before: 'Please ask at ', placeholder: '_____', answer: 'reception', after: ' for your visitor badge.' }, { id: 'p4', before: 'Take the ', placeholder: '_____', answer: 'lift', after: ' to the sixth floor, not the stairs.' }, { id: 'p5', before: 'The training room is on the third ', placeholder: '_____', answer: 'floor', after: '.' }, { id: 'p6', before: 'The map gives one clear ', placeholder: '_____', answer: 'direction', after: ': turn right at the corner.' }, { id: 'p7', before: 'There is a ', placeholder: '_____', answer: 'nearby', after: ' café within two minutes’ walk.' }, { id: 'p8', before: 'Use the fire ', placeholder: '_____', answer: 'exit', after: ' if you need to leave the building quickly.' }, { id: 'p9', before: 'The lift is busy, so please take the ', placeholder: '_____', answer: 'stairs', after: '.' }, { id: 'p10', before: 'Turn left at the next street ', placeholder: '_____', answer: 'corner', after: '.' }
      ] } },
      reading: { title: 'A visitor’s first day', intro: 'Read for the full situation. The answers are not always in the first sentence that mentions a word.', paragraphs: [
        'Mert arrived early for a training day at a new company. The email said that the main entrance was opposite the city library, but he first stopped at the nearby café because he had fifteen minutes before the session. At 9:45, he crossed the road and walked through the glass entrance. A sign on the wall said, “Visitors: please ask at reception.”',
        'At reception, Mert received a badge and a simple map. The training room was on the third floor. The receptionist explained, “Take the lift or the stairs. When you leave the lift, turn left. The room is between the small kitchen and the meeting room.” Mert chose the stairs because there was a short queue for the lift.',
        'On the second floor, Mert saw a sign for the exit and almost turned the wrong way. He checked the map again and followed the directions more carefully. After he reached the third floor, he found the kitchen, then the meeting room, and finally the training room between them. He was two minutes early, so he used the time to read the schedule before the session started.'
      ], questions: [
        choice('r1', 'True or false: Mert went straight into the building when he arrived.', ['True', 'False'], 1, 'True or false'),
        choice('r2', 'True or false: The receptionist only gave Mert verbal directions.', ['True', 'False'], 1, 'True or false'),
        choice('r3', 'Why did Mert use the stairs?', ['He preferred the stairs to the lift.', 'There was a queue for the lift.', 'The lift was not in the building.'], 1),
        choice('r4', 'What nearly caused Mert to go the wrong way?', ['A sign for the exit', 'The kitchen door', 'A missing badge'], 0),
        choice('r5', 'What did Mert do before the training began?', ['He checked the schedule.', 'He returned to reception.', 'He called the library.'], 0)
      ] },
      dialogues: { title: 'Choose your reply', intro: 'Practise natural directions and instructions. Choose the response that is clear and fits the conversation.', conversations: placeDialogues },
      listening: { title: 'Listening: giving instructions', intro: 'Open the external practice, listen to the useful phrases, then return here for five questions.', source: { title: 'Giving instructions', description: 'A short video practice about showing someone how to use a coffee machine with clear sequence language.', url: 'https://learnenglish.britishcouncil.org/free-resources/speaking/a2/giving-instructions' }, questions: [choice('l1', 'What is the first action in the instructions?', ['Put the coffee in', 'Press the button', 'Turn the machine off'], 0), choice('l2', 'What happens after the coffee is put in?', ['It is pressed down', 'The machine is moved', 'The cup is washed'], 0), choice('l3', 'Which phrase shows the next step?', ['After that', 'Yesterday', 'At reception'], 0), choice('l4', 'What does Emir ask when he needs more help?', ['What do I do next?', 'Where was the machine?', 'Did I do it yesterday?'], 0), choice('l5', 'Which response gives positive feedback?', ['You are doing well.', 'Do not arrive early.', 'The lift is upstairs.'], 0)] },
      writing: { title: 'Write useful directions', intro: 'Write a short message that helps a new visitor reach a place without confusion.', prompt: 'Write 80–110 words to a visitor who is coming to an office for a meeting. Explain where to enter, where to ask for help, and how to reach the room.', checklist: ['Use at least four words from the vocabulary cards.', 'Use at least three place prepositions.', 'Use First, Then, and Finally.', 'Use two polite imperative sentences.'] },
      finalTest: { title: 'Put it to use', intro: 'Fifteen mixed tasks. Build clear, useful language for real places and instructions.', groups: finalGroups('places') }
    }
  }
};
