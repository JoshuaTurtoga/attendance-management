-- Create a custom enum type for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'instructor', 'student');

-- Create a table to store user roles
CREATE TABLE public.user_roles (
  id uuid references auth.users on delete cascade not null primary key,
  role public.app_role default 'student'::public.app_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security for the user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own roles
CREATE POLICY "Allow users to read their own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = id);

-- (Optional) If you want Admins to be able to read/write all roles, you could add policies for that here:
-- CREATE POLICY "Admins can update roles" ON public.user_roles
--   FOR ALL USING (
--     (SELECT role FROM public.user_roles WHERE id = auth.uid()) = 'admin'
--   );


-- Trigger to automatically create a user_role entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (id, role)
  VALUES (new.id, 'student'); -- Defaults to student
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger to auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
