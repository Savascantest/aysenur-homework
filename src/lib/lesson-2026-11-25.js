const choice = (id, prompt, options, answer, explanation) => ({ id, prompt, options, answer, explanation });
const fill = (id, prompt, answer, explanation) => ({ id, type: 'fill', prompt, answer, explanation });
const order = (id, prompt, words, answer, explanation) => ({ id, type: 'order', prompt, words, answer, explanation });
const match = (id, prompt, pairs) => ({ id, type: 'match', prompt, pairs });

const cards = [
  ['availability', 'the time when a person is free to meet or help', 'Please send me your availability for Thursday.', 'müsaitlik', 'Lütfen perşembe için müsaitliğini bana gönder.'],
  ['parcel', 'a package that is sent or delivered', 'A parcel is waiting at reception for you.', 'paket', 'Senin için danışmada bir paket bekliyor.'],
  ['notice', 'a short written message that gives information', 'There is a notice beside the entrance.', 'duyuru', 'Girişin yanında bir duyuru var.'],
  ['visitor', 'a person who comes to a place for a short time', 'The visitor is waiting in the meeting room.', 'ziyaretçi', 'Ziyaretçi toplantı odasında bekliyor.'],
  ['shelf', 'a flat place on a wall where objects are kept', 'The blue file is on the top shelf.', 'raf', 'Mavi dosya üst rafta.'],
  ['basement', 'the floor below the ground floor of a building', 'The delivery room is in the basement.', 'bodrum katı', 'Teslimat odası bodrum katında.'],
  ['balcony', 'a small outside area connected to a room', 'There is a chair on the balcony.', 'balkon', 'Balkonda bir sandalye var.'],
  ['reply', 'an answer to a message or question', 'I still need a reply from the supplier.', 'yanıt', 'Tedarikçiden hâlâ bir yanıta ihtiyacım var.'],
  ['delivery', 'the act of bringing something to a place', 'The delivery is due this afternoon.', 'teslimat', 'Teslimat bugün öğleden sonra bekleniyor.'],
  ['appointment', 'an arranged time to meet someone', 'She has an appointment with the client at two.', 'randevu', 'Saat ikide müşteriyle randevusu var.']
].map(([word, definition, example, turkish, turkishExample]) => ({ id: word, word, definition, example, turkish, turkishExample }));

const guided = [
  ['someone', 'You need help carrying two boxes. Ask a colleague for help using “someone”.', 'Is there someone who can help me carry these boxes?', 'Use “someone” in a positive question when you expect that a person may be able to help.'],
  ['somebody', 'You heard a noise near the entrance. Tell your colleague using “somebody”.', 'I think somebody is waiting near the entrance.', '“Somebody” means an unknown person and works naturally in this positive statement.'],
  ['anyone', 'You are checking whether a teammate can join a call. Ask using “anyone”.', 'Is anyone available for a call at three?', 'Use “anyone” in a general question about whether a person is available.'],
  ['anybody', 'You cannot see a name on the visitor list. Ask reception using “anybody”.', 'Is anybody expecting a visitor this afternoon?', '“Anybody” is natural in a question when you do not know whether the answer is yes or no.'],
  ['no-one', 'The meeting room is empty. Describe it using “no one”.', 'No one is in the meeting room.', '“No one” already makes the sentence negative, so do not add “not”.'],
  ['nobody', 'The office door is open, but the office is empty. Describe it using “nobody”.', 'Nobody is working in the office today.', '“Nobody” means no person; it is followed by a singular verb such as “is”.'],
  ['everyone', 'The team has read the new notice. Report this using “everyone”.', 'Everyone has read the new notice.', '“Everyone” refers to all people but takes a singular verb: “has”.'],
  ['everybody', 'All the guests have arrived for the appointment. Announce this using “everybody”.', 'Everybody is here for the appointment.', '“Everybody” means all people and takes a singular verb: “is”.'],
  ['something', 'You want to mention a small problem with a delivery. Tell a colleague using “something”.', 'There is something wrong with the delivery.', 'Use “something” in a positive statement when the thing is not specific yet.'],
  ['anything', 'You are offering help after a meeting. Ask using “anything”.', 'Is there anything I can do to help?', 'Use “anything” in an offer or question when the answer could be yes or no.'],
  ['nothing', 'The shelf is empty. Describe it using “nothing”.', 'There is nothing on the shelf.', '“Nothing” already carries a negative meaning, so do not add “not”.'],
  ['everything', 'All the details for the client visit are ready. Report this using “everything”.', 'Everything is ready for the client visit.', '“Everything” refers to all things and takes a singular verb: “is”.']
].map(([id, prompt, modelAnswer, explanation]) => ({ id: `guided-${id}`, type: 'guided', prompt, modelAnswer, explanation }));

