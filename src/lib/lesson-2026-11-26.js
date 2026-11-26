const choice = (id, prompt, options, answer, explanation) => ({ id, prompt, options, answer, explanation });
const fill = (id, prompt, answer, explanation) => ({ id, type: 'fill', prompt, answer, explanation });
const order = (id, prompt, words, answer, explanation) => ({ id, type: 'order', prompt, words, answer, explanation });
const match = (id, prompt, pairs, explanation) => ({ id, type: 'match', prompt, pairs, explanation });

const cards = [
  ['forecast', 'a report that says what weather is expected', 'The forecast says it will be cooler tomorrow.', 'hava tahmini', 'Tahmin yarın havanın daha serin olacağını söylüyor.'],
  ['temperature', 'how hot or cold something is', 'The temperature is lower this morning.', 'sıcaklık', 'Sıcaklık bu sabah daha düşük.'],
  ['commute', 'the regular journey between home and work', 'My commute is shorter when I take the train.', 'işe gidiş geliş', 'Trene bindiğimde işe gidiş gelişim daha kısa.'],
  ['traffic', 'the vehicles moving on a road', 'There is heavy traffic near the bridge.', 'trafik', 'Köprünün yakınında yoğun trafik var.'],
  ['shortcut', 'a quicker route to a place', 'This street is a useful shortcut to the station.', 'kestirme yol', 'Bu sokak istasyona giden kullanışlı bir kestirme yol.'],
  ['quantity', 'an amount of something', 'Please check the quantity before you send the order.', 'miktar', 'Siparişi göndermeden önce miktarı kontrol et.'],
  ['container', 'an object used to hold or carry something', 'There is a little soup left in the container.', 'kap', 'Kabın içinde biraz çorba kaldı.'],
  ['invoice', 'a document that asks for payment', 'The supplier sent the invoice this morning.', 'fatura', 'Tedarikçi faturayı bu sabah gönderdi.'],
  ['budget', 'the money available for a plan or activity', 'This option is better for our budget.', 'bütçe', 'Bu seçenek bütçemiz için daha iyi.'],
  ['supplier', 'a company or person that provides goods or services', 'Our supplier can deliver the parts on Friday.', 'tedarikçi', 'Tedarikçimiz parçaları cuma günü teslim edebilir.']
].map(([word, definition, example, turkish, turkishExample]) => ({ id: word, word, definition, example, turkish, turkishExample }));

