# Graph Report - .  (2026-04-22)

## Corpus Check
- 158 files · ~189,585 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 659 nodes · 1502 edges · 38 communities detected
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 73 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Backend Core & Auth|Backend Core & Auth]]
- [[_COMMUNITY_Examination Data Models|Examination Data Models]]
- [[_COMMUNITY_Frontend Dashboard Layout|Frontend Dashboard Layout]]
- [[_COMMUNITY_Test & Scoring Logic|Test & Scoring Logic]]
- [[_COMMUNITY_Redux Business Logic|Redux Business Logic]]
- [[_COMMUNITY_Trainee Exam Portal|Trainee Exam Portal]]
- [[_COMMUNITY_Admin & Trainer Services|Admin & Trainer Services]]
- [[_COMMUNITY_Static Assets & UI Shots|Static Assets & UI Shots]]
- [[_COMMUNITY_Submodule 8|Submodule 8]]
- [[_COMMUNITY_Submodule 9|Submodule 9]]
- [[_COMMUNITY_Submodule 10|Submodule 10]]
- [[_COMMUNITY_Submodule 11|Submodule 11]]
- [[_COMMUNITY_Submodule 12|Submodule 12]]
- [[_COMMUNITY_Submodule 13|Submodule 13]]
- [[_COMMUNITY_Submodule 14|Submodule 14]]
- [[_COMMUNITY_Submodule 15|Submodule 15]]
- [[_COMMUNITY_Submodule 16|Submodule 16]]
- [[_COMMUNITY_Submodule 19|Submodule 19]]
- [[_COMMUNITY_Submodule 20|Submodule 20]]
- [[_COMMUNITY_Submodule 21|Submodule 21]]
- [[_COMMUNITY_Submodule 22|Submodule 22]]
- [[_COMMUNITY_Submodule 23|Submodule 23]]
- [[_COMMUNITY_Submodule 24|Submodule 24]]
- [[_COMMUNITY_Submodule 25|Submodule 25]]
- [[_COMMUNITY_Submodule 26|Submodule 26]]
- [[_COMMUNITY_Submodule 27|Submodule 27]]
- [[_COMMUNITY_Submodule 29|Submodule 29]]
- [[_COMMUNITY_Submodule 30|Submodule 30]]
- [[_COMMUNITY_Submodule 31|Submodule 31]]
- [[_COMMUNITY_Submodule 32|Submodule 32]]
- [[_COMMUNITY_Submodule 37|Submodule 37]]
- [[_COMMUNITY_Submodule 38|Submodule 38]]
- [[_COMMUNITY_Submodule 54|Submodule 54]]
- [[_COMMUNITY_Submodule 55|Submodule 55]]
- [[_COMMUNITY_Submodule 56|Submodule 56]]
- [[_COMMUNITY_Submodule 117|Submodule 117]]
- [[_COMMUNITY_Submodule 118|Submodule 118]]
- [[_COMMUNITY_Submodule 119|Submodule 119]]