const conversations = [
  { id: 'visitor', title: 'A visitor at the office', scenario: 'You are helping a visitor who has an appointment.', partner: 'Mina', turns: [
    { prompt: 'Hello. Is there anyone at reception?', options: ['Yes. Someone from reception is there now.', 'Yes. The parcel is on the shelf.', 'Yes. There is an appointment at two.'], answer: 0 },
    { prompt: 'Great. I have an appointment with Ms Kaya.', options: ['She is expecting you. Please take a seat.', 'The basement is below the office.', 'There is nothing on the balcony.'], answer: 0 },
    { prompt: 'Is there anything I need to bring?', options: ['No, just your ID is enough.', 'No one is in the meeting room.', 'Everyone is on the third floor.'], answer: 0 },
    { prompt: 'Where is the meeting room?', options: ['It is opposite the noticeboard.', 'It is for a delivery today.', 'It is somebody from finance.'], answer: 0 },
    { prompt: 'Thank you for your help.', options: ['You are welcome. Someone will call you soon.', 'You are welcome. The shelf is empty.', 'You are welcome. Nobody has a reply.'], answer: 0 }
  ] },
  { id: 'delivery', title: 'A missing delivery', scenario: 'You are checking a delivery with a colleague.', partner: 'Emre', turns: [
    { prompt: 'Has anyone seen the parcel for the design team?', options: ['I have not seen it, but I can check reception.', 'The appointment is at two.', 'The balcony is behind the office.'], answer: 0 },
    { prompt: 'Please do. There is nothing in our delivery area.', options: ['I will ask if somebody signed for it.', 'I will put it on the shelf.', 'I will meet everyone at three.'], answer: 0 },
    { prompt: 'Could it be in the basement?', options: ['Yes, the delivery room is below reception.', 'Yes, no one is available.', 'Yes, the notice is opposite the entrance.'], answer: 0 },
    { prompt: 'Can you send me a reply when you know?', options: ['Of course. I will message you straight away.', 'Of course. There is something on the shelf.', 'Of course. Everybody is in the office.'], answer: 0 },
    { prompt: 'Thanks. I need it before the client arrives.', options: ['I understand. I will check now.', 'I understand. The visitor is behind the shelf.', 'I understand. Nothing is an appointment.'], answer: 0 }
  ] },
  { id: 'availability', title: 'Planning a short call', scenario: 'You are arranging a short work call.', partner: 'Lara', turns: [
    { prompt: 'Is anyone available for a ten-minute call today?', options: ['I am free after four.', 'The parcel is under the desk.', 'There is a notice at reception.'], answer: 0 },
    { prompt: 'Perfect. Is everybody on the project invited?', options: ['Yes, everyone has the calendar link.', 'Yes, someone is in the basement.', 'Yes, nothing is on the shelf.'], answer: 0 },
    { prompt: 'Is there anything we need to prepare first?', options: ['Just the client questions and the latest reply.', 'Just the balcony and the entrance.', 'Just somebody from reception.'], answer: 0 },
    { prompt: 'I cannot find the meeting link.', options: ['I will send it to you now.', 'I will put it below the shelf.', 'I will ask the visitor to wait.'], answer: 0 },
    { prompt: 'Thank you. That is everything for now.', options: ['Great. See you at four.', 'Great. Nobody is a visitor.', 'Great. The delivery is opposite.'], answer: 0 }
  ] }
];

