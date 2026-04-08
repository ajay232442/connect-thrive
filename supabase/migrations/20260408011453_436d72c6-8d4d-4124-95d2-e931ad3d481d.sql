
-- Fix 1: Restrict profiles SELECT to owner only
DROP POLICY "Profiles viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Also restrict INSERT to authenticated
DROP POLICY "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Also restrict UPDATE to authenticated
DROP POLICY "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Fix 2: Add session_notes policies for counselors
CREATE POLICY "Counselors can view their session notes"
  ON public.session_notes FOR SELECT
  TO authenticated
  USING (auth.uid() = counselor_id);

CREATE POLICY "Counselors can insert session notes"
  ON public.session_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = counselor_id);

CREATE POLICY "Counselors can update their session notes"
  ON public.session_notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = counselor_id);

CREATE POLICY "Counselors can delete their session notes"
  ON public.session_notes FOR DELETE
  TO authenticated
  USING (auth.uid() = counselor_id);

-- Fix 3: Add restrictive policy to prevent self-role-assignment
CREATE POLICY "Prevent self role assignment"
  ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() != user_id);
