export const AYSENUR_ARCHITECTURE_V1_EFFECTIVE_DATE = '2026-09-14';
export const AYSENUR_POLICY_VERSION = 'aysenur-english-only-dialogue-revision@2';
export const AYSENUR_TEMPLATE_CONTRACT_VERSION = 'aysenur-three-day-dialogue-practice@2';
export const AYSENUR_ASSESSMENT_POLICY_VERSION = 'aysenur-no-final-quiz@2';
export const AYSENUR_FINAL_QUIZ_QUESTION_COUNT = 0;
export const AYSENUR_SCORE_THRESHOLD = null;
const REQUIRED_KINDS = ['lesson-notes','grammar','vocabulary','daily-use','reading','listening','writing','speaking','dialogue'];
const TURKISH_PATTERNS = [/\blütfen\b/i,/\bcevap\b/i,/\bdoğru\b/i,/\byanlış\b/i,/\böğretmen\b/i,/\bders\b/i];

export const isFutureAysenurPackage = (pkg) => typeof pkg?.date === 'string' && pkg.date >= AYSENUR_ARCHITECTURE_V1_EFFECTIVE_DATE;
export const isValidNoHomeworkOutcome = (outcome) => outcome?.outcome === 'NO_HOMEWORK' && outcome.publicPackageCreated === false;
export const isPrivacySafeAysenurPackageId = (id, date) => typeof id === 'string' && typeof date === 'string' && new RegExp(`^${date}-[a-z0-9]{10,24}$`).test(id);

function addQuestions(questions, label, violations) {
  if (!Array.isArray(questions)) return;
  const prompts = new Set(), ids = new Set();
  questions.forEach((question, index) => {
    const path = `${label}[${index}]`;
    if (!question || typeof question !== 'object') { violations.push(`${path}: must be an object`); return; }
    if (typeof question.prompt !== 'string' || !question.prompt.trim()) violations.push(`${path}.prompt: required`);
    else if (prompts.has(question.prompt.trim())) violations.push(`${path}.prompt: duplicate prompt`); else prompts.add(question.prompt.trim());
    if (!Array.isArray(question.options) || question.options.length < 2 || question.options.some((item) => typeof item !== 'string' || !item.trim())) violations.push(`${path}.options: must contain at least two non-empty choices`);
    if (!Number.isInteger(question.answer) || !Array.isArray(question.options) || question.answer < 0 || question.answer >= question.options.length) violations.push(`${path}.answer: must be a valid option index`);
    if (typeof question.id !== 'string' || !question.id.trim()) violations.push(`${path}.id: required`);
    else if (ids.has(question.id)) violations.push(`${path}.id: duplicate question ID`); else ids.add(question.id);
  });
}
function addDistribution(questions, label, violations) {
  if (!Array.isArray(questions) || questions.length < 8) return;
  const positions = questions.filter((q) => Array.isArray(q?.options) && Number.isInteger(q?.answer) && q.answer >= 0 && q.answer < q.options.length).map((q) => q.answer);
  if (positions.length < 8) return;
  const counts = new Map(); positions.forEach((position) => counts.set(position, (counts.get(position) || 0) + 1));
  if ([...counts.values()].some((count) => count === positions.length)) violations.push(`${label}: all correct answers use one option position`);
  else if (Math.max(...counts.values()) > Math.ceil(positions.length * 0.6)) violations.push(`${label}: one answer position is materially dominant`);
  else for (let period = 2; period <= Math.min(4, Math.floor(positions.length / 2)); period += 1) if (positions.every((position, index) => position === positions[index % period])) { violations.push(`${label}: answer positions use an obvious fixed pattern`); break; }
}
function englishTextViolations(value, path, violations) {
  if (typeof value === 'string' && TURKISH_PATTERNS.some((pattern) => pattern.test(value))) violations.push(`${path}: contains a clear Turkish learner-facing phrase without an authorized exception`);
  else if (Array.isArray(value)) value.forEach((item, index) => englishTextViolations(item, `${path}[${index}]`, violations));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => englishTextViolations(item, `${path}.${key}`, violations));
}
export function findAysenurArchitectureV1Violations(pkg) {
  if (!isFutureAysenurPackage(pkg)) return [];
  const violations = [];
  for (const [field, expected] of Object.entries({ policyVersion: AYSENUR_POLICY_VERSION, templateContractVersion: AYSENUR_TEMPLATE_CONTRACT_VERSION, assessmentPolicyVersion: AYSENUR_ASSESSMENT_POLICY_VERSION })) if (pkg[field] !== expected) violations.push(`${field}: must equal ${expected}`);
  if (!isPrivacySafeAysenurPackageId(pkg.id, pkg.date)) violations.push('id: must use the privacy-safe YYYY-MM-DD-opaque-suffix format');
  if (!Array.isArray(pkg.days) || pkg.days.length !== 3) violations.push('days: must contain exactly three coherent days');
  else {
    const kinds = new Set();
    pkg.days.forEach((day, index) => {
      const path = `days[${index}]`;
      if (day?.id !== `day-${index + 1}`) violations.push(`${path}.id: must be day-${index + 1}`);
      if (!Array.isArray(day?.activities) || day.activities.length === 0) violations.push(`${path}.activities: must contain learner-facing activity`);
      else day.activities.forEach((activity, activityIndex) => {
        if (!activity?.kind || !REQUIRED_KINDS.includes(activity.kind)) violations.push(`${path}.activities[${activityIndex}].kind: unsupported`); else kinds.add(activity.kind);
        if (typeof activity?.title !== 'string' || !activity.title.trim()) violations.push(`${path}.activities[${activityIndex}].title: required`);
        addQuestions(activity?.questions, `${path}.activities[${activityIndex}].questions`, violations);
      });
    });
    REQUIRED_KINDS.filter((kind) => !kinds.has(kind)).forEach((kind) => violations.push(`activities: missing required function ${kind}`));
  }
  if (Object.hasOwn(pkg, 'finalQuiz')) violations.push('finalQuiz: is not allowed; use guided dialogue practice instead');
  if (pkg.languageException?.authorized !== true) englishTextViolations({ title: pkg.title, subtitle: pkg.subtitle, days: pkg.days }, 'learnerContent', violations);
  return violations;
}
export function assertAysenurArchitectureV1Package(pkg, label = 'homework package') { const violations = findAysenurArchitectureV1Violations(pkg); if (violations.length) throw new Error(`${label} violates Ayşenur Architecture v1: ${violations.join(', ')}`); }