const finalGroups = [
  { id: 'choice', label: '01–03 · CHOOSE', title: 'Choose the reply that helps', questions: [
    choice('c1', 'A colleague asks: “Is anybody available to help with the visitor?”', ['Yes, someone from reception can help.', 'Yes, nothing from reception can help.', 'Yes, everyone from reception is a parcel.'], 0, 'Use “someone” for one unspecified person who can help.'),
    choice('c2', 'You enter an empty meeting room. Which message fits?', ['No one is in the meeting room.', 'No one are in the meeting room.', 'There are no one in the meeting room.'], 0, '“No one” refers to people and takes the singular verb “is”.'),
    choice('c3', 'You are offering support to a colleague. Which question is natural?', ['Is there anything I can do?', 'Is there something I cannot do?', 'Is there nothing I can do?'], 0, 'Use “anything” in an offer or a general question.')
  ] },
  { id: 'fill', label: '04–06 · COMPLETE', title: 'Finish useful messages', questions: [
    fill('f1', 'Reception message: “There is _____ waiting for you at reception.”', 'someone', 'Use “someone” for an unspecified person in a positive statement.'),
    fill('f2', 'Delivery note: “There is _____ on the shelf for the client.”', 'nothing', 'Use “nothing” when there is no thing there; it already has a negative meaning.'),
    fill('f3', 'Team message: “_____ has the calendar link for the call.”', 'Everyone', '“Everyone” means all people and takes the singular verb “has”.')]
  },
  { id: 'order', label: '07–09 · BUILD', title: 'Build messages for work', questions: [
    order('o1', 'Put together a question for reception.', ['Is', 'anyone', 'expecting', 'a', 'visitor?'], ['Is', 'anyone', 'expecting', 'a', 'visitor?'], 'Questions about an unknown person commonly use “anyone”.'),
    order('o2', 'Put together a place description.', ['There', 'is', 'a', 'notice', 'behind', 'the', 'entrance.'], ['There', 'is', 'a', 'notice', 'behind', 'the', 'entrance.'], 'Use “there is” for one thing, followed by its place description.'),
    order('o3', 'Put together a clear availability reply.', ['Nobody', 'is', 'available', 'before', 'four.'], ['Nobody', 'is', 'available', 'before', 'four.'], '“Nobody” means no person and is followed by the singular verb “is”.')]
  },
  { id: 'match', label: '10–12 · MATCH', title: 'Match the situation to the message', questions: [
    match('m1', 'Match each situation to the helpful message.', [{ left: 'You need help with boxes.', right: 'Is there anyone who can help?' }, { left: 'The room is empty.', right: 'No one is in the room.' }]),
    match('m2', 'Match each place detail to the clearest phrase.', [{ left: 'The delivery room is below the ground floor.', right: 'It is in the basement.' }, { left: 'The café is across from reception.', right: 'It is opposite reception.' }]),
    match('m3', 'Match each message need to the best word.', [{ left: 'A message that answers a question.', right: 'reply' }, { left: 'A planned time to meet.', right: 'appointment' }])]
  },
  { id: 'reply', label: '13–15 · REPLY', title: 'Choose a natural next reply', questions: [
    choice('r1', 'A colleague says: “I cannot find the parcel.”', ['There might be something at reception.', 'There might be anyone at reception.', 'There might be everybody at reception.'], 0, 'Use “something” for an unspecified thing in a positive statement.'),
    choice('r2', 'A visitor asks: “Where can I wait?”', ['There is a chair on the balcony.', 'There are a chair on the balcony.', 'There is chairs on the balcony.'], 0, 'Use “there is” with one singular thing: “a chair”.'),
    choice('r3', 'Your colleague says: “Do we still need anything for the call?”', ['No, everything is ready.', 'No, everyone are ready.', 'No, anything is ready.'], 0, '“Everything” refers to all things and takes the singular verb “is”.')]
  }
];