const conversations = [
  { id: 'morning', title: 'A rainy commute', scenario: 'You are messaging a colleague before work.', partner: 'Mina', turns: [
    { prompt: 'Are you close to the office?', options: ['Almost. The traffic is worse than usual today.', 'Almost. There are much traffic today.', 'Almost. It is more rain than today.'], answer: 0 },
    { prompt: 'Should we start the meeting at ten?', options: ['Yes, that gives everyone a little more time.', 'Yes, that gives everyone many more time.', 'Yes, it gives a few time.'], answer: 0 },
    { prompt: 'Good idea. Is it still raining near you?', options: ['Yes, but the forecast says it will stop soon.', 'Yes, but the forecast say it stop soon.', 'Yes, but it raining forecast soon.'], answer: 0 },
    { prompt: 'I can wait in the café.', options: ['Thanks. It is only a five-minute walk from there.', 'Thanks. There are only five-minute walk.', 'Thanks. It has five-minute walk.'], answer: 0 },
    { prompt: 'See you soon.', options: ['See you soon. I will take the shortcut.', 'See you soon. I will take shortcut more.', 'See you soon. I take the shortest.'], answer: 0 }
  ] },
  { id: 'order', title: 'Checking an order', scenario: 'You are confirming details with a supplier.', partner: 'Arda', turns: [
    { prompt: 'Do we have enough containers for the samples?', options: ['We have a few, but we need more for Friday.', 'We have a little, but we need many.', 'We have much, but we need a few.'], answer: 0 },
    { prompt: 'Which supplier is faster?', options: ['The local supplier is faster than the other one.', 'The local supplier is fastest than the other one.', 'The local supplier is more fast than the other one.'], answer: 0 },
    { prompt: 'Can they send the invoice today?', options: ['Yes, they said it would arrive before lunch.', 'Yes, they said it arrive before lunch.', 'Yes, they said it is arrive before lunch.'], answer: 0 },
    { prompt: 'Is the quantity correct?', options: ['Yes, but please check it one more time.', 'Yes, but please check many time.', 'Yes, but it is the most correct.'], answer: 0 },
    { prompt: 'Great. This option fits our budget.', options: ['I agree. It is the best value this week.', 'I agree. It is the better value this week.', 'I agree. It is the most good value this week.'], answer: 0 }
  ] },
  { id: 'weather', title: 'Planning an outdoor visit', scenario: 'You are choosing the best time for a site visit.', partner: 'Elif', turns: [
    { prompt: 'Is tomorrow a good day for the visit?', options: ['Yes. It is expected to be warmer and drier.', 'Yes. It expects warmer and drier.', 'Yes. It has expected to warmer.'], answer: 0 },
    { prompt: 'What time should we leave?', options: ['Let’s leave earlier; the roads are quieter then.', 'Let’s leave earliest; the roads are quieter then.', 'Let’s leave more early; the roads are quietest then.'], answer: 0 },
    { prompt: 'How far is the client’s office?', options: ['It is about eight kilometres from here.', 'There is about eight kilometres from here.', 'It has about eight kilometres from here.'], answer: 0 },
    { prompt: 'Do we need a lot of time there?', options: ['No, a little time is enough for the first visit.', 'No, a few time is enough for the first visit.', 'No, many time is enough for the first visit.'], answer: 0 },
    { prompt: 'Perfect. I will send the plan.', options: ['Great. That is the clearest option.', 'Great. That is the clearer option.', 'Great. That is the most clear option.'], answer: 0 }
  ] }
];

const finalGroups = [
  { id: 'choice', label: '01–03 · CHOOSE', title: 'Choose the natural message', questions: [
    choice('c1', 'The train is delayed. Which update sounds natural?', ['It is taking longer than usual today.', 'There is taking longer than usual today.', 'It taking longer than usual today.'], 0, 'Use impersonal “it” for a general situation such as a delay.'),
    choice('c2', 'Your colleague asks about the report. Which reply fits?', ['I have a little time to finish it before lunch.', 'I have a few time to finish it before lunch.', 'I have many time to finish it before lunch.'], 0, '“Time” is uncountable, so use “a little”.'),
    choice('c3', 'Two travel options are possible. Which sentence is natural?', ['The train is cheaper than a taxi.', 'The train is more cheap than a taxi.', 'The train is the cheapest than a taxi.'], 0, 'Use “cheaper than” to compare two things with a short adjective.')
  ] },
  { id: 'fill', label: '04–06 · COMPLETE', title: 'Finish useful updates', questions: [
    fill('f1', 'Weather message: “_____ is colder outside than yesterday.”', 'It', 'Use “it” when talking generally about the weather.'),
    fill('f2', 'Order note: “We need a _____ more containers for the samples.”', 'few', '“Containers” are countable plural items, so “a few” fits.'),
    fill('f3', 'Route message: “This is the _____ route to the client’s office.”', 'best', '“Best” is the superlative form of “good” for the top choice in a group.')
  ] },
  { id: 'order', label: '07–09 · BUILD', title: 'Build clear workplace messages', questions: [
    order('o1', 'Put together a weather update.', ['It', 'is', 'raining', 'more', 'heavily', 'this', 'afternoon.'], ['It', 'is', 'raining', 'more', 'heavily', 'this', 'afternoon.'], 'Use “it is” to begin a general weather update.'),
    order('o2', 'Put together a quantity question.', ['How', 'many', 'invoices', 'do', 'we', 'need?'], ['How', 'many', 'invoices', 'do', 'we', 'need?'], 'Use “how many” with countable plural nouns such as “invoices”.'),
    order('o3', 'Put together a travel suggestion.', ['The', 'earlier', 'train', 'is', 'better', 'for', 'our', 'schedule.'], ['The', 'earlier', 'train', 'is', 'better', 'for', 'our', 'schedule.'], '“Better” is the comparative form of “good”.')
  ] },
  { id: 'match', label: '10–12 · MATCH', title: 'Match the situation to the best wording', questions: [
    match('m1', 'Match each need to a natural phrase.', [{ left: 'You need a small amount of coffee.', right: 'a little coffee' }, { left: 'You need a small number of pens.', right: 'a few pens' }], 'Use “a little” with uncountable nouns and “a few” with countable plural nouns.'),
    match('m2', 'Match each meaning to the useful word.', [{ left: 'A report about expected weather', right: 'forecast' }, { left: 'Money available for a plan', right: 'budget' }]),
    match('m3', 'Match each comparison to its form.', [{ left: 'good → comparing two options', right: 'better' }, { left: 'good → the top option', right: 'best' }], 'Use “better” for two options and “best” for the top option in a group.')
  ] },
  { id: 'reply', label: '13–15 · REPLY', title: 'Choose a helpful next reply', questions: [
    choice('r1', 'A colleague says: “The weather looks difficult for travel.”', ['Yes, it is safer to leave earlier.', 'Yes, there is safer to leave earlier.', 'Yes, it safer leaving earlier.'], 0, 'Use “it is” to comment on a general situation.'),
    choice('r2', 'A supplier asks: “Do you need many boxes?”', ['No, only a few boxes are enough.', 'No, only a little boxes are enough.', 'No, only much boxes are enough.'], 0, '“Boxes” are countable, so “a few” is the natural small quantity.'),
    choice('r3', 'Your team is choosing one meeting room from four. Which reply fits?', ['The smaller room is the quietest.', 'The smaller room is quieter.', 'The smaller room is more quiet than all.'], 0, 'Use the superlative “quietest” when choosing one from a larger group.')
  ] }
];

