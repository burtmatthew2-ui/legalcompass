-- Add UPDATE policy for profiles table
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add DELETE policy for question_usage table
CREATE POLICY "Users can delete own usage"
ON question_usage FOR DELETE
USING (auth.uid() = user_id);