export const november25Lesson = {
  '2026-11-25-a9s4m7p2v6c8': {
    sections: {
      notes: { title: 'What we practised', intro: 'This lesson helps you describe people, things, and places clearly in everyday and work situations.', items: [
        { kicker: 'FOCUS 01', title: 'People and things', text: 'Use some/any forms and compounds such as someone, anyone, nobody, and nothing in complete sentences.' },
        { kicker: 'FOCUS 02', title: 'Describe a place', text: 'Use opposite, behind, under, and below to explain where something is.' },
        { kicker: 'FOCUS 03', title: 'Say what is there', text: 'Use there is and there are to describe rooms, offices, and everyday places.' },
        { kicker: 'TRY THIS', title: 'Make it useful', text: 'Use these forms when you ask for help, describe an empty place, or explain where an item is.' }
      ] },
      grammar: { title: 'Clear descriptions and useful questions', intro: 'Use these forms to ask for help, describe what you can see, and give practical information.', rules: [
        { tone: 'mint', label: 'SOME / ANY', title: 'Ask, offer, and describe', formula: 'some in positive ideas · any in questions and negatives', explanation: 'Choose some when you are talking about a thing or person you expect. Choose any when you are asking generally or saying there is not one.', examples: ['Is there anyone at reception?', 'There is something on the shelf.', 'I do not have any free time today.'] },
        { tone: 'sun', label: 'COMPOUNDS', title: 'People and things', formula: 'someone / anyone / no one / everyone · something / anything / nothing / everything', explanation: 'These words let you talk about an unknown person or thing without repeating a noun.', examples: ['Nobody is in the office.', 'Everything is ready for the call.'] },
        { tone: 'blue', label: 'PLACE', title: 'Show the position', formula: 'opposite · behind · under · below', explanation: 'Use a specific place phrase so a person can picture where to look.', examples: ['The notice is behind the entrance.', 'The delivery room is below reception.'] },
        { tone: 'rose', label: 'THERE IS / ARE', title: 'Describe what exists', formula: 'there is + one thing · there are + more than one thing', explanation: 'Start with there is or there are when you introduce what is in a place.', examples: ['There is a chair on the balcony.', 'There are two visitors in the waiting area.'] }
      ], questions: [
        choice('g1', 'You call reception to ask for help. Which question is natural?', ['Is there anyone who can help me?', 'Is there no one who can help me?', 'Is there everyone who can help me?'], 0, 'Use “anyone” in a general question about whether a person is available.'),
        choice('g2', 'You look at an empty shelf. Which message fits?', ['There is nothing on this shelf.', 'There is anything on this shelf.', 'There are nothing on this shelf.'], 0, '“Nothing” already means no thing, so it works with the singular verb “is”.'),
        fill('g3', 'Visitor message: “The parcel is _____ the desk, so please look down.”', 'under', 'Use “under” for a lower position directly beneath something.'),
        order('g4', 'Put together a note for a visitor.', ['There', 'is', 'a', 'notice', 'opposite', 'reception.'], ['There', 'is', 'a', 'notice', 'opposite', 'reception.'], 'Use “there is” for one thing, followed by a place phrase.'),
        choice('g5', 'Your team is ready for a call. Which update is natural?', ['Everyone has the meeting link.', 'Everyone have the meeting link.', 'Everyone are having the meeting link.'], 0, '“Everyone” refers to all people but takes the singular verb “has”.')
      ], guidedQuestions: guided },
      vocabulary: { title: 'Useful words for messages and places', intro: 'These ten words help you organise a visit, describe a place, and follow up on everyday work tasks.', cards, cloze: { title: 'Ten useful office messages', intro: 'Complete each message with one word from the bank. Every sentence has one clear fit.', blanks: [
        { id: 'v1', before: 'Please send your ', placeholder: '_____', answer: 'availability', after: ' before we plan the call.' }, { id: 'v2', before: 'A ', placeholder: '_____', answer: 'parcel', after: ' for the client is waiting at reception.' }, { id: 'v3', before: 'There is a ', placeholder: '_____', answer: 'notice', after: ' behind the glass entrance.' }, { id: 'v4', before: 'The ', placeholder: '_____', answer: 'visitor', after: ' has an appointment at two o’clock.' }, { id: 'v5', before: 'The blue folder is on the top ', placeholder: '_____', answer: 'shelf', after: '.' }, { id: 'v6', before: 'The delivery room is in the ', placeholder: '_____', answer: 'basement', after: ', below the ground floor.' }, { id: 'v7', before: 'There is one chair on the ', placeholder: '_____', answer: 'balcony', after: '.' }, { id: 'v8', before: 'I still need a ', placeholder: '_____', answer: 'reply', after: ' to my message from the supplier.' }, { id: 'v9', before: 'The ', placeholder: '_____', answer: 'delivery', after: ' is due this afternoon.' }, { id: 'v10', before: 'Her ', placeholder: '_____', answer: 'appointment', after: ' with the client starts at two.' }
      ] } },
      reading: { title: 'A short visit to the office', intro: 'Read the messages and notice how people describe what is available, missing, or in a particular place.', paragraphs: [
        'On Tuesday morning, Lara sent a message to the office group: “Is anyone available to meet a visitor at reception at two?” Mehmet replied, “I can help. The visitor has an appointment with the sales team, and everyone on the team has the calendar link.” Lara thanked him and added that there was a notice opposite reception with the visitor’s name and meeting room number.',
        'At one o’clock, Mehmet checked the meeting room. There was a table, four chairs and a screen, but there was nothing on the shelf for the visitor. He called Lara and asked, “Is there anything we need to prepare?” Lara said, “Yes. There is a parcel under my desk. Please bring it to the room. Nobody is using the delivery area today, so it should be easy to find.”',
        'When the visitor arrived, Mehmet explained the route: “The meeting room is behind reception, opposite the small kitchen. The lift is nearby, but the room is on this floor.” The visitor smiled and said that everything was clear. After the meeting, Lara sent a short reply to the supplier about the parcel.'
      ], questions: [
        choice('r1', 'From Lara’s first message, why does she need someone at reception?', ['A visitor has an appointment at two.', 'The delivery room is closed.', 'The lift is not working.'], 0),
        choice('r2', 'Read and decide: the meeting room already had everything the visitor needed on the shelf.', ['True', 'False'], 1, 'Read and decide'),
        choice('r3', 'Where was the parcel?', ['Under Lara’s desk', 'On the balcony', 'Behind the kitchen'], 0),
        choice('r4', 'Why was the delivery area easy to use?', ['Nobody was using it that day.', 'Everyone was in a meeting.', 'There was a new notice there.'], 0),
        choice('r5', 'How did Mehmet describe the meeting room?', ['Behind reception and opposite the kitchen', 'Below the basement and under reception', 'On the lift and behind the entrance'], 0)
      ] },
      dialogues: { title: 'Choose a helpful reply', intro: 'Follow three realistic conversations. Choose the reply that answers the person clearly and keeps the conversation moving.', conversations },
      listening: { title: 'Listening: requests at work', intro: 'Listen to the external workplace conversation, then check what Mario needs to do and in what order.', source: { title: 'A request from your boss', description: 'A manager asks Mario to email a customer, arrange a meeting, and later write a project report.', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/a1/request-your-boss' }, questions: [
        choice('l1', 'What does Susanne ask Mario to do first?', ['Email the customer about a visit next week', 'Write the project report', 'Cancel the team meeting'], 0),
        choice('l2', 'What must Mario do before he emails the team about the meeting?', ['Book a meeting room', 'Visit the customer', 'Write a report'], 0),
        choice('l3', 'When does Susanne want the project report?', ['Sometime in the next two or three weeks', 'Before lunch that day', 'After the customer visit'], 0),
        choice('l4', 'Which task is described as very urgent?', ['Emailing the customer', 'Writing the report', 'Inviting managers'], 0),
        choice('l5', 'What does Mario say about the report?', ['He can do it that week', 'He cannot write it', 'He has already sent it'], 0)
      ] },
      writing: { title: 'Write a useful office message', intro: 'Write a message that a visitor or colleague could follow without needing to ask again.', prompt: 'Write 80–110 words to a colleague about a visitor with an appointment. Say whether anyone is available to meet the visitor, explain where the meeting room is, and mention anything the visitor needs to bring or collect.', checklist: ['Use at least four words from the vocabulary cards.', 'Include one clear sentence with someone, anyone, no one, or everyone.', 'Use two precise place descriptions.', 'Read your message once as if you are the visitor.'] },
      finalTest: { title: 'Put the language to use', intro: 'Fifteen short workplace and daily-life tasks. Choose the message that solves the real situation.', groups: finalGroups }
    }
  }
};