export const november26Lesson = {
  '2026-11-26-r8n3c5m2v7q4': {
    sections: {
      notes: { title: 'What we practised', intro: 'This lesson helps you describe everyday conditions, talk about amounts, and compare options when you make practical plans.', items: [
        { kicker: 'FOCUS 01', title: 'Talk about conditions', text: 'Use impersonal “it” for weather, time, distance, and general situations.' },
        { kicker: 'FOCUS 02', title: 'Talk about amounts', text: 'Use much, many, a few, and a little accurately in messages about things you need.' },
        { kicker: 'FOCUS 03', title: 'Compare choices', text: 'Use comparative and superlative forms to choose routes, suppliers, times, and places.' },
        { kicker: 'TRY THIS', title: 'Make it useful', text: 'Use these forms when you plan a commute, check an order, or choose the best option for work.' }
      ] },
      grammar: { title: 'Useful choices in daily life', intro: 'These forms help you make arrangements, describe practical problems, and choose between real options.', rules: [
        { tone: 'mint', label: 'IMPERSONAL IT', title: 'Weather, time, distance, situations', formula: 'It is raining. · It is late. · It is five kilometres. · It is useful to check.', explanation: 'Use “it” when the situation, weather, time, or distance is the subject rather than a specific person or thing.', examples: ['It is getting colder this evening.', 'It is nearly six o’clock.', 'It is about ten minutes from the station.'] },
        { tone: 'sun', label: 'QUANTITIES', title: 'Choose the right amount phrase', formula: 'many / a few + countable plural · much / a little + uncountable noun', explanation: 'Count things such as emails, boxes, and invoices. Do not count time, traffic, coffee, or information.', examples: ['We have a few questions.', 'There is a little coffee left.', 'How many invoices are there?'] },
        { tone: 'blue', label: 'COMPARATIVES', title: 'Compare two practical options', formula: 'short adjective + -er · more + longer adjective · good → better', explanation: 'Use a comparative when one choice is different from another.', examples: ['The train is faster than the bus.', 'This option is more useful for our team.', 'The earlier call is better for me.'] },
        { tone: 'rose', label: 'SUPERLATIVES', title: 'Choose the top option', formula: 'the + adjective-est · the most + adjective · good → best', explanation: 'Use a superlative when you identify the top option in a group of three or more.', examples: ['This is the quickest route today.', 'It is the most convenient time.', 'That is the best solution.'] }
      ], questions: [
        choice('g1', 'Your train is late. Which update would you send?', ['It is running about ten minutes late.', 'There is running about ten minutes late.', 'It running about ten minutes late.'], 0, 'Use impersonal “it” for the general situation of a delayed train.'),
        choice('g2', 'You are checking refreshments for a meeting. Which message fits?', ['We have a little water, but we need more.', 'We have a few water, but we need more.', 'We have many water, but we need more.'], 0, '“Water” is uncountable, so “a little” describes a small amount.'),
        fill('g3', 'Message to your team: “How _____ invoices should we print?”', 'many', '“Invoices” are countable plural items, so use “how many”.'),
        order('g4', 'Put together a clear travel update.', ['It', 'is', 'quicker', 'to', 'take', 'the', 'train', 'today.'], ['It', 'is', 'quicker', 'to', 'take', 'the', 'train', 'today.'], 'Use “it is” for a general situation and “quicker” to compare the travel options.'),
        choice('g5', 'Your team is choosing from three cafés. Which comment is natural?', ['The café near the office is the quietest.', 'The café near the office is quieter.', 'The café near the office is more quiet than.'], 0, 'Use “the quietest” when selecting the top option from a group.')
      ] },
      vocabulary: { title: 'Useful words for plans and practical tasks', intro: 'These ten words help you talk about travel, quantities, weather, and simple workplace decisions.', cards, cloze: { title: 'Ten clear messages for the day', intro: 'Complete each message with one word from the bank. Every sentence has one clear fit.', blanks: [
        { id: 'v1', before: 'The weather ', placeholder: '_____', answer: 'forecast', after: ' says it will be cooler tomorrow.' }, { id: 'v2', before: 'The ', placeholder: '_____', answer: 'temperature', after: ' is lower this morning than yesterday.' }, { id: 'v3', before: 'My ', placeholder: '_____', answer: 'commute', after: ' is shorter when I take the train.' }, { id: 'v4', before: 'There is heavy ', placeholder: '_____', answer: 'traffic', after: ' near the bridge this morning.' }, { id: 'v5', before: 'This side street is a useful ', placeholder: '_____', answer: 'shortcut', after: ' to the station.' }, { id: 'v6', before: 'Please check the ', placeholder: '_____', answer: 'quantity', after: ' before you send the order.' }, { id: 'v7', before: 'There is a little soup left in the ', placeholder: '_____', answer: 'container', after: '.' }, { id: 'v8', before: 'The ', placeholder: '_____', answer: 'invoice', after: ' arrived by email this morning.' }, { id: 'v9', before: 'This option is better for our ', placeholder: '_____', answer: 'budget', after: '.' }, { id: 'v10', before: 'Our ', placeholder: '_____', answer: 'supplier', after: ' can deliver the parts on Friday.' }
      ] } },
      reading: { title: 'Choosing the best route for a client visit', intro: 'Read the team’s plan and notice how they discuss the weather, quantities, and the best option.', paragraphs: [
        'On Wednesday morning, Nisa checked the forecast before a client visit. It was raining lightly, and the temperature was lower than the day before. She wrote to her team: “It is safer to leave earlier today. The roads are usually busier after eight, and it is about twelve kilometres from our office to the client’s building.”',
        'Mert compared two routes. The main road was shorter, but there was heavy traffic near the bridge. The side streets were a little longer, but much quieter. He suggested a shortcut through the business park. “It takes a few more minutes on paper,” he said, “but it is the most reliable route when the bridge is busy.”',
        'Before they left, the team checked their materials. They had a few sample containers and a little space left in the car. The supplier had sent the invoice, and the quantity was correct. Nisa chose the smaller box because it was easier to carry. By nine o’clock, the rain was lighter and the team was ready to go.'
      ], questions: [
        choice('r1', 'Why did Nisa suggest leaving earlier?', ['The roads are usually busier after eight.', 'The client asked for more samples.', 'The supplier changed the invoice.'], 0),
        choice('r2', 'Read and decide: Mert chose the main road because it was the quietest route.', ['True', 'False'], 1, 'The main road was shorter, but the side streets were quieter.'),
        choice('r3', 'Why did Mert recommend the shortcut?', ['It was the most reliable route when the bridge was busy.', 'It was the shortest route in every situation.', 'It was closer to the supplier.'], 0),
        choice('r4', 'What did the team have a small amount of in the car?', ['Space', 'Traffic', 'Temperature'], 0),
        choice('r5', 'Which box did Nisa choose, and why?', ['The smaller box, because it was easier to carry.', 'The larger box, because it held more invoices.', 'The heavier box, because it was cheaper.'], 0)
      ] },
      dialogues: { title: 'Choose a helpful reply', intro: 'Follow three realistic conversations. Choose the reply that fits the situation and keeps the plan moving.', conversations },
      listening: { title: 'Listening: a weather forecast', intro: 'Listen to a weather forecast, then answer the questions about the main details and changes in different places.', source: { title: 'A weather forecast — British Council LearnEnglish', description: 'A short forecast with clear details about rain, sunshine, and changing conditions.', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/b1/weather-forecast' }, questions: [
        choice('l1', 'What is the general outlook for London and the area around Kent until Thursday?', ['Mostly dry, with a couple of isolated showers.', 'Heavy thunderstorms every day.', 'Continuous snow and fog.'], 0),
        choice('l2', 'Read and decide: Leeds is expected to have thunderstorms during the rest of the day.', ['True', 'False'], 1, 'The forecast says Leeds will have drizzle and light rain, not thunderstorms.'),
        choice('l3', 'Which area has the most difficult weather in the forecast?', ['The north-west', 'The south', 'London and Kent'], 0),
        choice('l4', 'What happens to the showers on the east coast?', ['They should clear by lunchtime.', 'They become snow in the afternoon.', 'They continue until Thursday.'], 0),
        choice('l5', 'Why might the team check a forecast before a client visit?', ['To choose a safer and more reliable travel plan.', 'To decide how many invoices to print.', 'To select a new supplier.'], 0)
      ] },
      writing: { title: 'Write a practical plan', intro: 'Write a short message that a colleague could actually use before a visit or meeting.', prompt: 'Write 5–7 sentences to plan a visit to a client. Mention the weather or time, the distance or route, one quantity, and the best choice for the team.', checklist: ['Use “it” once for weather, time, distance, or a general situation.', 'Use one quantity phrase naturally.', 'Use one comparative or superlative to explain a choice.', 'Keep the message clear and practical.'] },
      finalTest: { title: 'Use the lesson in real situations', intro: 'Complete the fifteen tasks. Each one uses a realistic message, plan, or workplace decision.', groups: finalGroups },
      clips: { title: 'Language in context', intro: 'This one-lesson pilot shows how the lesson language sounds in small, familiar scenes.', scenes: [
        { kicker: 'SCENE 01', title: 'Leaving in the rain', line: '“It is raining harder now. Let’s leave a little earlier.”', focus: 'Impersonal “it” makes the weather the topic; “a little” describes an uncountable amount of time.' },
        { kicker: 'SCENE 02', title: 'Choosing a route', line: '“The side street is quieter, but the train is the fastest option.”', focus: 'Comparatives help compare two choices; a superlative identifies the top choice in a group.' },
        { kicker: 'SCENE 03', title: 'Checking supplies', line: '“We have a few containers, but we need a little more space.”', focus: 'Use “a few” with countable items and “a little” with uncountable nouns.' }
      ], notice: 'Third-party film and series clips are not embedded in this pilot because permission to reuse or embed them could not be verified. These original scene prompts let you notice the same language safely in context.' }
    }
  }
};
