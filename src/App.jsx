import { useEffect, useMemo, useState } from 'react';
import { loadBrowserProgress, resetBrowserProgress, saveBrowserProgress } from './lib/browser-progress.js';

const labels = { 'lesson-notes': 'Start here', grammar: 'Grammar guide', vocabulary: 'Words in use', 'daily-use': 'Everyday English', reading: 'Reading', listening: 'Listen-style practice', writing: 'Write it', speaking: 'Say it', dialogue: 'Dialogue practice' };
const storage = window.localStorage;

function Questions({ questions = [], progress, update }) {
  return <div className="questions">{questions.map((question) => <article className="question" key={question.id}><p>{question.prompt}</p><div className="choices">{question.options.map((option, index) => <button className={progress.answers[question.id] === index ? 'selected' : ''} onClick={() => update({ answers: { ...progress.answers, [question.id]: index }, mistakes: { ...progress.mistakes, ...(index === question.answer ? { [question.id]: undefined } : { [question.id]: { prompt: question.prompt, answer: question.options[question.answer] } }) } })} key={option}>{option}</button>)}</div>{progress.answers[question.id] !== undefined && <small>{progress.answers[question.id] === question.answer ? 'Nice work. Keep going.' : `Try once more. Look for: ${question.options[question.answer]}`}</small>}</article>)}</div>;
}

function Dialogue({ activity }) {
  return <div className="dialogue-box">
    <p className="dialogue-tip">{activity.dialogueIntro || 'Read each line aloud. Then change the words in [brackets] and say it again.'}</p>
    {activity.dialogue?.map((line, index) => <p className="line" key={`${line.speaker}-${index}`}><b>{line.speaker}:</b> {line.text}</p>)}
    {activity.patterns?.length > 0 && <div className="patterns"><b>Useful pattern</b>{activity.patterns.map((pattern) => <p key={pattern}>{pattern}</p>)}</div>}
  </div>;
}

function Activity({ activity, progress, update }) {
  const complete = () => update({ completed: { ...progress.completed, [activity.id]: true } });
  return <article className="activity"><div className="activity-head"><span>{labels[activity.kind]}</span><h3>{activity.title}</h3></div>{activity.instructions && <p>{activity.instructions}</p>}{activity.content && <p className="activity-content">{activity.content}</p>}{activity.kind === 'listening' && <p className="listen-note">This is an original listen-style script, not a recording from a lesson. Read it slowly twice: first for the main idea, then for the grammar.</p>}{activity.dialogue && <Dialogue activity={activity} />}{activity.kind === 'writing' && <textarea value={progress.drafts[activity.id] || ''} onChange={(event) => update({ drafts: { ...progress.drafts, [activity.id]: event.target.value } })} placeholder="Write your response here…" aria-label={`${activity.title} draft`} />}{activity.kind === 'speaking' && <p className="speaking-note">Say your answer aloud. Nothing is recorded or uploaded.</p>}{activity.questions && <Questions questions={activity.questions} progress={progress} update={update} />}<button className="complete" onClick={complete}>{progress.completed[activity.id] ? 'Practised ✓' : 'Mark as practised'}</button></article>;
}

export default function App() {
  const [index, setIndex] = useState({ lessons: [] }); const [lesson, setLesson] = useState(null); const [day, setDay] = useState(0); const [progress, setProgress] = useState({ completed: {}, answers: {}, mistakes: {}, drafts: {}, speaking: {} });
  useEffect(() => { fetch('./homeworks/index.json').then((response) => response.json()).then(setIndex).catch(() => setIndex({ lessons: [] })); }, []);
  const chooseLesson = (item) => fetch(`./${item.path}`).then((response) => response.json()).then((data) => { setLesson(data); setProgress(loadBrowserProgress(storage, data.id)); setDay(0); });
  useEffect(() => { if (!index.lessons?.length) { setLesson(null); return; } chooseLesson(index.lessons[0]); }, [index]);
  const update = (patch) => { const next = { ...progress, ...patch }; setProgress(next); if (lesson) saveBrowserProgress(storage, lesson.id, next); };
  const completed = useMemo(() => Object.keys(progress.completed).length, [progress]);
  if (!lesson) return <main className="empty"><p className="eyebrow">AYŞENUR’S ENGLISH WORKSPACE</p><h1>Your grammar revision will appear here.</h1><p>This space is for friendly, practical English practice.</p></main>;
  const currentDay = lesson.days[day];
  return <main className="app"><header><div><p className="eyebrow">A1 GRAMMAR REVISION</p><h1>{lesson.title}</h1><p>{lesson.subtitle}</p><p className="header-note">Choose a day, practise in small steps, and repeat any dialogue as often as you like.</p></div><div className="progress"><b>{completed}</b><span>activities practised</span></div></header><nav className="lesson-switcher" aria-label="Revision packs">{index.lessons.map((item) => <button className={item.id === lesson.id ? 'selected' : ''} onClick={() => chooseLesson(item)} key={item.id}>{item.title}</button>)}</nav><nav className="days" aria-label="Revision days">{lesson.days.map((item, index) => <button className={day === index ? 'selected' : ''} onClick={() => setDay(index)} key={item.id}>Day {index + 1}: {item.shortTitle}</button>)}</nav><section className="day"><div className="day-title"><p className="eyebrow">DAY {day + 1}</p><h2>{currentDay.title}</h2><p>{currentDay.intro}</p></div>{currentDay.activities.map((activity) => <Activity activity={activity} progress={progress} update={update} key={activity.id} />)}</section>{Object.values(progress.mistakes).filter(Boolean).length > 0 && <aside><p className="eyebrow">QUICK REVIEW</p><h2>Try these again</h2>{Object.values(progress.mistakes).filter(Boolean).map((item) => <p key={item.prompt}>{item.prompt}<br /><b>Helpful answer: {item.answer}</b></p>)}</aside>}<section className="finish"><p className="eyebrow">KEEP PRACTISING</p><h2>There is no final test.</h2><p>Return to any dialogue, change one detail, and say it again. Repetition builds confidence.</p></section><button className="reset" onClick={() => { const next = resetBrowserProgress(storage, lesson.id); setProgress(next); }}>Reset browser progress</button><footer>Progress, drafts, and review items stay only in this browser. Nothing is sent or uploaded.</footer></main>;
}
