# Project Overview: Digital Class Record System
# Phase 1: Web Application (with future scalability to mobile)

# Core Concept: The application acts as a digital class record. Instructors can create highly customizable class profiles and generate unique codes for students to join. Students register using their official university credentials to apply for their specific classes. Once joined, each class acts as an isolated workspace with its own grade sheet and roster.

# Core Features by User Role:
1. Global Authentication & Security
- Password Requirements: A secure password is required for all user accounts upon creation. Students establish their passwords during self-registration, while initial passwords for instructors are generated and provided by system administrators.
- Password Recovery Workflow: Users who forget their password can initiate a secure recovery process. The system sends a One-Time Password (OTP) to the user's registered email address (or alternative email). Upon successfully inputting the OTP, the user is authorized to create and confirm a new password.

2. System Administration (Admin) Portal
- Instructor Account Provisioning: Instructors cannot self-register. Admins are strictly responsible for creating, distributing, and assigning initial passwords for instructor accounts to maintain system security and authorization.
- Central Admin Dashboard: A comprehensive management interface where administrators can:
    - Manage all users and their respective accounts (Admins, Instructors, Students).
    - Oversee and moderate all created classes across the system.
    - Configure global site settings and parameters.
- Academic Data Restriction: Admins have systemic oversight but strictly cannot edit, alter, or manipulate grades, attendance, or individual student records within any class. Academic data modification is exclusively locked to the assigned instructor.
- Dual-Role Accounts & POV Toggle: An account can hold multiple roles simultaneously (e.g., an Instructor who is also an Admin, or a Student who is an Admin). If a user possesses administrative privileges, the user interface will feature a prominent toggle button, allowing them to seamlessly switch between their standard perspective (Instructor/Student Dashboard) and the Admin Dashboard POV.

3. Faculty (Instructor) Portal
- "Today" Dashboard (Quick Access): A daily hub that displays the instructor's scheduled classes for the current day. It includes quick-action buttons for each class to immediately launch the "Record Attendance Today" and "Record Grades Today" workflows.
- Instructor Class Schedule: An automatically generated, visual timetable (similar to the student schedule) that maps out the days and times of all the classes the instructor is currently handling.
- Account Onboarding: Upon logging in for the first time, instructors are required to complete their profile by inputting their: First Name, Last Name, and Middle Name.
- Class Configuration (Creation Form):
    - Course Code & Title: (e.g., STAS - Science, Technology and Society)
    - Section & Class Type: (e.g., E106-R, Lecture or Laboratory)
    - Days, Time, & Room: Checklists and text inputs (default "TBA").
    - Dynamic Scheduling: A checkbox for "Different Rooms and Schedules" to assign unique times/rooms for specific days.
    - Units, Mini-Term, & Term/Semester: Academic metadata.
    - Class Join Code Generation: The system generates a unique Class Code that instructors can share and Refresh/Regenerate at any time.
- Class Workspace Tabs: Each class functions as an independent dashboard with four main tabs: Class List, Attendance, Grades, and BETA: Notes and To-Do.
- Class List Management & Data Entry:
    - Data Structure: A 5-column table: #, Student Number, Student Name, Program / Strand, and Academic Level.
    - Input Methods: Keyboard-optimized manual entry (type, TAB, ENTER, "Save All") or clipboard import (paste a copied 5-column table directly).
    - Student Application Processing: A queue to view incoming join requests. Instructors can view IDs, utilize Smart Matching (which highlights if the applicant's ID matches a pre-populated list entry), and Approve/Decline requests.
- Attendance Management:
    - Grid View: A master table (Rows: Students, Columns: Valid School Dates).
    - Manual Table Editing: Click to edit cells via a dropdown (Present, Late, Excused, Absent) and add optional text "Notes" (e.g., reason for absence).
    - Instructor Self-Absence: Instructors have a specific toggle to officially mark themselves as absent for a class day.
    - "Record Attendance Today" Workflow: A focused, student-by-student overlay window for rapid input. Features keyboard shortcuts (P, L, E, A), an optional ID photo display, a notes field, and quick navigation (Confirm/Next, Go Back, Jump to Student).
- Grades Management:
    - Grid View: Similar to the attendance table (Rows: Students), but columns are distinctly grouped into sections for Quizzes, Exams, and Performance Tasks.
    - Add a Record (Activity): Instructors create a new graded activity by inputting:
        - Type (Quiz, Exam, or Performance Task)
        - Name of Activity (e.g., Prelim, Reporting Project 1)
        - Description (Optional)
        - Max Score
        - Date (Option to auto-fill current date)
    - Grading Methods:
        - Manual Table Editing: Edit the grid directly after adding an activity.
        - Streamlined "Record Grades" Workflow: An overlay window (identical to the attendance workflow) that cycles through each student to input their earned score or mark the activity as "missing."
    - "Record Grades Today" (Smart Workflow): A combined quick-action button that immediately opens the "Add a Record" form (auto-dated to today), then launches the grading overlay.
    - Attendance Integration: This workflow automatically skips students marked as "Absent" for today.
    - Auto-Attendance Generation: If no attendance record exists for today, it loops through the entire class. Upon completion, a prompt asks the instructor if they want to save these grades as today's attendance (Students with scores = Present; Students marked missing = Absent). The system will explicitly warn the instructor that this method cannot automatically assign "Late" or "Excused" statuses.
    - Automated Computation & Export: Automatically calculate final grades and export records to Excel (.xlsx).

4. Student Portal
    - Restricted Account Creation: Registration is strictly locked to official university emails. Students must establish a secure password during this step.
    - Mandatory Onboarding: Upon first login, students must complete their profile (Name, Course, Dept, Year, Student ID Number, Mobile, Alt Email, and ID Upload).
    - "Today" Dashboard: A streamlined daily view showing the student's scheduled classes for the current day. It dynamically updates to display any attendance marked or grades recorded for those specific classes today.
    - Student Dashboard Navigation:
        - Joined Classes: The main hub to manage enrolled classes and view personal records.
        - Class Requests: View the status of pending applications and reasons for declined requests.
        - Class Schedule: An automatically generated, visual college timetable aggregating all joined classes, with the ability to manually add external classes.
        - Join Class: Input the Course Code and Class Code to apply. Upon successfully submitting a request, the system will display a prompt: "Successfully sent a request to join the class [Course Name] to Instructor [Instructor Name]."
    - Change Details: Profile management.
    - Notifications: Students receive an immediate alert/notification in their portal whenever an instructor records a new grade for them.

# Project Prerequisites (Needs)
- Before development begins, the following resources need to be finalized:
    - Sample Class Record: A physical or digital template of the current grading sheets.
    - Grading Computation Formula: The official weights and mathematical formulas used to calculate final grades.
    - Sample Class List: A dummy list of student names and ID numbers to test the class creation and matching system.
