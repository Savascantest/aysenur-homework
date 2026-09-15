import assert from 'node:assert/strict';
import test from 'node:test';
import { assertPublicPackagePrivacy } from '../scripts/lib/public-package-privacy.mjs';
const safe={id:'2026-09-14-a1b2c3d4e5',title:'Teacher and lesson planning',resource:{provider:'Public source',url:'https://example.org/listen'}};
const fixture=(path,value='private')=>{const output=structuredClone(safe);const parts=path.split('.');let target=output;for(const part of parts.slice(0,-1)){target[part]={};target=target[part];}target[parts.at(-1)]=value;return output;};
test('normal learner-facing content and public resource URL pass',()=>assert.doesNotThrow(()=>assertPublicPackagePrivacy(safe)));
for(const [name,path,value] of [['root meetingUuid','meetingUuid'],['nested meetingUuid','evidence.meetingUuid'],['meetingId','meetingId'],['teacherNote','teacherNote'],['nested teacherNotes','private.teacherNotes'],['transcript','evidence.transcriptPath'],['private source','evidence.privateSourceReference'],['LessonRecord','lessonRecordPath'],['router state','routerState'],['ExecutionReceipt','executionReceipt'],['planning','privatePlanningNotes'],['hash','sourceHash'],['private path','file.path','C:\\work\\private\\lesson.json'],['UUID value','reference','11111111-2222-4333-8444-555555555555']])test(`${name} fails`,()=>assert.throws(()=>assertPublicPackagePrivacy(fixture(path,value)),/prohibited private|prohibited UUID/));
test('private metadata in index fails',()=>assert.throws(()=>assertPublicPackagePrivacy({lessons:[fixture('meetingId')]}),/prohibited private/));
