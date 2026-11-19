const choice = (id, prompt, options, answer, label) => ({ id, prompt, options, answer, label });
const fill = (id, prompt, answer) => ({ id, type: 'fill', prompt, answer });
const order = (id, prompt, words, answer) => ({ id, type: 'order', prompt, words, answer });
const match = (id, prompt, pairs) => ({ id, type: 'match', prompt, pairs });
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

const finalGroups = (prefix, words) => [
  { id: 'choice', label: '01–03 · CHOOSE', title: 'Real-use choices', questions: [
    choice(`${prefix}-c1`, 'Choose the most natural sentence.', ['Please confirm the meeting time.', 'Please confirms the meeting time.', 'Please confirmed the meeting time.'], 0),
    choice(`${prefix}-c2`, 'Choose the best reply to: “Where is reception?”', ['It is next to the entrance.', 'It is next the entrance.', 'It is on next to the entrance.'], 0),
    choice(`${prefix}-c3`, 'Choose the best sentence for a plan.', ['I will prepare the report this afternoon.', 'I prepared the report this afternoon tomorrow.', 'I will prepares the report this afternoon.'], 0)
  ] },
  { id: 'fill', label: '04–06 · FILL', title: 'Use the right word', questions: [fill(`${prefix}-f1`, `Please _____ the time by email.`, 'confirm'), fill(`${prefix}-f2`, `The lift is _____ to reception.`, 'next'), fill(`${prefix}-f3`, `We need to _____ the presentation.`, 'prepare')] },
  { id: 'order', label: '07–09 · BUILD', title: 'Build clear sentences', questions: [
    order(`${prefix}-o1`, 'Make an instruction.', ['Please', 'check', 'the', 'agenda.'], ['Please', 'check', 'the', 'agenda.']),
    order(`${prefix}-o2`, 'Make a direction.', ['Turn', 'left', 'at', 'the', 'corner.'], ['Turn', 'left', 'at', 'the', 'corner.']),
    order(`${prefix}-o3`, 'Make a work update.', ['I', 'have', 'finished', 'the', 'report.'], ['I', 'have', 'finished', 'the', 'report.'])
  ] },
  { id: 'match', label: '10–12 · MATCH', title: 'Match meaning', questions: [match(`${prefix}-m1`, 'Match the word to its meaning.', [{ left: words[0], right: 'a useful work word' }, { left: words[1], right: 'a place or action word' }]), match(`${prefix}-m2`, 'Match the phrase to its purpose.', [{ left: 'Please check', right: 'a polite instruction' }, { left: 'Where is…?', right: 'a request for location' }]), match(`${prefix}-m3`, 'Match the time language.', [{ left: 'yesterday', right: 'a finished time' }, { left: 'already', right: 'a result now' }])] },
  { id: 'truefalse', label: '13–15 · DECIDE', title: 'True or false?', questions: [choice(`${prefix}-t1`, '“Please send the report” is an imperative sentence.', ['True', 'False'], 0), choice(`${prefix}-t2`, '“The office is in the third floor” is the best place phrase.', ['True', 'False'], 1), choice(`${prefix}-t3`, '“I have finished the task” connects a past action to now.', ['True', 'False'], 0)] }
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
        choice('g1', 'Choose the best sentence with a finished time.', ['I have sent the report yesterday.', 'I sent the report yesterday.', 'I send the report yesterday.'], 1),
        choice('g2', 'Choose the best sentence when the result matters now.', ['I have prepared the agenda.', 'I prepared the agenda tomorrow.', 'I prepares the agenda.'], 0),
        fill('g3', 'Complete: “She _____ checked the schedule.”', 'has'),
        order('g4', 'Build a clear sentence.', ['The', 'customer', 'needs', 'an', 'update.'], ['The', 'customer', 'needs', 'an', 'update.']),
        choice('g5', 'Choose the best question.', ['Have you sent the email yet?', 'Did you sent the email yet?', 'Have you send the email yet?'], 0)
      ] },
      vocabulary: { title: 'Business-ready vocabulary', intro: 'These ten words are useful in everyday work communication. Flip, read, and use each one in your own sentence.', cards: businessVocabulary, cloze: { title: 'A short team message', intro: 'Drag or tap each word into one blank. Use every word once.', blanks: [
        { id: 'b1', placeholder: '_____', answer: 'agenda', after: ' for tomorrow’s meeting is ready.' }, { id: 'b2', placeholder: '_____', answer: 'customer', after: ' has asked for a quick answer.' }, { id: 'b3', placeholder: '_____', answer: 'colleague', after: ' will help me check the details.' }, { id: 'b4', placeholder: '_____', answer: 'schedule', after: ' shows that we are free at 10:00.' }, { id: 'b5', placeholder: '_____', answer: 'deadline', after: ' for the task is Friday.' }, { id: 'b6', placeholder: '_____', answer: 'prepare', after: ' the main points before the call.' }, { id: 'b7', placeholder: '_____', answer: 'confirm', after: ' the time by email, please.' }, { id: 'b8', placeholder: '_____', answer: 'update', after: ' will be shared after lunch.' }, { id: 'b9', placeholder: '_____', answer: 'report', after: ' is almost complete.' }, { id: 'b10', placeholder: '_____', answer: 'feedback', after: ' will help us improve it.' }
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
      finalTest: { title: 'Put it to use', intro: 'Fifteen mixed tasks. Take your time and use the clues in each sentence.', groups: finalGroups('business', ['agenda', 'deadline']) }
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
        choice('g1', 'Choose the best sentence.', ['The reception is next to the entrance.', 'The reception is next the entrance.', 'The reception next to the entrance.'], 0),
        choice('g2', 'Choose the best instruction.', ['Turn left at the corner.', 'Turning left at the corner.', 'You turn left at the corner?'], 0),
        fill('g3', 'Complete: “The lift is _____ reception.”', 'next to'),
        order('g4', 'Build a clear direction.', ['First,', 'go', 'to', 'reception.'], ['First,', 'go', 'to', 'reception.']),
        choice('g5', 'Choose the best place phrase.', ['on the third floor', 'in the third floor', 'at the third floor'], 0)
      ] },
      vocabulary: { title: 'Places and visitor vocabulary', intro: 'These ten words are useful for offices, buildings, meetings, and daily directions.', cards: placeVocabulary, cloze: { title: 'A visitor message', intro: 'Drag or tap each word into one blank. Use every word once.', blanks: [
        { id: 'p1', placeholder: '_____', answer: 'location', after: ' for the meeting is in the calendar.' }, { id: 'p2', placeholder: '_____', answer: 'entrance', after: ' is opposite the bus stop.' }, { id: 'p3', placeholder: '_____', answer: 'reception', after: ' will give you a visitor badge.' }, { id: 'p4', placeholder: '_____', answer: 'lift', after: ' is next to the stairs.' }, { id: 'p5', placeholder: '_____', answer: 'floor', after: ' for the training room is number three.' }, { id: 'p6', placeholder: '_____', answer: 'direction', after: ' says to turn right at the corner.' }, { id: 'p7', placeholder: '_____', answer: 'nearby', after: ' café is a good place to wait.' }, { id: 'p8', placeholder: '_____', answer: 'exit', after: ' is on the left after the meeting.' }, { id: 'p9', placeholder: '_____', answer: 'stairs', after: ' are useful when the lift is busy.' }, { id: 'p10', placeholder: '_____', answer: 'corner', after: ' is just after the main entrance.' }
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
      finalTest: { title: 'Put it to use', intro: 'Fifteen mixed tasks. Build clear, useful language for real places and instructions.', groups: finalGroups('places', ['entrance', 'exit']) }
    }
  }
};
