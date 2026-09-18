-- 1. Create a User Profiles table
CREATE TABLE public.user_profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  middle_name text,
  student_id_number text unique, -- Nullable, but unique if provided. Used for matching.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read and update their own profile
CREATE POLICY "Allow users to read their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Create Classes table
CREATE TABLE public.classes (
  id uuid default gen_random_uuid() primary key,
  instructor_id uuid references auth.users on delete cascade not null,
  course_code text not null,     -- e.g. "STAS"
  class_code text unique not null, -- e.g. unique join code "X19-823K"
  section text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Instructors can manage their own classes
CREATE POLICY "Instructors can CRUD their own classes" ON public.classes
  FOR ALL USING (auth.uid() = instructor_id);

-- Students can view classes they are enrolled in or joining (basic policy, you may expand this)
CREATE POLICY "Anyone can view class basic info" ON public.classes
  FOR SELECT USING (true);


-- 3. Create Class Roster (Students in a class)
CREATE TABLE public.class_roster (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes on delete cascade not null,
  student_id_number text not null, -- The reference text (not a foreign key to auth.users yet)
  student_name text,               -- As inputted by the instructor
  academic_level text,
  program_strand text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  UNIQUE(class_id, student_id_number) -- A student ID can only be in a class once
);

-- Enable RLS for class roster
ALTER TABLE public.class_roster ENABLE ROW LEVEL SECURITY;

-- Instructors can manage the roster of their own classes
CREATE POLICY "Instructors can manage roster for their classes" ON public.class_roster
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.classes
      WHERE classes.id = class_roster.class_id
      AND classes.instructor_id = auth.uid()
    )
  );

-- Students can read roster entries that match their student_id_number
CREATE POLICY "Students can read their own roster entries" ON public.class_roster
  FOR SELECT USING (
    student_id_number = (
      SELECT student_id_number FROM public.user_profiles WHERE id = auth.uid()
    )
  );