## God Nodes (most connected - your core abstractions)
1. `t()` - 95 edges
2. `a()` - 60 edges
3. `e()` - 42 edges
4. `o()` - 37 edges
5. `qa()` - 37 edges
6. `ni()` - 36 edges
7. `C()` - 34 edges
8. `t()` - 34 edges
9. `P()` - 31 edges
10. `N()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `t()` --calls--> `EndTest()`  [INFERRED]
  C:\Users\mihir\OneDrive\Desktop\exam management system\Online-Examination-System\backend\public\static\js\main.6c73f2b5.chunk.js → C:\Users\mihir\OneDrive\Desktop\exam management system\Online-Examination-System\backend\services\trainee.js
- `Results UI Screenshot` --references--> `generateResults()`  [INFERRED]
  ss/results.jpg → C:\Users\mihir\OneDrive\Desktop\exam management system\Online-Examination-System\backend\services\generateResults.js
- `AWS Deployment Guide` --rationale_for--> `App()`  [INFERRED]
  deployment_guide.md → C:\Users\mihir\OneDrive\Desktop\exam management system\Online-Examination-System\frontend\src\App.js
- `Exam Portal UI Screenshot` --references--> `Examination Portal`  [INFERRED]
  ss/testPortal.jpg → frontend/src/components/trainee/examPortal/portal.js
- `t()` --calls--> `post()`  [INFERRED]
  C:\Users\mihir\OneDrive\Desktop\exam management system\Online-Examination-System\backend\public\static\js\2.af236b4c.chunk.js → C:\Users\mihir\OneDrive\Desktop\exam management system\Online-Examination-System\frontend\src\services\Request.js

## Hyperedges (group relationships)
- **Backend Authentication Flow** — app_app, login_userlogin, passportconf_passport, user_usermodel [INFERRED 0.90]
- **Examination Lifecycle Pattern** — testpaper_testschema, generateresults_gresult, answersheet_model, result_model [INFERRED 0.85]
- **Frontend Initialization Pattern** — app_app_frontend, store_store, loginaction_wakeup [INFERRED 0.95]
- **Admin Dashboard Pattern** — dashboard_backbone, admin_alltrainer, trainer_allquestions, trainer_newtest [INFERRED 0.90]
- **Redux State Architecture** — reducer_root, reducer_user, reducer_test, store_store [INFERRED 0.90]
- **Project Documentation Layer** — deployment_guide, claude_md [INFERRED 0.95]

## Communities

### Community 0 - "Backend Core & Auth"
Cohesion: 0.05
Nodes (125): a(), aa(), Ac(), ai(), an(), ao(), ar(), ba() (+117 more)

### Community 1 - "Examination Data Models"
Cohesion: 0.02
Nodes (46): ChangeSubjectModalState(), ChangeSubjectSearchText(), ChangeSubjectTableData(), ChangeTrainerModalState(), ChangeTrainerSearchText(), ChangeTrainerTableData(), componentDidMount(), AllTests (+38 more)

### Community 2 - "Frontend Dashboard Layout"
Cohesion: 0.13
Nodes (44): At(), Be(), ce(), de(), dr(), dt(), en(), fe() (+36 more)

### Community 3 - "Test & Scoring Logic"
Cohesion: 0.35
Nodes (38): $(), Ae(), B(), C(), D(), e(), ee(), et() (+30 more)

### Community 4 - "Redux Business Logic"
Cohesion: 0.06
Nodes (13): Answer, SingleQuestionDetails, App(), AWS Deployment Guide, getdomain(), SingleQuestionDetails, userlogin(), Passport Config (+5 more)

### Community 5 - "Trainee Exam Portal"
Cohesion: 0.1
Nodes (7): Bc(), Ic(), Nc(), SecureGet(), SecurePost(), QuestionDetails, TestDetails

### Community 6 - "Admin & Trainer Services"
Cohesion: 0.14
Nodes (2): MaxMarks(), MM()

### Community 7 - "Static Assets & UI Shots"
Cohesion: 0.14
Nodes (1): EndTest()

### Community 8 - "Submodule 8"
Cohesion: 0.24
Nodes (5): Fe(), qe(), wa(), xa(), Y()

### Community 9 - "Submodule 9"
Cohesion: 0.25
Nodes (7): Trainer Management View, AuthServices, Admin Dashboard Hub, login(), wakeUp(), Question Bank View, Test Creation View

### Community 10 - "Submodule 10"
Cohesion: 0.33
Nodes (2): mapStateToProps(), SingleQuestion

### Community 11 - "Submodule 11"
Cohesion: 0.29
Nodes (1): Clock

### Community 12 - "Submodule 12"
Cohesion: 0.33
Nodes (1): Dashboard

### Community 13 - "Submodule 13"
Cohesion: 0.33
Nodes (1): Feedback

### Community 14 - "Submodule 14"
Cohesion: 0.33
Nodes (1): Candidates

### Community 15 - "Submodule 15"
Cohesion: 0.33
Nodes (1): FinalQuestionView

### Community 16 - "Submodule 16"
Cohesion: 0.4
Nodes (5): Answersheet Model, generateResults(), gresult(), Result Model, Results UI Screenshot

### Community 19 - "Submodule 19"
Cohesion: 0.5
Nodes (2): register(), registerValidSW()

### Community 20 - "Submodule 20"
Cohesion: 0.4
Nodes (1): Operations

### Community 21 - "Submodule 21"
Cohesion: 0.4
Nodes (1): TraineeRegisterForm

### Community 22 - "Submodule 22"
Cohesion: 0.4
Nodes (1): Questions

### Community 23 - "Submodule 23"
Cohesion: 0.4
Nodes (1): NewQuestion

### Community 24 - "Submodule 24"
Cohesion: 0.4
Nodes (1): BasicTestFormO

### Community 25 - "Submodule 25"
Cohesion: 0.67
Nodes (2): Instruction(), mapStateToProps()

### Community 26 - "Submodule 26"
Cohesion: 0.5
Nodes (1): Stats

### Community 27 - "Submodule 27"
Cohesion: 0.83
Nodes (3): f(), r(), t()

### Community 29 - "Submodule 29"
Cohesion: 0.5
Nodes (1): NewTopics

### Community 30 - "Submodule 30"
Cohesion: 0.5
Nodes (1): NewTrainer

### Community 31 - "Submodule 31"
Cohesion: 0.5
Nodes (1): Sidepanel

### Community 32 - "Submodule 32"
Cohesion: 0.83
Nodes (3): getWindowDimensions(), TestBoard(), useWindowDimensions()

### Community 37 - "Submodule 37"
Cohesion: 0.67
Nodes (1): AuthService

### Community 38 - "Submodule 38"
Cohesion: 0.67
Nodes (3): Root Reducer, Test Reducer, User Reducer

### Community 54 - "Submodule 54"
Cohesion: 1.0
Nodes (2): Frontend App Component, Redux Store

### Community 55 - "Submodule 55"
Cohesion: 1.0
Nodes (2): Exam Portal UI Screenshot, Examination Portal

### Community 56 - "Submodule 56"
Cohesion: 1.0
Nodes (2): API Configuration, Axios Service Wrapper

### Community 117 - "Submodule 117"
Cohesion: 1.0
Nodes (1): Test Paper Schema

### Community 118 - "Submodule 118"
Cohesion: 1.0
Nodes (1): Development Guidelines

### Community 119 - "Submodule 119"
Cohesion: 1.0
Nodes (1): Permissions Service

## Knowledge Gaps
- **19 isolated node(s):** `Passport Config`, `Test Paper Schema`, `Answersheet Model`, `Result Model`, `Frontend App Component` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Admin & Trainer Services`** (15 nodes): `testpaper.js`, `basicTestdetails()`, `beginTest()`, `checkTestName()`, `createEditTest()`, `deleteTest()`, `endTest()`, `getAlltests()`, `getCandidateDetails()`, `getCandidates()`, `getSingletest()`, `getTestquestions()`, `MaxMarks()`, `MM()`, `TestDetails()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Static Assets & UI Shots`** (14 nodes): `trainee.js`, `Answersheet()`, `checkFeedback()`, `chosenOptions()`, `correctAnswers()`, `EndTest()`, `feedback()`, `flags()`, `getQuestion()`, `resendmail()`, `Testquestions()`, `TraineeDetails()`, `traineeenter()`, `UpdateAnswers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 10`** (7 nodes): `singleQuestion.js`, `singleQuestion.js`, `mapStateToProps()`, `SingleQuestion`, `.componentWillMount()`, `.constructor()`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 11`** (7 nodes): `Clock`, `.componentDidMount()`, `.componentWillUnmount()`, `.constructor()`, `.render()`, `mapStateToProps()`, `clock.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 12`** (6 nodes): `Dashboard`, `.componentWillMount()`, `.constructor()`, `.render()`, `mapStateToProps()`, `backbone.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 13`** (6 nodes): `Feedback`, `.constructor()`, `.render()`, `mapStateToProps()`, `feedback.js`, `feedback.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 14`** (6 nodes): `Candidates`, `.componentDidMount()`, `.constructor()`, `.render()`, `mapStateToProps()`, `candidates.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 15`** (6 nodes): `questionview.js`, `FinalQuestionView`, `.constructor()`, `.render()`, `mapStateToProps()`, `QuestionView()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 19`** (5 nodes): `serviceWorker.js`, `checkValidServiceWorker()`, `register()`, `registerValidSW()`, `unregister()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 20`** (5 nodes): `operations.js`, `mapStateToProps()`, `mark()`, `Operations`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 21`** (5 nodes): `traineeregister.js`, `TraineeRegisterForm`, `.componentDidMount()`, `.constructor()`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 22`** (5 nodes): `questions.js`, `Questions`, `.componentDidMount()`, `.constructor()`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 23`** (5 nodes): `newquestion.js`, `mapStateToProps()`, `NewQuestion`, `.constructor()`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 24`** (5 nodes): `BasicTestFormO`, `.constructor()`, `.render()`, `mapStateToProps()`, `basicForm.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 25`** (4 nodes): `instruction.js`, `Instruction()`, `instruction.js`, `mapStateToProps()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 26`** (4 nodes): `stats.js`, `Stats`, `.constructor()`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 29`** (4 nodes): `newtopics.js`, `mapStateToProps()`, `NewTopics`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 30`** (4 nodes): `newtrainer.js`, `mapStateToProps()`, `NewTrainer`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 31`** (4 nodes): `sidepanel.js`, `mapStateToProps()`, `Sidepanel`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 37`** (3 nodes): `AuthService`, `.constructor()`, `AuthServices.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 54`** (2 nodes): `Frontend App Component`, `Redux Store`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 55`** (2 nodes): `Exam Portal UI Screenshot`, `Examination Portal`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 56`** (2 nodes): `API Configuration`, `Axios Service Wrapper`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 117`** (1 nodes): `Test Paper Schema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 118`** (1 nodes): `Development Guidelines`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Submodule 119`** (1 nodes): `Permissions Service`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `Examination Data Models` to `Submodule 8`, `Test & Scoring Logic`, `Static Assets & UI Shots`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `e()` connect `Test & Scoring Logic` to `Backend Core & Auth`, `Examination Data Models`, `Frontend Dashboard Layout`, `Trainee Exam Portal`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `t()` connect `Frontend Dashboard Layout` to `Backend Core & Auth`, `Test & Scoring Logic`, `Redux Business Logic`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `Passport Config`, `Test Paper Schema`, `Answersheet Model` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Backend Core & Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Examination Data Models` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Frontend Dashboard Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._